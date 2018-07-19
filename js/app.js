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
    if (Math.floor(this.x) == player.x && this.y == player.y) {
        player.resetPosition();
    }
    //when enemy out of screen put them back
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
        this.x = 200;
        this.y = 400;
    }

    //moves player in the board and doesn`t allow player to move out of it
    handleInput(key) {
        console.log(this.y);
        //if player reaches the watter he/she wins
        if (this.y === 40) {
            setTimeout(() => {
                alert("Congratulations, you won!");
                this.resetPosition();
            }, 250);
        }

        key === "left" && this.x > 0
            ? (this.x -= 101)
            : key === "up" && this.y > -50
                ? (this.y -= 83)
                : key === "right" && this.x < 400
                    ? (this.x += 101)
                    : key === "down" && this.y < 400 ? (this.y += 83) : this.x;
    }
}

function randomSpeed() {
    return Math.floor(Math.random() * 350);
}
// Now instantiate your objects.
const enemy1 = new Enemy(0, 68, randomSpeed());
const enemy2 = new Enemy(-100, 151, randomSpeed());
const enemy3 = new Enemy(-50, 234, randomSpeed());

// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1, enemy2, enemy3);

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
});

/*
if (key === "left" && this.x > 0) {
    this.x -= 101;
} else if (key === "up" && this.y > -50) {
    this.y -= 83;
} else if (key === "right" && this.x < 400) {
    this.x += 101;
} else if (key === "down" && this.y < 400) {
    this.y += 83;
}
*/
