function clickKey(key,func,para){
    // 按下只执行一次的按键封装
    if(key.isDown && !key.click){
        func(para);
        key.click = true;
    }else if(key.isUp){
        key.click = false;
    }
}
function cursorsUpDonw(game){
    /* === 旧的按键检测方法  =====
    if(game.cursors.down.isDown){
        if(!game.down_click){
            game.player.y += game.par;
            game.down_click = true;
        }
    }else if(game.cursors.down.isUp){
        game.down_click = false;
    }
    */
    this.stand = false;

    clickKey(game.cursors.up, function(){
        // game.player.y -= game.par;
        // if(game.player.direction.x == 0 && game.player.direction.y == -1) {
        if(!game.SKey.isDown){
            playerMove(game);
        }else{
            game.player.direction.x = 0;
            game.player.direction.y = -1;
            game.player.animations.play('up',1);
        }
        // game.time.alive = true;
    },game);

    clickKey(game.cursors.down, function(){
        // game.player.y += game.par;
        // if(game.player.direction.x == 0 && game.player.direction.y == 1){
        if(!game.SKey.isDown){
            // 方向没变
            playerMove(game);
        }else{
            game.player.direction.y = 1;
            game.player.direction.x = 0;
            game.player.animations.play('down',1);
        }
        // game.time.alive = true;
    },game);

    clickKey(game.cursors.left, function(){
        // game.player.x -= game.par;
        // if(game.player.direction.x == -1 && game.player.direction.y == 0) {
        if(!game.SKey.isDown){
            playerMove(game);
        }else{
            game.player.direction.x = -1;
            game.player.direction.y = 0;
            game.player.animations.play('left', 1);
        }
        // game.time.alive = true;
    },game);

    clickKey(game.cursors.right, function(){
        // game.player.x += game.par;
        // if(game.player.direction.x == 1 && game.player.direction.y == 0) {
        game.player.direction.x = 1;
        game.player.direction.y = 0;
        game.player.animations.play('right', 1);
        if(!game.SKey.isDown){
            playerMove(game);
        }
        // game.time.alive = true;
    },game);

    // == 射击 ==
    clickKey(game.AKey, ()=>{
        bullet = game.group_bullet.create(
            // 创建新的子弹,位置在人物'前'方
            game.player.x,// + game.direction.x * game.par,
            game.player.y,// + game.direction.y * game.par,
            'bullet');
        bullet.anchor.setTo(1,0);
        bullet.scale.setTo(0.1,0.1);
        bullet.direction = deepCopy(game.player.direction);  // 注意这里要深拷贝

        bullet.animations.add('up',['up.png'],1);
        bullet.animations.add('left',['left.png'],1);
        bullet.animations.add('down',['down.png'],1);
        bullet.animations.add('right',['right.png'],1);
        if(bullet.direction.x == 0 && bullet.direction.y == 1){
            bullet.animations.play('down',1);
        }else if(bullet.direction.x == 0 && bullet.direction.y == -1){
            bullet.animations.play('up',1);
        }else if(bullet.direction.x == 1 && bullet.direction.y == 0){
            bullet.animations.play('right',1);
        }else if(bullet.direction.x == -1 && bullet.direction.y == 0){
            bullet.animations.play('left',1);
        }
        game.time.alive = true;
    },game);

    // == 停止一个回合 ==
    clickKey(game.SpaceKey, ()=>{
        game.time.alive = true;
    },game);
    // == 移动视角 ===
    // clickKey(game.SKey, ()=>{
    //
    // },game);

    playerMove = (game)=>{
        // game.player.body.velocity.x = game.player.direction.x * 500;
        // game.player.body.velocity.y = game.player.direction.y * 500;

        next = game.map.getTile(game.player.x/game.par + game.player.direction.x,
            game.player.y/game.par + game.player.direction.y);
        last = game.map.getTile(game.player.x/game.par,game.player.y/game.par);

        if(next!=null && next.index != 5 && next.index != 6){
            game.player.x += game.player.direction.x * game.par;
            game.player.y += game.player.direction.y * game.par;

            game.dropDaolu(last);
            game.time.alive = true;
        }
    };
}

print = (s)=>{
    console.log(s);
};

let deepCopy=(sourceObj)=>{
    // 深拷贝  https://blog.csdn.net/linusc/article/details/78710390
    return JSON.parse(JSON.stringify(sourceObj))
};