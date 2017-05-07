game.DogEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
      image: 'dogtest',
      height: 32,
      width: 32
    }]);
  }
});

/**
 * An Entity that moves to wherever its destination is set
 */
game.MovingEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, settings]);
    this.POS = {
      default: [0, 0]
    };
    this.setDest("default");
    this.speed = 1;
  },

  update: function update(dt) { 
    this.pos.x += (Math.sign(this.dest[0] - this.pos.x)) * this.speed;
    this.pos.y += (Math.sign(this.dest[1] - this.pos.y)) * this.speed;
    
    return this._super(me.Entity, 'update', [dt]);
  },

  setDest: function setDest(dest) {
    this.destString = dest;
    this.dest = this.POS[dest];
  },

  getDest: function getDest() {
    return this.destString;
  },
  
  atDest: function atDest() {
    return this.pos.x == this.dest[0] && this.pos.y == this.dest[1];
  }
});

game.BoxerEntity = game.MovingEntity.extend({
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
    if(game.data.state == "PUNCH") {
      this.punch();
    }

    if(this.atDest() && this.getDest() == "punch") {
      this.getReady();
    }

    if(game.data.state == "GETTINGUP" || game.data.state == "GETTINGREADY") {
      this.getReady();
    }

    return this._super(game.MovingEntity, 'update', [dt]);
  },


  punch: function punch() {
    if(!this.renderable.isCurrentAnimation("punch")) {
      this.renderable.setCurrentAnimation("punch");
    }
    this.setDest("punch");
    this.speed = 3;
  },


  getReady: function getReady() {
    if(!this.renderable.isCurrentAnimation("static")) {
      this.renderable.setCurrentAnimation("static");
    }
    this.speed = 1;
    this.setDest("ready");
  }
});

game.PeebersEntity = game.MovingEntity.extend({
  init: function(x, y, settings) {
    this._super(game.MovingEntity, 'init', [140, 200, {
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
    this.renderable.addAnimation("getup", [
      {name: 20, delay: Infinity},
      {name: 21, delay: Infinity},
      {name: 22, delay: Infinity},
      {name: 23, delay: Infinity},
      {name: 24, delay: Infinity},
      {name: 25, delay: Infinity},
      {name: 26, delay: Infinity},
      {name: 27, delay: Infinity},
      {name: 28, delay: Infinity},
      {name: 29, delay: Infinity},
      {name: 30, delay: Infinity}
    ]);
    this.renderable.setCurrentAnimation("fighting");
    this.down = false;
    this.canHit = true;
    this.POS = {
      initial: [140, 150],
      bounce: [140, 170],
      offscreen: [140, 240]
    };
    this.speed = 0.5;
    this.setDest("initial");
  },

  hit: function hit() {
    if(!this.renderable.isCurrentAnimation("hit")) {
      this.renderable.setCurrentAnimation("hit");
      game.data.stamina = 0;
    }
    this.setDest("bounce");
  },

  // Check for "hit" animation finishing
  hitAnimationDone: function hitAnimationDone() {
    return (this.renderable.isCurrentAnimation("hit") &&
      this.renderable.getCurrentAnimationFrame() == 6);
  },

  getupAnimationDone: function getupAnimationDone() {
    return (this.renderable.isCurrentAnimation("getup") &&
      this.renderable.getCurrentAnimationFrame() == 10);
  },

  update: function update(dt) {
    if(this.hitAnimationDone()){
      game.data.state = "GETTINGUP";
    }
    if(game.data.state == "GETTINGUP" && !this.renderable.isCurrentAnimation("getup")) {
      this.renderable.setCurrentAnimation("getup");
    }
    if(game.data.state == "GETTINGUP") {
      this.renderable.setAnimationFrame(Math.floor(game.data.stamina));
    }
    if(game.data.state == "PUNCH") {
      this.hit();
    }
    return (this._super(game.MovingEntity, 'update', [dt]));
  }
});
