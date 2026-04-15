export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, modelId, thinkMode } = await req.json();

    let apiKey = "";
    let baseURL = "";
    let actualModel = modelId;
    let headers: Record<string, string> = { "Content-Type": "application/json" };

    switch (modelId) {
      case "deepseek":
        apiKey = process.env.DEEPSEEK_API_KEY || "";
        baseURL = "https://api.deepseek.com/v1/chat/completions";
        actualModel = "deepseek-chat";
        break;

      case "glm4":
        apiKey = process.env.GLM_API_KEY || "";
        baseURL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
        actualModel = "glm-4";
        break;

      case "doubao1.8":
        apiKey = process.env.DOUBAO_API_KEY || "";
        baseURL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
        actualModel = process.env.DOUBAO_MODEL_1_8 || "ep-xxx";
        break;

      case "doubao2.0pro":
        apiKey = process.env.DOUBAO_API_KEY || "";
        baseURL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
        actualModel = process.env.DOUBAO_MODEL_2_0_PRO || "ep-yyy";
        break;

      default:
        return new Response(JSON.stringify({ error: "Unknown model" }), { status: 400 });
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: `API Key for ${modelId} is not configured.` }), { status: 500 });
    }

    headers =
      modelId === "glm4"
        ? { ...headers, Authorization: apiKey }
        : { ...headers, Authorization: `Bearer ${apiKey}` };

    const system =
      thinkMode === true
        ? "You are NeuraChat, a helpful assistant. Think thoroughly and carefully. Provide a final answer with clear structure and practical steps when applicable."
        : "You are NeuraChat, a helpful assistant. Provide concise, accurate answers with clear structure.";

    const response = await fetch(baseURL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: actualModel,
        messages: [
          { role: "system", content: system },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: err }), { status: response.status });
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
