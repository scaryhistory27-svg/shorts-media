// The Missing Floor — Part 1 (animated: walkers, doors sliding, frozen office, head turn)
function liftInterior(t,o={}){ // perspective elevator cabin: back wall, side walls, tiled floor, light cone, emergency red option
  const fl=o.flicker?life.flicker(t):1, red=o.red||0;ctx.fillStyle='#14171c';ctx.fillRect(-100,-100,W+200,H+200);
  const bx0=230,bx1=850,by0=330,by1=1420;                       // back wall rect
  let g=ctx.createLinearGradient(bx0,0,bx1,0);g.addColorStop(0,'#4a515c');g.addColorStop(0.5,'#6c7480');g.addColorStop(1,'#4a515c');ctx.fillStyle=g;ctx.fillRect(bx0,by0,bx1-bx0,by1-by0);
  ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=2;for(let x=bx0+10;x<bx1;x+=12){ctx.beginPath();ctx.moveTo(x,by0);ctx.lineTo(x+20,by1);ctx.stroke()}
  for(const s of[-1,1]){ctx.beginPath();const ox=s<0?0:W,ix=s<0?bx0:bx1;ctx.moveTo(ox,0);ctx.lineTo(ix,by0);ctx.lineTo(ix,by1);ctx.lineTo(ox,H);ctx.closePath();
    g=ctx.createLinearGradient(ox,0,ix,0);g.addColorStop(0,'#1c2026');g.addColorStop(1,'#3a414b');ctx.fillStyle=g;ctx.fill()}
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(bx1,by0);ctx.lineTo(bx0,by0);ctx.closePath();ctx.fillStyle='#22262d';ctx.fill();
  ctx.beginPath();ctx.moveTo(bx0,by1);ctx.lineTo(bx1,by1);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle='#2a2d33';ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.35)';ctx.lineWidth=3;for(let k=1;k<8;k++){const f=k/8,y=by1+(H-by1)*f*f;ctx.beginPath();ctx.moveTo(bx0-bx0*f*f,y);ctx.lineTo(bx1+(W-bx1)*f*f,y);ctx.stroke()}
  for(let k=-4;k<=4;k++){ctx.beginPath();ctx.moveTo(540+k*68,by1);ctx.lineTo(540+k*240,H);ctx.stroke()}
  ctx.fillStyle='#9aa2ad';ctx.fillRect(bx0,1040,bx1-bx0,12);ctx.strokeStyle='#8c939e';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(0,1180);ctx.lineTo(bx0,1040);ctx.moveTo(W,1180);ctx.lineTo(bx1,1040);ctx.stroke();
  const lc=red?`255,${Math.round(240-200*red)},${Math.round(200-180*red)}`:'255,240,200';ctx.fillStyle=`rgba(${lc},${0.95*fl})`;rr(400,300,280,22,10);ctx.fill();
  lightCone(540,320,0,1300,520,lc,0.16*fl);glow(540,330,600,`rgba(${lc},A)`,0.25*fl);fog(t,900,1700,'200,210,220',0.035);
  if(red){ctx.fillStyle=`rgba(160,0,0,${0.22*red*(0.7+0.3*Math.sin(t*6))})`;ctx.fillRect(0,0,W,H)}
  if(fl<1){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,W,H)}}
