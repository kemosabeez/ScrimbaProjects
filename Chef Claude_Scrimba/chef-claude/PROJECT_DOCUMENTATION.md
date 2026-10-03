# Chef Claude: Current Project Documentation

## Project Status

- **Current implementation:** JavaScript and JSX
- **Framework:** React with Vite
- **Application type:** Client-side single-page application
- **TypeScript migration:** Planned for a future project; this codebase has not been migrated and this document does not make that change

All application source files currently use `.js`, `.jsx`, or CSS. There is no TypeScript source, `tsconfig.json`, or TypeScript build configuration. React type declaration packages are present as development dependencies, but that does not make the application TypeScript.

## Purpose

Chef Claude lets a user enter ingredients they have on hand, then requests a recipe suggestion from Google's Gemini generative AI API. The returned Markdown is rendered on a recipe page.

## User Flow

1. The home route (`/`) displays the Chef Claude header and ingredient form.
2. Submitting an ingredient appends it to the in-memory ingredient list.
3. Once there are more than three ingredients, the recipe prompt and **Get a recipe** button appear.
4. Selecting that button sends the ingredient list to Gemini.
5. The app navigates to `/recipe`, passing the generated text in React Router navigation state.
6. The recipe page renders the response as Markdown and provides a link back to the ingredient form.

The recipe route displays a fallback message when no recipe is present in navigation state. Ingredient and recipe data are held only in browser memory/navigation state; there is no database, account system, or browser persistence.

## Technology

- React and React DOM 19
- Vite 8 and `@vitejs/plugin-react`
- React Router DOM 7
- `@google/genai` for Gemini requests
- `react-markdown` for rendering the generated recipe
- ESLint with the React Hooks and React Refresh configurations
- CSS in `src/index.css`

The package also lists `dotenv` and React type declaration packages. The app's Vite client code reads its configured key through `import.meta.env`.

## Project Layout

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
├── public/
│   ├── chef-claude-icon.png
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx                     Routes for `/` and `/recipe`
│   ├── index.css                   Global and component styles
│   ├── main.jsx                    React entry point
│   ├── assets/                     Vite assets directory
│   └── pages/                      Present but currently empty
├── .env                            Local API key configuration (ignored by Git)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

`AI/`, `components/`, and the top-level `pages/` directory are outside `src/`; imports in the current app use those locations. `src/pages/` is empty and is not where the active recipe page currently lives.

## Main Modules

### `src/main.jsx`

Loads the global stylesheet, creates the React root, and renders `App` inside `StrictMode`.

### `src/App.jsx`

Defines the two client-side routes using `BrowserRouter`: `/` renders `Form`, and `/recipe` renders `ClaudeRecipePage`.

### `components/Form.jsx`

Stores ingredients with React state, appends submitted values, renders the ingredient list, and calls `generateRecipe`. The recipe control is shown after at least four ingredients have been added. The generated text is passed to the recipe route through `navigate` state.

### `components/IngredientsList.jsx`

Renders the provided ingredient list in a semantic unordered list with `aria-live="polite"`.

### `pages/ClaudeRecipePage.jsx`

Reads the recipe from React Router location state, renders it with `ReactMarkdown`, and handles the case where the route has no recipe state.

### `AI/ai.js`

Creates a Google GenAI client using `VITE_GEMINI_API_KEY`, joins the ingredient array, and requests Markdown recipe instructions from the configured Gemini model identifier `gemini-3.8-flash`. It returns the response text to the form component.

### `components/Header.jsx` and `src/index.css`

The header displays the app name and logo. The stylesheet contains the current global, ingredient form, list, recipe prompt, and error-class styles. Styling is plain CSS; there is no component styling framework.

## Local Setup

Use Node.js and npm. From the `chef-claude` directory:

```bash
npm install
```

Create a local `.env` file in that directory with the key expected by `AI/ai.js`:

```dotenv
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Do not commit `.env` or put a real key in source control. Restart the Vite dev server after changing environment variables.

## Available Commands

Run from `chef-claude`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

There is currently no test script or automated test suite configured in `package.json`.

## Current Boundaries and Follow-up Considerations

- Ingredient state is in memory only. Refreshing the home route clears it.
- Recipe output is carried in navigation state, not encoded in the URL or persisted. Refreshing or directly opening `/recipe` will show the no-recipe fallback.
- The current form does not provide ingredient removal, duplicate prevention, or visible validation for blank values.
- The recipe request path has no visible loading state or user-facing API error handling. Network, API-key, quota, or model errors may interrupt generation.
- `VITE_` environment variables are bundled for client-side use. The Gemini key can be inspected by users in a deployed client app; production use should move calls behind a server-side endpoint and keep the secret there.
- The recipe model identifier is currently hard-coded in `AI/ai.js`.
- The recipe page depends on React Router navigation state, so a copied `/recipe` URL does not include the recipe.
- There is no backend, persistence layer, authentication, or test suite in the current implementation.

These bullets describe the implementation as it exists; they are not changes made as part of the future TypeScript migration.

## Future TypeScript Migration Note

For the planned migration, convert the existing JavaScript/JSX modules to TypeScript/TSX, add and configure TypeScript for Vite, and type the ingredient state, form action, Gemini response, and route state. Preserve the current runtime behavior unless a separate feature change is intended. No TypeScript migration has been performed in this project at this time.