# GEM: Bring Egypt Back to Life

## Goal
Build a polished mobile-first prototype that demonstrates the complete museum-to-civilization loop without turning into a city builder or museum guide.

## Experience
- Open on a cinematic, sand-covered settlement with the provided headline and a single **BEGIN** action.
- Make **Living Egypt** the central screen: one progress indicator, an animated isometric settlement, one current need, and a dominant **DISCOVER** action.
- Add the simulated scan flow and cycle artifacts in the required demo order: Irrigation Tool, Temple Relief, Stone Column Fragment, Papyrus Fragment.
- Animate each discovery's visible effect on the city, including farms, farmers, temple silhouette, partial temple construction, inscriptions, scribes, and temple completion.
- After the temple completes, trigger the settlement-growth event and reveal the Government knowledge need.
- Let visitors open the temple dependency state directly from its city silhouette/building.
- Add focused **Current Need** and **My Egypt** views while keeping most interactions on the city screen.
- Support all eight artifact records after the four-step demo story so simulated scanning continues naturally.

## Visual direction
- Use a custom illustrated isometric city scene built for the prototype, with subtle motion and strong locked-versus-restored visual states.
- Apply the sandstone, papyrus, charcoal, muted-gold, and Nile-blue system through semantic design tokens.
- Use large, walking-friendly controls and brief cinematic overlays rather than repeated popups or dense panels.
- Keep transitions fast and respect reduced-motion preferences.

## Technical details
- Keep the prototype on the home page with client-side state; no login, camera, storage, or backend is required.
- Build the city illustration as responsive layered HTML/CSS shapes so every discovery can transform it live.
- Reuse the existing button component with a dedicated primary variant, and use iconography only where it improves scanning.
- Add route-specific page metadata and verify the full story at mobile and desktop sizes.