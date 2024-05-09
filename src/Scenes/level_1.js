class Level_1 extends Phaser.Scene {
    constructor(){
        super("level_1");
        this.my = {sprite: {}};
        this.playerSpeed = 8;
        this.playerBulletSpeed = 10;
        this.playerBulletCooldown = 10;

        this.enemyBulletSpeed = 10;
        this.iceBulletCooldown = 60;
        this.iceCounter = 0;
        this.crystal_y = 190;
        this.playerHealth = 6;
    }
    preload(){
        //Preload the images
        this.load.setPath("./assets");
        this.load.image("cloud_enemy", "cloud.png");
        this.load.image("lighting", "lighting_blue.png");
        this.load.image("player", "sun1.png");
        this.load.image("crystal_enemy", "Ice_crystal.png");
        this.load.image("fireball", "flame.png");
        this.load.image("ice", "laserBlue10.png");
        this.load.image("heart", "heart.png");
        this.load.image("halfheart", "halfheart.png");
        this.load.image("emptyheart", "emptyheart.png");
        this.load.bitmapFont('text', 'bitmapfont_0.png', 'bitmapfont.xml');
    }
    create(){
        let my = this.my;

        this.left1 = this.input.keyboard.addKey("A");
        this.right1 = this.input.keyboard.addKey("D");
        this.left2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.heart1_full = this.add.image(40, 30,"heart");
        my.sprite.heart1_full.setScale(2);
        my.sprite.heart2_full = this.add.image(100, 30,"heart");
        my.sprite.heart2_full.setScale(2);
        my.sprite.heart3_full = this.add.image(160, 30,"heart");
        my.sprite.heart3_full.setScale(2);

        my.sprite.heart1_half = this.add.image(40, 30, "halfheart");
        my.sprite.heart1_half.setScale(2);
        my.sprite.heart1_half.visible = false;
        my.sprite.heart2_half = this.add.image(100, 30, "halfheart");
        my.sprite.heart2_half.setScale(2);
        my.sprite.heart2_half.visible = false;
        my.sprite.heart3_half = this.add.image(160, 30, "halfheart");
        my.sprite.heart3_half.setScale(2);
        my.sprite.heart3_half.visible = false;

        my.sprite.heart1_empty = this.add.image(40, 30, "emptyheart");
        my.sprite.heart1_empty.setScale(2);
        my.sprite.heart1_empty.visible = false;
        my.sprite.heart2_empty = this.add.image(100, 30, "emptyheart");
        my.sprite.heart2_empty.setScale(2);
        my.sprite.heart2_empty.visible = false;
        my.sprite.heart3_empty = this.add.image(160, 30, "emptyheart");
        my.sprite.heart3_empty.setScale(2);
        my.sprite.heart3_empty.visible = false;


        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player", null,
        [this.left1, this.left2], [this.right1, this.right2], this.playerSpeed);
        my.sprite.player.setScale(0.5);
        
        my.sprite.playerBullets = new Player_bullet_group(this, {
            active: true,
            defaultKey: "fireball",
            maxSize: 5,
            runChildUpdate: true
            }
        );
        my.sprite.playerBullets.createMultiple({
            classType: Player_bullet,
            active: false,
            key: my.sprite.playerBullets.defaultKey,
            repeat: my.sprite.playerBullets.maxSize-1
        });
        my.sprite.playerBullets.propertyValueSet("speed", this.playerBulletSpeed);
        my.sprite.playerBullets.add_trigger_n_cooldown(this.space, this.playerBulletCooldown);
        my.sprite.playerBullets.setXY(-100, -100);
        
        //THIS ONE LINE OF CODE MAKES THE ENTIRE CUSTOM GROUP WORK
        //AND ALLOWS FOR CHILD UPDATES!!!!!
        this.add.existing(my.sprite.playerBullets);

        //================================================
        //  Start of enemy setup
        my.sprite.crystal_enemies = this.add.group({
            active: true,
            defaultKey: "crystal_enemy",
            maxSize: 5,
            runChildUpdate: true
            }
        );
        let crystal_path = new Phaser.Curves.Spline([
            750, this.crystal_y,
            650, my.sprite.player.y - 70,
            550, this.crystal_y,
            450, my.sprite.player.y - 70,
            350, this.crystal_y,
            250, my.sprite.player.y - 70,
            150, this.crystal_y,
            50, my.sprite.player.y - 70,
        ]);
        
        for (let i = 0; i < 5; i ++){
            let copy = Phaser.Utils.Objects.DeepCopy(crystal_path);
            let h = 4;
            for(let j = 0; j < 5; j++){
                if (j > i){
                    copy.points.unshift({x: 70 + h*160, y:this.crystal_y});
                    h--;
                } else if (j < i){
                    copy.points.push({x: 70 + j*160, y:this.crystal_y});
                }
            }
            copy.points.push({x: 70 + i*160, y:this.crystal_y});
            copy.points.unshift({x: 70 + i*160, y:this.crystal_y}); 
            let follower = new Crystal_enemy(
                this,
                copy,
                70 + i*160,
                this.crystal_y,
                "crystal_enemy"
            );
            follower.setScale(0.5);
            my.sprite.crystal_enemies.add(follower, true);
            follower.makeActive();
        }
        console.log(my.sprite.crystal_enemies);
        
        my.sprite.ice_bullets = this.add.group({
            active: true,
            defaultKey: "ice",
            maxSize: 20,
            runChildUpdate: true
            }
        );
        my.sprite.ice_bullets.createMultiple({
            classType: Ice_bullet,
            active: false,
            key: my.sprite.ice_bullets.defaultKey,
            repeat: my.sprite.ice_bullets.maxSize-1
        });
        my.sprite.ice_bullets.propertyValueSet("speed", this.enemyBulletSpeed);
        my.sprite.ice_bullets.setXY(-100, -100);
        //======================================================
        // Game over text
        this.gameOver = this.add.bitmapText(game.config.width/2, game.config.height/2, 'text', 'Game Over', 32).setOrigin(0.5);
        this.gameOver.visible = false;
        this.restartText = this.add.bitmapText(game.config.width/2, (game.config.height/2) + 20, 'text', 'Press R to restart', 32).setOrigin(0.5);
        this.restartText.visible = false;
        this.restartKey = this.input.keyboard.addKey("R");
        this.restartKey.on('down', (key, event) => {
            if (this.playerHealth < 1){
                this.reset();
            }
        })
    }
    update(){   
        let my = this.my;
        if (this.playerHealth < 1){
            my.sprite.heart3_half.visible = false;
            my.sprite.heart3_empty.visible = true;
            for (let ice_enemy of my.sprite.crystal_enemies.getChildren()){
                ice_enemy.makeInactive();
            }
            //Maybe play animation of sun exploding
            this.gameOver.visible = true;
            this.restartText.visible = true;
            console.log("You ded now");
            //this.pause()
        } else{
            switch(this.playerHealth){
                case 5:
                    my.sprite.heart1_full.visible = false;
                    my.sprite.heart1_half.visible = true;
                    break;
                case 4:
                    my.sprite.heart1_half.visible = false;
                    my.sprite.heart1_empty.visible = true;
                    break;
                case 3:
                    my.sprite.heart2_full.visible = false;
                    my.sprite.heart2_half.visible = true;
                    break;
                case 2:
                    my.sprite.heart2_half.visible = false;
                    my.sprite.heart2_empty.visible = true;
                    break;
                case 1:
                    my.sprite.heart3_full.visible = false;
                    my.sprite.heart3_half.visible = true;
                    break;
                default:
                    console.log("You full health (i think)");
            }
            //Spawn bullets where the player presses space
            my.sprite.playerBullets.spawn(my.sprite.player.x, my.sprite.player.y);
            //Allow the player to move left or right
            my.sprite.player.update();
            
            //Check to see if the player bullet hit any enemies
            for (let bullet of my.sprite.playerBullets.getChildren()){
                if (bullet.active){
                    let hit = this.check_hit_enemy(bullet, my.sprite.crystal_enemies);
                    if (hit == null){
                        console.log("Bullet still flying");
                        //this.enemy_shot(bullet, my.sprite.crystal_enemies);
                        //Now check to see if it hit the clouds
                    }
                }
            }

            //Check to see if any of the ice bullets hit the player
            for (let bullet of my.sprite.ice_bullets.getChildren()){
                if (bullet.active){
                    if (this.collides(bullet, my.sprite.player)){
                        bullet.makeInactive();
                        this.playerHealth--;
                        console.log("Lost 1 health");
                    }
                }
            }

            //Have the ice enemies shoot bullets at a set interval of time
            if (this.iceCounter >= this.iceBulletCooldown){
                for (let ice_enemy of my.sprite.crystal_enemies.getChildren()){
                    if (ice_enemy.active == true){
                        let ice_bullet = my.sprite.ice_bullets.getFirstDead();
                        if (ice_bullet != null){
                            ice_bullet.makeActive(ice_enemy.x, ice_enemy.y);
                        }
                        ice_enemy.shoot = false;
                    }
                }
             this.iceCounter = 0;
            }
            this.iceCounter++;
        }
    }
    check_hit_enemy(bullet, enemygroup){
        for (let enemy of enemygroup.getChildren()){
            if (this.collides(bullet, enemy)){
                bullet.makeInactive();
                enemy.makeInactive();
                return enemy;
            }
        }
        return null;
    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    reset(){
        let i = 0;
        for (let ice_enemy of this.my.sprite.crystal_enemies.getChildren()){
            ice_enemy.x = 70 + i*160;
            ice_enemy.y = this.crystal_y;
            ice_enemy.makeActive();
            i++;
        }
        this.my.sprite.heart1_full.visible = true;
        this.my.sprite.heart1_empty.visible = false;
        this.my.sprite.heart2_full.visible = true;
        this.my.sprite.heart2_empty.visible = false;
        this.my.sprite.heart3_full.visible = true;
        this.my.sprite.heart3_empty.visible = false;
        this.gameOver.visible = false;
        this.restartText.visible = false;
        this.playerHealth = 6;
    }
}