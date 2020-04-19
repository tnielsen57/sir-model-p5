class Individual {

    static SUSCEPTIBLE = 0;
    static INFECTIOUS = 1;
    static REMOVED = 2;

    constructor(boundaryX, boundaryY) {
        this._boundaryX = boundaryX;
        this._boundaryY = boundaryY;
        this._posX = Math.floor(Math.random() * this._boundaryX);
        this._posY = Math.floor(Math.random() * this._boundaryY);
        this._status = Math.floor(Math.random() * 100) == 1 ? Individual.INFECTIOUS : Individual.SUSCEPTIBLE;
        this._directionX = Math.random();
        this._directionY = Math.random();
        this._daysOfInfection = 0;
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionX *= -1;
        }
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionY *= -1;
        }
    }

    move() {
        this._posX += this._directionX;
        this._posY += this._directionY;
        if (this._posX > this._boundaryX || this._posX < 0) {
            this._directionX *= -1;
            this._posX += 2 * this._directionX;
        }
        if (this._posY > this._boundaryY || this._posY < 0) {
            this._directionY *= -1;
            this._posY += 2 * this._directionY;
        }
        if (this._status == Individual.INFECTIOUS) {
            this._daysOfInfection++;
            if (this._daysOfInfection >= 200) {
                this._status = Individual.REMOVED;
            }
        }
    }

    infect() {
        if (this._status == Individual.SUSCEPTIBLE) {
            this._status = Individual.INFECTIOUS;
        }
    }

    get posX() {
        return this._posX;
    }

    get posY() {
        return this._posY;
    }

    get status() {
        return this._status;
    }

    set posX(posX) {
        this._posX = posX;
    }

    set posY(posY) {
        this._posY = posY;
    }

    set status(status) {
        this._status = status;
    }

}