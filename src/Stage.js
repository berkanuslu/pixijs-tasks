import * as PIXI from 'pixi.js';
import Hud from './Hud';
import Card from './Card';

const MAX_X = window.innerWidth;
const MAX_Y = window.innerHeight;

const HUD_POSITIONS = {
	RIGHT_TOP_CORNER: new PIXI.Point(MAX_X - 125, 20),
	RIGHT_BOTTOM_CORNER: new PIXI.Point(MAX_X - 10, MAX_Y - 20),
	CENTER: new PIXI.Point(MAX_X * 0.50, MAX_Y * 0.50),
	CENTER_TOP: new PIXI.Point(MAX_X * 0.50 - 100, 10),
	TASK1_BUTTON: new PIXI.Point(MAX_X * 0.50 - 125, MAX_Y * 0.35),
	TASK2_BUTTON: new PIXI.Point(MAX_X * 0.50 - 125, MAX_Y * 0.50),
	TASK3_BUTTON: new PIXI.Point(MAX_X * 0.50 - 125, MAX_Y * 0.65),
	LEFT_TOP_CORNER: new PIXI.Point(MAX_X * 0.01, 20),
	LEFT_BOTTOM_CORNER: new PIXI.Point(10, MAX_Y * 0.95)
};

class Stage extends PIXI.Container {

	/**
	 * Stage Constructor
	 * Container for the game
	 * @param opts
	 * @param opts.spritesheet - The path to the spritesheet file
	 */
	constructor(opts) {
		super();
		this.spritesheet = opts.spritesheet;
		this.maggot_texture = opts.maggot_texture;
		this.hud = new Hud();

  		this.particleContainer = new PIXI.Container();
		this.maggots = [];
		this.tick = 0;

		this._initStage();
	}

	/**
	 * _initStage
	 * Private method that adds all of the elements to the scene
	 * @private
	 */
	_initStage() {
		this.addChild(this.hud);

		this.selectedTask = -1;

		this.hud.addText('welcome', {
			text: 'Welcome to PixiJS Tasks',
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '18px',
				align: 'left',
				fill: 'white'
			},
			position: HUD_POSITIONS.CENTER_TOP,
			anchor: {
				x: 0,
				y: 0
			}
		});

		this.addFPSText();

