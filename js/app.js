const allEnemies = [];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
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
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = "images/char-boy.png";
        this.x = x;
        this.y = y;
    }

    //Update the player's position
    update() {}

    // Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //brings player to the start position
    resetPosition() {
        console.log("x 200");
        this.x = 200;
        this.y = 400;
    }

    //moves player in the board and doesn`t allow player to move out of it
    handleInput(key) {
        //if player reaches the watter he/she wins

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
    canMoveLeft() {
        return this.x > 0;
    }
    canMoveUp() {
        return this.y > -50;
    }
    canMoveRight() {
        return this.x < 400;
    }
    canMoveDown() {
        return this.y < 400;
    }
    checkIfVictory() {
        if (this.y < 68) {
            setTimeout(() => {
                alert("Congratulations, you won!");
                this.resetPosition();
            }, 250);
        }
    }
}

//create random speed for the enemies
function randomSpeed() {
    return Math.floor(Math.random() * 300);
}
// Now instantiate your objects.
const enemy1 = new Enemy(0, 68, randomSpeed());
const enemy2 = new Enemy(-100, 68, randomSpeed());
const enemy3 = new Enemy(-200, 151, randomSpeed());
const enemy4 = new Enemy(-50, 151, randomSpeed());
const enemy5 = new Enemy(-100, 234, randomSpeed());
// const enemy6 = new Enemy(-250, 234, randomSpeed());

// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// Place the player object in a variable called player
const player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
