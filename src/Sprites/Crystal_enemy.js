class Crystal_enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        return this;
        //We'll be relying on the group function to add the general path
    }
    set_path(scene){
        scene.add.follower(this.path, this.x, this.y, this.texture);
        this.path.points.shift({x: this.x, y: this.y});
    }
    update() {
        if (this.active){
            this.startFollow({
                             delay: 0,
                             duration: 2000,
                             ease: 'Sine.easeInOut',
                             repeat: -1,
                             yoyo: false
                            });
        }
    }
    makeActive() {
        this.visible = true;
        this.active = true;
        this.set_path(this.x, this.y);
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
        this.x = -100;
        this.y = -100;
    }
}