let state = "init", matchNum, scoutNum, teamNum, timer = 150, delay = true;
let startAudio = new Audio("/sfx/start.wav")
let clickAudio = new Audio("/sfx/click.wav")
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
let keys = [];
for(let i = 0; i < settings.auto.length; i++){
    keys.push(settings.auto[i].trigger);
}
for(let i=0; i<settings.tele.length; i++){
    keys.push(settings.tele[i].trigger);
}
let uniqueKeys = keys.filter((i, index) => {
    return keys.indexOf(i) === index;
});

window.addEventListener('keydown', function (keystroke) {

    let keyBool = false;
    if(keystroke.key == " " && state == "standby"){
        transition(1)
    }

    uniqueKeys.forEach((keybind)=>{
        if(keystroke.key == keybind){
            keyBool = true;
            
        }
    }
    )
    if(!keyBool){
        return;
    }

    for(let i=0; i<uniqueKeys.length; i++){
        
        if(state == "auto"){
            if(settings.auto[i].trigger == keystroke.key){
                clickEvt(settings.auto[i].writeType, settings.auto[i].writeLoc);
            }
        }
        if(state == "tele"){
            if(settings.tele[i].trigger == keystroke.key){
                clickEvt(settings.tele[i].writeType, settings.tele[i].writeLoc);
            }
        }
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
function generateMainPage(stage){
    document.getElementById("display-match").innerHTML = "Match:  " + matchNum;
    document.getElementById("display-team").innerHTML = "Team: " + teamNum;
    if(stage == "auto"){
        for(i=0; i<settings.auto.length; i++){
            const box = document.createElement("div")
            box.innerHTML = settings.auto[i].label;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.auto[i].columnStart;
            box.style.gridColumnEnd = settings.auto[i].columnEnd;
            box.style.gridRowStart = settings.auto[i].rowStart;
            box.style.gridRowEnd = settings.auto[i].rowEnd;
            let wType = settings.auto[i].writeType;
            let wLoc = settings.auto[i].writeLoc;
            box.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.auto[i].columnEnd-1) + "/" + (settings.auto[i].columnEnd-1);
            boxLabel.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxLabel.innerHTML = settings.auto[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataValues[wLoc];
            boxCount.style.gridColumn = settings.auto[i].columnStart + "/" + settings.auto[i].columnStart;
            boxCount.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxCount.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxCount);
            
        }
    }
    if(stage == "tele"){
        for(i=0; i<settings.tele.length; i++){
            const box = document.createElement("div")
            box.innerHTML = settings.tele[i].label;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.tele[i].columnStart;
            box.style.gridColumnEnd = settings.tele[i].columnEnd;
            box.style.gridRowStart = settings.tele[i].rowStart;
            box.style.gridRowEnd = settings.tele[i].rowEnd;
            let wType = settings.tele[i].writeType;
            let wLoc = settings.tele[i].writeLoc;
            box.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.tele[i].columnEnd-1) + "/" + (settings.tele[i].columnEnd-1);
            boxLabel.style.gridRow = (settings.tele[i].rowEnd-1) + "/" + (settings.tele[i].rowEnd-1);
            boxLabel.innerHTML = settings.tele[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataValues[wLoc];
            boxCount.style.gridColumn = settings.tele[i].columnStart + "/" + settings.tele[i].columnStart;
            boxCount.style.gridRow = (settings.tele[i].rowEnd-1) + "/" + (settings.tele[i].rowEnd-1);
            boxCount.addEventListener("click", ()=>clickEvt(wType, wLoc))
            document.getElementById("mainPage").appendChild(boxCount);
        }
        console.log("tele generated");
    }
    if(stage == "after"){
        for(i=0; i<settings.after.length; i++){
            if(writeType == "cyc"){
                const container = document.createElement("div")
                container.classList.add("switchContainer")
                container.innerHTML = "[" + settings.after[i].cycOptions + "] " + settings.after[i].label;
                container.classList.add("cyc")
                container.addEventListener("click", ()=>clickEvt("afterCyc", settings.after[i].writeLoc))
                document.getElementById("mainPage").appendChild(container)
            }
            
        }
    }
}
function timerStart(){
    timer = 150;
    delay = true;
    updateTimer();
    let timerFunction = setInterval(updateTimer, 1000)
    console.log("started")
}
function updateTimer(){
    document.getElementById("display-timer").innerHTML = timer;

    if(settings.imported.transitionMode == "manual"){
        timer--;
    }
    if(settings.imported.transitionMode == "auto"){
        if (timer == 135 && delay) {
            timer = 136; //136??? check delay
            delay = !delay
          }
          if (timer == 135 && !delay) {
            state = "tele"
            transition(2)
          }
          if(timer == 30){
            state = "end"
            transition(3)
          }
          if(timer == 0) {
            console.log("Game over");
            timer -= 1;
            state = "after";
            transition(4)
          }
          if (timer > 0) {
            timer --;
          }
    }
    if(timer == 0) {
        console.log("Game over");
        timer -= 1;
        state = "after";
        transition(4)
    }

    
}
let incArr = []
function clickEvt(type, loc, rev = null){
    console.log(type + " " + loc);
    clickAudio.play();
    if(type == "int"){
        document.getElementById("")

        if(rev){
            dataValues[loc]--;
        }
        if(!rev){
            dataValues[loc]++;
        }
    }
    if(type == "bool"){
        dataValues[loc] = !dataValues[loc];
    }
    if(type == "inc"){
        if(incArr.includes(loc)){
            incArr.splice(incArr.indexOf(loc), 1);
        }
        else{
            incArr.push(loc);
        }
    }
    console.log(dataValues);
    document.getElementById("label" + loc).innerHTML = dataValues[loc];
}
setInterval( ()=>{
    for(let i=0; i<incArr.length; i++){
        dataValues[incArr[i]]++
        document.getElementById("label" + incArr[i]).innerHTML = dataValues[incArr[i]];
    }
}, 1000)

function transition(i){
    if(i==0 && state == "init"){
        scoutNum = document.getElementById("initIdForm").value;
        matchNum = document.getElementById("initMatchForm").value;
        teamNum = document.getElementById("initNumberForm").value;


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
        timerStart()
        startAudio.play();
        document.getElementById("initPage").style.display = "none";
        document.getElementById("mainPage").style.display = "grid";
        generateMainPage("auto")
        state = "auto";
    }
    if(i==2){
        // document.getElementById("mainPage").textContent = '';
        let removeElem = (settings.auto.length)*3        
        for(let i=0; i<removeElem; i++){
            
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        generateMainPage("tele")
        state = "tele"
    }
    if(i == 4  && state == "after"){
        let removeElem = (settings.tele.length)*3        
        for(let i=0; i<removeElem; i++){
            
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        generateMainPage("after");
    }
}













//settings ideas: flashbang (visual feedback)
//annoying reminders: did you put in auto time? climb bool? at edit screen
//buffers for phase switching
//manual vs auto phase switching
//hour logging?
//till next break>??
//custom keybinds
//custom colour themes
//custom sounds but its already implemented :shrug:



