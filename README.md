<h1 align="center">GitHub Search Engine - Repositories by users</h1> <br>
<p align="center">
  <img alt="GitHub Search Engine" title="anna esteve mvst challenge" src="https://firebasestorage.googleapis.com/v0/b/lemoninfilm.appspot.com/o/github_desktop.jpg?alt=media&token=7beb7df6-7b75-4892-9a36-583ba143607c" width="600">
</p>

<div align="center">
  <img src="https://www.svgrepo.com/show/327388/logo-react.svg" width="60" height="60">
  <img src="https://www.svgrepo.com/show/374146/typescript-official.svg" width="60" height="60">
  <img src="https://www.svgrepo.com/show/354430/tailwindcss.svg" width="60" height="60">
  <img src="https://www.svgrepo.com/show/353834/graphql.svg" width="60" height="60">
</div>
<p align="center"> Built with React, Typescript, Tailwind and more.</p>

## 🖥️ Live Demo

Here is a working live demo : https://github-repository-search-engine.vercel.app/

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Built with](#built-with)
- [Getting started](#getting-started)
- [Future improvements](#future-improvements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a name="introduction"></a>

## 📋 Introduction

This project is a search engine for users and their corresponding repositories that are hosted on GitHub.
Its operation is very simple: enter a username in the search bar and explore the different repositories. You can filter them by programming language or even by name!

**Responsive design**

<p align="center">
  <img src = "https://firebasestorage.googleapis.com/v0/b/lemoninfilm.appspot.com/o/github_mobile.jpg?alt=media&token=e6e73b78-70c3-4d62-8726-ed3cc8132658" width=700>
</p>

<a name="features"></a>

## 💡 Features

This project has some interesting features that I want to highlight:

#### Fetch data: GraphQL API

- All the info related to the users is taken from the <a href="https://docs.github.com/en/graphql">GitHub GraphQL API</a>.
- This info is obtained through _fetch API_ and _promises_ methods
- It was necessary to consult the documentation to find the suitable methods for getting the data. For more information, follow this link:
  https://docs.github.com/en/graphql/guides/forming-calls-with-graphql

### Search engine

- The search engine **only works when the Search button is clicked**. This is to avoid overloading the app. With a real-time search engine, many unnecessary requests would be executed. 
- Clicking the Search button will trigger the fetching of the users information and their repositories will be immediately rendered
- The search engine can be accessed by pressing the **`/`** key. Try it!
- To search for a user, you can either **press the Search button** or **hit the enter key**.


<a name="built-with"></a>

## 🛠️ Built with

List of technologies used to develop this app:

- <a href="https://react.dev/">React Js</a>
- <a href="https://vitejs.dev/">Vite</a> for starting the file system
- <a href="https://www.typescriptlang.org/">Typescript</a> just to add the app an extra strength 
- <a href="https://tailwindcss.com/">Tailwind CSS</a> for styling
- The <a href="https://nextui.org/">Next UI</a> library is used for rendering some tootlips
- The <a href="https://sonner.emilkowal.ski/">Sonner library</a> is used for **toast notifications**
- Docs generated with <a href="https://typedoc.org/">Typedoc</a>


<a name="getting-started"></a>

## 🔨 Getting started

- Fork the repo
- Clone the repo: `git clone https://github.com/annalemonbcn/github-repository-search-engine.git`
- Navigate into the project files
- Open with VSC
- Install dependencies: `npm i`
- Run the app: `npm run dev`
- Open the live in your port: http://localhost:5173/
- Or check the **live demo**: https://github-repository-search-engine.vercel.app/
- Enjoy :)

<a name="final-conclusions"></a>

## 🙏🏻 Future improvements

What's coming next?
- Implement Storybook
- Implement testing

Enjoy :)