class Card {

        /**
         * Card Constructor
         */
        constructor() {
                this.moveTime = 0;
        }

        get expectedPosition() {
                return this._targetPosition;
        }

        set expectedPosition(val) {
                this._targetPosition = val;
        }

        get moveDuration() {
                return this._moveDuration;
        }

        set moveDuration(val) {
                this._moveDuration = val;
        }

        get sprite() {
                return this._sprite;
        }

        set sprite(val) {
                this._sprite = val;
        }

        get startPosition() {
                return this._startPosition;
        }

        set startPosition(val) {
                this._startPosition = val;
        }

        /**
         * move for moving card from the starting position to the expected position in move duration
         * @param elapsedTime number - Number of time elapsed in milliseconds from last frame to this frame
         */
        move(elapsedTime) {
                this.moveTime += elapsedTime;
                if (this.moveTime >= this.moveDuration) {
                        elapsedTime = 0;
                }

                if (elapsedTime > 0) {
                        let stepSize = this.moveDuration / elapsedTime;

                        //card should move to the expectedPosition but added some x value for good visual effect
                        let resultX = (this.expectedPosition.x + 500 - this.startPosition.x);
                        if (resultX > 0)
                                this.sprite.position.x += resultX / stepSize;

                        let resultY = (this.expectedPosition.y - this.startPosition.y);
                        if (resultY > 0)
                                this.sprite.position.y += resultY / stepSize;
                }
        }
}

export default Card;