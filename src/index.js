import Game from './Game';

document.addEventListener('DOMContentLoaded', async function () {

        //Game starts from here
        let game = new Game();
        await game.load();

}, false);