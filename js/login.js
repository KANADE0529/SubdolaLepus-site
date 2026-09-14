
const progressFill = document.getElementById("progressFill");
const percentText = document.getElementById("percentText");
const statusText = document.getElementById("statusText");
const enterArea = document.getElementById("enterArea");
const logBox = document.getElementById("logBox");

const logLines = [
  ["[ OK ]  Establishing terminal core", "ok"],
  ["[ OK ]  Mounting subject archive", "ok"],
  ["[ OK ]  Syncing event records", "ok"],
  ["[ OK ]  Loading IF / PARO branches", "ok"],
  ["[ OK ]  Validating restricted sector", "warn"],
  ["[ OK ]  Applying theme: DARK SAND GOLD", "ok"],
  ["[ OK ]  Session key accepted", "ok"],
  ["[DONE]  Startup sequence complete", "ok"]
];

const statusSteps = [
  {p:8,  t:"Initializing core system..."},
  {p:22, t:"Mounting archive storage..."},
  {p:37, t:"Loading subject index..."},
  {p:51, t:"Syncing records..."},
  {p:68, t:"Checking branch data..."},
  {p:84, t:"Verifying access permissions..."},
  {p:100,t:"Boot complete. Terminal ready."}
];

let current = 0;
let logIndex = 0;

function appendLog(text, cls=""){
  const line = document.createElement("div");
  line.className = "log-line " + cls;
  line.textContent = text;
  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

function runBoot(){
  const timer = setInterval(()=>{
    current += Math.floor(Math.random() * 7) + 3;
    if(current > 100) current = 100;

    progressFill.style.width = current + "%";
    percentText.textContent = current + "%";

    for(const step of statusSteps){
      if(current >= step.p){
        statusText.textContent = step.t;
      }
    }

    if(logIndex < logLines.length && current >= (logIndex + 1) * 12){
      appendLog(logLines[logIndex][0], logLines[logIndex][1]);
      logIndex++;
    }

    if(current >= 100){
      clearInterval(timer);
      while(logIndex < logLines.length){
        appendLog(logLines[logIndex][0], logLines[logIndex][1]);
        logIndex++;
      }
      enterArea.classList.add("show");
    }
  }, 260);
}

function updateClock(){
  const text = new Date().toLocaleTimeString("zh-TW",{
    hour:"2-digit",
    minute:"2-digit"
  });
  document.getElementById("timeText").textContent = text;
}

function enterTerminal(){
  if (current < 100) return;
  localStorage.setItem("loggedIn", "true");
  window.location.href = "dashboard.html";
}

document.addEventListener("keydown",(e)=>{
  if(e.key === "Enter" && enterArea.classList.contains("show")){
    enterTerminal();
  }
});

updateClock();
setInterval(updateClock,10000);
runBoot();
