// Shared drawing engine. Episode scenes.js must define SCN (scene functions) and CAM (zoom ranges).

const W=1080,H=1920;
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
let TL=null;
const C={bg:'#0b0f16',bg2:'#121a26',mid:'#1c2635',wall:'#18202d',warm:'#f5c26b',red:'#ff4d4f',yel:'#ffc53d',skin:'#d9a37f',skinD:'#b9805f',hair:'#3a2a22',card:'#7b4f63',hood:'#2f4a7a',hoodD:'#253c64'};
// ---------- utils ----------
function rnd(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const ease=x=>x<0?0:x>1?1:x*x*(3-2*x);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function ell(x,y,rx,ry,fill){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill()}
function glow(x,y,r,col,a){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col.replace('A',a));g.addColorStop(1,col.replace('A',0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r)}
// grain
const grain=document.createElement('canvas');grain.width=grain.height=256;{const g=grain.getContext('2d'),d=g.createImageData(256,256),r=rnd(3);for(let i=0;i<d.data.length;i+=4){const v=r()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0)}
const starR=rnd(11),STARS=[...Array(140)].map(()=>[starR()*W,starR()*H*0.75,starR()*2.2+0.6,starR()*6]);
const dustR=rnd(5),DUST=[...Array(60)].map(()=>[dustR()*W,dustR()*H,dustR()*2.5+1,dustR()*20+10,dustR()*6]);
function sky(top='#070a10',bot='#141c2b'){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);ctx.fillStyle=g;ctx.fillRect(-200,-200,W+400,H+400)}
function stars(t,a=1){for(const [x,y,r,ph] of STARS){ctx.globalAlpha=a*(0.35+0.4*Math.sin(t*1.5+ph));ell(x,y,r,r,'#dfe6f5')}ctx.globalAlpha=1}
function moon(x,y,r){glow(x,y,r*3,'rgba(240,220,160,A)',0.18);ell(x,y,r,r,'#e2d39a');ell(x-r*.3,y-r*.2,r*.16,r*.16,'#cbbb82');ell(x+r*.35,y+r*.25,r*.11,r*.11,'#cbbb82');ell(x+r*.1,y-r*.45,r*.08,r*.08,'#cbbb82')}
// ---------- characters ----------
function mom(x,y,s,o={}){ // x,y = head center
  const sm=o.smile??0.3, talk=o.talk??0, cr=o.creepy??0, blink=o.blink??0;
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  // hair back
  ctx.fillStyle=C.hair;ctx.beginPath();ctx.moveTo(-95,-20);ctx.quadraticCurveTo(-110,-140,0,-140);ctx.quadraticCurveTo(110,-140,95,-20);ctx.lineTo(110,170);ctx.lineTo(-110,170);ctx.closePath();ctx.fill();
  // body
  ctx.fillStyle=C.card;ctx.beginPath();ctx.moveTo(-60,110);ctx.quadraticCurveTo(-190,130,-200,320);ctx.lineTo(-210,700);ctx.lineTo(210,700);ctx.lineTo(200,320);ctx.quadraticCurveTo(190,130,60,110);ctx.closePath();ctx.fill();
  ctx.fillStyle='#e9e0d2';ctx.beginPath();ctx.moveTo(-45,110);ctx.lineTo(0,230);ctx.lineTo(45,110);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#5d3a4a';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,230);ctx.lineTo(0,700);ctx.stroke();
  for(let k=0;k<4;k++)ell(-14,280+k*90,7,7,'#e9e0d2');
  // neck & head
  ctx.fillStyle=C.skinD;ctx.fillRect(-28,60,56,70);
  ell(0,0,82,102,C.skin);
  ell(-84,10,12,20,C.skinD);ell(84,10,12,20,C.skinD);
  // bangs
  ctx.fillStyle=C.hair;ctx.beginPath();ctx.moveTo(-88,-10);ctx.quadraticCurveTo(-95,-110,0,-108);ctx.quadraticCurveTo(95,-110,88,-10);ctx.quadraticCurveTo(60,-75,10,-70);ctx.quadraticCurveTo(-40,-80,-88,-10);ctx.fill();
  // brows
  ctx.strokeStyle='#2a1d17';ctx.lineWidth=7;ctx.lineCap='round';
  for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*18,-38+cr*-8);ctx.quadraticCurveTo(sx*38,-48-cr*6,sx*56,-40+cr*-2);ctx.stroke()}
  // eyes
  for(const sx of[-1,1]){
    const ex=sx*36,ey=-10,ew=16+cr*8,eh=(11+cr*10)*(1-blink);
    if(eh>1){ell(ex,ey,ew,eh,'#f4f1ea');const pr=cr>0.5?4:8;ell(ex,ey,pr+1,pr+1,cr>0.5?'#000':'#3b2618');if(o.glow){glow(ex,ey,60,'rgba(255,60,60,A)',o.glow*0.6);ell(ex,ey,pr,pr,'rgba(255,90,90,'+o.glow+')')}}
    else{ctx.beginPath();ctx.moveTo(ex-ew,ey);ctx.lineTo(ex+ew,ey);ctx.stroke()}
  }
  // nose
  ctx.strokeStyle=C.skinD;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-6,28);ctx.lineTo(6,30);ctx.stroke();
  // cheeks
  ctx.globalAlpha=0.25;ell(-48,30,16,10,'#e0705e');ell(48,30,16,10,'#e0705e');ctx.globalAlpha=1;
  // mouth
  const mw=26+sm*14+cr*38, my=58;
  if(cr>0.05){
    ctx.fillStyle='#2b0d10';ctx.beginPath();ctx.moveTo(-mw,my-6);ctx.quadraticCurveTo(0,my+30+cr*22,mw,my-6);ctx.quadraticCurveTo(0,my+8,-mw,my-6);ctx.fill();
    ctx.fillStyle='#f3efe4';ctx.beginPath();ctx.moveTo(-mw+6,my-3);ctx.quadraticCurveTo(0,my+14+cr*10,mw-6,my-3);ctx.quadraticCurveTo(0,my+6,-mw+6,my-3);ctx.fill();
    ctx.strokeStyle='#2b0d10';ctx.lineWidth=2;for(let k=-3;k<=3;k++){ctx.beginPath();ctx.moveTo(k*mw/4.5,my+2);ctx.lineTo(k*mw/4.5,my+10+cr*6-Math.abs(k)*2);ctx.stroke()}
  } else if(talk>0.05){ell(0,my+4,16+sm*6,4+talk*14,'#5a2028')}
  else{ctx.strokeStyle='#8b3a3a';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-mw,my);ctx.quadraticCurveTo(0,my+12+sm*14,mw,my);ctx.stroke()}
  ctx.restore();
}
function creature(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#050608';ctx.strokeStyle='#050608';ctx.lineCap='round';
  ctx.lineWidth=16;const lim=[[-1,-1,-170,-150,-260,-60],[1,-1,150,-170,250,-280],[-1,1,-160,120,-230,300],[1,1,140,140,210,330]];
  for(const [a,b,mx,my,ex,ey] of lim){ctx.beginPath();ctx.moveTo(a*30,b*40);ctx.lineTo(mx,my+Math.sin(t*3+a)*4);ctx.lineTo(ex,ey);ctx.stroke();
    for(let f=-1;f<=1;f++){ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+a*30+f*14,ey+b*-6+f*20);ctx.stroke();ctx.lineWidth=16}}
  ell(0,20,55,120,'#050608');ell(0,-130,58,66,'#050608');
  glow(-20,-135,40,'rgba(255,255,255,A)',0.35);glow(20,-135,40,'rgba(255,255,255,A)',0.35);
  ell(-20,-135,9,9,'#fff');ell(20,-135,9,9,'#fff');
  ctx.strokeStyle='#e8e8e8';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-34,-102);ctx.quadraticCurveTo(0,-80,34,-102);ctx.stroke();
  ctx.restore()}
