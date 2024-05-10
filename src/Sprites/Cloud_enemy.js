class Cloud_enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture, frame) {        
        super(scene, path, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        this.shoot = Phaser.Math.Between(0, 10);
        this.counter = 0;
        console.log("Cloud enemy created");
        return this;
        //Add random number. Main program accesses random number
        //to check against timer. If greater than, fires a bullet
        //at this x & y and then sets random number to some other
        //value
    }
    makeActive() {
        this.visible = true;
        this.active = true;
        console.log("Cloud activated!");
        this.startFollow({
            delay: 0,
            duration: 6000,
            repeat: -1,
            yoyo: false
        });
    }
    makeInactive() {
        this.visible = false;
        this.active = false;
        this.stopFollow();
        this.x = -100;
        this.y = -100;
    }
}