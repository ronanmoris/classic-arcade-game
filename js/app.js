const allEnemies = [];

//superclass
class Entities {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Draw the entity on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Entities {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
        this.sprite = "images/enemy-bug.png";
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        //check for collision
        if (
            this.x + 70 >= player.x &&
            this.x <= player.x + 70 &&
            this.y == player.y
        ) {
            player.resetPosition();
        }
        //when enemies/vehicles are out of the screen put them back
        if (this.x > 500) {
            this.x = -800 - randomSpeed();
        }
    }
}

class Player extends Entities {
    constructor(x, y) {
        super(x, y);
        this.sprite = "images/char-boy.png";
        this.initialX = x;
        this.initialY = y;
    }

    //brings player to the start position
    resetPosition() {
        this.x = this.initialX;
        this.y = this.initialY;
    }
    //reload page
    resetGame() {
        window.location.reload(true);
    }

    //moves player around the board and doesn`t allow player to move out of it
    handleInput(key) {
        switch (key) {
            case "left": {
                if (this.canMoveLeft()) this.x -= 101;
                break;
            }
            case "up": {
                if (this.canMoveUp()) this.y -= 83;
                break;
            }
            case "right": {
                if (this.canMoveRight()) this.x += 101;
                break;
            }
            case "down": {
                if (this.canMoveDown()) this.y += 83;
                break;
            }
        }
    }
    //Player can only move left if not already at the end of the board
    canMoveLeft() {
        return this.x > 0;
    }
    //Player can only move up if not already at the end of the board
    canMoveUp() {
        return this.y > -15;
    }
    //Player can only move right if not already at the end of the board
    canMoveRight() {
        return this.x < 400;
    }
    //Player can only move down if not already at the end of the board
    canMoveDown() {
        return this.y < 400;
    }

    //if player reaches the watter he/she wins
    checkIfVictory() {
        if (this.y === -15) {
            setTimeout(() => {
                alert("Congratulations, you won!");
                //after victory reset the game
                this.resetGame();
            }, 200);
        }
    }
}

//create random speed for the enemies
function randomSpeed() {
    return Math.floor(Math.random() * 600);
}

// Instantiating the enemies
const enemy1 = new Enemy(0, 68, randomSpeed());
const enemy2 = new Enemy(-500, 68, randomSpeed());
const enemy3 = new Enemy(-500, 151, randomSpeed());
const enemy4 = new Enemy(-100, 151, randomSpeed());
const enemy5 = new Enemy(-500, 234, randomSpeed());
const enemy6 = new Enemy(-100, 234, randomSpeed());

// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);

// Place the player object in a variable called player
const player = new Player(202, 400);

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
    player.checkIfVictory();
});
