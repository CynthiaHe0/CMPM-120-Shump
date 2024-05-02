class Player_bullet_group extends Phaser.GameObjects.Group{
    /*constructor(scene, [children], [config]){
        super(scene, [children], [config]);
    }*/
    //In theory if I don't put a constructor function, it
    //should just use the one defined in GameObjects.Group
    
    //This function should hopefully work to give me the input
    //key used by the player
    add_trigger_n_cooldown(key, cooldown = 3){
        this.key = key;
        this.cooldown = cooldown;
        this.counter = cooldown;
    }
    spawn(playerX, playerY){
        this.counter--;
        if (this.key.isDown){
            if (this.counter < 0){
            let bullet = this.getFirstDead();
                if (bullet != null){
                    this.counter = this.cooldown;
                    bullet.makeActive();
                    bullet.x = playerX;
                    bullet.y = playerY - 10;
                    console.log("Bullet should be placed at "+playerX+" and "+playerY);
                }
            }
        }
    }
}