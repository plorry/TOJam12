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
    // set positions
    this.POS = {
      start: [20, 20],
      ready: [150, 40],
      punch: [150, 80]
    };
    this.bounceHeight = 5;
    this.getReady();
  },
  
  update: function update(dt) { 
    this.pos.x += (Math.sign(this.dest[0] - this.pos.x)) * this.speed;
    this.pos.y += (Math.sign(this.dest[1] - this.pos.y)) * this.speed;

    if(game.data.state == "PUNCH") {
      this.punch();
    }

    if(this.atDest() && this.getDest() == "punch") {
      this.getReady();
    }

    if(game.data.state == "GETTINGUP" || game.data.state == "GETTINGREADY") {
      this.getReady();
    }

    return this._super(me.Entity, 'update', [dt]);
  },

  setDest: function setDest(dest) {
    this.destString = dest;
    this.dest = this.POS[dest];
  },

  getDest: function getDest() {
    return this.destString;
  },

  punch: function punch() {
    if(!this.renderable.isCurrentAnimation("punch")) {
      this.renderable.setCurrentAnimation("punch");
    }
    this.setDest("punch");
    this.speed = 3;
  },

  atDest: function atDest() {
    return this.pos.x == this.dest[0] && this.pos.y == this.dest[1];
  },

  getReady: function getReady() {
    if(!this.renderable.isCurrentAnimation("static")) {
      this.renderable.setCurrentAnimation("static");
    }
    this.speed = 1;
    this.setDest("ready");
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
    // apparently one needs to do this in order to define a non-looping anim
    this.renderable.addAnimation("hit", [
      {name: 13, delay: 100},
      {name: 14, delay: 100},
      {name: 15, delay: 100},
      {name: 16, delay: 100},
      {name: 17, delay: 100},
      {name: 18, delay: 100},
      {name: 19, delay: Infinity}
    ]);
    this.renderable.addAnimation("getup", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
    this.renderable.setCurrentAnimation("fighting");
    this.down = false;
    this.canHit = true;
  },

  hit: function hit() {
    if(!this.renderable.isCurrentAnimation("hit")) {
      this.renderable.setCurrentAnimation("hit");
      game.data.stamina = 0;
    }
  },

  // Check for "hit" animation finishing
  hitAnimationDone: function hitAnimationDone() {
    return (this.renderable.isCurrentAnimation("hit") &&
      this.renderable.getCurrentAnimationFrame() == 6);
  },

  update: function update(dt) {
    if(this.hitAnimationDone()){
      game.data.state = "GETTINGUP";
    }
    if(game.data.state == "GETTINGUP" && !this.renderable.isCurrentAnimation("getup")) {
      this.renderable.setCurrentAnimation("getup");
    }
    if(game.data.state == "PUNCH") {
      this.hit();
    }

    return (this._super(me.Entity, 'update', [dt]));
  }

});
