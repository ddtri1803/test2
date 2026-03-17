let step = 0;
const state = {
  diagnosis: {},
  weeks: {1:false,2:false,3:false},
  roles: {cleanser:false,serum:false,moisturizer:false},
  warning: false,
  chatIndex: 0,
  chatDone: false,
  name: '',
  phone: ''
};

const view = document.getElementById('view');
const stepLabel = document.getElementById('stepLabel');
const progressBar = document.getElementById('progressBar');

const q = [
  {k:'concern', t:'Main concern?', sub:'Vấn đề chính?', o:['Acne','Dark Spots','Sensitive','Aging']},
  {k:'skin_type', t:'Skin type?', sub:'Loại da?', o:['Oily','Dry','Combination']},
  {k:'severity', t:'Severity level?', sub:'Mức độ?', o:['Mild','Moderate','Severe']}
];

const chat = [
  {sys:'System: We prepared your recommended path. / Hệ thống: Đã chuẩn bị phác đồ đề xuất.'},
  {sys:'System: How consistent is your routine? / Mức độ duy trì quy trình?', replies:['Daily','Most days','Irregular']},
  {sys:'System: Any irritation this week? / Có kích ứng tuần này không?', replies:['No','Mild','Yes']}
];

function setStep(n){
  step=Math.max(0,Math.min(10,n));
  stepLabel.textContent=step;
  progressBar.style.width=`${step*10}%`;
  render();
}

