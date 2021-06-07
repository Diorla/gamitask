# File structure

## Atoms

This contains basic elements like "input" and "div". This is where intl.format will be implemented, to ensure translation is everywhere.I will use content for translation while children will be used for more complex content that won't be parsed by translation.

```ts
<Button content="clickMe"/>
<Button>Click me</Button>
```

So, if there's content, no children, something like this.

```ts
return <button>{content||children}<button/>
```

## Molecules

This contains one or more elements working as a functional unit e.g. label + input

## Compounds

This is also functional unit consisting of multiple atoms or molecules to serve a particular purpose e.g. the header, sidebar, layout etc. Unlike molecules, it doesn't have to contain related elements

## Containers

This is basically everything in a page. It will be named after the page. It ideally be stateless, just accepting props.
It may also contain `script` folder for every javascript function that only runs in that container

## Pages

Based on next.js. It represents different pages. It is where all the functions and states will be placed. It will also supply necessary props to the containers.

## Utils

These are functions that are used across multiple pages or in other places.

## Context

Well, context wrapper is created

# Internalisation

Always use camelCase for id to promote consistency, and the word that will be returned will be in titleCase

e.g. id="myFirstName" while the value returned will be "Adeola", myColor=Red

# Firebase Example

This is a simple set up for Firebase for client side applications.

The firebase app is initialized in `firebase/clientApp.js`, to use you just have to import it anywhere in the app

The React Context API is used to provide user state.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-firebase&project-name=with-firebase&repository-name=with-firebase)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-firebase with-firebase-app
# or
yarn create next-app --example with-firebase with-firebase-app
```

## Configuration

1. [Create a Firebase project](https://console.firebase.google.com/u/0/) and add a new app to it.
2. Create a `.env.local` file and copy the contents of `.env.local.example` into it:

```bash
cp .env.local.example .env.local
```

3. Set each variable on `.env.local` with your Firebase Configuration (found in "Project settings").

4. If you want to check the SSR page, get your account credentials from the Firebase console at _Project settings > Service accounts_, where you can click on _Generate new private key_ and download the credentials as a json file. Then set `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` in `.env.local`

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
