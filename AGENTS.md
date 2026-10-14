<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the GEM prototype as a single state-driven home-route experience because its transitions are one continuous museum loop, not separate shareable pages.
- All visitor-facing copy lives in src/lib/i18n.ts and renders as hieroglyphs until the language is decoded, so the translation reveal stays consistent across screens.
- AI problem/hint text comes from one server function with static fallbacks, so the experience never blocks on the AI.
- Journey progress persists in browser localStorage only, so visitors resume without accounts.
- Hint progression uses a shared bounded level helper and immediately available localized clues; AI may personalize early clues but the final clue stays deterministic so visitors always find the matching artifact.
- Imported Egyptian column artwork is cloned and normalized per instance inside a scene-local Suspense boundary so asset loading never hides the rest of the city.
- Narrative resolvers select localized age-specific problems, clues, artifact explanations, reactions, and identities from i18n.ts so fallback and AI experiences share the same audience.
- Fine static city details use merged geometry and crops/reeds use instancing to increase visual detail without multiplying draw calls.
- Imported city props are cloned and normalized per instance inside scene-local Suspense boundaries so model loading does not blank the city.
- Derive civilization levels from unique restored knowledge and use the same resolver everywhere so levels remain consistent with saved discoveries.
- Persist revealed clue counts with the local journey and keep museum location guidance deterministic and explicitly unverified until curator-confirmed locations exist.
