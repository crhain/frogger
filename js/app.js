/*CRH - TO DO 2/11/2016:
    * add wsd keys
    * add scoring system
    * add randomized enemy speeds (to make harder)/
      possibly even randomized starting positions
    * add ability to select player avatar
    * add sound fx and music!
*/

//Define some global here, because why not?
var yOffset = 83,
    xOffset = 101;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    if(speed === undefined) { speed = 1; }
    this.x = x;  //initial x position
    this.y = y;  //initial y position
    this.speed = speed;
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

     //check for player collision
     var collisionBuffer = .33;
    if(Math.abs(this.x - player.x) < collisionBuffer && this.y === player.y){
        //Collision has occured.  Need to reset player
        console.log("I hit the player at", player.x);

        player.reset();
    }

    //console.log(player.x)


    //move enemy
    this.x += this.speed * dt;



    //scroll enemy to other side when it runs off screen
    if(this.x > 5){ this.x = 0; }



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * xOffset, this.y * yOffset);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY) {
    //StartX, StartY give players starting position in "tiles"
    this.startX = startX; //initial x position
    this.startY = startY; //initial y position
    this.x = startX;  //current x position
    this.y = startY;  //current y position
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    
    //check bounds
    if(this.x > 4) { this.x = 4; }
    else if(this.x < 0) { this.x = 0; }
    if(this.y > 5) { this.y = 5; }
    else if(this.y < 0) { this.y = 0; }
    //check for water (reset) 
    if(this.y === 0) { this.reset(); }  
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x * xOffset, this.y * yOffset);
};

Player.prototype.handleInput = function(input){    
    if(input === 'left'){ this.x -= 1; }
    else if (input === 'right'){ this.x += 1; }
    else if (input === 'up'){ this.y -= 1; }
    else if (input === 'down'){ this.y += 1; }
    else{ return false; }    
};

Player.prototype.reset = function(){
    this.x = this.startX;
    this.y = this.startY;
};


// Now instantiate your objects.
var player = new Player(2, 5);
var enemy1 = new Enemy(1, 1, 3);
// Place all enemy objects in an array called allEnemies
allEnemies.push(enemy1);
// Place the player object in a variable called player
var enemy2 = new Enemy(3, 2, 1);
allEnemies.push(enemy2);

var enemy3 = new Enemy(5, 3, 3);
allEnemies.push(enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',     //this corresponds to A
        68: 'right',    //this corresponds to D
        83: 'down',     //this corresponds to S
        87: 'up'       //this corresponds to W


    };

    player.handleInput(allowedKeys[e.keyCode]);
});