// ---------- props ----------
function door(cx,cy,sh){const w=420,h=840,x=cx-w/2+sh,y=cy-h/2;
  ctx.fillStyle='#0d1219';ctx.fillRect(x-36,y-36,w+72,h+36);
  ctx.fillStyle='#3d2c22';ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='#2a1d16';ctx.lineWidth=10;for(const [px,py,pw,ph] of[[40,60,140,300],[240,60,140,300],[40,420,140,360],[240,420,140,360]]){ctx.strokeRect(x+px,y+py,pw,ph)}
  ell(x+w-60,y+h/2+20,22,22,'#c9a64a');ell(x+w-60,y+h/2+20,10,10,'#8a6f2c');
  rr(x+w-82,y+h/2-90,44,60,8);ctx.fillStyle='#b8963f';ctx.fill();ell(x+w-60,y+h/2-60,8,8,'#5c4a1e');
  ell(cx+sh,y+200,13,13,'#0a0a0a');ell(cx+sh,y+200,7,7,'#2a3550');
  return{x,y,w,h}}
function clock(text,x,y,size,col,t){ctx.save();ctx.font=`800 ${size}px "JetBrains Mono"`;ctx.textAlign='center';ctx.textBaseline='middle';
  rr(x-size*1.55,y-size*0.75,size*3.1,size*1.5,40);ctx.fillStyle='#07090d';ctx.fill();ctx.strokeStyle='#1f2633';ctx.lineWidth=6;ctx.stroke();
  ctx.shadowColor=col;ctx.shadowBlur=60;ctx.fillStyle=col;
  const blink=Math.floor(t*2)%2===0;const tx=blink?text:text.replace(':',' ');ctx.fillText(tx,x,y+6);ctx.shadowBlur=0;
  ctx.font=`800 ${size*0.22}px "JetBrains Mono"`;ctx.fillText('AM',x+size*1.25,y+size*0.42);ctx.restore()}
