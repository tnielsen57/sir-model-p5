class Individual {

    static SUSCEPTIBLE = 0;
    static INFECTIOUS = 1;
    static REMOVED = 2;

    /* 
        Constructor with boundaries:
        Boundaries could be used to see how areal restrictions of movements affect the spread.
        Set random position and movement direction
    */
    constructor(boundaryX, boundaryY, status) {
        this._boundaryX = boundaryX;
        this._boundaryY = boundaryY;
        this._posX = Math.floor(Math.random() * this._boundaryX);
        this._posY = Math.floor(Math.random() * this._boundaryY);
        this._status = status;
        this._directionX = Math.random();
        this._directionY = Math.random();
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionX *= -1;
        }
        if (Math.floor(Math.random() * 2) >= 1) {
            this._directionY *= -1;
        }
        this._daysOfInfection = 0;
    }

    /*
        Calculate position for next iteration
    */
    update() {
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
        this.gainImmunity();
    }

    /*
        Assume to gain immunity after x iterations and remove on immunity
    */
    gainImmunity() {
        if (this._status == Individual.INFECTIOUS) {
            this._daysOfInfection++;
            if (this._daysOfInfection >= 200) {
                this._status = Individual.REMOVED;
            }
        }
    }

    /*
        Infect on contact with infectious
    */
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