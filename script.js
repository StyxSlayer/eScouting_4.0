let state = "init";
let startAudio = new Audio("/sfx/start.wav")
var img = new Image();
img.src = '/img/field.png';
var canvas = document.getElementById('fieldCanvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0);
document.getElementById("fieldCanvas").addEventListener("click", ()=>{
    canvasClicked()
})
document.getElementById("initBtn").addEventListener("click", ()=>{
    transition(0);
})
window.addEventListener('keydown', function (keystroke) {
    if(keystroke.key == " "){
        transition(1)
    }
}
)

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function canvasClicked(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var pos = getMousePos(canvas, event);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    console.log("canvas clicked, x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y));
}

function transition(i){
    if(i==0 && state == "init"){
        document.getElementById("initFormContainer").classList.add("transitionEvent0");
        setTimeout(()=>{
            document.getElementById("initFormContainer").classList.add("hideClass");
        }, 100)
        document.getElementById("initDivLine").classList.add("transitionEvent1");
        document.getElementById("standbyContainer").classList.add("transitionEvent0Rev");
        setTimeout(()=>{
            document.getElementById("standbyContainer").style.display = "flex";
            canvasClicked()
        }, 1000)
        state = "standby"
        return;

    }
    if(i==1 && state == "standby"){
        startAudio.play();

    }
}

