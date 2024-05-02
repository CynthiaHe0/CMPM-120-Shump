class Player_bullet_group extends Phaser.GameObjects.Group{
    /*constructor(scene, [children], [config]){
        super(scene, [children], [config]);
    }*/
    //In theory if I don't put a constructor function, it
    //should just use the one defined in GameObjects.Group
    
    //This function should hopefully work to give me the input
    //key used by the player
    add_trigger_key(key){
        this.key = key;
    }
    update(playerX, playerY){
        if (this.key.isDown){
            let bullet = this.getFirstDead();
            if (bullet != null){
                bullet.makeActive();
                bullet.x = playerX;
                bullet.y = playerY - 10;
                //console.log("Bullet should be placed at "+playerX+" and "+playerY);
            }
        }
    }
}