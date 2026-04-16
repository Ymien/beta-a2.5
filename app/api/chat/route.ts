export const runtime = "edge";

function tryParseJson(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { messages, modelId, thinkingType } = await req.json();

    const base = (process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3").replace(/\/$/, "");

    const system =
      thinkingType === "enabled"
        ? "你是 Xyu 的智能助手。请先充分思考，再给出结构清晰、可执行的答案。"
        : "你是 Xyu 的智能助手。请直接给出清晰准确的回答。";

    const toChatMessages = () => [
      { role: "system", content: system },
      ...(Array.isArray(messages) ? messages : []),
    ];

    const toResponsesInput = () => [
      { role: "system", content: [{ type: "input_text", text: system }] },
      ...(Array.isArray(messages)
        ? messages.map((m: any) => ({
            role: m.role === "ai" ? "assistant" : m.role,
            content: [
              {
                type: m.role === "ai" ? "output_text" : "input_text",
                text: String(m.content ?? ""),
              },
            ],
          }))
        : []),
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

    const apiKey = (process.env as any)[info.apiKeyEnvKey] || "";
    if (!apiKey) {
      return new Response(JSON.stringify({ error: `${info.apiKeyEnvKey} is not configured.` }), { status: 500 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const model = (process.env as any)[info.modelEnvKey] || info.modelFallback;

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
      const nested =
        parsed && typeof parsed?.error === "string" ? tryParseJson(parsed.error) : null;
      const e = nested?.error || parsed?.error || parsed || {};
      const message =
        e?.message ||
        e?.error?.message ||
        (typeof raw === "string" ? raw : "Request failed");
      const code = e?.code || e?.error?.code;
      const requestId =
        (typeof message === "string" && message.match(/Request id:\s*([0-9a-f]+)/i)?.[1]) ||
        e?.request_id ||
        e?.requestId;

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

  } catch (error: any) {
    console.error("API Chat Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during chat" }),
      { status: 500 }
    );
  }
}
