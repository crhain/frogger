//Define some global here, because why not?
var yOffset = 83,
    xOffset = 101;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;  //initial x position
    this.y = 1 * yOffset;  //initial y position
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 2 * xOffset;  //initial x position
    this.y = 5 * yOffset;  //initial y position
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    //nothing at the moment
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input){
    if(input === 'left'){this.x -= xOffset;}
    else if (input === 'right'){this.x += xOffset;}
    else if (input === 'up'){this.y -= yOffset;}
    else if (input === 'down'){this.y += yOffset;}
    else{return false;}    
};


// Now instantiate your objects.
var player = new Player();
var enemy1 = new Enemy();
// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1);
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
