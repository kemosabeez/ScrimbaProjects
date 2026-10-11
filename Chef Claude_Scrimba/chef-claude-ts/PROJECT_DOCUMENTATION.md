# Chef Claude: TypeScript Migration Guide

## Project Status

- **JavaScript reference app:** `chef-claude/` contains the finished React/Vite implementation in JavaScript and JSX.
- **TypeScript app:** `chef-claude-ts/` is a separate React/Vite application that rebuilds Chef Claude with TypeScript and TSX.
- **Migration status:** Complete. The app builds and lints, and its main user flow and missing-recipe fallback have been checked manually in the browser.
- **Learning goal:** This document records the migration steps and concepts. The JavaScript reference remains available for comparison.

## Purpose and Target Behavior

Chef Claude lets a user enter ingredients, requests a recipe suggestion from Google's Gemini generative AI API, and renders the returned Markdown on a recipe page. The migration should preserve the reference app's behavior; improvements such as loading states or ingredient removal can be separate follow-up work.

### User flow to preserve

1. The home route (`/`) displays the Chef Claude header and ingredient form.
2. Submitting an ingredient appends it to the in-memory ingredient list.
3. Once there are at least four ingredients, the recipe prompt and **Get a recipe** button appear.
4. Selecting that button sends the ingredient list to Gemini.
5. The app navigates to `/recipe`, passing the generated text in React Router navigation state.
6. The recipe page renders the response as Markdown and provides a link back to the ingredient form.
7. Visiting `/recipe` without recipe state displays a fallback message.

Ingredient and recipe data are held only in browser memory/navigation state. There is no database, account system, or browser persistence in the reference app.

## Project Locations

### JavaScript reference: `chef-claude/`

Use this finished project to check behavior and compare one module at a time. Avoid changing it as part of the migration unless you intentionally want to change the reference behavior.

```text
chef-claude/
├── AI/
│   └── ai.js                       Gemini client and recipe generation
├── components/
│   ├── Form.jsx                    Ingredient state, form, and recipe request flow
│   ├── Header.jsx                  App header and logo
│   └── IngredientsList.jsx         Ingredient list presentation
├── pages/
│   └── ClaudeRecipePage.jsx        Recipe route and Markdown rendering
├── src/
│   ├── App.jsx                     Routes for `/` and `/recipe`
│   ├── index.css                   Global and component styles
│   └── main.jsx                    React entry point
├── .env                            Local API key configuration (ignored by Git)
└── package.json
```

`AI/`, `components/`, and `pages/` are outside `src/` in the JavaScript reference. The TypeScript app deliberately places its application modules under `src/`.

### TypeScript migration workspace: `chef-claude-ts/`

```text
chef-claude-ts/
├── public/
│   └── chef-claude-icon.png
├── src/
│   ├── AI/
│   │   └── ai.ts                   Typed Gemini client and recipe generation
│   ├── components/
│   │   ├── Form.tsx                Ingredient state, form, and recipe request flow
│   │   ├── Header.tsx              App header and logo
│   │   └── IngredientsList.tsx     Typed ingredient list presentation
│   ├── pages/
│   │   └── ClaudeRecipePage.tsx    Recipe route, state validation, and Markdown rendering
│   ├── App.tsx                     Routes for `/` and `/recipe`
│   ├── index.css                   Tailwind import and stylesheet
│   └── main.tsx                    TypeScript React entry point
├── .env                            Local API key configuration (ignored by Git)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json                   TypeScript project references
├── tsconfig.app.json               Browser-app TypeScript options
├── tsconfig.node.json              Node/Vite config TypeScript options
└── vite.config.ts                  Vite, React, and Tailwind configuration
```

## Migration Milestones

Work through the milestones in order. For each one, make the changes yourself, run the checks, and compare behavior with `chef-claude/`. The completion checks are intended to tell you whether you are ready to move on.

### Milestone 0 — Establish a clean baseline

**Goal:** Know which folder you are working in, what the starter currently does, and how to tell when the migration still builds.

**Steps**

1. Open a terminal in `chef-claude-ts/`, not the JavaScript reference folder.
2. Review `package.json`, `tsconfig.app.json`, `vite.config.ts`, and `src/main.tsx`.
3. Run `npm run dev` and inspect the Vite starter page. Stop the server when done.
4. Run `npm run build` and `npm run lint` to learn the starting results.
5. Keep the JavaScript app available for comparison. Make a note of any baseline errors before changing files.

**TypeScript concepts:** project configuration, `.ts` versus `.tsx`, compiler checks versus bundling, and the role of Vite.