function phone(x,y,s,rot,draw){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  rr(-190,-380,380,760,56);ctx.fillStyle='#0e0f12';ctx.fill();ctx.strokeStyle='#2c313a';ctx.lineWidth=6;ctx.stroke();
  ctx.save();rr(-172,-362,344,724,42);ctx.clip();draw();ctx.restore();
  rr(-50,-350,100,26,13);ctx.fillStyle='#000';ctx.fill();ctx.restore()}
function building(x,y,w,rows,cols,lit,t,flick){ // y = top
  const fh=110;ctx.fillStyle='#161d29';ctx.fillRect(x,y,w,rows*fh+400);
  ctx.fillStyle='#1d2534';ctx.fillRect(x-20,y-30,w+40,34);
  const cw=w/cols;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const wx=x+c*cw+cw*0.22,wy=y+r*fh+30,ww=cw*0.56,wh=fh*0.5;
    const floor=rows-r;const isLit=floor===lit[0]&&c===lit[1];
    ctx.fillStyle=isLit?C.warm:((r*7+c*3)%11===0?'#3a3524':'#0c1018');ctx.fillRect(wx,wy,ww,wh);
    if(isLit){glow(wx+ww/2,wy+wh/2,170,'rgba(245,194,107,A)',0.35*flick);ctx.fillStyle='#0c1018';ctx.fillRect(wx+ww/2-2,wy,4,wh);ctx.fillRect(wx,wy+wh/2-2,ww,4)}}
  return{cw,fh}}
