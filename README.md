# Pixi.JS Tasks
I made some tasks for trying powerful Pixi.JS game engine with ES6, NPM, and Webpack. You can access live demo at http://www.berkanuslu.com/pixijs/

## Tasks Informations
The test is split in 3 parts which should be accessed through an in-game menu. Performance will be checked on mobile (low/mid/high-end devices) plus desktop and should always be fullscreen.

1. Create 144 sprites (NOT graphics object) that are stack on each other like cards (so object above covers bottom one, but not completely). Every second 1 object from top of stack goes to other stack - animation of moving should be 2 seconds long. So at the end of whole process you should have reversed stack. Display number of fps in left top corner and make sure, that this demo runs well on mobile devices.

2. Create a tool that will allow mixed text and images in an easy way (for example displaying text with emoticons or prices with money icon). It should come up every 2 seconds a random text with images in random configuration (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random font size.

3. Particles - make a demo that shows an awesome fire effect. Please keep number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would use them in a real project.

## Used Technologies
- PixiJS 4.8.3
- NPM
- ES6 and Babel Compiler
- Webpack
- Webpack Dev Server

## Resources
I used some additional packages, library and program. All these are below.

- Kenney's Free BoardGame Pack (CC0 1.0 License) for Assets
https://www.kenney.nl/assets/boardgame-pack

- TexturePacker Free Version for Spritesheet Collection
https://www.codeandweb.com/texturepacker

- RevoltFX (MIT License) for Particle FX
https://github.com/bma73/revolt-fx
