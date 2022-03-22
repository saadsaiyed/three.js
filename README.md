# Three.js

## Introduction

Live Links: [Stable-Version](https://saadsaiyed.com), [Most-Recent-Commit](https://saadsaiyed.com/test)

The main intention of this project is to explore the capabilities of [three.js](https://threejs.org/). Three.js is a JavaScript library which uses WebGL to perform heavy animations over your web browser. I'm using it for seamless animation to better represent my self on my portfolio. Although I'm not very much into graphic designing and animation but, three.js takes care of most of those stuff for me.

## How to use

The project was build with [`vite 2.6.0`](https://vitejs.dev/) package manager

### Installation Dependencies

- [Node Package Manager](https://www.npmjs.com/) - npm (Node.js)
- [Git](https://git-scm.com/)

### Quick Start

Run following code on your working directory terminal

``` cmd
git clone https://github.com/saadsaiyed/three.js.git
cd three.js
npm install
npm run dev
```

### Steps

- Run this command in your workspace terminal.

 `git clone https://github.com/saadsaiyed/three.js.git`

- You will have a folder created in your working directory named `three.js`. Make sure you are inside that folder using,

 `cd ./three.js`

- In order to install all the dependencies, perform

 `npm install`

- To run the code, you can use

 `npm run dev`

> Vite has a functionality to perform hot reload. I can even test my app live on my phone while its being developed with hot reload because it hosts to the local network.

## Documentation

The documentation might not be in much depth but I'm sure the code itself is pretty self explanatory. I've tried using all the industry standard semantics and code organization.

### File Tree Structure
```
📦three.js
 ├───── 📂builds
 │  ├───── 📂v1.0
 │  │  ├───── 📂assets
 │  │  │  ├───── 📜favicon.17e50649.svg
 │  │  │  ├───── 📜index.0a486427.css
 │  │  │  ├───── 📜index.986573ee.js
 │  │  │  ├───── 📜index.af85e47a.js
 │  │  │  ├───── 📜index.c3dc2b84.js
 │  │  │  ├───── 📜index.caf8b167.css
 │  │  │  ├───── 📜index.faf82e73.js
 │  │  │  ├───── 📜vendor.61fc2e5c.js
 │  │  │  ├───── 📜vendor.85fd05be.js
 │  │  │  └───── 📜vendor.bf943acc.js
 │  │  └───── 📜index.html
 │  └───── 📂v1.1
 │     ├───── 📂assets
 │     │  ├───── 📜index.fecb1738.css
 │     │  ├───── 📜index.fef8051d.js
 │     │  └───── 📜vendor.d107c8ae.js
 │     └───── 📜index.html
 ├───── 📂static
 │  └───── 📂fonts
 │     ├───── 📜gentilis_bold.typeface.json
 │     ├───── 📜gentilis_regular.typeface.json
 │     ├───── 📜helvetiker_bold.typeface.json
 │     ├───── 📜helvetiker_regular.typeface.json
 │     ├───── 📜LICENSE
 │     ├───── 📜optimer_bold.typeface.json
 │     ├───── 📜optimer_regular.typeface.json
 │     └───── 📜README.md
 ├───── 📂textures
 │  ├───── 📜Carbon.png
 │  ├───── 📜Carbon_Normal.png
 │  ├───── 📜roughness_map.jpg
 │  ├───── 📜Scratched_gold_01_1K_AO.png
 │  └───── 📜transition6.png
 ├───── 📜.gitignore
 ├───── 📜function.js
 ├───── 📜index.html
 ├───── 📜main.js
 ├───── 📜package-lock.json
 ├───── 📜package.json
 ├───── 📜README.md
 ├───── 📜style.css
 └───── 📜text.html
```