**Completion check:** You can explain which folder is the source of truth for existing behavior and can run the starter's scripts successfully (or have recorded any pre-existing failure).

### Milestone 1 — Rebuild the app shell and static components

**Goal:** Replace the starter screen with the app structure and migrate components that need little or no application state.

**Steps**

1. Decide where the migrated `components/`, `pages/`, and `AI/` modules will live. Mirror the JavaScript layout or place them under `src/`.
2. Add `react-router-dom` for the route shell. Add `react-markdown` and `@google/genai` in the milestones where those integrations are migrated. Keep dependency versions aligned with the reference where practical.
3. Migrate `Header.jsx` to `Header.tsx`, then migrate `IngredientsList.jsx` to `IngredientsList.tsx`.
4. Give `IngredientsList` a clear prop type for its ingredient data. Prefer passing the underlying string array and building `<li>` elements inside this component rather than passing pre-rendered JSX, unless you intentionally preserve the existing interface.
5. Replace the Vite demo in `App.tsx` with the app shell and routes. Add the route dependency if it is not already installed.
6. Import the existing CSS and the correct header/logo assets. Confirm asset paths resolve from the new module locations.

**TypeScript concepts:** TSX, import paths, props, arrays, JSX element types, and why data props are usually easier to type and reuse than prebuilt JSX props.

**Completion check:** The starter screen is gone; the header, empty ingredient area, and route shell render; TypeScript and Vite can build the migrated files.

### Milestone 2 — Migrate ingredient state and form behavior

**Goal:** Recreate ingredient entry and conditional recipe controls with explicit, useful types.

**Steps**

1. Migrate `Form.jsx` to `Form.tsx` and connect it to the TypeScript `IngredientsList`.
2. Type the ingredient state as a list of strings. Think through why an empty array alone may not give TypeScript enough information about the eventual item type.
3. Inspect the form action's `formData` parameter and the return type of `formData.get("ingredients")`. Handle the fact that a form entry is not guaranteed to be a string before adding it to the ingredient list.
4. Type the state updater callback and preserve the existing append behavior.
5. Show the recipe prompt when there are four or more ingredients, matching the reference.
6. Keep the recipe button's handler ready to call the recipe service in a later milestone, or use a temporary typed placeholder while working on this milestone.

**TypeScript concepts:** `useState` generics and inference, union types such as `FormDataEntryValue | null`, narrowing with runtime checks, callback parameter types, and event/form action types.

**Completion check:** Ingredient submission appends valid strings, the list renders correctly, and the recipe prompt appears at the same threshold as the reference. Invalid or missing form values cannot silently enter state as if they were strings.

### Milestone 3 — Type the Gemini service

**Goal:** Port the recipe request behind a small, typed API boundary.

**Steps**

1. Migrate `AI/ai.js` to `AI/ai.ts` (or its chosen equivalent location).
2. Give `generateRecipe` an explicit ingredient parameter type and an explicit promise return type based on the SDK response you actually use.
3. Inspect the installed `@google/genai` types and determine whether `response.text` is a string, optional string, or another shape. Handle that accurately; do not assume an API response is always present.
4. Add the Gemini SDK dependency to the TypeScript workspace and recreate the client setup.
5. Declare the `VITE_GEMINI_API_KEY` environment type in a Vite declaration file if TypeScript reports that the environment property is unknown.
6. Keep the API key in the local `.env` file, ensure it stays ignored by Git, and do not place a real key in source code.

**TypeScript concepts:** function parameter and return types, `Promise<T>`, third-party declaration files, optional values, and augmenting `ImportMetaEnv`.

**Completion check:** The service compiles with no `any` escape hatch, accepts an ingredient string array, and has a deliberate policy for a missing API key or missing response text.

### Milestone 4 — Type recipe navigation state and Markdown

**Goal:** Complete both routes and safely consume the recipe data passed between them.

**Steps**

1. Migrate `ClaudeRecipePage.jsx` to `ClaudeRecipePage.tsx`.
2. Use the React Router location type to represent the navigation state that the app sends, rather than leaving it as an unexamined value.
3. Decide how the recipe page should handle absent or malformed route state. Preserve the reference fallback for no recipe, and narrow values before passing them to `ReactMarkdown`.
4. Migrate the `navigate` call in `Form.tsx` so the recipe is sent using the same state shape the recipe page expects.
5. Add `react-markdown` to the TypeScript workspace and verify the back link returns to `/`.

**TypeScript concepts:** external library types, optional properties, route state, runtime validation of values at application boundaries, and keeping producer/consumer types consistent.

