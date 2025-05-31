# Freedom Stack v2 (WIP)

I've learned a lot since the first iteration of Freedom Stack.

I've used it in many projects, including as a home screen launcher on an Android phone. 

Here's what I'm thinking...

- [x] Astro
- [x] AlpineJS + Alpine AJAX
- [x] TailwindCSS + Basecoat UI ~~(Or, Franken UI)~~
- [ ] Convex
- [ ] ~~Convex Auth~~ (Or, Better Auth)

Rules:
- Must be affordable tech
- Must feel elementary/vanilla to use and be easy to learn
- Must be entirely self-hostable (if needed)

## Setup

Using Node Version Manager? 

```bash
nvm use
```

Install the packages.

```bash
npm install
```

First time? Setup your Convex instance:

```bash
npm run convex:dev
```

Now, let's run the app!

```bash
npm run dev
```

## Developing with Cursor

From `Cursor Settings` > `Features` > `Docs` add new doc, add the following URLs one at a time:
1. "https://docs.convex.dev"
2. "https://basecoatui.com"
3. "https://alpinejs.dev"
4. "https://docs.astro.build"

## FAQ

Q: Why not use Convex Auth? 

_"Convex Auth currently supports client-side React web apps served from a CDN and React Native mobile apps ([Convex](https://docs.convex.dev/auth/convex-auth))."_ Since we're not using React in our Astro app, we can't use Convex Auth at this time. 
