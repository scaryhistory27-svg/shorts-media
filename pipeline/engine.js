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
  const chunk=ch.find(c=>c.includes(idx));const fs=92;ctx.save();ctx.font=TL.style==='light'?`800 ${fs-8}px Inter`:`900 ${fs}px Inter`;ctx.textBaseline='middle';
  const ws=chunk.map(i=>seg.words[i].w.replace(/\.\.\.$/,'...'));const sp=38;let widths=ws.map(w=>ctx.measureText(w).width);let tot=widths.reduce((a,b)=>a+b,0)+sp*(ws.length-1);
  let sc=Math.min(1,960/tot);const y=1360;let x=W/2-tot*sc/2;const LIGHT=TL.style==='light';
  if(LIGHT){ctx.save();rr(x-36,y-70,tot*sc+72,140,40);ctx.fillStyle='rgba(6,22,44,0.72)';ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='rgba(95,212,255,0.55)';ctx.stroke();ctx.restore()}
  chunk.forEach((wi,k)=>{const w=seg.words[wi];const on=wi<=idx;const age=t-w.s;let pop=on?1+0.07*Math.max(0,1-age/0.14):1;
    const col=LIGHT?(w.c==='y'?'#ffd57a':w.c==='r'?'#5fd4ff':'#ffffff'):(w.c==='y'?C.yel:w.c==='r'?C.red:'#ffffff');ctx.save();const cx=x+widths[k]*sc/2;ctx.translate(cx,y);ctx.scale(sc*pop,sc*pop);
    ctx.textAlign='center';ctx.lineJoin='round';ctx.lineWidth=LIGHT?0.01:14;ctx.strokeStyle='rgba(0,0,0,0.85)';ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=LIGHT?0:24;
    ctx.globalAlpha=on?1:0.28;ctx.strokeText(ws[k],0,0);ctx.shadowBlur=0;ctx.fillStyle=on?col:'#cfd6e4';ctx.fillText(ws[k],0,0);ctx.restore();x+=(widths[k]+sp)*sc});
  ctx.restore()}
function header(t,stamp){ctx.save();ctx.textAlign='center';ctx.font='800 34px Inter';ctx.fillStyle='rgba(235,238,245,0.85)';
  ctx.letterSpacing='6px';ctx.fillText(TL.title||'',W/2,150);ctx.font='700 28px "JetBrains Mono"';ctx.fillStyle=TL.style==='light'?'#5fd4ff':'#f5a524';ctx.letterSpacing='3px';ctx.fillText(stamp,W/2,198);
  if(TL.style!=='light'&&Math.floor(t*1.5)%2===0)ell(118,138,10,10,C.red);ctx.restore()}
