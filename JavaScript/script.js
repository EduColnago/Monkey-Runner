var IntervalID, IntervalCollisionID, IntervalMovementID, IntervalMovementID2, IntervalSpriteID;
var isJumping = false;
var descending = false;
var gameStart = false;
var countSprite = 1;
var dif;
enemyArray = [enemy1, enemy2];
player = document.getElementById("player");
enemy1 = document.getElementById("enemy1");
enemy2 = document.getElementById("enemy2");

player.style.bottom = "0px";
enemy1.style.left = "900px";
enemy2.style.left = "900px";

function jump(oldValue, height) {
    numericPosition = parseInt(oldValue.split("px")[0]);
    
    if (numericPosition >= height && isJumping) {
        isJumping = false;
        descending = true;
    }
    else if (numericPosition <= 5 && descending){
        clearInterval(IntervalID);
        player.style.bottom = "1px";
        descending = false;
    }
    else {
        var mult;
        if (descending){
            mult = -1;
        }
        else if (isJumping)
            mult = 1;
        
        player.style.bottom = `${numericPosition + (5 * mult)}px`;
    
    }
}

function enemyMovement(oldValue, speed, enemy, enemyMultiplier) {
    let numericEnemyPosition = parseInt(enemy.style.left.split("px")[0]);
    
    enemy.style.left = `${numericEnemyPosition - (3 * speed)}px`;

    if (numericEnemyPosition <= -80*enemyMultiplier)
        enemy.style.left = "900px";
    
}

function colision(player, enemy) {
    const a = player.getBoundingClientRect()
    const b = enemy.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top
    return horizontal && vertical
}

function colidiu(player, enemies) {
    let colidiu = false
    enemies.forEach(enemy => {
        if (!colidiu) {
            colidiu = colision(player, enemy);
        }
    });
    return colidiu
}

function updateImage() {
    monkey = document.getElementById("macaco");
    bird = document.getElementById("bird");

    if (countSprite == 5) {
        countSprite = 1;
    }

    monkey.src = `images/macacocorrendo${countSprite}.png`;
    bird.src = `images/bird${countSprite}.png`;
}

function validate() {
    entrada = document.getElementById("email");
    var regex = /(.+)@(.+){2,}\.(.+){2,}/;
    
    if(regex.test(entrada.value)){
        dif = parseInt(document.getElementById("select").value);
        window.location = "Index.html";
    }
}

window.onkeydown = x =>  {
    if (!isJumping && !descending){
        if (x.code === "Space") {
            isJumping = true;
            IntervalID = setInterval(() => jump(player.style.bottom, 125), 12);
        }
    }
    if (!gameStart){
        IntervalMovementID = setInterval(() => enemyMovement(enemyArray[0].style.left, 1, enemyArray[0], 1), 10);
        IntervalMovementID2 = setInterval(()=> enemyMovement(enemyArray[1].style.left, 2, enemyArray[1], Math.floor(Math.random() * 20) + 12), 10);
        gameStart = true;
    }

    IntervalCollisionID = setInterval(() => {
        if(colidiu(player, enemyArray)){
            gameStart = false;
            clearInterval(IntervalMovementID);
            clearInterval(IntervalID);
            clearInterval(IntervalMovementID2);
            clearInterval(IntervalCollisionID);
            clearInterval(IntervalSpriteID);
            window.location = "gameover.html";
            
    }}, 10);
};

IntervalSpriteID = setInterval(() => {
    updateImage(countSprite++);
}, 150)
