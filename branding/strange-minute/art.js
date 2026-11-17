// Strange Minute branding: stopwatch whose hand is a question mark
function rnd(s){return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function glow(x,cx,cy,R,col,a){const g=x.createRadialGradient(cx,cy,0,cx,cy,R);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(cx-R,cy-R,2*R,2*R)}
function bg(x,w,h,seed){const r=rnd(seed);let g=x.createRadialGradient(w/2,h*0.45,0,w/2,h/2,Math.max(w,h)*0.75);g.addColorStop(0,'#123049');g.addColorStop(0.45,'#0a1626');g.addColorStop(1,'#03060c');x.fillStyle=g;x.fillRect(0,0,w,h);
 for(let i=0;i<w*h/3500;i++){x.globalAlpha=0.15+r()*0.6;x.fillStyle=r()<0.15?'#ffd27a':'#cfe6ff';const s=r()*2.2+0.6;x.fillRect(r()*w,r()*h,s,s)}x.globalAlpha=1;
 for(let i=0;i<25;i++)glow(x,r()*w,r()*h,150+r()*300,r()<0.5?'40,140,200':'120,60,180',0.04+r()*0.04)}
function watch(x,cx,cy,R){
 glow(x,cx,cy,R*2.1,'60,190,255',0.28);glow(x,cx,cy,R*1.3,'255,190,80',0.10);
 // crown + buttons
 x.save();x.translate(cx,cy);
 const metal=x.createLinearGradient(-R,-R,R,R);metal.addColorStop(0,'#f6e3b0');metal.addColorStop(0.45,'#c78f2e');metal.addColorStop(1,'#5a3a10');
 x.fillStyle=metal;x.beginPath();x.roundRect(-R*0.13,-R*1.34,R*0.26,R*0.22,R*0.04);x.fill();
 x.beginPath();x.roundRect(-R*0.22,-R*1.48,R*0.44,R*0.16,R*0.06);x.fill();
 for(const s of[-1,1]){x.save();x.rotate(s*0.72);x.beginPath();x.roundRect(-R*0.09,-R*1.22,R*0.18,R*0.18,R*0.03);x.fill();x.restore()}
 // bezel
 x.beginPath();x.arc(0,0,R*1.1,0,7);x.fillStyle=metal;x.shadowColor='rgba(255,200,110,0.6)';x.shadowBlur=R*0.25;x.fill();x.shadowBlur=0;
 x.beginPath();x.arc(0,0,R*0.99,0,7);x.fillStyle='#2a1a06';x.fill();
 // face
 let g=x.createRadialGradient(-R*0.3,-R*0.35,R*0.1,0,0,R*0.97);g.addColorStop(0,'#16405e');g.addColorStop(0.7,'#081a2c');g.addColorStop(1,'#030a14');
 x.beginPath();x.arc(0,0,R*0.95,0,7);x.fillStyle=g;x.fill();
 // ticks (60) with a glowing arc for the "minute"
 for(let i=0;i<60;i++){const a=i/60*Math.PI*2-Math.PI/2,big=i%5==0;x.strokeStyle=big?'#ffe2a0':'rgba(190,225,255,0.55)';x.lineWidth=big?R*0.035:R*0.012;
  x.beginPath();x.moveTo(Math.cos(a)*R*(big?0.74:0.81),Math.sin(a)*R*(big?0.74:0.81));x.lineTo(Math.cos(a)*R*0.88,Math.sin(a)*R*0.88);x.stroke()}
 x.strokeStyle='rgba(80,210,255,0.9)';x.lineWidth=R*0.05;x.lineCap='round';x.shadowColor='#4fd2ff';x.shadowBlur=R*0.15;
 x.beginPath();x.arc(0,0,R*0.66,-Math.PI/2,-Math.PI/2+Math.PI*1.62);x.stroke();x.shadowBlur=0;
 // question-mark hand
 x.shadowColor='#ffcc66';x.shadowBlur=R*0.2;x.strokeStyle='#ffd57a';x.lineWidth=R*0.13;x.lineCap='round';
 x.beginPath();x.arc(0,-R*0.2,R*0.26,Math.PI*1.05,Math.PI*2.35);x.quadraticCurveTo(0,R*0.0,0,R*0.17);x.stroke();
 x.beginPath();x.arc(0,R*0.42,R*0.085,0,7);x.fillStyle='#ffd57a';x.fill();x.shadowBlur=0;
 // glass shine
 x.save();x.beginPath();x.arc(0,0,R*0.95,0,7);x.clip();g=x.createLinearGradient(-R,-R,R*0.2,R*0.2);g.addColorStop(0,'rgba(255,255,255,0.18)');g.addColorStop(0.5,'rgba(255,255,255,0.03)');g.addColorStop(1,'rgba(255,255,255,0)');
 x.fillStyle=g;x.beginPath();x.ellipse(-R*0.25,-R*0.45,R*0.8,R*0.35,-0.6,0,7);x.fill();x.restore();
 x.restore()}
function vign(x,w,h){const v=x.createRadialGradient(w/2,h/2,Math.min(w,h)*0.35,w/2,h/2,Math.max(w,h)*0.72);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.55)');x.fillStyle=v;x.fillRect(0,0,w,h)}
function draw(x,w,h,mode){bg(x,w,h,mode=='banner'?7:3);
 if(mode!='banner'){watch(x,w/2,h*0.53,w*0.3);vign(x,w,h);return}
 // banner: orbiting planets/ruins silhouettes subtle
 const r=rnd(9);
 glow(x,420,980,520,'90,60,200',0.18);x.beginPath();x.arc(420,1250,520,0,7);x.fillStyle='#060c18';x.fill();
 x.strokeStyle='rgba(120,190,255,0.25)';x.lineWidth=3;x.beginPath();x.arc(420,1250,520,Math.PI*1.1,Math.PI*1.9);x.stroke();
 // pyramid silhouette right
 x.fillStyle='#050a14';x.beginPath();x.moveTo(1850,1440);x.lineTo(2150,1020);x.lineTo(2480,1440);x.fill();x.beginPath();x.moveTo(2250,1440);x.lineTo(2420,1180);x.lineTo(2620,1440);x.fill();
 glow(x,2150,1020,160,'255,200,110',0.25);
 // ringed planet top right
 glow(x,2180,420,260,'80,180,255',0.22);x.beginPath();x.arc(2180,420,120,0,7);let g=x.createLinearGradient(2060,300,2300,540);g.addColorStop(0,'#5ab4e8');g.addColorStop(1,'#0d2a48');x.fillStyle=g;x.fill();
 x.strokeStyle='rgba(255,215,140,0.75)';x.lineWidth=8;x.beginPath();x.ellipse(2180,420,220,48,-0.35,0,7);x.stroke();
 // center safe area: watch + title
 const cx=1280,cy=720;watch(x,cx-500,cy+12,122);
 x.textAlign='left';x.textBaseline='middle';x.shadowColor='rgba(80,200,255,0.65)';x.shadowBlur=30;x.fillStyle='#f4f8ff';
 x.font='900 128px Inter';x.fillText('STRANGE',cx-330,cy-62);x.fillStyle='#ffd57a';x.shadowColor='rgba(255,190,80,0.6)';x.fillText('MINUTE',cx-330,cy+58);x.shadowBlur=0;
 x.font='600 34px Inter';x.fillStyle='rgba(200,225,255,0.85)';x.fillText('WHAT IF?  ·  HIDDEN HISTORY  ·  SCIENCE MYSTERIES',cx-326,cy+150);
 vign(x,w,h)}