function seg7(x,y,txt,size,col){ctx.save();ctx.font=`800 ${size}px "JetBrains Mono"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=col;ctx.shadowBlur=50;ctx.fillStyle=col;ctx.fillText(txt,x,y);ctx.restore()}
function officeBg(t,tint){ctx.fillStyle='#1d2a24';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#24332c';ctx.fillRect(0,300,W,800);
  for(let i=0;i<5;i++){ctx.fillStyle='rgba(220,255,230,0.18)';rr(80+i*200,330,150,22,8);ctx.fill()}
  glow(540,360,700,'rgba(190,255,210,A)',0.14);ctx.fillStyle='#16201b';ctx.fillRect(0,1100,W,900);
  for(const [x,y,s] of [[150,1180,1],[860,1180,1],[500,1060,0.7]]){ctx.fillStyle='#3a4a42';ctx.fillRect(x-110*s,y-60*s,220*s,22*s);ctx.fillRect(x-95*s,y-40*s,14*s,90*s);ctx.fillRect(x+80*s,y-40*s,14*s,90*s);
    ctx.fillStyle='#0f1512';rr(x-50*s,y-150*s,100*s,80*s,6*s);ctx.fill();ctx.fillStyle='rgba(160,255,200,0.25)';rr(x-44*s,y-144*s,88*s,64*s,4*s);ctx.fill()}
  for(const x of [60,1010]){ctx.fillStyle='#3d2e22';ctx.fillRect(x-30,1030,60,70);ctx.fillStyle='#2f5a3a';for(let k=0;k<6;k++){ctx.beginPath();ctx.ellipse(x+Math.cos(k)*30,990-k*12,18,40,k-2.5,0,7);ctx.fill()}}
  for(let i=0;i<5;i++)lightCone(160+i*190,340,0,900,150,'190,255,210',0.07);fog(t,700,1500,'170,220,190',0.04);
  if(tint){ctx.fillStyle=tint;ctx.fillRect(0,0,W,H)}}
function liftDoors(open,cx,top,bot,showInside){ bot=Math.min(bot,1420); // two steel panels sliding apart; open 0..1
  const half=330,gap=open*half;if(showInside){ctx.save();ctx.beginPath();ctx.rect(cx-half,top,2*half,bot-top);ctx.clip();showInside();ctx.restore()}
  for(const s of[-1,1]){const x0=s<0?cx-half-gap:cx+gap;const g=ctx.createLinearGradient(x0,0,x0+half,0);g.addColorStop(0,'#6b727d');g.addColorStop(0.5,'#9aa2ad');g.addColorStop(1,'#6b727d');
    ctx.fillStyle=g;ctx.fillRect(x0,top,half,bot-top);ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(s<0?x0+half-4:x0,top,4,bot-top)}
  ctx.strokeStyle='#22262d';ctx.lineWidth=26;ctx.strokeRect(cx-half-13,top-13,2*half+26,bot-top+26)}
const HERO={top:'#2f4a7a',topD:'#253c64'};
const SCN=({
 display13(lt,p,t,d){ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);const rat=Math.sin(t*40)*3*(1-p);ctx.save();ctx.translate(rat,0);
   glow(540,860,700,'rgba(255,30,30,A)',0.28+0.12*Math.sin(t*5));rr(200,600,680,520,46);ctx.fillStyle='#0b0d10';ctx.fill();ctx.strokeStyle='#2a2f37';ctx.lineWidth=12;ctx.stroke();
   const fl=Math.sin(t*19)>0.55?0.45:1;ctx.globalAlpha=fl;seg7(540,880,'13',320,'#ff3b3b');ctx.globalAlpha=1;
   ctx.fillStyle='#ff3b3b';ctx.beginPath();ctx.moveTo(540,665);ctx.lineTo(495,720);ctx.lineTo(585,720);ctx.fill();ctx.restore();
   fog(t,1100,1700,'120,20,20',0.06);heartbeat(t,0.45)},
 panel(lt,p,t,d){liftInterior(t);ctx.save();ctx.translate(-120,0);ctx.fillStyle='#a3abb5';rr(330,420,420,820,28);ctx.fill();ctx.strokeStyle='#5f6670';ctx.lineWidth=8;ctx.stroke();
   for(let i=0;i<14;i++){const c=i%2,r=Math.floor(i/2),x=440+c*200,y=1140-r*104;const pressed=i===0&&lt>0.4;ell(x,y,46,46,'#5f6670');ell(x,y,38,38,pressed?'#ffd36a':'#cfd5dc');if(pressed)glow(x,y,80,'rgba(255,210,110,A)',0.5);
     let lbl=i<12?String(i+1):(i===12?'':'★');if(i===12&&lt>0.9&&lt<1.4){ell(x,y,38,38,'#ff5a5a');glow(x,y,90,'rgba(255,60,60,A)',0.6)}
     ctx.fillStyle='#1b1e23';ctx.font='800 34px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lbl,x,y+2)}ctx.restore();
   const reachP=clamp(lt/0.4,0,1);walker(860,1700,2.0,t,{speed:0,dir:-1,look:-0.2,reach:lt<0.9?reachP:clamp(1-(lt-0.9)/0.5,0,1),...HERO})},
 elevator(lt,p,t,d,seg){const w=seg.words.find(x=>x.w==='stopped');const hit=w&&t>w.s;const jolt=hit?shakeAt(t,['hit'],0.6,26):0;ctx.save();ctx.translate((Math.random()-.5)*jolt,(Math.random()-.5)*jolt);
   liftInterior(t,{flicker:hit,red:hit?clamp((t-w.s)/0.6,0,1):0});
   const stumble=hit?Math.sin(clamp((t-w.s)/0.5,0,1)*Math.PI)*60:0;walker(540-stumble,1760,2.4,t,{speed:0,dir:1,look:hit?-0.6:0.2,scared:hit&&t>w.s+0.25?1:0,reach:hit?0.7:0,...HERO});
   rr(470,360,140,64,10);ctx.fillStyle='#0b0d10';ctx.fill();seg7(540,394,hit?'--':String(10+Math.min(2,Math.floor(lt*1.2))),46,'#ff3b3b');ctx.restore()},
 display(lt,p,t,d){liftInterior(t,{flicker:true,red:0.6});rr(220,480,640,460,32);ctx.fillStyle='#0b0d10';ctx.fill();
   const roll=clamp(lt/(d*0.55),0,1),off=(1-ease(roll))*460;ctx.save();ctx.beginPath();ctx.rect(220,480,640,460);ctx.clip();
   seg7(540,710-off,'13',270,'#ff3b3b');seg7(540,710-off+460,'12',270,'#ffb020');ctx.restore();if(roll>=1){glow(540,710,520,'rgba(255,40,40,A)',0.25);heartbeat(t,0.4)}},
 doorsopen(lt,p,t,d){liftInterior(t,{red:0.3});const o=ease(clamp((lt-0.25)/(d*0.75),0,1));
   liftDoors(o,540,330,1420,()=>{officeBg(t);walker(540,1400,0.95,t,{freeze:0.9,dir:-1,top:'#5b3f52',hair:'#3a2a22'});lightCone(540,330,0,1100,360,'190,255,210',0.12*o)});
   fog(t,1100,1600,'170,230,190',0.05*o);walker(540,1860,2.6,t,{speed:0,dir:1,look:0,scared:o>0.6?0.7:0,...HERO})},
 office(lt,p,t,d,seg){const cam=lerp(60,-80,ease(p));ctx.save();ctx.translate(cam*0.4,0);officeBg(t,'rgba(0,30,10,0.12)');ctx.restore();
   ctx.save();ctx.translate(cam,0);const tw=(i)=>(Math.sin(t*17+i*9)>0.97?(Math.random()-.5)*6:0);
   walker(230+tw(1),1500,1.3,t,{freeze:0.7,dir:1,top:'#6b6b4a'});walker(860+tw(2),1520,1.35,t,{freeze:2.3,dir:-1,top:'#4a5a6b',hair:'#5a3a1a'});
   walker(560+tw(3),1430,1.1,t,{freeze:1.5,dir:1,...HERO});
   for(let i=0;i<7;i++){const x=120+i*140,y=700+((i*97)%380);ctx.save();ctx.translate(x,y);ctx.rotate((i%3-1)*0.5);ctx.fillStyle='rgba(240,245,235,0.85)';ctx.fillRect(-30,-40,60,80);ctx.restore()}
   ctx.restore();ctx.save();ctx.translate(cam*1.8,0);ctx.fillStyle='#0c120f';ctx.fillRect(-200,1640,700,400);ctx.fillRect(700,1700,700,400);ctx.restore()},
 turn(lt,p,t,d,seg){officeBg(t,'rgba(0,30,10,0.18)');walker(220,1520,1.2,t,{freeze:0.7,dir:1,top:'#6b6b4a'});
   const w=seg.words.find(x=>x.w==='turned');const raw=w?clamp((t-w.s)/1.3,0,1):0;const a=jerky(raw,6,3);
   ctx.save();ctx.translate(640,940);const sx=Math.max(0.15,Math.abs(Math.cos(Math.PI*(1-a))));mom(0,0,1.05,{smile:a,creepy:a*0.7,blink:0});
   if(a<0.5){ctx.scale(sx,1);ell(0,-5,88,108,C.hair);ctx.fillStyle=C.hair;ctx.fillRect(-90,40,180,130)}ctx.restore();
   if(raw>0&&raw<1&&Math.sin(t*30)>0.3){ctx.fillStyle='rgba(0,0,0,0.35)';ctx.fillRect(0,0,W,H)}heartbeat(t,0.35)},
 face(lt,p,t,d){officeBg(t,'rgba(0,25,10,0.35)');const talk=lt>0.6&&lt<d*0.8?Math.abs(Math.sin(lt*12))*0.8:0;const sx=1+0.06*Math.sin(t*3);
   ctx.save();ctx.translate(540,900);ctx.scale(sx,1/sx);mom(0,0,3.0+0.35*p,{creepy:0.85+0.15*p,smile:1,talk});ctx.restore();
   ctx.fillStyle=`rgba(0,40,15,${0.18+0.1*Math.sin(t*9)})`;ctx.fillRect(0,0,W,H);heartbeat(t,0.5)},
 button(lt,p,t,d,seg){liftInterior(t,{flicker:true,red:0.7});ctx.fillStyle='#9aa2ad';rr(240,380,600,1000,30);ctx.fill();
   const press=Math.abs(Math.sin(lt*Math.PI*2.4));const down=press>0.7;ell(540,880,120,120,'#5f6670');ell(540,880,104-(down?8:0),104-(down?8:0),down?'#ffd36a':'#cfd5dc');
   ctx.fillStyle='#1b1e23';ctx.font='900 70px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('▶◀',540,884);if(down)glow(540,880,240,'rgba(255,210,110,A)',0.5);
   const hx=lerp(700,600,press),hy=lerp(1080,960,press);ctx.save();ctx.strokeStyle=HERO.top;ctx.lineWidth=150;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(1300,1950);ctx.lineTo(hx+60,hy+80);ctx.stroke();
   ctx.translate(hx,hy);ctx.rotate(-0.7);ell(0,0,62,80,C.skin);ctx.restore();const sh=down?8:0;ctx.translate((Math.random()-.5)*sh,0)},
 doorsclose(lt,p,t,d){liftInterior(t,{red:0.8});const o=1-ease(clamp(p*1.25,0,1));const run=ease(clamp(p*1.3,0,1));
   liftDoors(o,540,330,1420,()=>{officeBg(t,'rgba(0,30,10,0.2)');walker(540,1000+run*560,0.7+run*1.6,t,{speed:2.6,dir:1,top:'#5b3f52',hair:'#3a2a22',reach:1})});
   walker(540,1880,2.6,t,{speed:0,dir:1,scared:1,reach:0.4,look:0,...HERO});if(p>0.82){const a=1-(p-0.82)/0.18;ctx.fillStyle=`rgba(255,255,255,${0.25*a})`;ctx.fillRect(0,0,W,H)}},
 reflection(lt,p,t,d,seg){liftInterior(t);liftDoors(0,540,330,1420,null);
   ctx.save();ctx.beginPath();ctx.rect(210,330,660,1090);ctx.clip();ctx.globalAlpha=0.35;
   const away=ease(clamp((p-0.15)/0.7,0,1));walker(lerp(560,720,away),1400-away*140,1.5-0.55*away,t,{speed:p>0.15&&p<0.85?1.2:0,dir:p>0.85?-1:1,look:p>0.85?1:0,...HERO,top:'#3a4f70'});ctx.globalAlpha=1;ctx.restore();
   const pant=Math.sin(t*9)*6;walker(540,1880+pant*0.3,2.6,t,{speed:0,dir:-1,look:0.2,scared:p>0.4?1:0,...HERO});heartbeat(t,0.4);
   const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={display13:[1.06,1.0],panel:[1,1.05],elevator:[1,1.06],display:[1,1.1],doorsopen:[1,1.04],office:[1.02,1.1],turn:[1,1.08],face:[1,1.05],button:[1,1.06],doorsclose:[1,1.04],reflection:[1,1.06]};

// ===== Part 3 scenes =====
function bathroom(t){ fog(t,1200,1900,'190,210,230',0.04);ctx.fillStyle='#1b2226';ctx.fillRect(-100,-100,W+200,H+200);ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=3;
  for(let x=0;x<W;x+=90){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=90){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  glow(540,300,700,'rgba(220,240,255,A)',0.18*life.flicker(t*0.5));lightCone(540,180,0,1500,500,'220,240,255',0.1*life.flicker(t*0.5))}
function mirrorFrame(x,y,w,h,inner){ctx.fillStyle='#0d1114';ctx.fillRect(x-24,y-24,w+48,h+48);ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#3c4a52');g.addColorStop(1,'#1f282e');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);if(inner)inner();
  ctx.fillStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(x+40,y);ctx.lineTo(x+140,y);ctx.lineTo(x+20,y+h*0.5);ctx.lineTo(x-60,y+h*0.5);ctx.fill();ctx.restore()}

function bigFace(cx,cy,s,t,o={}){ // the hero's own face, close-up (smile 0..1, creepy eyes, lateBlink)
  ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);ctx.fillStyle=HERO.top;ctx.beginPath();ctx.ellipse(0,190,170,90,0,0,7);ctx.fill();
  ctx.fillStyle=C.skinD;ctx.fillRect(-26,80,52,70);const g=ctx.createRadialGradient(-30,-30,10,0,0,120);g.addColorStop(0,'#e7b48f');g.addColorStop(1,C.skinD);ell(0,0,95,112,g);
  ctx.fillStyle='#1d1512';ctx.beginPath();ctx.ellipse(0,-55,100,70,0,Math.PI*1.02,Math.PI*1.98);ctx.fill();ctx.fillRect(-98,-60,196,22);
  const bl=o.blink?1:0;for(const sx of[-1,1]){ell(sx*36,-5,20,(o.creepy?16:12)*(1-bl)+1,'#f4f1ea');if(!bl)ell(sx*36+(o.look||0)*6,-5,o.creepy?4:7,o.creepy?4:7,'#120c0a')}
  ctx.strokeStyle='#1d1512';ctx.lineWidth=7;ctx.lineCap='round';for(const sx of[-1,1]){ctx.beginPath();ctx.moveTo(sx*18,-36);ctx.lineTo(sx*58,-40+(o.creepy?6:0));ctx.stroke()}
  ctx.strokeStyle=C.skinD;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-7,32);ctx.lineTo(6,34);ctx.stroke();
  const sm=o.smile||0;if(sm>0.4){const w=30+sm*34;ctx.fillStyle='#2b0d10';ctx.beginPath();ctx.moveTo(-w,58);ctx.quadraticCurveTo(0,90+sm*16,w,58);ctx.quadraticCurveTo(0,70,-w,58);ctx.fill();
    ctx.fillStyle='#f3efe4';ctx.beginPath();ctx.moveTo(-w+6,60);ctx.quadraticCurveTo(0,80+sm*8,w-6,60);ctx.quadraticCurveTo(0,68,-w+6,60);ctx.fill()}
  else{ctx.strokeStyle='#8b3a3a';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-28,62);ctx.lineTo(28,62);ctx.stroke()}ctx.restore()}
Object.assign(SCN,{
 lobbycall(lt,p,t,d,seg){ctx.fillStyle='#202631';ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<3;i++)lightCone(220+i*320,300,0,1100,200,'255,230,180',0.08);fog(t,900,1500,'200,200,210',0.04);
   ctx.fillStyle='#151a22';ctx.fillRect(0,1300,W,700);liftDoors(0,540,420,1300,null);rr(470,330,140,60,8);ctx.fillStyle='#0b0d10';ctx.fill();seg7(540,362,lt>d*0.5?'13':'1',40,lt>d*0.5?'#ff3b3b':'#e8e8e8');
   const w=seg.words.find(x=>x.w==='elevator');const pr=w&&t>w.s;ell(930,900,26,26,pr?'#ffd36a':'#cfd5dc');if(pr)glow(930,900,80,'rgba(255,210,110,A)',0.5);
   walker(moveAlong(clamp(p*1.5,0,1),-150,760),1720,2.2,t,{speed:p<0.66?1.5:0,dir:1,look:p>0.66?-0.3:0,reach:pr?0.8:0,...HERO});heartbeat(t,0.25)},
 office2(lt,p,t,d,seg){officeBg(t,'rgba(0,30,10,0.16)');walker(200,1500,1.25,t,{freeze:0.7,dir:1,top:'#6b6b4a'});walker(900,1520,1.3,t,{freeze:2.3,dir:-1,top:'#4a5a6b',hair:'#5a3a1a'});
   const w=seg.words.find(x=>x.w==='turned');const a=w?jerky(clamp((t-w.s)/1.1,0,1),6,7):0;const z=1+0.25*ease(p);
   ctx.save();ctx.translate(540,1560);ctx.scale(z,z);ctx.translate(-540,-1560);walker(540,1560,2.0,t,{freeze:0.4,dir:a>0.5?-1:1,look:a>0.5?0:0.0,...HERO});ctx.restore();
   if(a>0&&a<1&&Math.sin(t*30)>0.3){ctx.fillStyle='rgba(0,0,0,0.3)';ctx.fillRect(0,0,W,H)}heartbeat(t,0.35)},
 myface(lt,p,t,d,seg){officeBg(t,'rgba(0,30,10,0.35)');const idx=TL.segs.indexOf(seg);const sm=idx===8?ease(clamp(lt/1.4,0,1)):1;
   bigFace(540,860,3.4+0.3*p,t,{smile:sm,creepy:idx===9,look:Math.sin(t*0.8)*0.4});fog(t,1300,1800,'170,230,190',0.05);heartbeat(t,0.5)},
 reflectstep(lt,p,t,d){liftInterior(t,{red:0.4});liftDoors(0,540,330,1420,null);ctx.save();ctx.beginPath();ctx.rect(210,330,660,1090);ctx.clip();
   const out=ease(clamp(p*1.3,0,1));ctx.globalAlpha=0.35+0.65*out;walker(lerp(560,760,out),1400+out*320,1.5+out*0.9,t,{speed:out<1?1.3:0,dir:1,...HERO,top:'#3a4f70'});ctx.restore();
   if(out>0.4){ctx.globalAlpha=out;walker(lerp(820,900,out),1400+out*320,1.5+out*0.9,t,{speed:1.3,dir:1,...HERO,top:'#3a4f70'});ctx.globalAlpha=1}
   walker(330,1860,2.4,t,{speed:0,dir:1,look:0.6,scared:1,...HERO});heartbeat(t,0.4)},
 walkhome(lt,p,t,d){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2a1a2e');g.addColorStop(0.5,'#7a3a3a');g.addColorStop(1,'#1a1418');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
   glow(800,700,500,'rgba(255,160,90,A)',0.3);for(let L=0;L<3;L++){const sp=[20,45,90][L],col=['#2a1f2a','#1f1820','#120e14'][L];ctx.fillStyle=col;for(let i=0;i<10;i++){const x=((i*170-t*sp)%1700+1700)%1700-300,h=[500,380,260][L]+((i*53)%4)*60;ctx.fillRect(x,1300-h+L*120,150,h+600)}}
   for(let i=0;i<6;i++){const x=((i*260-t*90)%1560+1560)%1560-260;ctx.fillStyle='#0d0a0e';ctx.fillRect(x,860,10,560);glow(x+5,860,90,'rgba(255,200,120,A)',0.5)}
   ctx.fillStyle='#0d0a0e';ctx.fillRect(0,1420,W,600);walker(540,1720,2.1,t,{speed:1.4,dir:1,look:-0.2,...HERO})},
 mirrorlate(lt,p,t,d){bathroom(t);const bl=(lt%2.4)<0.18,bl2=((lt-0.55+2.4)%2.4)<0.18;
   mirrorFrame(240,380,600,820,()=>{ctx.save();ctx.translate(540,0);ctx.scale(-1,1);ctx.translate(-540,0);bigFace(540,760,1.7,t,{blink:bl2,smile:lt>d*0.7?0.6:0});ctx.restore()});
   ctx.save();ctx.globalAlpha=1;bigFace(540,1640,2.2,t,{blink:bl,look:0});ctx.restore();heartbeat(t,0.35)},
 endq(lt,p,t,d,seg){ctx.fillStyle='#050608';ctx.fillRect(-100,-100,W+200,H+200);const a=ease(clamp(lt/0.8,0,1));
   ctx.save();ctx.globalAlpha=a;walker(380,1500,1.7,t,{speed:0,dir:1,...HERO});ctx.globalAlpha=a*0.8;walker(700,1500,1.7,t,{speed:0,dir:-1,...HERO,top:'#3a4f70'});ctx.restore();
   glow(540,1200,500,'rgba(255,40,40,A)',0.12);heartbeat(t,0.5);
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const b=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*b})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=b;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
Object.assign(CAM,{lobbycall:[1,1.05],office2:[1,1.04],myface:[1,1.06],reflectstep:[1,1.05],walkhome:[1,1.03],mirrorlate:[1,1.06],endq:[1,1.05]});
