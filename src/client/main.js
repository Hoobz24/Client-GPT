const GPT_4_TURBO_TOKEN = "gpt-4-1106-preview"
const GPT_4_TOKEN = "gpt-4";
const GPT_3_5_TOKEN = "gpt-3.5-turbo-1106";
const DALL_E_3_TOKEN = 'dall-e-3';

var socket = io.connect('http://localhost:5000');

let textArea = document.getElementById('Output');
let inputArea = document.getElementById('Input');
let verLabel = document.getElementById('verLabel');

let apiLabel = document.getElementById('apikey');

let currentVersion = GPT_3_5_TOKEN;


socket.on("connect", () => {
    // either with send()
   
  
  
  });

socket.on("message", data => {

   

    if(currentVersion != DALL_E_3_TOKEN){
        textArea.value = textArea.value + "\n" + data;
    } else {
        var img = document.createElement("img");
        img.src = data;
        var src = document.getElementById("body");
        src.appendChild(img);
        textArea.value = textArea.value + "\n" + "Client-GPT: \n>>Your image has been generated below";
    }
    
    
});
function newQ(){

    let data = [inputArea.value, currentVersion, apiLabel.value]
    socket.send(data);
   
    
}

function setFourTurbo(){
    currentVersion = GPT_4_TURBO_TOKEN;
    verLabel.innerHTML = currentVersion + "(slow query)";
}

function setThreeTurbo(){
    currentVersion = GPT_3_5_TOKEN;
    verLabel.innerHTML = currentVersion;
}

function setFour(){
    currentVersion = GPT_4_TOKEN;
    verLabel.innerHTML = currentVersion;
}

function setDalle(){
    currentVersion = DALL_E_3_TOKEN;
    verLabel.innerHTML = currentVersion;
}