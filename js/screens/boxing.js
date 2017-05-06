game.BoxingScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
      me.levelDirector.loadLevel("field");
      game.data.stamina = 100;
      game.data.canCheer = false;
      // add boxer
      me.game.world.addChild(me.pool.pull("boxer"));
      me.game.world.addChild(me.pool.pull("peebers"));
        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
      this.HUD = new game.HUD.Container();
      this.HUD.addChild(new StaminaMeter());

      me.game.world.addChild(this.HUD);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});

/**
 * GameObject that both manages & displays Peeber's stamina
 */
const StaminaMeter = me.Renderable.extend({
  init: function init() {
    this._super(me.Renderable, 'init', [10, 10, 10, 100]);
    this.stamina = game.data.stamina;
    this.canCheer = false;
  },

  cheer: function cheer(amount) {
    if(game.data.canCheer) {
      game.data.stamina += amount;
    }
  },

  draw: function draw(renderer) {
    renderer.setColor("#00ff55");
    renderer.fillRect(
      this.pos.x,
      this.pos.y + 100 - this.stamina,
      this.width,
      this.height * (this.stamina / 100));
  },

  update: function update(dt){
    if (game.data.stamina > 100) game.data.stamina = 100;
    if(me.input.isKeyPressed("input")) {
      this.cheer(10);
      game.data.canCheer = false;
      game.data.state = "PUNCH";
    } else {
      game.data.canCheer = true;
    }

    if(game.data.stamina > this.stamina) {
      this.stamina += 1;
    } else if (game.data.stamina < this.stamina) {
      this.stamina -= 1;
    }
    if(game.data.stamina < 100 && game.data.stamina > 0) {
      game.data.stamina -= 0.2; 
    }
  }
});
