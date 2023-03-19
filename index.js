
const X_CLASS='x'
const CIRCLE_CLASS='circle' 
const cellElements =document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement=document.querySelector('#winnigmessage')
const restartBtn=document.getElementById('restartButton')
const winningMessageTextElement=document.querySelector(
    '[data-winnig-message-text]'
)
let circleTurn
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
] 

startGame()

restartBtn.addEventListener('click',startGame)

function startGame(){
    circleTurn=false
    
    cellElements.forEach(cel=>{
        cel.classList.remove(X_CLASS)
    cel.classList.remove(CIRCLE_CLASS)
    cel.removeEventListener('click',handleClick)
        cel.addEventListener('click',handleClick,{once:true})
    })
    setBordHoverClass() 
    winningMessageElement.classList.remove('show_class')

}

function handleClick(e){
    console.log(e)
    const cell =e.target
    const currentClass=circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)

    if(checkWing(currentClass)){
       endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurn()
        setBordHoverClass()
    }
    
    
}

function endGame(value){
    if(value){
        winningMessageTextElement.innerText='Draw!'
    }else{
        winningMessageTextElement.innerText=`${circleTurn? "O's" : "x's"} Winns!`
           
    }
    winningMessageElement.classList.add('show_class')
}


function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS)||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn=!circleTurn
}

function setBordHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS) 
    }

}

function checkWing(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
       return combination.every(index=>{
         return cellElements[index].classList.contains(currentClass)
       })
    })
}