// ---------- scenes ----------
function shakeAt(t,types,dur=0.35,amp=18){let s=0;for(const e of TL.events)if(types.includes(e.type)&&t>=e.t&&t<e.t+dur)s=Math.max(s,amp*(1-(t-e.t)/dur));return s}
function lastEv(t,types){let r=null;for(const e of TL.events)if(types.includes(e.type)&&t>=e.t)r=e;return r}
function render(t){
  const segs=TL.segs;let si=segs.findIndex((s,i)=>t<s.e&&(i===0||t>=s.s));if(si<0)si=segs.length-1;
  const seg=segs[si],start=si===0?0:seg.s,d=seg.e-start,lt=t-start,p=clamp(lt/d,0,1);
  ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);
  ctx.save();const [z0,z1]=CAM[seg.scene];let z=lerp(z0,z1,p)*(1+punchAt(t));
  // Strange Minute fast-cut pacing (2026-11-20, viral what-if Shorts cut every ~2.5–3 s): when a scene continues into the next line,
  // hard-cut to a new framing (alternating close/wide + side shift) so every line is a new shot.
  let cx=0;if(TL.style==='light'&&TL.fastcuts!==false){let k=0;for(let j=si-1;j>=0&&segs[j].scene===seg.scene;j--)k++;if(k>0){const f=[1.0,1.14,1.06,1.2][k%4];z*=f;cx=[0,-60,70,-30][k%4]}}
  ctx.translate(W/2+cx,H/2);ctx.scale(z,z);ctx.translate(-W/2,-H/2);
  const hs=shakeAt(t,['hit','sting'],0.5,24);ctx.translate((Math.random()-.5)*hs,(Math.random()-.5)*hs);
  SCN[seg.scene](lt,p,t,d,seg);ctx.restore();
  glitchFx(t);
  // dust
  for(const [x,y,r,sp,ph] of DUST){const yy=(y+t*sp)%H;ctx.globalAlpha=0.25+0.2*Math.sin(t+ph);ell((x+Math.sin(t*0.5+ph)*20)%W,yy,r,r,'#cfd8e6')}ctx.globalAlpha=1;
  // vignette
  const v=ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,TL.style==='light'?'rgba(0,0,0,0.45)':'rgba(0,0,0,0.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  // grain
  ctx.globalAlpha=TL.style==='light'?0.03:0.06;const gx=Math.floor(Math.random()*256),gy=Math.floor(Math.random()*256);ctx.save();ctx.translate(-gx,-gy);ctx.fillStyle=ctx.createPattern(grain,'repeat');ctx.fillRect(0,0,W+256,H+256);ctx.restore();ctx.globalAlpha=1;
  // scene transition dip
  const tin=lt,tout=seg.e-t;const sameP=si>0&&segs[si-1].scene===seg.scene,sameN=si<segs.length-1&&segs[si+1].scene===seg.scene;const dip=Math.max(0,sameP?0:1-tin/0.12,(si<segs.length-1&&!sameN)?1-tout/0.08:0);if(dip>0){ctx.fillStyle=`rgba(0,0,0,${dip})`;ctx.fillRect(0,0,W,H)}
  if(window.COVER){drawCover(window.COVER);return}
  header(t,seg.stamp||TL.stamp||'');
  const endCard=si===segs.length-1&&t>seg.words[seg.words.length-1].s+0.9;
  if(!endCard)caption(seg,t);
  else if(TL.cta)ctaCard(t-(seg.words[seg.words.length-1].s+0.9),TL.cta);
}
// Subscribe call-to-action on the end card (owner 2026-11-18). ep.cta = {"text": "SLOGAN", "hl": "WORD"}; k = seconds since the end card started.
// Two different designs (owner 2026-11-18: "the channels' endings must not look alike"):
//  dark (horror)  → typewriter slogan, sharp black plate with flickering red neon + blinking eye, a shadow hand rises and presses it, glitch on tap
//  light (Strange Minute) → slogan on a cyan ribbon, gold pill button with "+", Tick the mascot hops onto it, confetti on tap
function ctaCard(k,c){if(TL.style==='light')return ctaLight(k,c);return ctaDark(k,c)}
function ctaSlogan(c,y,acc,n,fs0=52){ctx.save();let fs=fs0;ctx.font=`900 ${fs}px Inter`;while(ctx.measureText(c.text).width>(fs0<52?880:960)&&fs>30){fs-=2;ctx.font=`900 ${fs}px Inter`}
  const words=c.text.split(' ');const sp=ctx.measureText(' ').width;let x=540-ctx.measureText(c.text).width/2;let left=n??1e9;ctx.textAlign='left';ctx.textBaseline='middle';ctx.lineJoin='round';
  for(const w of words){if(left<=0)break;const show=w.slice(0,Math.max(0,left));left-=w.length+1;const hl=(c.hl||'').split(' ').includes(w.replace(/[^\w']/g,''));
    ctx.lineWidth=10;ctx.strokeStyle='rgba(0,0,0,0.9)';ctx.strokeText(show,x,y);ctx.fillStyle=hl?acc:'#f2efe8';if(hl){ctx.shadowColor=acc;ctx.shadowBlur=24}ctx.fillText(show,x,y);ctx.shadowBlur=0;x+=ctx.measureText(w).width+sp}ctx.restore()}
function ctaDark(k,c){const a=ease(clamp((k-0.3)/0.3,0,1));if(a<=0)return;const tap=1.3,done=k>=tap;
  ctx.save();ctx.globalAlpha=a;
  const n=Math.floor(clamp((k-0.3)/0.55,0,1)*c.text.length);ctaSlogan(c,1150,'#ff2a2a',n);
  // plate
  const fl=Math.random()<0.12?0.35:1;const jit=done&&k-tap<0.25?(Math.random()-0.5)*16:0;ctx.save();ctx.translate(540+jit,1300);const bw=580,bh=120;
  ctx.shadowColor=`rgba(255,30,30,${0.8*fl})`;ctx.shadowBlur=done?60:36;rr(-bw/2,-bh/2,bw,bh,8);ctx.fillStyle=done?'#b3121a':'#0d0507';ctx.fill();ctx.shadowBlur=0;
  ctx.lineWidth=4;ctx.strokeStyle=`rgba(255,42,42,${fl})`;ctx.stroke();ctx.strokeStyle='rgba(255,42,42,0.25)';ctx.lineWidth=2;rr(-bw/2+10,-bh/2+10,bw-20,bh-20,4);ctx.stroke();
  // eye (blinks; closes after the tap)
  ctx.save();ctx.translate(-bw/2+80,0);const op=Math.sin(k*5)>0.93?0.1:1;if(done){ctx.strokeStyle='#ffffff';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.arc(0,-12,32,0.35,Math.PI-0.35);ctx.stroke();for(const lx of[-18,0,18]){ctx.beginPath();ctx.moveTo(lx,17);ctx.lineTo(lx*1.3,30);ctx.stroke()}}else{ctx.fillStyle='#f2efe8';ctx.beginPath();ctx.ellipse(0,0,34,20*op,0,0,7);ctx.fill();
  if(op>0.3){ell(0,0,12,12,'#ff2a2a');ell(0,0,5,5,'#000')}ctx.strokeStyle='#f2efe8';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,36,22*Math.max(op,0.15),0,0,7);ctx.stroke()}ctx.restore();
  ctx.font='900 54px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.letterSpacing='8px';ctx.fillStyle=done?'#ffffff':`rgba(255,42,42,${fl})`;ctx.fillText(done?'SUBSCRIBED':'SUBSCRIBE',40,3);ctx.letterSpacing='0px';ctx.restore();
  // shadow hand rising from below and pressing
  const m=ease(clamp((k-0.5)/(tap-0.5),0,1));const hy=lerp(2050,1330,m)+(done?Math.min(1,(k-tap)/0.5)*260:0);const hx=640;
  ctx.save();ctx.translate(hx,hy);ctx.rotate(-0.12);ctx.fillStyle='#050203';ctx.strokeStyle='rgba(255,40,40,0.55)';ctx.lineWidth=4;
  ctx.beginPath();ctx.moveTo(-60,700);ctx.lineTo(-48,140);ctx.quadraticCurveTo(-60,60,-30,40);ctx.lineTo(-18,-10);ctx.quadraticCurveTo(-14,-34,0,-34);ctx.quadraticCurveTo(14,-34,16,-10);ctx.lineTo(22,40);
  ctx.quadraticCurveTo(70,50,64,120);ctx.lineTo(60,700);ctx.closePath();ctx.fill();ctx.stroke();
  for(const fx of[30,48]){ctx.beginPath();ctx.ellipse(fx,62,13,24,0,0,7);ctx.fill();ctx.stroke()}ctx.restore();
  // glitch flash on tap
  if(done&&k-tap<0.3){ctx.fillStyle=`rgba(255,20,20,${0.25*(1-(k-tap)/0.3)})`;ctx.fillRect(0,0,W,H);for(let i=0;i<5;i++){ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(0,Math.random()*H,W,6+Math.random()*20)}}
  ctx.restore()}
function ctaLight(k,c){const a=ease(clamp((k-0.3)/0.4,0,1));if(a<=0)return;const tap=1.25,done=k>=tap;
  ctx.save();ctx.globalAlpha=a;
  // slogan ribbon slides in from the left
  const sx=lerp(-700,0,a);ctx.save();ctx.translate(sx,0);ctx.font='900 44px Inter';const tw=Math.min(880,ctx.measureText(c.text).width);rr(540-tw/2-40,1056,tw+80,88,44);ctx.fillStyle='rgba(8,40,70,0.88)';ctx.fill();ctx.lineWidth=4;ctx.strokeStyle='#5fd4ff';ctx.stroke();ctaSlogan(c,1100,'#ffd57a',undefined,44);ctx.restore();
  // gold pill button (squashes when Tick lands)
  const land=done?Math.max(0,1-(k-tap)/0.25):0;ctx.save();ctx.translate(540,1310);ctx.scale(1+0.08*land,1-0.14*land);const bw=560,bh=124;
  const g=ctx.createLinearGradient(0,-bh/2,0,bh/2);g.addColorStop(0,done?'#7fe3ff':'#ffe08a');g.addColorStop(1,done?'#2aa8e0':'#ffb23d');ctx.shadowColor=done?'rgba(95,212,255,0.7)':'rgba(255,200,80,0.7)';ctx.shadowBlur=36;
  rr(-bw/2,-bh/2,bw,bh,bh/2);ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.stroke();
  ctx.save();ctx.translate(-bw/2+72,0);ell(0,0,36,36,'#10243a');ctx.strokeStyle=done?'#7fe3ff':'#ffd57a';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();
  if(done){ctx.moveTo(-14,0);ctx.lineTo(-3,12);ctx.lineTo(16,-12)}else{ctx.moveTo(-15,0);ctx.lineTo(15,0);ctx.moveTo(0,-15);ctx.lineTo(0,15)}ctx.stroke();ctx.restore();
  ctx.font='900 54px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#10243a';ctx.fillText(done?'SUBSCRIBED':'SUBSCRIBE',36,3);ctx.restore();
  // Tick hops in from the right and lands on the button
  const j=clamp((k-0.55)/(tap-0.55),0,1);const tx=lerp(1010,800,j),ty=done?1238-Math.max(0,Math.sin((k-tap)*9))*30*Math.max(0,1-(k-tap)):lerp(1290,1238,j)-Math.sin(j*Math.PI)*300;
  smTick(tx,ty,1.0,k,{wow:done?1:0.4,hop:1});
  // confetti
  if(done){const r=rnd(3);for(let i=0;i<26;i++){const f=Math.min(1,(k-tap)/1.2),an=r()*Math.PI*2,sp=200+r()*380;const x=540+Math.cos(an)*sp*f,y=1300+Math.sin(an)*sp*f+400*f*f;ctx.globalAlpha=a*(1-f*0.8);ctx.fillStyle=i%2?'#ffd57a':'#5fd4ff';ctx.save();ctx.translate(x,y);ctx.rotate(k*6+i);ctx.fillRect(-7,-4,14,8);ctx.restore()}}
  ctx.restore()}
window.setTL=j=>{TL=j};window.render=render;

// Thumbnail/cover overlay: big 2-line hook text + part badge (episode.json "cover":{t,lines,sub})
function fitText(txt,maxW,size){ctx.font=`900 ${size}px Inter`;while(ctx.measureText(txt).width>maxW&&size>40){size-=4;ctx.font=`900 ${size}px Inter`}return size}
function drawCover(c){const g=ctx.createLinearGradient(0,H*0.45,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.9)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const g2=ctx.createLinearGradient(0,0,0,500);g2.addColorStop(0,'rgba(0,0,0,0.75)');g2.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g2;ctx.fillRect(0,0,W,500);
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
  let y=c.y||1330;(c.lines||[]).forEach((ln,i)=>{const acc=TL&&TL.style==='light'?C.yel:C.red;const col=i===(c.lines.length-1)?acc:'#ffffff';const sz=fitText(ln,980,150);ctx.lineWidth=18;ctx.strokeStyle='#000';ctx.shadowColor='rgba(0,0,0,0.9)';ctx.shadowBlur=30;ctx.strokeText(ln,W/2,y);ctx.shadowBlur=col===acc?40:0;ctx.shadowColor=acc;ctx.fillStyle=col;ctx.fillText(ln,W/2,y);ctx.shadowBlur=0;y+=sz*1.05});
  if(c.sub){ctx.font='900 64px Inter';const w=ctx.measureText(c.sub).width+70;rr(W/2-w/2,y+10,w,100,50);const light=TL&&TL.style==='light';ctx.fillStyle=light?'#2aa8e0':C.red;ctx.fill();ctx.fillStyle='#fff';ctx.fillText(c.sub,W/2,y+62)}
  if(c.top){ctx.font='800 46px Inter';ctx.letterSpacing='6px';ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fillText(c.top,W/2,200)}
  ctx.restore()}

// ================= CHARACTER ANIMATION (owner 2026-11-15: "make it animated, characters should move") =================
// walker(x, y, s, t, o): flat-style person (o.freeze = walk phase in radians → frozen mid-step, no breathing/blinking), feet at (x,y). o = {speed: steps/s (0 = idle), dir: 1 right / -1 left,
//   skin, hair, top, pants, shoe, look: -1..1 head turn, reach: 0..1 front arm raised forward, scared: 0..1}
function walker(x,y,s,t,o={}){
  const dir=o.dir||1, sp=o.speed??1.6, frozen=o.freeze!=null, ph=frozen?o.freeze:t*sp*Math.PI*2, walking=sp>0||frozen;
  const skin=o.skin||C.skin, hair=o.hair||'#1d1512', top=o.top||C.hood, topD=o.topD||C.hoodD, pants=o.pants||'#1f2733', shoe=o.shoe||'#0d0f13';
  const bob=walking?-Math.abs(Math.sin(ph))*7:Math.sin(t*2.2)*2.5, breathe=1+(walking||frozen?0:0.012*Math.sin(t*2.2));
  ctx.save();ctx.translate(x,y);ctx.scale(s*dir,s);ctx.lineCap='round';ctx.lineJoin='round';
  ell(0,4,46,9,'rgba(0,0,0,0.35)');                                   // shadow
  const leg=(a,col)=>{const th=walking?Math.sin(a)*0.55:0, kn=walking?Math.max(0,-Math.cos(a))*0.9:0;
    const hx=0,hy=-118+bob, kx=hx+Math.sin(th)*58, ky=hy+Math.cos(th)*58, fx=kx+Math.sin(th-kn)*58, fy=ky+Math.cos(th-kn)*58;
    ctx.strokeStyle=col;ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(kx,ky);ctx.lineTo(fx,fy);ctx.stroke();
    ctx.fillStyle=shoe;rr(fx-12,fy-8,40,16,7);ctx.fill()};
  const arm=(a,col,front)=>{let sw=walking?Math.sin(a)*0.65:Math.sin(t*1.3)*0.04; if(front&&o.reach) sw=sw*(1-o.reach)-1.35*o.reach;
    const sx=4,sy=-208+bob, ex=sx+Math.sin(sw)*48, ey=sy+Math.cos(sw)*48, el=walking?0.5:0.15, wx=ex+Math.sin(sw-el)*46, wy=ey+Math.cos(sw-el)*46;
    ctx.strokeStyle=col;ctx.lineWidth=22;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.lineTo(wx,wy);ctx.stroke();ell(wx,wy,11,11,skin)};
  leg(ph+Math.PI,'#161c26');arm(ph,topD,false);
  ctx.save();ctx.translate(0,-118+bob);ctx.scale(1,breathe);{const tg=ctx.createLinearGradient(-34,-112,34,8);tg.addColorStop(0,shade(top,1.25));tg.addColorStop(0.55,top);tg.addColorStop(1,shade(top,0.6));ctx.fillStyle=tg;}rr(-34,-112,68,120,26);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-30,-90);ctx.quadraticCurveTo(-36,-40,-30,0);ctx.stroke();ctx.fillStyle='rgba(0,0,0,0.25)';rr(-34,-112,68,16,8);ctx.fill();ctx.restore(); // torso (shaded + rim light)
  leg(ph,pants);
  // head
  const hy=-262+bob+(o.scared?Math.sin(t*40)*1.5*o.scared:0), look=o.look||0;
  ctx.fillStyle=skin;ctx.fillRect(-9,-236+bob,18,20);ell(0+look*4,hy,30,34,skin);
  ctx.fillStyle=hair;ctx.beginPath();ctx.ellipse(-4+look*2,hy-10,32,28,0,Math.PI*0.95,Math.PI*2.05);ctx.fill();
  ctx.strokeStyle='rgba(255,230,210,0.35)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(look*4,hy,30,-2.4,-1.2);ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,0.18)';ctx.beginPath();ctx.ellipse(-12+look*4,hy+6,14,26,0,0,7);ctx.fill();
  ctx.strokeStyle=hair;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(9+look*8,hy-14-(o.scared?5:0));ctx.lineTo(25+look*8,hy-16+(o.scared?-3:2));ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,0.2)';ctx.beginPath();ctx.moveTo(28+look*8,hy+2);ctx.lineTo(34+look*8,hy+9);ctx.lineTo(27+look*8,hy+10);ctx.fill();
  const blink=!frozen&&(t%3.7)<0.12;ell(17+look*8,hy-2,4,blink?0.8:(o.scared?6:4.5),'#120c0a');
  if(o.scared){ctx.strokeStyle='#120c0a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(14+look*8,hy+16,6,0,Math.PI*2);ctx.stroke()}
  else{ctx.strokeStyle='rgba(18,12,10,0.7)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(10+look*8,hy+16);ctx.lineTo(22+look*8,hy+15);ctx.stroke()}
  arm(ph+Math.PI,top,true);
  ctx.restore()}
// moveAlong(p, x0, x1, ease): position along a path for walking across a scene
function moveAlong(p,a,b){return a+(b-a)*ease(p)}
// life(t): tiny idle motion helpers for any prop/character — sway, flicker, breathe
const life={sway:(t,a=1)=>Math.sin(t*1.7)*a, breathe:(t)=>1+0.015*Math.sin(t*2.2), flicker:(t)=>Math.sin(t*23)>0.85?0.35:1};
// crawler: creature that crawls (limbs cycle) — use instead of the static creature() when it should move
function crawler(x,y,s,t,speed=1.2){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#050608';ctx.lineCap='round';
  const ph=t*speed*Math.PI*2;
  [[-1,-1,0],[1,-1,Math.PI],[-1,1,Math.PI],[1,1,0]].forEach(([a,b,o])=>{const k=Math.sin(ph+o);ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(a*30,b*40);
    const mx=a*(150+20*k),my=b*(140-30*k),ex=a*(230+30*k),ey=b*(260+40*Math.cos(ph+o));ctx.lineTo(mx,my);ctx.lineTo(ex,ey);ctx.stroke();
    ctx.lineWidth=6;for(let f=-1;f<=1;f++){ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+a*28+f*12,ey+b*14+f*16);ctx.stroke()}});
  ell(0,20+Math.sin(ph*2)*4,55,120,'#050608');const hx=Math.sin(ph)*6;ell(hx,-130,58,66,'#050608');
  glow(hx-20,-135,40,'rgba(255,255,255,A)',0.35);glow(hx+20,-135,40,'rgba(255,255,255,A)',0.35);ell(hx-20,-135,9,9,'#fff');ell(hx+20,-135,9,9,'#fff');
  ctx.strokeStyle='#e8e8e8';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(hx-34,-102);ctx.quadraticCurveTo(hx,-80,hx+34,-102);ctx.stroke();ctx.restore()}

// ================= DYNAMICS & LOOK (owner 2026-11-15: "more animation, prettier, scarier, more dynamic") =================
function shade(hex,k){const n=parseInt(hex.slice(1),16);const c=[n>>16,(n>>8)&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*k))));return `rgb(${c[0]},${c[1]},${c[2]})`}
// camera punch-in on hit/sting/knock events (auto, every episode)
function punchAt(t){let z=0;if(!TL)return 0;for(const e of TL.events){if(!['hit','sting','knock','knockglass','chime','pop','thud'].includes(e.type)||t<e.t||t>e.t+0.5)continue;
  const a=(t-e.t)/0.5;z=Math.max(z,(e.type==='sting'?0.11:e.type==='hit'?0.08:0.035)*Math.pow(1-a,2))}return z}
