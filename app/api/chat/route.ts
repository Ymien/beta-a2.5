export const runtime = "nodejs";

type RequestMessage = {
  role: "user" | "assistant" | "system" | "ai";
  content: string;
};

type RequestBody = {
  messages?: RequestMessage[];
  modelId?: string;
  thinkingType?: "enabled" | "disabled" | "auto";
};

type ParsedErrorShape = {
  message?: string;
  code?: string;
  request_id?: string;
  requestId?: string;
  error?: ParsedErrorShape | string;
};

function tryParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isRequestMessage(value: unknown): value is RequestMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const maybeMessage = value as Record<string, unknown>;
  return typeof maybeMessage.role === "string" && typeof maybeMessage.content === "string";
}

function getEnvValue(key: string): string {
  return process.env[key] || "";
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An error occurred during chat";
}

export async function POST(req: Request) {
  try {
    const { messages, modelId, thinkingType } = (await req.json()) as RequestBody;
    const safeMessages = Array.isArray(messages) ? messages.filter(isRequestMessage) : [];

    const base = (process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3").replace(/\/$/, "");

    const system =
      thinkingType === "enabled"
        ? "你是 Xyu 的智能助手。你可以在内部充分思考，但不要在回答中展示思考过程/推理步骤/自我反思。最终输出必须以“FINAL:”开头，且FINAL之前禁止输出任何文字；FINAL后直接给出最终答案。"
        : "你是 Xyu 的智能助手。请直接输出最终答案，不要展示思考过程/推理步骤/自我反思。最终输出必须以“FINAL:”开头，且FINAL之前禁止输出任何文字；FINAL后直接给出最终答案。";

    const toChatMessages = () => [
      { role: "system", content: system },
      ...safeMessages,
    ];

    const toResponsesInput = () => [
      { role: "system", content: [{ type: "input_text", text: system }] },
      ...safeMessages.map((m) => ({
            role: m.role === "ai" ? "assistant" : m.role,
            content: [
              {
                type: m.role === "ai" ? "output_text" : "input_text",
                text: String(m.content ?? ""),
              },
            ],
          })),
    ];

    const modelMap: Record<
      string,
      {
        endpoint: "responses" | "chat";
        modelEnvKey: string;
        modelFallback: string;
        apiKeyEnvKey: string;
      }
    > = {
      "doubao1.8": {
        endpoint: "responses",
        modelEnvKey: "ARK_MODEL_DOUBAO_1_8",
        modelFallback: "ep-20260409153917-z4nx8",
        apiKeyEnvKey: "ARK_API_KEY_DOUBAO_1_8",
      },
      "doubao2.0pro": {
        endpoint: "responses",
        modelEnvKey: "ARK_MODEL_DOUBAO_2_0_PRO",
        modelFallback: "doubao-seed-2-0-pro-260215",
        apiKeyEnvKey: "ARK_API_KEY_DOUBAO_2_0_PRO",
      },
      "doubao1.5pro": {
        endpoint: "chat",
        modelEnvKey: "ARK_MODEL_DOUBAO_1_5_PRO",
        modelFallback: "doubao-1-5-pro-32k-250115",
        apiKeyEnvKey: "ARK_API_KEY_DOUBAO_1_5_PRO",
      },
      "deepseek3.2": {
        endpoint: "responses",
        modelEnvKey: "ARK_MODEL_DEEPSEEK_3_2",
        modelFallback: "ep-20260409153659-fbgz8",
        apiKeyEnvKey: "ARK_API_KEY_DEEPSEEK_3_2",
      },
      "glm4.7": {
        endpoint: "responses",
        modelEnvKey: "ARK_MODEL_GLM_4_7",
        modelFallback: "glm-4-7-251222",
        apiKeyEnvKey: "ARK_API_KEY_GLM_4_7",
      },
    };

    const info = modelMap[String(modelId)];
    if (!info) {
      return new Response(JSON.stringify({ error: "Unknown model" }), { status: 400 });
    }

    const apiKey = getEnvValue(info.apiKeyEnvKey);
    if (!apiKey) {
      return new Response(JSON.stringify({ error: `${info.apiKeyEnvKey} is not configured.` }), { status: 500 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const model = getEnvValue(info.modelEnvKey) || info.modelFallback;

    const url =
      info.endpoint === "responses" ? `${base}/responses` : `${base}/chat/completions`;

    const normalizedThinkingType =
      thinkingType === "enabled" || thinkingType === "disabled" || thinkingType === "auto"
        ? thinkingType
        : "auto";

    const effectiveThinkingType =
      modelId === "glm4.7" && normalizedThinkingType === "auto"
        ? "disabled"
        : normalizedThinkingType;

    const body =
      info.endpoint === "responses"
        ? {
            model,
            stream: true,
            input: toResponsesInput(),
            ...(effectiveThinkingType === "auto" ? {} : { thinking: { type: effectiveThinkingType } }),
          }
        : {
            model,
            stream: true,
            messages: toChatMessages(),
            thinking: { type: effectiveThinkingType },
          };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const raw = await response.text();
      const parsed = tryParseJson(raw);
      const parsedError = (typeof parsed === "object" && parsed !== null ? parsed : {}) as ParsedErrorShape;
      const nested =
        typeof parsedError.error === "string" ? tryParseJson(parsedError.error) : null;
      const nestedError = (typeof nested === "object" && nested !== null ? nested : {}) as ParsedErrorShape;
      const e =
        (typeof nestedError.error === "object" && nestedError.error !== null
          ? nestedError.error
          : nestedError.error) ||
        parsedError.error ||
        parsedError;
      const errorInfo = (typeof e === "object" && e !== null ? e : {}) as ParsedErrorShape;
      const message =
        errorInfo.message ||
        (typeof errorInfo.error === "object" && errorInfo.error !== null ? errorInfo.error.message : undefined) ||
        (typeof raw === "string" ? raw : "Request failed");
      const code =
        errorInfo.code ||
        (typeof errorInfo.error === "object" && errorInfo.error !== null ? errorInfo.error.code : undefined);
      const requestId =
        (typeof message === "string" && message.match(/Request id:\s*([0-9a-f]+)/i)?.[1]) ||
        errorInfo.request_id ||
        errorInfo.requestId;

      return new Response(
        JSON.stringify({ error: { message, code, requestId } }),
        { status: response.status }
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: unknown) {
    console.error("API Chat Error:", error);
    return new Response(
      JSON.stringify({ error: getErrorMessage(error) }),
      { status: 500 }
    );
  }
}
