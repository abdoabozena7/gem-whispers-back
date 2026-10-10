# Remix of Oasis Evolve

Build a polished, mobile-first interactive web app prototype for the Grand Egyptian Museum called:



GEM: Bring Egypt Back to Life



Every artifact you discover gives a lost civilization something it once knew.



CORE CONCEPT



This is NOT a museum guide.

This is NOT a normal city-building game.

This is NOT a chatbot.



The visitor explores real artifacts inside the Grand Egyptian Museum.



Each artifact restores a piece of lost knowledge to an Ancient Egyptian civilization.



The civilization then USES that knowledge by itself.



The visitor does not manually place buildings or manage resources.



Instead:



ARTIFACT DISCOVERED

↓

KNOWLEDGE RESTORED

↓

CIVILIZATION REACTS

↓

NEW POSSIBILITIES OR PROBLEMS APPEAR

↓

THE VISITOR RETURNS TO THE MUSEUM TO FIND MORE KNOWLEDGE



The real museum becomes the source of knowledge.



The virtual civilization becomes the consequence of what the visitor discovers.



The key emotional feeling should be:



"I am not collecting artifacts.

I am giving knowledge back to a civilization."



---



MAIN EXPERIENCE



The visitor begins with a partially lost Ancient Egyptian settlement.



The civilization has basic people, a small Nile area, a few primitive structures, and many incomplete or faded areas.



As the visitor explores the museum, different types of knowledge return.



Examples:



Agriculture

→ people learn to farm



Writing

→ knowledge can be recorded and preserved



Architecture

→ stronger and more advanced structures become possible



Religion

→ temples and ritual spaces begin to develop



Trade

→ marketplaces and boats become active



Medicine

→ population health improves



Government

→ larger communities become organized



Military

→ defenses and military structures develop



The city should visually change as these discoveries happen.



---



IMPORTANT DIFFERENCE FROM A NORMAL CITY BUILDER



The user must NEVER manually build the city.



No building placement.

No resource micromanagement.

No construction grids.

No currency systems.

No complicated upgrade menus.



The civilization builds and evolves automatically.



The visitor's only responsibility is:



DISCOVER KNOWLEDGE.



The city responds.



This is critical.



---



UX PRINCIPLE



The visitor is physically standing and walking inside a museum.



Therefore the experience must be:



- extremely simple

- usable with one hand

- mostly visual

- minimal text

- big buttons

- readable in 2–3 seconds

- no complicated dashboards

- no long descriptions

- no typing unless absolutely necessary

- no clutter

- no traditional RPG interface



The app should never steal attention from the museum.



It should reward exploration, then quickly send the user back to the physical museum.



---



CORE LOOP



The full product should revolve around one simple loop:



EXPLORE

↓

DISCOVER

↓

RESTORE KNOWLEDGE

↓

WATCH CIVILIZATION REACT

↓

A NEW NEED OR OPPORTUNITY APPEARS

↓

EXPLORE AGAIN



This loop must be visually obvious.



---



SCREEN 1 — OPENING



Create a cinematic but simple opening.



Visual:

An Ancient Egyptian settlement partly covered by sand.



Some buildings are only silhouettes.



Some areas look incomplete.



Minimal movement:

Nile water

wind

sand

a few citizens



Headline:



"Egypt has forgotten how to live."



Subheadline:



"Explore the museum.

Restore its knowledge.

Bring the civilization back to life."



Primary button:



BEGIN



No signup.



No onboarding carousel.



No long tutorial.



After tapping BEGIN, go directly to the main civilization screen.



---



SCREEN 2 — THE LIVING CIVILIZATION



This is the most important screen.



Show a beautiful isometric or slightly angled Ancient Egyptian settlement.



The civilization should feel alive.



Include:



- Nile

- small farms

- houses

- pathways

- boats

- citizens

- unfinished areas

- locked/faded future structures



The city should not feel static.



Use subtle movement:



- citizens walking

- Nile flowing

- boats moving

- workers building

- animals moving

- smoke from workshops

- fields changing



Keep animations subtle and premium.



---



MAIN SCREEN UI



Top area:



YOUR CIVILIZATION



Example:



Knowledge Restored

32%



Do not show lots of stats.



Only show one meaningful progress indicator.



Main visual area:



Living civilization.



Bottom area:



One large primary button:



DISCOVER



Secondary small button:



CURRENT NEED



Optional small status card:



"Your people can grow food,

but they cannot trade it yet."



Keep it short.



---



SCREEN 3 — DISCOVERY



