/*CRH - TO DO 2/11/2016: 
    * add rewards that score points 
    * add scenes and game over screen and start screen
    * add ability to select player avatar and start game button
    * add randomized enemy speeds (to make harder)/
      possibly even randomized starting positions
    * add timer  
    
*/

//Define some global here, because why not?
var yOffset = 83,
    xOffset = 101;




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(startX, startY, sprite) {

    //Set sprint to default if none entered 
    //!!!! remeber to add any sprites you use to engine.js Resources.load!!!
    if(sprite === undefined) { this.sprite = 'images/char-boy.png'; }
    else { this.sprite = sprite; }
    //StartX, StartY give players starting position in "tiles"
    this.startX = startX; //initial x position
    this.startY = startY; //initial y position
    this.x = startX;  //current x position
    this.y = startY;  //current y position
    
};

Player.prototype.update = function(){
    
    //check bounds
    if(this.x > 4) { this.x = 4; }
    else if(this.x < 0) { this.x = 0; }
    if(this.y > 5) { this.y = 5; }
    else if(this.y < 0) { this.y = 0; }
    //check for water (reset) 
    if(this.y === 0) { 
        score.score += 5;
        soundFxScore.play();
        this.reset(); 
    }  
    
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x * xOffset, this.y * yOffset);
};

Player.prototype.handleInput = function(input){    
    if(input === 'left' && !paused){ this.x -= 1; }
    else if (input === 'right' && !paused){ this.x += 1; }
    else if (input === 'up' && !paused){ this.y -= 1; }
    else if (input === 'down' && !paused){ this.y += 1; }
    else if (input === 'pause'){ 
        //do something to pause game
        if(paused) { 
            console.log("Game un-paused!"); 
            if(soundMusic.paused){ soundMusic.play(); }
            paused = false; 
        }
        else { 
            paused = true; 
            console.log("Game paused!"); 
            if(!soundMusic.paused){ soundMusic.pause(); }
        }        
    }
    else{ return false; }    
};

Player.prototype.reset = function(){
    this.x = this.startX;
    this.y = this.startY;
};

// Enemies our player must avoid - subclass of Player
var Enemy = function(x, y, speed) {
    //Inherits from player object by calling playing
    Player.call(this, x, y, 'images/enemy-bug.png');
    //setup enemy specific variables
    if(speed === undefined) { speed = 1; }
    else { this.speed = speed; }            
};

Enemy.prototype = Object.create(Player.prototype); //inherits Player methods
Enemy.prototype.constructor = Enemy;  //gives it correct constructor method

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
        soundFxHit.play();
        score.score -= 10
        player.reset();
        if(score.score <= 0){
            //Do some stuff if score hits zero - maybe end game
            score.score = 0;
        }
    }

    //console.log(player.x)

    //move enemy
    this.x += this.speed * dt;

    //scroll enemy to other side when it runs off screen
    if(this.x > 5){ this.x = 0; }

};

/*
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * xOffset, this.y * yOffset);
};
*/

//Object to track and display score
var Score = function(x, y, score){
    if(score === undefined){ this.score = 50;}
    else { this.score = 50; }    
    this.x = x;
    this.y = y;
}

//Score update method
Score.prototype.update = function(){
    //Does nothing at the moment
    
}

Score.prototype.render = function(){
    //Draw score
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.font = "36px sans-serif";
    ctx.fillText("SCORE: " + this.score, this.x * xOffset, this.y * yOffset);
    ctx.strokeText("SCORE: " + this.score, this.x * xOffset, this.y * yOffset);
}



//Score instance
var score = new Score(0, 1);

// Player instance
var player = new Player(2, 5, 'images/char-cat-girl.png');

//Enemy instances and add to allEnemies array
var enemy1 = new Enemy(1, 1, 3);
allEnemies.push(enemy1);

var enemy2 = new Enemy(3, 2, 1);
allEnemies.push(enemy2);

var enemy3 = new Enemy(5, 3, 3);
allEnemies.push(enemy3);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'pause',  //space bar
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
