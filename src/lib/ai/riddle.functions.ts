import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  knowledge: z.string(),
  language: z.string(),
  age: z.string(),
  mode: z.enum(["problem", "hint"]),
  hintLevel: z.number(),
});

/** Turns a missing knowledge area into an age- and language-appropriate problem or hint. */
export const getRiddle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI is not configured");
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    const task =
      data.mode === "problem"
        ? `Describe, as a vivid everyday PROBLEM the people of an ancient Nile settlement are suffering, the situation caused by missing ${data.knowledge} knowledge. Never name the knowledge "${data.knowledge}" or any direct synonym. End with a short curious question. Max 2 sentences.`
        : `Give hint #${data.hintLevel} (1 = gentle, 3 = almost the answer) to help a museum visitor guess which kind of artifact in the Grand Egyptian Museum would solve the problem caused by missing ${data.knowledge} knowledge. Describe what the object looks like or where it might be displayed. At level 3 you may name the object type. One sentence.`;
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are the voice of a lost Ancient Egyptian civilization speaking to a museum visitor. Write ONLY in ${data.language}. The visitor's age group is ${data.age}: adapt vocabulary, tone and sentence length to that age. Plain text, no markdown, no quotes.`,
      prompt: task,
      providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] } },
    });
    const text = (await result.text).trim();
    if (!text) throw new Error("Empty response");
    return { text };
  });