When user taps DISCOVER:



Show a clean scan interface.



For prototype:



Do NOT require real camera access.



Use:



SIMULATE ARTIFACT SCAN



After scan:



Show one artifact.



Example:



IRRIGATION TOOL



Knowledge:

AGRICULTURE



Short explanation:



"Egyptians learned how to control water and grow food."



Then:



AGRICULTURE RESTORED



Large visual feedback.



Do not show paragraphs.



Button:



SEE WHAT CHANGED



---



CIVILIZATION REACTION



This is one of the most important moments.



After discovery, return to the civilization.



Show a short transformation.



Example:



Agriculture restored.



Then visually:



- irrigation canals appear

- fields grow

- farmers appear

- food production begins

- more citizens arrive



Then show one short message:



"Your civilization can now grow food."



Next message:



"But it cannot trade the surplus."



Then reveal a new need:



TRADE KNOWLEDGE NEEDED



This automatically creates the next reason to explore the museum.



---



KNOWLEDGE DEPENDENCIES



Dependencies must NOT feel like a technical skill tree.



They must feel like real problems inside the civilization.



Example:



The visitor restored:



Agriculture



The city grows more food.



But there is nowhere to exchange it.



Show:



"We can grow food.

But we do not know how to trade it."



Required Knowledge:



TRADE



Button:



FIND WHAT WE NEED



That becomes the next mission.



---



ADVANCED DEPENDENCY EXAMPLE — TEMPLE



The visitor has:



Religion

Architecture



A Temple begins construction.



The Temple structure rises partially.



Then construction stops.



Show:



"The temple can be built...

but its knowledge cannot survive."



Reason:



WRITING KNOWLEDGE MISSING



Visual:



Religion ✓

Architecture ✓

Writing ○



Then:



"Find evidence of Writing."



Button:



START DISCOVERY



When Writing is discovered:



Show:



WRITING RESTORED



Return to city.



Then:



- scribes appear

- temple walls gain inscriptions

- rituals become active

- temple construction finishes



Then:



TEMPLE COMPLETED



This should be one of the strongest visual moments in the prototype.



---



DEPENDENCY SYSTEM



Use these examples:



MARKETPLACE



Requires:

Agriculture

Trade



Meaning:

Food exists, but exchange cannot happen without trade knowledge.



---



TEMPLE



Requires:

Religion

Architecture

Writing



Meaning:

Religion creates the purpose.

Architecture makes construction possible.

Writing preserves rituals and knowledge.



---



ROYAL PALACE



Requires:

Architecture

Government

Writing



Meaning:

Large administration requires organization and recorded information.



---



MEDICAL HOUSE



Requires:

Medicine

Writing



Meaning:

Medical knowledge must be documented and shared.



---



SHIPYARD



Requires:

Trade

Engineering / Architecture



Meaning:

Trade creates demand for transport.

Engineering enables construction.



---



MONUMENT



Requires:

Architecture

Religion

Government



Meaning:

Large monuments require beliefs, technical capability and organized authority.



---



CIVILIZATION PROBLEMS



This is the feature that makes the concept feel alive.



The civilization should occasionally develop a new problem based on what knowledge the visitor has or is missing.



These are not random game events.



They should logically emerge from the current state of the civilization.



Examples:



---



EVENT 1 — FOOD SURPLUS



The civilization has Agriculture.



Fields are producing food.



But Trade is missing.



Show:



"Your farms are thriving."



Then:



"Food is being wasted."



Then:



"We need to learn how Egyptians traded goods."



Knowledge Needed:

TRADE



---



EVENT 2 — GROWING POPULATION



Agriculture + Medicine are unlocked.



Population grows.



But Government is missing.



Show:



"The settlement is growing."



Then:



"But no one knows how to organize it."



Knowledge Needed:

GOVERNMENT



---



EVENT 3 — TEMPLE KNOWLEDGE



Religion + Architecture unlocked.



Writing missing.



Show:



"The temple stands."



Then:



"But rituals cannot be preserved."



Knowledge Needed:

WRITING



---



EVENT 4 — NILE CRISIS



Create a dramatic event:



"Nile levels are falling."



The civilization knows Agriculture.



But advanced water management knowledge is missing.



Mission:



"Find evidence of how Egyptians controlled water."



This should feel like:



The museum contains the answer.



The visitor must physically explore to solve the civilization's problem.



---



AI ROLE



Do not present AI as a chatbot.



AI should work invisibly behind the experience.



AI is responsible for:



1. understanding what the visitor has discovered

2. choosing what the civilization can now do

3. identifying missing knowledge

4. creating a logical next need

5. generating personalized missions

6. adapting the civilization path to the visitor's interests



The visitor should feel:



"The civilization is reacting to me."



Not:



"I am talking to an AI."



---



PERSONALIZATION



Different visitors should naturally create different civilizations.



Example Visitor A discovers:



Agriculture

Military

Government

Architecture



Their civilization becomes:



organized

defensive

expansive

construction-focused



---



Visitor B discovers:



Writing

Medicine

Trade

Religion



Their civilization becomes:



knowledge-focused

culturally rich

commercial

healthier



---



Visitor C discovers:



Architecture

Writing

Religion



Their civilization becomes:



monumental

scholarly

ritual-focused



Do not ask the visitor to choose a civilization type.



The identity should emerge from their behavior.



---



YOUR CIVILIZATION IDENTITY



At the end of the visit, generate a personalized civilization identity.



Examples:



The Builders' Kingdom



The Scholars' Egypt



The River Civilization



The Traders' Egypt



The Kingdom of Scribes



The Guardians of the Nile



The Monumental Kingdom



The identity should depend on what the visitor discovered most.



---



SCREEN 4 — CURRENT NEED



Do not call this "Quests".



Use:



CURRENT NEED



Example:



YOUR PEOPLE NEED TRADE



Why:



"Your farms produce more food than they can use."



Needed:



Trade Knowledge



Instruction:



"Find evidence of trade inside the museum."



Button:



START DISCOVERY



Keep this screen extremely simple.



---



SCREEN 5 — CIVILIZATION MEMORY



Add a simple screen called:



MY EGYPT



Show:



Large civilization preview.



Then:



68%

KNOWLEDGE RESTORED



Then 3 short metrics:



12

Artifacts Discovered



5

Knowledge Areas



4

Major Structures



Then:



CIVILIZATION IDENTITY



"The Builders' Kingdom"



Then:



"Your Egypt grew through architecture,

writing and government."



Keep it visual.



---



MAIN KNOWLEDGE AREAS



Use only 8 knowledge areas:



1. Agriculture

2. Writing

3. Architecture

4. Religion

5. Trade

6. Medicine

7. Government

8. Military



Each knowledge area needs:



- unique icon

- clear symbol

- clear visual behavior inside the city



Do not display all eight permanently.



Only show them when relevant.



---



VISUAL CAUSE AND EFFECT



The user should SEE what each knowledge type changes.



Examples:



AGRICULTURE

→ fields

→ irrigation

→ farmers

→ population growth



WRITING

→ scribes

→ papyrus

→ inscriptions

→ administration



ARCHITECTURE

→ stronger houses

→ temples

→ monuments



RELIGION

→ ritual areas

→ priests

→ temple activity



TRADE

→ marketplace

→ boats

→ merchants



MEDICINE

→ medical house

→ healthier population



GOVERNMENT

→ administrative buildings

→ organized city areas



MILITARY

→ guards

→ defenses

→ military structures



Visual change is more important than written explanation.



---



CITY STYLE



The civilization should feel like:



premium strategy-game visual clarity

+

museum-grade elegance

+

Ancient Egypt



Use an isometric visual style.



Not childish.



Not cartoon-heavy.



Not hyper-realistic.



Not too detailed.



The user must immediately understand:



what exists

what is unfinished

what has changed



Use faded silhouettes for future structures.



Example:



A future Temple appears faintly in the desert.



It tells the user:



"There is something here I can unlock."



---



VISUAL DESIGN



Use a premium Egyptian-inspired palette:



Sandstone

Papyrus

Ivory

Deep Charcoal

Muted Gold

Nile Blue



Gold should only represent:



important knowledge

major discoveries

completed structures



Avoid excessive gold.



Avoid cliché Egyptian decoration everywhere.



Do not place hieroglyphic borders around every card.



Keep UI modern.



Ancient Egypt should appear mainly through the civilization itself.



---



TYPOGRAPHY



Use a premium, modern sans-serif font.



Strong hierarchy.



Large short headings.



Minimal text.



The interface must remain readable while walking.



---



NAVIGATION



Avoid traditional 5-tab mobile navigation.



Keep the app centered around one experience.



Main navigation:



Living Egypt

Current Need

My Egypt



But ideally most actions happen directly from Living Egypt.



Primary button must always be:



DISCOVER



---



MICROINTERACTIONS



Use subtle effects:



- sand clearing from new areas

- buildings rising from the ground

- canals filling with water

- new citizens appearing

- scribes entering buildings

- boats beginning to move

- subtle gold pulse after discovery

- incomplete buildings becoming complete



Keep every animation short.



Do not make the visitor wait.



---



ARTIFACT PROTOTYPE DATA



Preload these artifacts:



1. 



Ancient Irrigation Tool

Knowledge:

Agriculture



2. 



Papyrus Fragment

Knowledge:

Writing



3. 



Temple Relief

Knowledge:

Religion



4. 



Stone Column Fragment

Knowledge:

Architecture



5. 



Trading Vessel

Knowledge:

Trade



6. 



Medical Papyrus

Knowledge:

Medicine



7. 



Royal Seal

Knowledge:

Government



8. 



Ancient Weapon

Knowledge:

Military



The SIMULATE SCAN button should cycle through these artifacts.



---



REQUIRED DEMO STORY



The prototype MUST support this exact demo:



START



The visitor sees a very incomplete civilization.



---



DISCOVERY 1



Visitor discovers:



Ancient Irrigation Tool



AGRICULTURE RESTORED



Return to civilization.



Fields grow.



Farmers appear.



Message:



"Your civilization can now grow food."



Then:



"But it cannot trade what it produces."



TRADE NEEDED



---



DISCOVERY 2



Visitor discovers:



Temple Relief



RELIGION RESTORED



A faded Temple silhouette appears.



Visitor taps it.



Show:



TEMPLE



Religion ✓

Architecture ○

Writing ○



Short message:



"Your people understand belief,

but they cannot build or preserve the temple yet."



---



DISCOVERY 3



Visitor discovers:



Stone Column Fragment



ARCHITECTURE RESTORED



Temple begins partial construction.



Then stops.



Show:



"The temple stands unfinished."



Writing ○



---



DISCOVERY 4



Visitor discovers:



Papyrus Fragment



WRITING RESTORED



Return to city.



Show:



scribes appearing

inscriptions forming

temple completing



Then:



TEMPLE RESTORED



This moment must feel visually impressive.



---



THEN TRIGGER A CIVILIZATION EVENT



After the Temple is completed:



Trigger:



THE SETTLEMENT IS GROWING



Show more people appearing.



Then:



"But no one knows how to organize a larger city."



GOVERNMENT KNOWLEDGE NEEDED



This proves that the civilization continues to generate new needs.



---



IMPORTANT UX RULE FOR EVENTS



Do not show popups constantly.



Use very short cinematic messages.



Example:



THE CITY IS GROWING



Then:



"We need to learn how Egyptians organized society."



Button:



FIND THE ANSWER



That is enough.



---



DO NOT BUILD



Do NOT create:



- chatbot-first interface

- manual city placement

- currency

- gems

- coins

- XP bars

- inventory

- resource management

- complicated statistics

- multiple game screens

- giant skill trees

- RPG quest menus

- leaderboards

- long history articles

- crowded maps

- unnecessary settings

- camera permission

- complicated authentication

- excessive text



This is not a mobile game that happens to be inside a museum.



This is a museum experience where the civilization responds to what the visitor learns.



---



FINAL PRODUCT FEELING



The visitor should understand this within seconds:



"I discover something in the real museum."



↓



"My civilization learns it."



↓



"I watch the civilization change."



↓



"The civilization now needs something else."



↓



"The answer exists somewhere inside the museum."



That is the entire magic.



---



EMOTIONAL LOOP



CURIOSITY



↓



DISCOVERY



↓



KNOWLEDGE



↓



VISIBLE CHANGE



↓



NEW NEED



↓



CURIOSITY



The visitor should always have a reason to look back at the real museum.



---



KEY PITCH MESSAGE



The experience should communicate:



"Most museum apps explain artifacts.



GEM: Bring Egypt Back to Life

makes artifacts change an entire civilization."



And:



"The museum is not the background of the game.



The museum is where the civilization gets its knowledge."



---



FINAL DESIGN GOAL



Create a highly visual, interactive, premium, presentation-ready hackathon prototype.



The most impressive parts must be:



1. the living civilization

2. visible cause-and-effect after artifact discovery

3. natural knowledge dependencies

4. civilization problems generated from missing knowledge

5. extremely simple museum-friendly UX

6. personalized civilization outcomes



The user should spend more time looking at the museum than looking at the phone.



The app should make them WANT to discover the next artifact.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6b2eff63-d6e8-491a-a726-b11f2ef094ed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
