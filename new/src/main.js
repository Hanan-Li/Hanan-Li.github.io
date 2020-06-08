

window.addEventListener("load", function(event) {
  ///////////////////
  //// FUNCTIONS ////
  ///////////////////
  "use strict";
  /* This used to be in the Controller class, but I moved it out to the main file.
  The reason being that later on in development I might need to do something with
  display or processing directly on an input event in addition to updating the controller.
  To prevent referencing those components inside of my controller logic, I moved
  all of my event handlers here, to the main file. */
  var keyDownUp = function(event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  /* I also moved this handler out of Display since part 1 of this series. The reason
  being that I need to reference game as well as display to resize the canvas according
  to the dimensions of the game world. I don't want to reference game inside of my
  Display class, so I moved the resize method into the main file. */
  var resize = function(event) {
    display.resize(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      game.world.height / game.world.width
    );
    display.render();
  };

  var render = function() {
    display.fill(game.world.background_color); // Clear background to game's background color.
    display.drawRectangle(
      game.world.player.x,
      game.world.player.y,
      game.world.player.width,
      game.world.player.height,
      game.world.player.color
    );
    display.drawRectangle(
      game.world.bgPlayer1.x,
      game.world.bgPlayer1.y,
      game.world.bgPlayer1.width,
      game.world.bgPlayer1.height,
      game.world.bgPlayer1.color
    )
    display.drawRectangle(
      game.world.bgPlayer2.x,
      game.world.bgPlayer2.y,
      game.world.bgPlayer2.width,
      game.world.bgPlayer2.height,
      game.world.bgPlayer2.color
    )
    display.drawRectangle(
      game.world.bgPlayer3.x,
      game.world.bgPlayer3.y,
      game.world.bgPlayer3.width,
      game.world.bgPlayer3.height,
      game.world.bgPlayer3.color
    )
    display.drawRectangle(
      game.world.bgPlayer4.x,
      game.world.bgPlayer4.y,
      game.world.bgPlayer4.width,
      game.world.bgPlayer4.height,
      game.world.bgPlayer4.color
    )
    display.drawRectangle(
      game.world.bgPlayer5.x,
      game.world.bgPlayer5.y,
      game.world.bgPlayer5.width,
      game.world.bgPlayer5.height,
      game.world.bgPlayer5.color
    )
    display.drawRectangle(
      game.world.bgPlayer6.x,
      game.world.bgPlayer6.y,
      game.world.bgPlayer6.width,
      game.world.bgPlayer6.height,
      game.world.bgPlayer6.color
    )
    display.drawRectangle(
      game.world.bgPlayer7.x,
      game.world.bgPlayer7.y,
      game.world.bgPlayer7.width,
      game.world.bgPlayer7.height,
      game.world.bgPlayer7.color
    )
    display.drawRectangle(
      game.world.bgPlayer8.x,
      game.world.bgPlayer8.y,
      game.world.bgPlayer8.width,
      game.world.bgPlayer8.height,
      game.world.bgPlayer8.color
    )
    display.drawRectangle(
      game.world.bgPlayer9.x,
      game.world.bgPlayer9.y,
      game.world.bgPlayer9.width,
      game.world.bgPlayer9.height,
      game.world.bgPlayer9.color
    )
    display.drawRectangle(
      game.world.bgPlayer10.x,
      game.world.bgPlayer10.y,
      game.world.bgPlayer10.width,
      game.world.bgPlayer10.height,
      game.world.bgPlayer10.color
    )
    display.drawRectangle(
      game.world.bgPlayer11.x,
      game.world.bgPlayer11.y,
      game.world.bgPlayer11.width,
      game.world.bgPlayer11.height,
      game.world.bgPlayer11.color
    )
    display.drawRectangle(
      game.world.bgPlayer12.x,
      game.world.bgPlayer12.y,
      game.world.bgPlayer12.width,
      game.world.bgPlayer12.height,
      game.world.bgPlayer12.color
    )
    display.drawRectangle(
      game.world.bgPlayer13.x,
      game.world.bgPlayer13.y,
      game.world.bgPlayer13.width,
      game.world.bgPlayer13.height,
      game.world.bgPlayer13.color
    )
    display.drawRectangle(
      game.world.bgPlayer14.x,
      game.world.bgPlayer14.y,
      game.world.bgPlayer14.width,
      game.world.bgPlayer14.height,
      game.world.bgPlayer14.color
    )
    display.drawRectangle(
      game.world.bgPlayer15.x,
      game.world.bgPlayer15.y,
      game.world.bgPlayer15.width,
      game.world.bgPlayer15.height,
      game.world.bgPlayer15.color
    )
    display.drawText(
      game.world.title.content,
      game.world.title.color,
      game.world.title.x,
      game.world.title.y
    )

    display.drawText2(
      game.world.aboutText.content,
      game.world.aboutText.color,
      game.world.aboutText.x,
      game.world.aboutText.y
    )
    display.drawText2(
      game.world.projectText.content,
      game.world.projectText.color,
      game.world.projectText.x,
      game.world.projectText.y
    )
    display.drawText2(
      game.world.resumeText.content,
      game.world.resumeText.color,
      game.world.resumeText.x,
      game.world.resumeText.y
    )
    display.drawText3(
      game.world.subtitle.content,
      game.world.subtitle.color,
      game.world.subtitle.x,
      game.world.subtitle.y
    )
    display.render();
  };

  var update = function() {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.up.active) {
      game.world.player.jump();
      controller.up.active = false;
    }

    game.update();
  };

  /////////////////
  //// OBJECTS ////
  /////////////////

  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000 / 30, render, update);

  ////////////////////
  //// INITIALIZE ////
  ////////////////////

  /* This is very important. The buffer canvas must be pixel for pixel the same
  size as the world dimensions to properly scale the graphics. All the game knows
  are player location and world dimensions. We have to tell the display to match them. */
  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

  resize();

  engine.start();
});
