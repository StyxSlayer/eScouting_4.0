let state = "init";

window.onload = function() {
    var img = new Image();
    img.src = '/img/field.png';
    var canvas = document.getElementById('fieldCanvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.onload = function () {
    document.getElementById("fieldCanvas").addEventListener("click", ()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        var pos = getMousePos(canvas, event);
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        autoPos[0] = Math.round(pos.x);
        autoPos[1] = Math.round(pos.y);
        console.log("canvas clicked, x: " + autoPos[0] + ", y: " + autoPos[1]);
    })
    }
}

document.getElementById("initBtn").addEventListener("click", ()=>{
    transition(0);

})
document.getElementById("standbyLabel").addEventListener("click", ()=>{
    if(state == "standby") {
        transition(1);
    }
})

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
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

        }, 1000)
        state = "standby"
        return;

    }
    if(i==1 && state == "standby"){
        
        

    }
}