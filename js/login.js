const btn=document.getElementById('btn');
const terminal=document.getElementById('terminal');
const id=document.getElementById('id');

btn.onclick=()=>{
terminal.innerHTML=`
<div class="line"><span class="prompt">&gt;</span> RECEIVING INPUT...</div>
<div class="line"><span class="prompt">&gt;</span> ID / ${id.value}</div>
<div class="line"><span class="prompt">&gt;</span> PASS / ••••••••</div>
<div class="line"><span class="prompt">&gt;</span> REQUEST ACCEPTED</div>
<div class="line typing"><span class="prompt">&gt;</span> TRANSFERRING...</div>
`;

setTimeout(()=>{
localStorage.setItem("loggedIn", "true");
window.location.href='loading.html';
},900);
};

