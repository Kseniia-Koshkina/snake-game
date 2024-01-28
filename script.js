class Cell{  // class for snake chains and items to eat 
    constructor(x,y,size){
        this.x=x;
        this.y=y;
        this.size = size;
    }
}

class forward{ // direction class 
    constructor(up,down,right,left){
        this.up = up;
        this.down = down;
        this.right = right;
        this.left = left;
    }
}

cellsize=(w = 800, num = 40)=>{ // return the size(width == height) with canvas width / number of cells
    return w/num;
}

draw_board=(w = 800, num = 40)=>{ // draw a board with precise density of cells
    let snake_width = w/num;
    let change = true;
    for(let i =0; i<num; i++){
        y = i*snake_width;
        for (let k = 0; k< num; k++){
            x= k*snake_width;
            if (change)
                ctx.fillStyle="rgba(38,52,69,255)";
            else 
                ctx.fillStyle="rgba(31,40,54,255)";
            ctx.fillRect(x, y, snake_width, snake_width);
            change = !change;
        }
        if (num%2==0)
            change = !change;
    }
    document.getElementById("canvas").style.background = "url(" + canvas.toDataURL() + ")";
}

move=(snake, item)=>{ // captures key pressing and change direction of the snake head
    let step = snake[0].size;
    for (let i = 0; i<snake.length-1;i++){
        snake[snake.length-i-1].x=snake[snake.length-i-2].x;
        snake[snake.length-i-1].y=snake[snake.length-i-2].y; 
    }
    document.onkeydown =(event)=>{
        if (event.key == "ArrowLeft" && !toMove.right){
            toMove.left = true;
            toMove.right = false;
            toMove.up = false;
            toMove.down = false;
        }
        if (event.key == "ArrowRight" && !toMove.left){
            toMove.left = false;
            toMove.right = true;
            toMove.up = false;
            toMove.down = false;
        }
        if (event.key == "ArrowUp" && !toMove.down){
            toMove.left = false;
            toMove.right = false;
            toMove.up = true;
            toMove.down = false;
        }
        if (event.key == "ArrowDown" && !toMove.up){
            toMove.left = false;
            toMove.right = false;
            toMove.up = false;
            toMove.down = true;
        }
    };
    if (toMove.left)
        snake[0].x -= step;
    if (toMove.right)
        snake[0].x += step;
    if (toMove.down)
        snake[0].y += step;
    if (toMove.up)
        snake[0].y -= step;
    if (snake[0].y < 0 ){
        snake[0].y = 800 - step;
    }
    if (snake[0].y > 800 - step){
        snake[0].y =  0;
    }
    if (snake[0].x < 0 ){
        snake[0].x = 800 - step;
    }
    if (snake[0].x > 800 - step ){
        snake[0].x = 0;
    }


    snake_eat_item(snake, item, snake[snake.length-1]);
    
}

choose_food_position=(item,w=800,num=40)=>{ // chooses randomly snake eat item
    width_of_square = w/num;
    numx = Math.floor(Math.random() * num-1) + 1;
    numy = Math.floor(Math.random() * num-1) + 1;
    item.x = numx * width_of_square;
    item.y = numy * width_of_square;
    console.log(item.x,item.y);
}

draw_snake=(H,ctx)=>{
    ctx.fillStyle="red";
    ctx.fillRect(H.x,H.y,H.size,H.size);
}
draw_item=(H, ctx)=>{
    ctx.fillStyle="rgba(160,160,160,255)";
    ctx.fillRect(H.x,H.y,H.size,H.size);
}
end_game=(snake)=>{
    if (snake.length > 2){
        for (let i = 1; i < snake.length; i++){
            if (snake[0].y == snake[i].y && snake[0].x == snake[i].x){
                return true;
            }
        }
    }
    return false;
    
}
animate=(stop=false)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move(snake, food_item);
    for (var i = 0; i< snake.length;i++){
        draw_snake(snake[i],ctx);
    }
    draw_item(food_item,ctx);
    if (end_game(snake)) 
        stop = true; 
    if (stop)
        return;
    else 
        setTimeout(animate,100);
}
snake_eat_item=(snake, item, snake_tail)=>{
    if (snake[0].x == item.x && snake[0].y == item.y){
        snake.push(new Cell(snake_tail.x, snake_tail.y, cellsize()));
        choose_food_position(item);

    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

let width = canvas.width;
let toMove = new forward(true,false,false,false);
let head = new Cell(400, 400, cellsize());
let snake = [head];
let food_item = new Cell(20, 20, cellsize());

draw_board(width);
choose_food_position(food_item);
draw_snake(snake[0],ctx);
draw_item(food_item,ctx);
animate();
        
