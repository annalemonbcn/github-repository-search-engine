<h1 align="center">GitHub Search Engine - Repositories by users</h1> <br>
<p align="center">
  <img alt="GitHub Search Engine" title="anna esteve mvst challenge" src="https://firebasestorage.googleapis.com/v0/b/lemoninfilm.appspot.com/o/se_01.jpg?alt=media&token=a2e459a3-cd15-4184-8637-2ed156e77da1" width="600">
</p>

<div align="center">
  <img src="https://www.svgrepo.com/show/327388/logo-react.svg" width="60" height="60">
  <img src="https://www.svgrepo.com/show/374146/typescript-official.svg" width="60" height="60">
  <img src="https://www.svgrepo.com/show/354430/tailwindcss.svg" width="60" height="60">
</div>
<p align="center"> Built with React, Typescript, Tailwind and more.</p>

## 🖥️ Live Demo

Here is a working live demo : https://mvst-challenge-anna-esteve.vercel.app/

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
Its operation is very simple: enter a username in the search bar and explore the different repositories. And you can even filter them by programming language!

**Responsive design**

<p align="center">
  <img src = "https://firebasestorage.googleapis.com/v0/b/lemoninfilm.appspot.com/o/se_02.jpg?alt=media&token=235f0f12-fd23-4d98-9864-07fb12bb5025" width=700>
</p>

<a name="features"></a>

## 💡 Features

This project has some interesting features that I want to highlight:

#### Fetch data

- All the info related to the users is taken from the <a href="https://docs.github.com/en/rest/">GitHub REST API</a>.
- This info is obtained through _fetch API_ and _promises_ methods
- It was necessary to consult the documentation to find the suitable methods for getting the data. For more information, follow this link:
  https://docs.github.com/en/rest?apiVersion=2022-11-28

### Search engine

- The search engine **only works when the Search button is clicked**. This is to avoid overloading the app. With a real-time search engine, many unnecessary requests would be executed. 
- The response is immediately rendered in the app.
- The search engine can be accessed by pressing the **`/`** key. Try it!
- To search for a user, you can either **press the Search button** or **hit the enter key**.


<a name="built-with"></a>

## 🛠️ Built with

List of technologies used to develop this app:

- <a href="https://react.dev/">React Js</a>
- <a href="https://create-react-app.dev/">Create React App</a> for starting the file system
- <a href="https://www.typescriptlang.org/">Typescript</a> just to add the app an extra strength 
- <a href="https://tailwindcss.com/">Tailwind CSS</a> for styling
- The <a href="https://sonner.emilkowal.ski/">Sonner library</a> is used for **toast notifications**


<a name="getting-started"></a>

## 🔨 Getting started

- Fork the repo
- Clone the repo: `git clone https://github.com/annalemonbcn/mvst-challenge-anna-esteve`
- Navigate into the project files
- Open with VSC
- Install dependencies: `npm i`
- Run the app: `npm start`
- Open the live in your port: http://localhost:3000/
- Or check the **live demo**: https://mvst-challenge-anna-esteve.vercel.app/
- Enjoy :)

<a name="final-conclusions"></a>

## 🙏🏻 Future improvements

What's coming next?
- Introduce more filters: sort by name, sort by new to old...
- Implement GraphQL for making the requests
- Implement Storybook
- Components testing

Enjoy :)