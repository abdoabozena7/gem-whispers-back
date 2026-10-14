import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  knowledge: z.enum(["Agriculture", "Religion", "Architecture", "Writing", "Government", "Trade", "Medicine", "Military"]),
  language: z.string().max(80),
  age: z.enum(["child", "teen", "adult"]),
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
    const ageVoice = {
      child: "Audience under 12: reading age 6–9. Use concrete familiar words and direct questions. Maximum 18 words total, sentences of at most 9 words. No metaphors, death, hunger, threats, technical terms, or abstract ideas. Say plants instead of crops, town instead of civilization. Arabic must be friendly spoken Egyptian Arabic. French uses tu.",
      teen: "Audience 12–17: curious, conversational, respectful, never babyish. Explain one clear cause and effect. At most 28 words in two short sentences. No flowery language. Arabic uses natural Egyptian phrasing. French uses tu.",
      adult: "Audience 18+: concise museum-quality language, precise but accessible. At most 35 words in two short sentences. No jargon without explanation. Arabic is clear natural Arabic; French uses vous. Never make the problem more frightening or harder because of age.",
    }[data.age];
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
      instructions: `You are a person living in an Ancient Egyptian settlement, speaking directly to the visitor who can help your city. For a problem, make a tiny cinematic scene: one visible action or sensory detail, then a concrete obstacle and an inviting question. Speak in first person plural. Choose the speaker to fit the problem: farmer, builder, storyteller, boat keeper, worker, neighbor, or guard. Do not announce your role or add a greeting. Make the visitor feel needed, never tested. For a hint, prioritize useful clarity over drama and follow the precise clue level. Write ONLY in ${data.language}. ${ageVoice} Keep artifact names accurate. Follow the exact obstacle and hint level. Never invent museum directions, gallery numbers, exhibit availability, or distances. Plain text, no markdown, no quotes.`,
      prompt: task,
      maxRetries: 0,
      providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] } },
    });
    const text = (await result.text).trim();
    if (!text) throw new Error("Empty response");
    return { text };
  });
