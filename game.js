let gameScene = new Phaser.Scene('Game');

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
  let player = this.add.sprite(50, 150, 'player');
  
  // can modify properties directly
  // player.x += 100;
  
  // Use depth to change height on top of other objects. 0 is bottom 1 is top.
  player.depth = 1;

  let dragon1 = this.add.sprite(250, 150, 'dragon');
  //playing with scaling
    dragon1.setScale(3);
//   dragon1.scaleX = 2;
//   dragon1.scaleY = 2;
  // playing
  
//   let dragon2 = this.add.sprite(350, 150, 'dragon');
//   //more scaling
//   dragon2.displayWidth = 50;
//   dragon2.displayHeight = 50;
  
//   //flip sprites
//   dragon2.flipX=true;
//   dragon2.flipY=true;
};



let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360, 
  scene: gameScene};

let game = new Phaser.Game(config)