		this.addTaskButtons();
	}

	refreshStage() {
		this.hud.removeChildren(0);
		this.removeChildren(0);
		this._initStage();
	}

	addFPSText() {
		this.hud.addText('fps', {
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '32px',
				align: 'left',
				fill: 'white'
			},
			position: HUD_POSITIONS.LEFT_TOP_CORNER,
			anchor: {
				x: 0,
				y: 0
			}
		});
	}

	setFPSText(val) {
		if (this.hud.fpsTextBox)
			this.hud.fpsTextBox.text = val;
	}

	addBackToMenuButton() {
		this.hud.addButtonContainer('returnBack', {
			spriteName: 'dieRed6.png',
			spritesheet: this.spritesheet,
			position: HUD_POSITIONS.RIGHT_TOP_CORNER,
			text: 'Back to Menu',
			anchor: {
				x: 0.5,
				y: 0
			},
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '25px',
				align: 'left',
				fill: 'white'
			},
			textMargin: 0,
			textAllignment: -1
		}, this.onBackToMenuButton);
	}

	onBackToMenuButton() {
		switch (this.parent.parent.selectedTask) {
			case 1:
				this.parent.parent.stopTask1();
				break;
			case 2:
				this.parent.parent.stopTask2();
				break;
			case 2:
				this.parent.parent.stopTask3();
				break;
			default:
				break;
		}
		this.parent.parent.refreshStage();
		this.removeChildren(0);
	}

	addTaskButtons() {
		this.hud.addButtonContainer('task1', {
			spriteName: 'dieWhite1.png',
			spritesheet: this.spritesheet,
			position: HUD_POSITIONS.TASK1_BUTTON,
			text: 'Task 1',
			anchor: {
				x: 0.5,
				y: 0.5
			},
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '25px',
				align: 'left',
				fill: 'black'
			}
		}, this.onTask1ButtonDown);

		this.hud.addButtonContainer('task2', {
			spriteName: 'dieWhite2.png',
			spritesheet: this.spritesheet,
			position: HUD_POSITIONS.TASK2_BUTTON,
			text: 'Task 2',
			anchor: {
				x: 0.5,
				y: 0.5
			},
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '25px',
				align: 'left',
				fill: 'black'
			}
		}, this.onTask2ButtonDown);

		this.hud.addButtonContainer('task3', {
			spriteName: 'dieWhite3.png',
			spritesheet: this.spritesheet,
			position: HUD_POSITIONS.TASK3_BUTTON,
			text: 'Task 3',
			anchor: {
				x: 0.5,
				y: 0.5
			},
			textStyle: {
				fontFamily: 'Arial',
				fontSize: '25px',
				align: 'left',
				fill: 'black'
			}
		}, this.onTask3ButtonDown);
	}

	onTask1ButtonDown() {
		this.parent.parent.addBackToMenuButton();
		this.parent.parent.startTask1();
		this.parent.parent.removeAllTaskButtons();
	}

	onTask2ButtonDown() {
		this.parent.parent.addBackToMenuButton();
		this.parent.parent.startTask2();
		this.parent.parent.removeAllTaskButtons();
	}

	onTask3ButtonDown() {
		this.parent.parent.addBackToMenuButton();
		this.parent.parent.startTask3();
		this.parent.parent.removeAllTaskButtons();
	}

	removeAllTaskButtons() {
		this.hud.task1Container.removeChildren(0);
		this.hud.task2Container.removeChildren(0);
		this.hud.task3Container.removeChildren(0);
	}

	startTask1() {
		this.selectedTask = 1;
		this.sprites = [];
		this.reversedSprites = [];
		this.spritePositions = [];
		this.cardCollection = [];

		let spritePadding = 0;
		//create 144 sprites and store in sprites array
		for (var i = 0; i < 144; i++) {
			//there aren't 144 different images, return back to starting positions in every 53 icons
			let index = (i > 52 ? i - 53 : i);
			index = (index > 52 ? index - 53 : index);

			let sprite = new PIXI.Sprite(PIXI.Assets.get(this.spritesheet).textures['card' + index + '.png']);
			sprite.position.set(150, 50 + spritePadding);
			spritePadding += 5; // add some padding
			this.sprites.push(sprite);
			this.spritePositions.push(sprite.position);
			this.addChild(sprite);
		}

		this.spritePositions.reverse(); //reverse all positions because reversed array will use this positions
	}

	addSpriteToReversedArray() {
		if (this.sprites) {
			if (this.sprites.length > 0) {
				let lastSprite = this.sprites[this.sprites.length - 1];

				//store last sprite from first sprite array in Card object
				//the card object includes startPosition and expectedPosition for move animation with move duration
				let card = new Card();
				card.sprite = lastSprite;
				card.startPosition = lastSprite.position;
				card.expectedPosition = this.spritePositions[this.reversedSprites.length];
				card.moveDuration = 2 * 1000;
				this.cardCollection.push(card);

				this.sprites.pop();
				this.reversedSprites.push(lastSprite);

				this.addChild(lastSprite);
			}
		}
	}

	animate() {
		if (this.cardCollection) {
			for (let card of this.cardCollection) {
				card.move(16); // Fixed 60 FPS timing
			}
		}
	}

	stopTask1() {
		this.selectedTask = -1;
		this.sprites = [];
		this.reversedSprites = [];
		this.spritePositions = [];
		this.cardCollection = [];
	}

	startTask2() {
		this.selectedTask = 2;
		this.randomContainerTimer = 0;
		this.randomContainerDuration = 2 * 1000;

		if (this.hud.randomContainer)
			this.hud.randomContainer.removeChildren(0);

		this.hud.addRandomContainer("random", {
			spritesheet: this.spritesheet,
			position: HUD_POSITIONS.CENTER
		});
	}

	tickTask2Timer() {
		if (this.randomContainerDuration > 0) {
			this.randomContainerTimer += 16; // Fixed 60 FPS timing
			if (this.randomContainerTimer >= this.randomContainerDuration) {
				this.startTask2();
			}
		}
	}

	stopTask2() {
		this.selectedTask = -1;
		this.randomContainerTimer = 0;
		this.randomContainerDuration = 0;
		this.hud.randomContainer.removeChildren(0);
	}

	startTask3() {
		this.selectedTask = 3;
		
		// Create content container with modern positioning
		const content = new PIXI.Container();
		content.position.set(window.innerWidth * 0.25, window.innerHeight * 0.25);
		this.addChild(content);

		this.maggots = [];
		this.particleContainer = new PIXI.Container();
		
		const totalSprites = 10000;

		const dudeBoundsPadding = 500;
		this.dudeBounds = new PIXI.Rectangle(
				-dudeBoundsPadding,
				-dudeBoundsPadding,
				window.innerWidth + dudeBoundsPadding * 2,
				window.innerHeight + dudeBoundsPadding * 2,
		);

		for (let i = 0; i < totalSprites; i++) {
			// Create a new maggot Sprite
			const dude = new PIXI.Sprite(this.maggot_texture);

			// Set the anchor point so the texture is centerd on the sprite
			dude.anchor.set(0.5);

			// Different maggots, different sizes
			dude.scale.set(0.8 + Math.random() * 0.3);

			// Scatter them all
			dude.x = Math.random() * window.innerWidth * 0.5;
			dude.y = Math.random() * window.innerHeight * 0.5;

			dude.tint = Math.random() * 0x808080;

			// Create a random direction in radians
			dude.direction = Math.random() * Math.PI * 2;

			// This number will be used to modify the direction of the sprite over time
			dude.turningSpeed = Math.random() - 0.8;

			// Create a random speed between 0 - 2, and these maggots are slooww
			dude.speed = (2 + Math.random() * 2) * 0.2;

			dude.offset = Math.random() * 100;

			// Finally we push the dude into the maggots array so it it can be easily accessed later
			this.maggots.push(dude);

			this.particleContainer.addChild(dude);
		}

		content.addChild(this.particleContainer);
	}

	tickTask3Timer() {
		// Iterate through the sprites and update their position
		for (let i = 0; i < this.maggots.length; i++) {
				const dude = this.maggots[i];

				dude.scale.y = 0.95 + Math.sin(this.tick + dude.offset) * 0.05;
				dude.direction += dude.turningSpeed * 0.01;
				dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
				dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
				dude.rotation = -dude.direction + Math.PI;

				// Wrap the maggots
				if (dude.x < this.dudeBounds.x) {
						dude.x += this.dudeBounds.width;
				} else if (dude.x > this.dudeBounds.x + this.dudeBounds.width) {
						dude.x -= this.dudeBounds.width;
				}

				if (dude.y < this.dudeBounds.y) {
						dude.y += this.dudeBounds.height;
				} else if (dude.y > this.dudeBounds.y + this.dudeBounds.height) {
						dude.y -= this.dudeBounds.height;
				}
		}
		
		this.tick += 1;
	}

	stopTask3() {
		this.selectedTask = -1;
	}
}

export default Stage;