// glitch + red flash for 0.35 s after every sting (auto) — RGB slice offsets drawn from the canvas itself
function glitchFx(t){if(!TL)return;const e=TL.events.find(e=>e.type==='sting'&&t>=e.t&&t<e.t+0.35);if(!e)return;const a=1-(t-e.t)/0.35;
  const r=rnd(Math.floor(t*30));for(let i=0;i<7;i++){const y=r()*H,h=20+r()*90,dx=(r()-0.5)*90*a;ctx.drawImage(cv,0,y,W,h,dx,y,W,h)}
  ctx.globalCompositeOperation='screen';ctx.fillStyle=`rgba(255,0,40,${0.18*a})`;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
  ctx.fillStyle=`rgba(255,30,30,${0.12*a})`;ctx.fillRect(0,0,W,H)}
// drifting fog layer (draw over a scene): fog(t, y0, y1, color, strength)
function fog(t,y0,y1,col='200,220,230',k=0.06){const r=rnd(77);for(let i=0;i<26;i++){const x=((r()*W+t*(10+r()*25))%(W+400))-200,y=y0+r()*(y1-y0),R=140+r()*220;glow(x,y,R,`rgba(${col},A)`,k*(0.6+0.4*Math.sin(t*0.7+i)))}}
// volumetric light cone from (x,y) pointing down at angle, length L, half-width w at the end
function lightCone(x,y,ang,L,w,col='255,240,200',a=0.18){ctx.save();ctx.translate(x,y);ctx.rotate(ang);const g=ctx.createLinearGradient(0,0,0,L);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(14,0);ctx.lineTo(w,L);ctx.lineTo(-w,L);ctx.closePath();ctx.fill();ctx.restore()}
// stop-motion stutter for creepy movement: snaps a 0..1 progress into jerky steps with tiny jitter
function jerky(p,steps=7,seed=1){const q=Math.floor(p*steps)/steps;const r=rnd(Math.floor(p*steps)*31+seed);return clamp(q+(r()-0.5)*0.03,0,1)}
// heartbeat vignette pulse (use in tense scenes)
function heartbeat(t,k=0.35){const b=Math.pow(Math.max(0,Math.sin(t*Math.PI*2*1.25)),10);const v=ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.7);
  v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,`rgba(120,0,0,${k*b})`);ctx.fillStyle=v;ctx.fillRect(0,0,W,H)}

