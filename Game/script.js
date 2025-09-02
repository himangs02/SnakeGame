let inputDir ={x:0,y:0};
let speed = 5;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15} 
]
food = {x:6,y:7};
//Game Function 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;

    }
    lastPaintTime=ctime;
    gameEngine();

}
function isCollide(sarr) {
    // Collision with self
    for (let index = 1; index < sarr.length; index++) {
        if (sarr[index].x === sarr[0].x && sarr[index].y === sarr[0].y) {
            return true;
        }
    }

    // Collision with wall
    if (
        sarr[0].x >= 18 || sarr[0].x <= 0 ||
        sarr[0].y >= 18 || sarr[0].y <= 0
    ) {
        return true;
    }

    return false;
}
function gameEngine(){
    //part1 Updating the snake array and food 
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!!");
        snakeArr=[{x:13,y:15}];

        score=0;


    }
    //if you have eaten the food increment the food and regenerate the food 
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        score+=1;
        scoreBox.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a = 2;
        let b = 16 ;

        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake ;
    for (let i = snakeArr.length-2; i >= 0; i--) {
        
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;




    

    //part2 display the snake 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');

        }

        board.appendChild(snakeElement);

    });
        //Display the Food 
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);


}

//Main logic  
let hiscore=localStorage.getItem("HighScore");

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
             inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
             inputDir.x=-1;
            inputDir.y=0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
             inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})
