/* The Game class has been updated with a new Player class and given a new world
object that controls the virtual game world. Players, NPCs, world dimensions, collision
maps, and everything to do with the game world are stored in the world object. */

const Game = function() {
  this.world = {
    background_color: "rgba(40,48,56,0.25)",

    friction: 0.9,
    gravity: 3,

    player: new Game.Player(),
    bgPlayer1: new Game.BgPlayer(1,1),
    bgPlayer2: new Game.BgPlayer(2,1),
    bgPlayer3: new Game.BgPlayer(0.5,1),
    bgPlayer4: new Game.BgPlayer(3,1),
    bgPlayer5: new Game.BgPlayer(2,1),
    bgPlayer6: new Game.BgPlayer(1,1),
    bgPlayer7: new Game.BgPlayer(1.2,1),
    bgPlayer8: new Game.BgPlayer(0.7,1),
    bgPlayer9: new Game.BgPlayer(1.5,1),
    bgPlayer10: new Game.BgPlayer(2,1),
    bgPlayer11: new Game.BgPlayer(1,1),
    bgPlayer12: new Game.BgPlayer(2,1),
    bgPlayer13: new Game.BgPlayer(0.5,1),
    bgPlayer14: new Game.BgPlayer(3,1),
    bgPlayer15: new Game.BgPlayer(2,1),

    title: new Game.Text("Hanan Li", 36*1.5),
    aboutText: new Game.CollideText("About", 64, 36*2.5, 10,1, "#"),
    projectText: new Game.CollideText("Projects", 64*2, 36*2.5, 10,1, "#"),
    resumeText: new Game.CollideText("Résumé", 64*3, 36*2.5, 10,1, "#"),

    height: 72*2,
    width: 128*2,

    collideObject: function(object) {
      if (object.x < 0) {
        object.x = 0;
        object.velocity_x = 0;
      } else if (object.x + object.width > this.width) {
        object.x = this.width - object.width;
        object.velocity_x = 0;
      }
      if (object.y < 0) {
        object.y = 0;
        object.velocity_y = 0;
      } else if (object.y + object.height > this.height) {
        object.jumping = false;
        object.y = this.height - object.height;
        object.velocity_y = 0;
      }
    },

    collideBg: function(object){
      if(!object.rev){
        if(object.x - object.width > this.width) {
          object.randomize();
          rand = Math.round(Math.random());
          if(rand === 0){
            object.x = 0;
          }
          else{
            object.rev = true;
          }
        } 
      }
      else{
        if(object.x + object.width < 0){
          object.randomize();
          rand = Math.round(Math.random());
          if(rand === 0){
            object.x = this.width
          }
          else{
            object.rev = false;
          }
        }
      }
    },

    update: function() {
      this.player.velocity_y += this.gravity;
      this.player.update();

      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;

      this.bgPlayer1.update(this.player.color);
      this.bgPlayer2.update(this.player.color);
      this.bgPlayer3.update(this.player.color);
      this.bgPlayer4.update(this.player.color);
      this.bgPlayer5.update(this.player.color);
      this.bgPlayer6.update(this.player.color);
      this.bgPlayer7.update(this.player.color);
      this.bgPlayer8.update(this.player.color);
      this.bgPlayer9.update(this.player.color);
      this.bgPlayer10.update(this.player.color);
      this.bgPlayer11.update(this.player.color);
      this.bgPlayer12.update(this.player.color);
      this.bgPlayer13.update(this.player.color);
      this.bgPlayer14.update(this.player.color);
      this.bgPlayer15.update(this.player.color);
      this.title.update(this.player.color);
      
      this.aboutText.update(this.player.color);
      this.aboutText.onCollide(this.player);
      this.projectText.update(this.player.color);
      this.projectText.onCollide(this.player);
      this.resumeText.update(this.player.color);
      this.resumeText.onCollide(this.player);
      

      this.collideObject(this.player);
      this.collideBg(this.bgPlayer1);
      this.collideBg(this.bgPlayer2);
      this.collideBg(this.bgPlayer3);
      this.collideBg(this.bgPlayer4);
      this.collideBg(this.bgPlayer5);
      this.collideBg(this.bgPlayer6);
      this.collideBg(this.bgPlayer7);
      this.collideBg(this.bgPlayer8);
      this.collideBg(this.bgPlayer9);
      this.collideBg(this.bgPlayer11);
      this.collideBg(this.bgPlayer11);
      this.collideBg(this.bgPlayer12);
      this.collideBg(this.bgPlayer13);
      this.collideBg(this.bgPlayer14);
      this.collideBg(this.bgPlayer15);
    }
  };

  this.update = function() {
    this.world.update();
  };
};