// ================= STRANGE MINUTE STYLE KIT (channel 2 — must look different from the horror channel) =================
// smGuy: the channel's recurring host "Max" — cartoony proportions (big round head), thick navy outline, round glasses,
// orange hoodie, teal pants. o = {speed (steps/s, 0 idle), dir 1|-1, look (-1 up .. 1 down), point 0..1 (arm points forward-up),
// wow 0..1 (surprised: raised brows + "O" mouth), wave 0..1 (waving hand), hood, pants, skin, hair}
function smGuy(x,y,s,t,o={}){
  const dir=o.dir||1,sp=o.speed??0,ph=t*sp*Math.PI*2,walk=sp>0,OL='#10243a',lw=5;
  const skin=o.skin||'#f2c29b',hair=o.hair||'#3b2416',hood=o.hood||'#ff8a3d',hoodD=shade(o.hood||'#ff8a3d',0.8),pants=o.pants||'#1fa3a3';
  const bob=walk?-Math.abs(Math.sin(ph))*8:Math.sin(t*2.4)*3;
  ctx.save();ctx.translate(x,y);ctx.scale(s*dir,s);ctx.lineJoin='round';ctx.lineCap='round';
  ell(0,4,52,10,'rgba(0,0,0,0.3)');
  const stroke=()=>{ctx.lineWidth=lw;ctx.strokeStyle=OL;ctx.stroke()};
  // legs (short, chunky) + sneakers
  for(const [a,back] of [[ph,1],[ph+Math.PI,0]]){const sw=walk?Math.sin(a)*22:0,lift=walk?Math.max(0,Math.cos(a))*10:0;
    ctx.beginPath();rr(-14+sw*0.5-10,-78+bob,22,66-lift,10);ctx.fillStyle=back?shade(pants,0.82):pants;ctx.fill();stroke();
    ctx.beginPath();rr(-18+sw-4,-16-lift,40,18,9);ctx.fillStyle='#ffffff';ctx.fill();stroke()}
  const arm=(ang,front)=>{ctx.save();ctx.translate(front?14:-20,-142+bob);ctx.rotate(ang);ctx.beginPath();rr(-11,0,22,62,11);ctx.fillStyle=front?hood:hoodD;ctx.fill();stroke();
    ctx.beginPath();ctx.arc(0,66,12,0,7);ctx.fillStyle=skin;ctx.fill();stroke();ctx.restore()};
  arm(walk?-Math.sin(ph)*0.5:0.12,false);   // back arm behind the body
  // body (hoodie, pear shape)
  ctx.beginPath();ctx.moveTo(-40,-70+bob);ctx.quadraticCurveTo(-48,-150+bob,-6,-160+bob);ctx.quadraticCurveTo(40,-162+bob,42,-110+bob);ctx.quadraticCurveTo(46,-74+bob,30,-68+bob);ctx.closePath();
  ctx.fillStyle=hood;ctx.fill();stroke();ctx.beginPath();rr(-18,-112+bob,40,22,8);ctx.fillStyle=hoodD;ctx.fill();   // pocket
  // front arm points/waves
  const pt=o.point||0,wv=o.wave||0;arm(walk&&!pt&&!wv?Math.sin(ph)*0.5:-0.15-pt*2.2-wv*(2.6+0.35*Math.sin(t*9)),true);
  // head (big, round) + hair tuft
  const hy=-215+bob+(o.look||0)*6,tilt=(o.look||0)*0.12;ctx.save();ctx.translate(6,hy);ctx.rotate(-tilt);
  ctx.beginPath();ctx.arc(0,0,58,0,7);ctx.fillStyle=skin;ctx.fill();stroke();
  ctx.beginPath();ctx.moveTo(-56,-8);ctx.quadraticCurveTo(-60,-62,-6,-60);ctx.quadraticCurveTo(30,-74,50,-40);ctx.quadraticCurveTo(58,-20,56,-12);ctx.quadraticCurveTo(20,-34,-10,-30);ctx.quadraticCurveTo(-36,-28,-56,-8);ctx.closePath();ctx.fillStyle=hair;ctx.fill();stroke();
  ctx.beginPath();ctx.moveTo(-4,-60);ctx.quadraticCurveTo(4,-86,22,-80);ctx.lineWidth=7;ctx.strokeStyle=hair;ctx.stroke();
  // round glasses + eyes (blink)
  const blink=Math.sin(t*1.7+1.3)>0.985,wow=o.wow||0,ey=4-(o.look||0)*-4;
  for(const ex of[-2,36]){ctx.beginPath();ctx.arc(ex,ey,17,0,7);ctx.fillStyle='rgba(255,255,255,0.9)';ctx.fill();ctx.lineWidth=4;ctx.strokeStyle=OL;ctx.stroke();
    if(blink){ctx.beginPath();ctx.moveTo(ex-7,ey);ctx.lineTo(ex+7,ey);ctx.lineWidth=4;ctx.stroke()}else ell(ex+3,ey-(o.look||0)*-5-3*((o.look||0)<0?1:0),5+2*wow,5+2*wow,OL)}
  ctx.beginPath();ctx.moveTo(15,ey);ctx.lineTo(19,ey);ctx.lineWidth=4;ctx.stroke();
  // brows + mouth
  ctx.lineWidth=5;for(const ex of[-2,36]){ctx.beginPath();ctx.moveTo(ex-10,ey-24-wow*8);ctx.lineTo(ex+10,ey-26-wow*8);ctx.stroke()}
  if(wow>0.3){ell(22,36,8*wow,10*wow,OL)}else{ctx.beginPath();ctx.arc(22,30,12,0.2,Math.PI-0.2);ctx.stroke()}
  ctx.restore();ctx.restore()}
