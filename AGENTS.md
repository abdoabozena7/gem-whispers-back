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
