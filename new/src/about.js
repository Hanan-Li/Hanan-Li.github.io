let i = 0;
let rev = 0;
let parts = 0;
let pretext = "the "
let txts = ["Software Engineer.", "Game Developer.", "Mediocre Guitarist."] 

let speed = 80;

function typeWriter() {
    let txt = txts[parts];
    if (i < txt.length) {
        document.getElementById("typewrite").innerHTML += txt.charAt(i);
        i++;
        if(i < txt.length){
            setTimeout(typeWriter, speed);
        }
        else{
            rev = i;
            setTimeout(typeWriter, 2000);
        }
    
    }
    else if(rev > 0){
        rev--;
        document.getElementById("typewrite").innerHTML = pretext + txt.substring(0, rev);
        
        setTimeout(typeWriter, speed);
        
    }
    else{
        i = 0;
        parts = (parts + 1) % txts.length;
        setTimeout(typeWriter, speed);
    }
  
}

window.addEventListener('load', (event) => {
    let txt = txts[parts];
    if (i < txt.length) {
        document.getElementById("typewrite").innerHTML = pretext;
        document.getElementById("typewrite").innerHTML += txt.charAt(i);
        i++;
        console.log("hey");
        setTimeout(typeWriter, speed);
    }
});