// smTick: the channel mascot — a small living stopwatch with legs that hops and reacts. o = {hop 0..1, wow, look}
function smTick(x,y,s,t,o={}){const hop=(o.hop??1)*Math.abs(Math.sin(t*4))*24,OL='#10243a';ctx.save();ctx.translate(x,y-hop);ctx.scale(s,s);ctx.lineJoin='round';ctx.lineCap='round';
  ctx.lineWidth=7;ctx.strokeStyle='#ffd57a';for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(k*12,40);ctx.lineTo(k*16+Math.sin(t*8)*4*k,62+hop*0.3);ctx.stroke()}
  ctx.strokeStyle=OL;ctx.lineWidth=5;ctx.beginPath();rr(-10,-62,20,16,5);ctx.fillStyle='#ffd57a';ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,46,0,7);ctx.fillStyle='#ffd57a';ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(0,0,36,0,7);ctx.fillStyle='#0d2a48';ctx.fill();
  const a=t*2.2;ctx.strokeStyle='#5fd4ff';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.sin(a)*24,-Math.cos(a)*24);ctx.stroke();
  const w=o.wow||0;for(const ex of[-13,13])ell(ex,-8+(o.look||0)*4,5+w*2,6+w*3,'#ffffff');ctx.beginPath();if(w>0.3)ell(0,14,5,6,'#ffffff');else{ctx.arc(0,10,8,0.2,Math.PI-0.2);ctx.strokeStyle='#ffffff';ctx.lineWidth=3;ctx.stroke()}
  ctx.restore()}

