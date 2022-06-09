let state = "init";

document.getElementById("initBtn").addEventListener("click", ()=>{
    transition(0);

})
document.getElementById("standbyContainer").addEventListener("click", ()=>{
    if(state == "standby") {
        transition(1);
    }
})

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