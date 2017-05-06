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
    this.renderable.addAnimation("punch", [3]);
    // set initial animation
    this.renderable.setCurrentAnimation("static"); 
  },

  punch: () => {
    if(this.renderable.getCurrentAnimation() != "punch") {
      this.renderable.setCurrentAnimation("punch");
    }
  }
});

game.PeebersEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [140, 150, {
      image: 'peebers',
      height: 52,
      width: 63
    }]);
    this.renderable.addAnimation("fighting", [0, 1]);
    this.renderable.setCurrentAnimation("fighting");
  }
});
