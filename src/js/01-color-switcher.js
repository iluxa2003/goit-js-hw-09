const changeButton = document.querySelector("button[data-start]")
const stopButton = document.querySelector("button[data-stop]")
const body = document.querySelector('body');
let timerId = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeEvent(){
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
}
const  changeButtonListener = event => {
    // setInterval(changeEvent, 1500)
    changeButton.disabled = true;
    stopButton.disabled = false;
    timerId = setInterval(() => {
        changeEvent();
      }, 1000);
}
changeButton.addEventListener("click", changeButtonListener);
stopButton.addEventListener("click",() =>{
    stopButton.disabled = true;
    changeButton.disabled = false;
    clearInterval(timerId);
})