**Completion check:** Clicking **Get a recipe** navigates with recipe text; the recipe is rendered as Markdown; opening `/recipe` without state displays the fallback; the back link returns home.

### Milestone 5 — Integrate, verify, and review the migration

**Goal:** Confirm the full TypeScript app preserves the JavaScript reference behavior and that the migration is complete.

**Steps**

1. Ensure `main.tsx` loads the stylesheet and renders the migrated `App` inside `StrictMode`.
2. Run `npm run build` and resolve TypeScript errors by understanding the values involved, not by suppressing checks or adding broad casts.
3. Run `npm run lint`.
4. Test the complete user flow in the browser: add ingredients, reach the four-ingredient threshold, request a recipe, render the response, and return home.
5. Test the missing-recipe route fallback and check that the API key is not committed or hard-coded.
6. Compare the observable behavior to the reference app. Record any intentional differences rather than silently changing behavior during a type migration.
7. Update this document's project status and layout after the migration is complete.

**TypeScript concepts:** interpreting diagnostics, avoiding `any` and unsafe assertions, type-checking as part of the build, and distinguishing type errors from runtime behavior.

**Completion check:** The TypeScript workspace builds and lints; the end-to-end flow and fallback work; and all migrated app modules are `.ts` or `.tsx` (CSS and static assets retain their existing extensions).

## Reference App Modules

Use these files to compare behavior during the corresponding milestones:

- `src/main.jsx` loads the global stylesheet, creates the React root, and renders `App` inside `StrictMode`.
- `src/App.jsx` defines the `/` and `/recipe` routes using `BrowserRouter`.
- `components/Form.jsx` stores ingredients, appends submitted values, and sends the generated recipe through navigation state.
- `components/IngredientsList.jsx` renders the ingredient list in a semantic unordered list with `aria-live="polite"`.
- `components/Header.jsx` displays the app name and logo.
- `pages/ClaudeRecipePage.jsx` reads recipe navigation state, renders Markdown, and handles the no-recipe case.
- `AI/ai.js` creates a Google GenAI client using `VITE_GEMINI_API_KEY`, joins the ingredient array, requests Markdown recipe instructions, and returns the response text.
- `src/index.css` contains the existing global and component styles.

## TypeScript Workspace Commands

Run from `chef-claude-ts/`:

| Command | Purpose |
| --- | --- |
| `npm install` | Install the dependencies declared by the TypeScript workspace |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run the TypeScript project build, then create the Vite production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the workspace |

The TypeScript workspace's `build` command runs `tsc -b && vite build`. There is currently no test script or automated test suite configured.

## Environment and Security Notes

The TypeScript app reads `VITE_GEMINI_API_KEY` from its local `.env` file. Configure a separate local `.env` in `chef-claude-ts/`:

```dotenv
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Do not commit `.env` or put a real key in source control; `.env` is listed in `.gitignore`. Restart the Vite dev server after changing environment variables. Vite exposes `VITE_` variables in client-side code, so a deployed Gemini key can be inspected by users. Production use should move the API call behind a server-side endpoint and keep the secret on the server; that is outside the scope of this learning migration.

## Migration Completion Summary

- `npm run build` and `npm run lint` pass in `chef-claude-ts/`.
- Manual browser checks confirmed ingredient entry, the four-ingredient recipe prompt threshold, Gemini recipe generation, recipe navigation and Markdown display, the back link, and the missing-recipe fallback.
- The TypeScript app keeps its header visible on both routes, unlike the JavaScript reference, where the header is rendered as part of the home form. The TypeScript form also uses slightly different ingredient placeholder and heading text. These presentation differences were reviewed during the comparison milestone.
- Navigation state is runtime-checked before recipe text is rendered. Ingredient data remains in memory, and route state is not persisted across refreshes.

## Existing Behavior and Known Limitations

These describe the JavaScript reference app. Preserve them during the migration unless a separate feature change is intended:

- Ingredient state is in memory only. Refreshing the home route clears it.
- Recipe output is carried in navigation state, not encoded in the URL or persisted. Refreshing or directly opening `/recipe` shows the no-recipe fallback.
- The form does not provide ingredient removal, duplicate prevention, or visible validation for blank values.
- The recipe request path has no visible loading state or user-facing API error handling. Network, API-key, quota, or model errors may interrupt generation.
- The recipe model identifier is hard-coded in the Gemini service (`AI/ai.js` in the reference and `src/AI/ai.ts` in the TypeScript app).
- There is no backend, persistence layer, authentication, or test suite in the reference app.
