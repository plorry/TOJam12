
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(320, 240, {wrapper : "screen", scale : 2})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");
        // set keys
        me.input.bindKey(me.input.KEY.SPACE, "input", true);

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.BoxingScreen());

        // add our player entity in the entity pool
        me.pool.register("dogPlayer", game.DogEntity);
        me.pool.register("boxer", game.BoxerEntity);
        me.pool.register("peebers", game.PeebersEntity);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