// ---------- captions ----------
function chunks(seg){const out=[];let cur=[];seg.words.forEach((w,i)=>{cur.push(i);if(cur.length>=3||/[.,:!?]$/.test(w.w)&&cur.length>=2||/(\.\.\.|[.!?:])$/.test(w.w)){out.push(cur);cur=[]}});if(cur.length)out.push(cur);return out}
function caption(seg,t){const ch=chunks(seg);let idx=-1;seg.words.forEach((w,i)=>{if(t>=w.s)idx=i});if(idx<0)return;
  const chunk=ch.find(c=>c.includes(idx));const fs=92;ctx.save();ctx.font=`900 ${fs}px Inter`;ctx.textBaseline='middle';
  const ws=chunk.map(i=>seg.words[i].w.replace(/\.\.\.$/,'...'));const sp=30;let widths=ws.map(w=>ctx.measureText(w).width);let tot=widths.reduce((a,b)=>a+b,0)+sp*(ws.length-1);
  let sc=Math.min(1,960/tot);const y=1360;let x=W/2-tot*sc/2;
  chunk.forEach((wi,k)=>{const w=seg.words[wi];const on=wi<=idx;const age=t-w.s;let pop=on?1+0.14*Math.max(0,1-age/0.14):1;
    const col=w.c==='y'?C.yel:w.c==='r'?C.red:'#ffffff';ctx.save();const cx=x+widths[k]*sc/2;ctx.translate(cx,y);ctx.scale(sc*pop,sc*pop);
    ctx.textAlign='center';ctx.lineJoin='round';ctx.lineWidth=14;ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=24;
    ctx.globalAlpha=on?1:0.28;ctx.strokeText(ws[k],0,0);ctx.shadowBlur=0;ctx.fillStyle=on?col:'#cfd6e4';ctx.fillText(ws[k],0,0);ctx.restore();x+=(widths[k]+sp)*sc});
  ctx.restore()}
function header(t,stamp){ctx.save();ctx.textAlign='center';ctx.font='800 34px Inter';ctx.fillStyle='rgba(235,238,245,0.85)';
  ctx.letterSpacing='6px';ctx.fillText(TL.title||'',W/2,150);ctx.font='700 28px "JetBrains Mono"';ctx.fillStyle='#f5a524';ctx.letterSpacing='3px';ctx.fillText(stamp,W/2,198);
  if(Math.floor(t*1.5)%2===0)ell(118,138,10,10,C.red);ctx.restore()}
// ---------- scenes ----------
function shakeAt(t,types,dur=0.35,amp=18){let s=0;for(const e of TL.events)if(types.includes(e.type)&&t>=e.t&&t<e.t+dur)s=Math.max(s,amp*(1-(t-e.t)/dur));return s}
function lastEv(t,types){let r=null;for(const e of TL.events)if(types.includes(e.type)&&t>=e.t)r=e;return r}
function render(t){
  const segs=TL.segs;let si=segs.findIndex((s,i)=>t<s.e&&(i===0||t>=s.s));if(si<0)si=segs.length-1;
  const seg=segs[si],start=si===0?0:seg.s,d=seg.e-start,lt=t-start,p=clamp(lt/d,0,1);
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  ctx.save();const [z0,z1]=CAM[seg.scene];const z=lerp(z0,z1,p);ctx.translate(W/2,H/2);ctx.scale(z,z);ctx.translate(-W/2,-H/2);
  const hs=shakeAt(t,['hit','sting'],0.5,24);ctx.translate((Math.random()-.5)*hs,(Math.random()-.5)*hs);
  SCN[seg.scene](lt,p,t,d,seg);ctx.restore();
  // dust
  for(const [x,y,r,sp,ph] of DUST){const yy=(y+t*sp)%H;ctx.globalAlpha=0.25+0.2*Math.sin(t+ph);ell((x+Math.sin(t*0.5+ph)*20)%W,yy,r,r,'#cfd8e6')}ctx.globalAlpha=1;
  // vignette
  const v=ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  // grain
  ctx.globalAlpha=0.06;const gx=Math.floor(Math.random()*256),gy=Math.floor(Math.random()*256);ctx.save();ctx.translate(-gx,-gy);ctx.fillStyle=ctx.createPattern(grain,'repeat');ctx.fillRect(0,0,W+256,H+256);ctx.restore();ctx.globalAlpha=1;
  // scene transition dip
  const tin=lt,tout=seg.e-t;const dip=Math.max(0,1-tin/0.12,si<segs.length-1?1-tout/0.08:0);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H)}
  header(t,seg.stamp||TL.stamp||'');
  caption(seg,t);
}
window.setTL=j=>{TL=j};window.render=render;
