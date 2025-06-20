import * as PIXI from 'pixi.js';
import { noop as _noop } from 'lodash/util';
import Stage from './Stage';

const BACKGROUND_COLOR = 0x64b0ff;

class Game {
        /**
         * Game Constructor
         * @returns {Game}
         */
        constructor() {
                this.spritesheet = 'assets/spritesheetcollection.json';
                this.app = new PIXI.Application();

                return this;
        }

        async load() {
                // Load assets individually using PixiJS v8 Assets API
                await PIXI.Assets.load(this.spritesheet);

                // Initialize the application
                await this.app.init({ 
                        background: BACKGROUND_COLOR, 
                        resizeTo: window, 
                        antialias: true,
                        resolution: window.devicePixelRatio || 1,
                        autoDensity: true
                });

                // Append the application canvas to the document body
                document.body.appendChild(this.app.canvas);
                
                this.timer = 0;

                this.gameStage = new Stage({
                        spritesheet: this.spritesheet
                });

                this.app.stage.addChild(this.gameStage);

                this.resizeWindow();
                this.bindEvents();
                
                // Use the ticker for the update loop
                this.app.ticker.add((time) =>
                {
                         // deltaTime is provided by the ticker
                        this.timer += time.deltaTime * 16; // Convert to milliseconds

                        this.gameStage.animate();
                        this.gameStage.tickTask2Timer();

                        if (this.timer >= 1000) {
                                this.timer = 0;

                                this.gameStage.addSpriteToReversedArray();
                        }
                });
        }

        bindEvents() {
                window.addEventListener('resize', this.resizeWindow.bind(this));
        }

        resizeWindow() {
                this.app.resize(window.innerWidth, window.innerHeight);
        }
}

export default Game;