function render(){
  if(step===0){
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Start</h2><p class="text-sm text-slate-500 mb-4">Interactive demo requires continuous actions.</p><button class="primary" data-a="start">Begin Journey</button></div>`;
    return bind();
  }
  if(step>=1&&step<=3){
    const qq=q[step-1];
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Diagnosis Quiz ${step}/3</h2><p class="text-sm text-slate-500 mb-3">${qq.t} / ${qq.sub}</p><div class="grid gap-2">${qq.o.map((x,i)=>`<button class="choice" data-a="ans-${i}">${x}</button>`).join('')}</div></div>`;
    return bind();
  }
  if(step===4){
    const msgs=chat.slice(0,state.chatIndex+1);
    const curr=chat[state.chatIndex];
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Consultation Chat</h2><div class="mt-3 h-60 overflow-auto border rounded-lg p-3 bg-slate-50 space-y-2">${msgs.map(m=>`<div class="bg-white border rounded-lg p-2 text-sm">${m.sys}</div>`).join('')}${state.chatDone?'<div class="bg-slate-900 text-white rounded-lg p-2 text-sm w-fit ml-auto">Done</div>':''}</div><div class="flex flex-wrap gap-2 mt-3">${(!state.chatDone&&curr&&curr.replies)?curr.replies.map((r,i)=>`<button class="choice w-auto" data-a="reply-${i}">${r}</button>`).join(''):''}</div>${state.chatDone?'<button class="primary mt-4" data-a="to5">Continue</button>':''}</div>`;
    return bind();
  }
  if(step===5){
    const all=Object.values(state.weeks).every(Boolean);
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Treatment Plan Timeline</h2><p class="text-sm text-slate-500 mb-3">Tap each week to reveal details.</p><div class="grid md:grid-cols-3 gap-2">${[1,2,3].map(w=>`<button class="choice" data-a="w-${w}">Week ${w}<br><span class="text-xs text-slate-500">${state.weeks[w]?'Opened':'Click to open'}</span></button>`).join('')}</div><div class="mt-3 space-y-2 text-sm">${state.weeks[1]?'<div class="panel">Week 1: Calm inflammation.</div>':''}${state.weeks[2]?'<div class="panel">Week 2: Start active correction.</div>':''}${state.weeks[3]?'<div class="panel">Week 3: Stabilize and prevent relapse.</div>':''}</div>${all?'<button class="primary mt-4" data-a="to6">Continue</button>':'<p class="text-xs text-slate-500 mt-3">Open all timeline items to continue.</p>'}</div>`;
    return bind();
  }
  if(step===6){
    const all=Object.values(state.roles).every(Boolean);
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Treatment Kit Roles</h2><p class="text-sm text-slate-500 mb-3">Click each role to expand relation by phase.</p><div class="grid md:grid-cols-3 gap-2"><button class="choice" data-a="r-cleanser">Cleanser</button><button class="choice" data-a="r-serum">Serum</button><button class="choice" data-a="r-moisturizer">Moisturizer</button></div><div class="mt-3 space-y-2 text-sm">${state.roles.cleanser?'<div class="panel">Cleanser · Phase 1 · Morning/Night · Keeps pores clear before actives.</div>':''}${state.roles.serum?'<div class="panel">Serum · Phase 2 · Night · Targets core concern progression.</div>':''}${state.roles.moisturizer?'<div class="panel">Moisturizer · Phase 3 · Both · Protects barrier for adherence.</div>':''}</div>${all?'<button class="primary mt-4" data-a="to7">Continue</button>':'<p class="text-xs text-slate-500 mt-3">Open all product roles to continue.</p>'}</div>`;
    return bind();
  }
  if(step===7){
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">What if I use my own products?</h2><p class="text-sm text-slate-500 mb-4">Simulate incorrect behavior.</p><button class="primary bg-amber-600" data-a="warn">What if I use my own products?</button>${state.warning?'<div class="warning mt-4">Warning: incorrect substitution can cause irritation spikes, delayed results, and relapse.</div><button class="primary mt-4" data-a="to8">Continue</button>':''}</div>`;
    return bind();
  }
  if(step===8){
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Conversion Checkpoint</h2><p class="text-sm text-slate-500 mb-4">Assigned kit is ready after guided assessment.</p><button class="primary" data-a="to9">Proceed to Final Form</button></div>`;
    return bind();
  }
  if(step===9){
    view.innerHTML=`<div class="fade"><h2 class="text-xl font-semibold">Final Form</h2><p class="text-sm text-slate-500 mb-4">Shown only at the end.</p><form id="f" class="grid gap-2 max-w-sm"><input name="name" required placeholder="Name" class="choice"><input name="phone" required placeholder="Phone" class="choice"><button class="primary" type="submit">Submit</button></form></div>`;
    document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target);state.name=d.get('name');state.phone=d.get('phone');setStep(10);});
    return;
  }
  if(step===10){
    view.innerHTML=`<div class="fade"><h2 class="text-2xl font-semibold">Success</h2><p class="text-sm text-slate-600">${state.name} · ${state.phone}</p><p class="text-sm text-slate-500 mt-2">Journey completed through a controlled treatment system.</p><button class="primary mt-4" data-a="restart">Restart</button></div>`;
    return bind();
  }
}

function bind(){
  view.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{
    const a=b.dataset.a;
    if(a==='start') return setStep(1);
    if(a.startsWith('ans-')){const qq=q[step-1]; state.diagnosis[qq.k]=qq.o[+a.split('-')[1]]; return setStep(step+1);}
    if(a.startsWith('reply-')){ if(state.chatIndex<chat.length-1){state.chatIndex++; if(state.chatIndex===chat.length-1) state.chatDone=true;} else {state.chatDone=true;} return render(); }
    if(a==='to5') return setStep(5);
    if(a.startsWith('w-')){const w=+a.split('-')[1]; state.weeks[w]=!state.weeks[w]; return render();}
    if(a==='to6') return setStep(6);
    if(a.startsWith('r-')){const r=a.split('-')[1]; state.roles[r]=!state.roles[r]; return render();}
    if(a==='to7') return setStep(7);
    if(a==='warn'){state.warning=true; return render();}
    if(a==='to8') return setStep(8);
    if(a==='to9') return setStep(9);
    if(a==='restart') location.reload();
  });
}

setStep(0);
