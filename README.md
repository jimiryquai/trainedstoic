# Freedom Stack v2 (WIP)

> [!IMPORTANT]
> This project is still a work in progress. It's improving continuously and will be ready soon.
> Documentation for using this project is currently limited but will be expanded shortly.

I've learned a lot since the first iteration of [Freedom Stack](https://github.com/cameronapak/freedom-stack).

I've used it in many projects, including as a home screen launcher on an Android phone.

Here's what I'm thinking...

## Criteria for Freedom Stack v2

1. Must feel elementary/vanilla to use and be easy to learn
2. Must be affordable to host and maintain
3. Must be entirely self-hostable (if needed)
4. Must use well-maintained, actively developed packages to ensure long-term sustainability

## Stack

- [Astro](https://astro.build)
- [Alpine.js](https://alpinejs.dev) + [Alpine AJAX](https://alpine-ajax.js.org/)
- [TailwindCSS v4](https://tailwindcss.com/) + [Basecoat UI](https://basecoatui.com/)
- [Bknd](https://bknd.io)
- [Netlify](https://www.netlify.com), or host anywhere

## Install

Run the following command to install this stack on your machine, without the commit history of this repo.

```bash
npx degit https://github.com/cameronapak/freedom-stack-v2 my-project
```

## Setup

### Create User

```bash
npx tsx node_modules/.bin/bknd user create
```

### Run App

Using Node Version Manager?

```bash
nvm use
```

Install the packages.

```bash
npm install
```

Now, let's run the app!

```bash
npm run dev
```
