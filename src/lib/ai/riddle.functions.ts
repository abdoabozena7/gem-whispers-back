import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  knowledge: z.string(),
  language: z.string(),
  age: z.string(),
  mode: z.enum(["problem", "hint"]),
  hintLevel: z.number().int().min(0).max(3),
});

/** Turns a missing knowledge area into an age- and language-appropriate problem or hint. */
export const getRiddle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) throw new Error("AI is not configured");
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const { createLovableAiGatewayRunIdFetch } = await import("./run-id.server.ts");
    const run = createLovableAiGatewayRunIdFetch();
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: run.fetch,
    });
    const task =
      data.mode === "problem"
        ? `Describe one simple everyday PROBLEM caused by missing ${data.knowledge} knowledge in an ancient Nile settlement. Use the exact matching obstacle: Agriculture = river water cannot reach dry fields; Religion = people lack a sacred gathering place; Architecture = a heavy stone roof has no supports; Writing = people forget knowledge without a lasting record; Government = people argue over who decides city work; Trade = extra food cannot reach neighboring villages; Medicine = a sick neighbor needs a remedy; Military = homes need protection. Stay on this obstacle so the matching artifact solves it. Make it easy to understand while walking: no metaphors, no tragic or frightening scenarios. Never name ${data.knowledge} or its synonyms. End with a short question. At most 2 short sentences, about 30 words total.`
        : `Give museum clue level ${data.hintLevel} for missing ${data.knowledge}. The matching artifacts are Agriculture: Ancient Irrigation Tool; Religion: Temple Relief; Architecture: Stone Column Fragment; Writing: Papyrus Fragment; Government: Royal Seal; Trade: Trading Vessel; Medicine: Medical Papyrus; Military: Ancient Weapon. Level 1: say ONLY what people can DO with the object, starting "Look for something that helps people...". Level 2: describe its visible shape and material, clearly more specific than level 1, without naming the artifact or knowledge. Level 3: name the matching artifact explicitly. One practical short sentence, maximum 25 words. Never invent gallery locations or displays. For Arabic use friendly Egyptian phrasing like "دور على حاجة يقدروا ..." rather than abstract riddles.`;
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      instructions: `You are the friendly voice of an Ancient Egyptian settlement speaking to a museum visitor. Write ONLY in ${data.language}. Age group: ${data.age}. For children use very short familiar words; for teens and adults stay concise and practical. Make the experience easy and encouraging. Plain text, no markdown, no quotes.`,
      prompt: task,
      providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] } },
    });
    const text = (await result.text).trim();
    if (!text) throw new Error("Empty response");
    return { text };
  });
