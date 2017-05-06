/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
      return true;
    }
});


game.DogEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
      image: 'dogtest',
      height: 32,
      width: 32
    }]);
  }
});

game.BoxerEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [1, 20, {
      image: 'boxer',
      height: 111,
      width: 49
    }]);
    this.renderable.addAnimation("static", [1, 2]);
    // set initial animation
    this.renderable.setCurrentAnimation("static"); 
  }
});
