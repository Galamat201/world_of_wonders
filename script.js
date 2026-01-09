const words={
  en:["BOOK","CITY","APPLE","FRIEND","SCHOOL","NATURE","COMPUTER"]
};

let lang="en",
    level=1,
    word="",
    input="",
    used={en:[]};

const slots=document.getElementById("slots");
const letters=document.getElementById("letters");
const msg=document.getElementById("msg");

function shuffle(s){
  return s.split('').sort(()=>0.5-Math.random()).join('')
}

function pickWord(){
  let list=words[lang].filter(
    w=>!used[lang].includes(w)&&w.length<=level+3
  );
  if(!list.length) return null;
  let w=list[Math.floor(Math.random()*list.length)];
  used[lang].push(w);
  return w;
}

function load(){
  input="";
  msg.textContent="";
  slots.className="slots";
  letters.innerHTML="";
  slots.innerHTML="";

  word=pickWord();
  if(!word){
    msg.textContent="🎉 all words are finishedы";
    return;
  }

  document.getElementById("lvl").textContent=level;

  for(let i=0;i<word.length;i++){
    let s=document.createElement("div");
    s.className="slot";
    slots.appendChild(s);
  }

  shuffle(word).split('').forEach(l=>{
    let b=document.createElement("button");
    b.textContent=l;
    b.onclick=()=>addLetter(l,b);
    letters.appendChild(b);
  });
}

function addLetter(l,b){
  if(input.length>=word.length) return;

  input+=l;
  slots.children[input.length-1].textContent=l;
  b.disabled=true;

  if(input.length===word.length){
    if(input===word){
      [...slots.children].forEach(s=>s.classList.add("correct"));
      level++;
      setTimeout(load,800);
    }else{
      slots.classList.add("shake");
      setTimeout(load,500);
    }
  }
}

function clearInput(){
  input="";
  [...slots.children].forEach(s=>s.textContent="");
  [...letters.children].forEach(b=>b.disabled=false);
}

function hint(){
  for(let i=0;i<word.length;i++){
    if(!slots.children[i].textContent){
      let letter=word[i];
      slots.children[i].textContent=letter;
      input+=letter;
      [...letters.children].forEach(b=>{
        if(b.textContent===letter && !b.disabled){
          b.disabled=true;
          return;
        }
      });
      break;
    }
  }
}

function setLang(l){
  lang=l;
  level=1;
  used[lang]=[];
  load();
}

load();