Game.prototype = { constructor: Game };

Game.Player = function(x, y) {
  this.color = "#ff0000";
  this.height = 16;
  this.jumping = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.width = 16;
  this.x = 20;
  this.y = 50;
};

Game.Player.prototype = {
  constructor: Game.Player,

  jump: function() {
    if (!this.jumping) {
      this.color = "#" + Math.floor(Math.random() * 16777216).toString(16); // Change to random color
      /* toString(16) will not add a leading 0 to a hex value, so this: #0fffff, for example,
      isn't valid. toString would cut off the first 0. The code below inserts it. */
      while(this.color.charAt(1) === "0" || this.color.charAt(1) === "1" 
      || this.color.charAt(1) === "2" || this.color.charAt(1) === "3" || this.color.charAt(1) === "4"){
        this.color = "#" + Math.floor(Math.random() * 16777216).toString(16); 

      }
      if (this.color.length !== 7) {
        this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);
      }

      this.jumping = true;
      this.velocity_y -= 20;
    }
  },
  
  moveLeft: function() {
    this.velocity_x -= 0.5;
  },
  moveRight: function() {
    this.velocity_x += 0.5;
  },

  update: function() {
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  }

};


Game.BgPlayer = function(speed, size) {
  this.color = "#ff0000";
  if (this.color.length !== 7) {
    this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);
  }
  this.height = size;
  this.velocity_x = speed;
  this.width = size;
  this.x = Math.floor(Math.random() * 128*2);
  this.y = Math.floor(Math.random() * 72*2);
  this.rev = false;
}

Game.BgPlayer.prototype = {
  constructor: Game.BgPlayer,
  randomize: function(){
    this.y =  Math.floor(Math.random() * 72*2);

  },

  update: function(color) {
    this.color = color;
    if(!this.rev){
      this.x += this.velocity_x;
    }else{
      this.x -= this.velocity_x;
    }
    
  }
}

Game.Text = function(text, y){
  this.color = "#ff0000";
  this.x = 64*2;
  this.y =y;
  this.content = text;
}

Game.Text.prototype = {
  constructor: Game.Text,

  update: function(color) {
    this.color = color
  }
}

Game.CollideText = function(text, x, y, width, height, url){
  this.color = "#EADCDA";
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.content = text;
  this.hasCollide = false;
  this.url = url;
}

Game.CollideText.prototype = {
  constructor: Game.CollideText,
  update: function(color) {
    //this.color = color
    if(this.hasCollide){
      
      this.y = this.y + (36*2.5 - this.y) * 0.3;
      if(Math.abs(this.y - 36*2.5) < 0.01){
        this.hasCollide = false;
        window.location = this.url;
      }
    }
  },
  onCollide: function(object){
      if((object.x + object.width*2) > (this.x - this.width) && (object.x - object.width) < (this.x + this.width) 
      && (object.y) < (this.y + this.height) && (object.y + object.height) > (this.y - this.height)){
        object.velocity_x = 0;
        object.velocity_y = 0;
        if((object.y - object.height) < (this.y + this.height)){
          object.y =  this.y + object.height;
        }
        this.hasCollide = true;
        this.y = 36*2;
      }
  }

}