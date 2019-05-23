let gameScene = new Phaser.Scene('Game');

gameScene.init = function(){
  // init is called to place parameters of the game
  this.playerSpeed = 10;
  //this.dragonSpeed = 3;
  this.dragonSpeedMin = 1;
  this.dragonSpeedMax = 5;
  this.dragonMaxY = this.sys.game.config.height - 100;
  this.dragonMinY = 100;
  //Set game over to false
  this.isTerminating = false;
  this.winCount = 0;
  };

gameScene.preload = function(){
  this.load.image('background', 'https://cdn.glitch.com/957b79da-2750-4beb-8ae8-5aea241b8f08%2Fbackground.png?1558140847076');
  this.load.image('player', 'https://cdn.glitch.com/957b79da-2750-4beb-8ae8-5aea241b8f08%2Fplayer.png?1558140846688');
  this.load.image('dragon', 'https://cdn.glitch.com/957b79da-2750-4beb-8ae8-5aea241b8f08%2Fdragon.png?1558140846810');
  this.load.image('treasure', 'https://cdn.glitch.com/957b79da-2750-4beb-8ae8-5aea241b8f08%2Ftreasure.png?1558140846766');
};

gameScene.create = function(){
  // Load background and change origin
  let bg = this.add.sprite(0,0,'background', ); 
  bg.setOrigin(0,0);
  
  // Experimenting with new properties
  // bg.alphaBottomRight = 0;
  
  // Set position of object on screen. Does similar things to set origin.
  // bg.setPosition(640/2, 360/2);
  
  // Display variables for width and height of game
  //let gameW = this.sys.game.config.width;
  //let gameH = this.sys.game.config.height;
  //console.log(gameW, gameH);
  //console.log(bg);
  
  //Create player sprite second to be on top of background and other objects
  this.player = this.add.sprite(50, this.sys.game.config.height / 2, 'player');
  this.player.setScale(.6);
  // can modify properties directly
  // player.x += 100;
  
  // Use depth to change height on top of other objects. 0 is bottom 1 is top.
  this.player.depth = 1;

  // placing this here allows it to be called in the gamescene and 
  // adjusted in the update function. 
  
  this.dragons = this.add.group({
    key: 'dragon',
    repeat: 3,
    setXY: {
      x: 100,
      y: (this.sys.game.config.height / 2)-150,
      stepX: 125,
      stepY: 45
    }
  });
//   this.dragon1 = this.add.sprite(150, this.sys.game.config.height / 2, 'dragon');
  
//   this.dragons.add(this.dragon1);
  Phaser.Actions.Call(this.dragons.getChildren(), function(dragons){
    // flip all children in x
    dragons.flipX = true;
    // set speed of all children for group
    console.log('I am here!');
    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.dragonSpeedMin + Math.random() * (this.dragonSpeedMax - this.dragonSpeedMin)
    dragons.speed = dir * speed;
  }, this);
  Phaser.Actions.ScaleXY(this.dragons.getChildren(), -.4, -.4);
  
  //playing with scaling
//  this.dragon1.setScale(.6);
//  this.dragon1.flipX=true;
//    this.dragon.scaleX = 2;
//    this.dragon.scaleY = 2;
  
//      playing with angles
//        this.dragon.setAngle(45);
//        this.dragon.rotation = Math.PI/4;
//        this.dragon.setRotation(Math.PI/4);
//    Remember to keep P and I capitalized for Math.PI
  
  // Using let only makes this function work within the scope
  // of the create() function
//   let dragon2 = this.add.sprite(350, 150, 'dragon');
//   //more scaling
//   dragon2.displayWidth = 50;
//   dragon2.displayHeight = 50;
  
//   //flip sprites
//   dragon2.flipX=true;
//   dragon2.flipY=true;
  
//  Change object origin
//      this.dragon.setOrigin(0,0);

// Treasure!
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(.8);

// Playing with enemy speed and directions
  // let dir = Math.random() < 0.5 ? 1 : -1;
  // let speed = this.dragonSpeedMin + Math.random() * (this.dragonSpeedMax - this.dragonSpeedMin)
  // this.dragon1.speed = dir * speed;
  
  
  
};

//Called up to 60 times / second
gameScene.update = function(){
  // If game over, disable input
  if(this.isTerminating) return;
  // Check if left click mouse is pressed
  if(this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }
  
  // check if player is touching something
  let playerRect = this.player.getBounds();
  let treasureRect = this.treasure.getBounds();
  
  //console.log(playerRect, treasureRect, Phaser.Geom.Intersects.GetRectangleToRectangle(playerRect, treasureRect))
  
  
  if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)==1) {
    //console.log('Goal!');
  // Restart the scene
    return this.gameWin();
  }

  
  // //This is the long way to do reversing
  // if(this.dragonSpeed < 0 && this.dragon.y <= this.dragonMinY){
  //   this.dragonSpeed *= -1
  // }
  // if(this.dragonSpeed > 0 && this.dragon.y >= this.dragonMaxY){
  //   this.dragonSpeed *= -1
  // }
  // this.dragon.y += this.dragonSpeed;
  
  // get dragons
  let dragons = this.dragons.getChildren();
  let numDragons = dragons.length;
  
  for(let i=0; i < numDragons; i++) {
  //Short reverse code
  let conditionUp = dragons[i].speed < 0 && dragons[i].y <= this.dragonMinY;
  let conditionDown = dragons[i].speed > 0 && dragons[i].y >= this.dragonMaxY;
  
  if (conditionUp || conditionDown) {
    dragons[i].speed *= -1;
  }
  dragons[i].y += dragons[i].speed;
  //console.log(dragons[i].speed);
  // Check collision between dragon and player
  let dragonRect = dragons[i].getBounds();
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, dragonRect)==1) {
    //console.log('Lose!');
  
    // Restart the scene
    return this.gameOver();
  }
  
  }
  // Move in x
  //this.dragon.x += 1;
  // Rotate about origin 
//   this.dragon.setScale(2);
//   this.dragon.angle += 1;

// // Challenge - Make dragon grow to x2 and then stop
//   if(this.player.scaleX < 2 && this.player.scaleY < 2){
//     this.player.scaleX += .01;
//     this.player.scaleY += .01;
//   }
    
};

gameScene.gameWin = function(){
  // initiated game over
  this.isTerminating = true;
  
  // fade out camera
  this.cameras.main.fade(500);
  //listen for event completion
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    this.scene.restart();
  }, this)
};


gameScene.gameOver = function() {
  // initiated game over
  this.isTerminating = true;
  
  //shake camera
  this.cameras.main.shake(500);
  //listen for event completion
  this.cameras.main.on('camerashakecomplete', function(camera, effect) {
    this.cameras.main.fade(500);
  }, this)
  this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
  //  restart the scene
 this.scene.restart();    
  }, this)

};


let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360, 
  scene: gameScene};

let game = new Phaser.Game(config);