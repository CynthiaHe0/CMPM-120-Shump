class Lightning extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.texture.setScale(1, 4);
        this.active = false;
        this.atk = 5;
        this.counter = 0;
        this.setScale(0.5);
        return this;
    }
    update() {
        if (this.active) {
            this.counter++;
            if (this.counter == this.atk){
                this.makeInactive();
                this.counter = 0;
            }
        }
    }
    makeActive(x, y) {
        this.x = x;
        this.y = y;
        //this.visible = true;
        this.active = true;
        console.log("lightning activated");
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
        this.x = game.config.height + 50;
        this.y = game.config.width + 50;
        console.log("Lightning inactive now");
    }
}