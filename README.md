# CSARCH2 Virtual Exhibit — Historical Cryptography: The Enigma Machine

**Group members:** [Clave, Benjamin; Co, Stephen; Go, Timothy; Wang, Shao Wei]

---

## 1. Website

An interactive exhibit on WW2 cryptography, centered on the Enigma machine.
Visitors read about how the Enigma cipher worked and how it was first broken
by Polish cryptologists in the 1930s, then use a working in-browser Enigma
simulator to encode and decode their own messages through a series of guided
challenges.

**Live site:** https://shaocodes.github.io/virtual_exhibit_g1/

---

## 2. Original Proposal

Group’s Topic Theme: The evolution of cryptography

During WW2, Germany had the “Enigma Machine”. It was a cipher device used to encode strategic military messages. The allies thought it to be indecipherable which severely hindered Allies’ efforts. Fortunately for them, the Enigma code was first broken by the Poles using the Bombe, under the leadership of mathematician Marian Rejewski, in the early 1930s.

Tech Stack Plan

Enigma
Users will interact with a simplified Enigma-like machine. The interactive parts of the machine will be the 26-button keyboard and the rotors. The machine operates as a basic finite-state substitution cipher. It maps an input character from a 26-letter alphabet to an output character through a series of permutations.

The Rotor (R) will be represented by an array size 26 containing a randomized permutation of the alphabet. The State (s) is an integer variable representing the current rotational position of the machine. The Reflector (T) is a hardcoded key-value dictionary that consists of disjoint transpositions wherein it is guaranteed that no character maps to itself.

Proposed Interactive Element
To entice students, a challenge will be introduced. Students will have to learn through guided simulations in order to solve the challenge. The first part consists of typing “AAAAAA” for students to deduce that the wiring changes. The second task would ask the user to type a word, copy the scrambled output, reset the starting state, and paste the output back in. This is where the students find out that the encryption and decryption states are a two-way street. Finally, the challenge would play out as if we were Allies encrypting a message from Nazi Germany. We would tell the user that we intercepted XQMP and the student is tasked with finding the state and deciphering the message to relay back to headquarters.

---

## 3. Development Log (Incremental)

### [06/20/26] — Initial scaffolding

- Set up the Astro + MDX + React template and confirmed the dev server
  (`npm run dev`) rendered the homepage and a basic exhibit page correctly.
- **Aha moment:** realized Astro renders React components as static HTML by
  default — nothing is interactive until you add a `client:` directive
  (`client:load`, `client:visible`, `client:idle`). Forgetting this made our
  first component look "dead" even though the code was correct.
- **Challenge:** understanding the difference between `.astro` components
  (server-rendered, no interactivity) and `.jsx` components (React, can hold
  state). Decided to use `.astro` for static layout pieces like
  `TextWithImage` and `.jsx` for anything the visitor needs to click through,
  like the distro quiz and image gallery.

### [06/25/26] — Building the interactive components

- Built `ImageGallery.jsx` as a single-photo carousel with keyboard
  navigation (arrow keys) in addition to on-screen buttons.
- **Creative choice:** used `translateX` with a CSS transition instead of
  swapping the `<img>` src on each click, so the slide animation feels
  smoother and photos don't "pop" between states.
- Built `DistroQuiz.jsx` as a scored, multi-step quiz. Modeled the scoring as
  a plain data object (`answer id -> distro points`) so that non-technical
  teammates could add/edit questions without touching the component logic.
- **Challenge:** keeping quiz state (current step, answers so far, selected
  option) correctly separated into three different `useState` calls rather
  than one big object — this made it much easier to reset only the parts
  that needed resetting when the user clicked "Retake quiz."

### [06/30/26] — Enigma simulator

- Implemented a simplified Enigma cipher simulator (`EnigmaSimulator.jsx`)
  using a single rotor + hardcoded reflector, rather than the historically
  accurate three-rotor + plugboard setup, to keep the interaction
  approachable for visitors with no cryptography background.
- **Aha moment:** the reflector is what makes Enigma symmetric — the same
  settings that encrypt a message will also decrypt it. Once we understood
  that, we designed the "Two-Way Street" challenge in `the_enigma.mdx`
  specifically to let visitors discover that property themselves instead of
  just reading about it.
- **Challenge:** deciding how much historical accuracy to sacrifice for
  usability. A "correct" Enigma simulation would need three rotors with
  configurable wiring and a plugboard, which felt like too much cognitive
  load for a quick interactive demo — we opted for a simplified model and
  were explicit in the writeup that it's simplified.

### [07/07/26] — Citations and references

- Added a References section to each exhibit page listing sources for
  historical/technical claims (e.g. Marian Rejewski's role in breaking
  Enigma, dates, and the Polish Cipher Bureau's contributions), rather than
  citing inline, to keep the prose readable while still being verifiable.

### [07/07/26] — Polish and accessibility pass

- Final check: ran `npm run build` locally to confirm the production build
  succeeds before deploying, since some MDX/JSX issues only surface at build
  time and not in the dev server.

### [07/22/26] - Improved the overall ui
- Refined the overall visual design for a cleaner and more consistent interface.
- Improved layout spacing, alignment, and typography across the exhibit.
- Enhanced the styling of interactive components for better usability.
- Updated the color palette and component styling to improve readability and accessibility.
- Polished the simulator interface with improved progress indicators, challenge cards, and success overlays.
- Applied consistent styling across all exhibit sections for a more cohesive user experience.

---

## 4. Credits / Sources

Distro logos and Tux mascot image sourced as credited in the References
section at the bottom of `linux.mdx`. Historical claims about the Enigma
machine and its codebreaking are sourced in the References section at the
bottom of `the_enigma.mdx`. No AI-generated images or third-party code
libraries beyond what's declared in `package.json` were used.

## 5. Disclosure on the use of AI/LLM
No aritificial intelligence (AI) or large language model (LLM) tools were used in the development, writing, design, implementation of this project