// smAstro: Strange Minute space explorer (owner chose A+D 2026-11-17) — round helmet with visor reflection, backpack light, floating bob
function smAstro(x,y,s,t,o={}){const f=Math.sin(t*2)*10;ctx.save();ctx.translate(x,y+f);ctx.scale(s,s);const OL='#10243a';ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.lineJoin='round';
 ell(0,10-f,50,10,'rgba(0,0,0,0.25)');
 for(const k of[-1,1]){ctx.beginPath();rr(k*22-14,-70,28,62,12);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.beginPath();rr(k*22-16,-14,32,16,7);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke()}
 ctx.beginPath();rr(-70,-190,26,90,10);ctx.fillStyle='#9fb3c8';ctx.fill();ctx.stroke();ell(-57,-170,6,6,Math.sin(t*6)>0?'#5fd4ff':'#1b4a6b');
 ctx.beginPath();rr(-50,-200,100,135,40);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.beginPath();rr(-22,-160,44,26,6);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke();
 ctx.save();ctx.translate(48,-180);ctx.rotate(-0.6-Math.sin(t*4)*0.4);ctx.beginPath();rr(-12,0,24,64,12);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.restore();
 ctx.beginPath();ctx.arc(0,-260,78,0,7);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.ellipse(6,-255,58,48,0,0,7);const g=ctx.createLinearGradient(-40,-300,60,-210);g.addColorStop(0,'#2b6fa8');g.addColorStop(1,'#0b2238');ctx.fillStyle=g;ctx.fill();ctx.stroke();
 ell(-14,-258,8,10,'#ffffff');ell(24,-258,8,10,'#ffffff');ctx.beginPath();ctx.arc(6,-236,10,0.2,Math.PI-0.2);ctx.strokeStyle='#ffffff';ctx.lineWidth=4;ctx.stroke();
 ctx.beginPath();ctx.ellipse(-22,-282,16,8,-0.6,0,7);ctx.fillStyle='rgba(255,255,255,0.45)';ctx.fill();ctx.restore()}
