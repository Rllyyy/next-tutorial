# Steps (Next.js, typescript, tailwindcss and cypress)

Using:

- Next.js 13
- React 18.2
- Typescript 4.9
- tailwind 3.2
- Cypress 12.2

## Create Next Project

1. `yarn create next-app project-name --typescript --eslint`

## Install Tailwind

1. `yarn add -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init -p`
3. Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
  },
  plugins: [],
};
```

4. Add tailwind to `./styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install Cypress

1. `yarn add cypress -D`
2. Add `"types": ["cypress"]` to compiler options in `tsconfig.json`
3. Add `baseUrl: "http://localhost:3000"` to `e2e` inside `cypress.config.ts`
