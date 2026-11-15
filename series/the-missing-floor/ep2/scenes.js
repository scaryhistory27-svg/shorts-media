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
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={display13:[1.06,1.0],panel:[1,1.05],elevator:[1,1.06],display:[1,1.1],doorsopen:[1,1.04],office:[1.02,1.1],turn:[1,1.08],face:[1,1.05],button:[1,1.06],doorsclose:[1,1.04],reflection:[1,1.06]};

// ===== Part 2 scenes (documented evidence) =====
function bathroom(t){ fog(t,1200,1900,'190,210,230',0.04);ctx.fillStyle='#1b2226';ctx.fillRect(-100,-100,W+200,H+200);ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=3;
  for(let x=0;x<W;x+=90){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=90){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  glow(540,300,700,'rgba(220,240,255,A)',0.18*life.flicker(t*0.5));lightCone(540,180,0,1500,500,'220,240,255',0.1*life.flicker(t*0.5))}
function mirrorFrame(x,y,w,h,inner){ctx.fillStyle='#0d1114';ctx.fillRect(x-24,y-24,w+48,h+48);ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#3c4a52');g.addColorStop(1,'#1f282e');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);if(inner)inner();
  ctx.fillStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(x+40,y);ctx.lineTo(x+140,y);ctx.lineTo(x+20,y+h*0.5);ctx.lineTo(x-60,y+h*0.5);ctx.fill();ctx.restore()}
function cctvLobby(t,o={}){ctx.fillStyle='#2b2f33';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#3a3f44';ctx.fillRect(120,480,840,880);
  ctx.fillStyle='#202428';ctx.fillRect(0,1360,W,600);const dx=o.open?110:0;ctx.fillStyle='#5b6168';ctx.fillRect(330-dx,620,210,740);ctx.fillRect(540+dx,620,210,740);
  ctx.fillStyle='#16181b';if(o.open)ctx.fillRect(440,620,200,740);ctx.fillStyle='#16181b';rr(470,540,140,60,8);ctx.fill();seg7(540,572,o.floor||'1',40,'#e8e8e8');
  if(o.figure){ctx.globalAlpha=0.9;walker(540,1340,0.9,t,{speed:0,dir:1,top:'#7a8088',skin:'#b0b4b8',hair:'#55595e'});ctx.globalAlpha=1}
  ctx.fillStyle='rgba(0,0,0,0.18)';for(let y=0;y<H;y+=6)ctx.fillRect(0,y,W,2);const yb=(t*300)%H;ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(0,yb,W,40);
  ctx.save();ctx.font='700 40px "JetBrains Mono"';ctx.fillStyle='#e8e8e8';ctx.textAlign='left';ctx.fillText('CAM 02 · LOBBY · CAR 2',60,300);ctx.textAlign='right';
  const base=o.base||47;const m=base+Math.floor((o.extra||0));ctx.fillText(`${16+Math.floor(m/60)}:${String(m%60).padStart(2,'0')}:${String(Math.floor(t*7)%60).padStart(2,'0')}`,W-60,300);
  if(Math.floor(t*2)%2===0){ell(80,370,12,12,C.red);ctx.textAlign='left';ctx.fillStyle=C.red;ctx.fillText('REC',104,384)}ctx.restore()}
function book(cx,cy,lines,reveal,o={}){ctx.save();ctx.translate(cx,cy);ctx.rotate(-0.03);ctx.shadowColor='rgba(0,0,0,0.7)';ctx.shadowBlur=50;ctx.fillStyle='#d8cba6';ctx.fillRect(-470,-560,940,1060);ctx.shadowBlur=0;
  ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(-8,-560,16,1060);ctx.strokeStyle='rgba(90,70,40,0.25)';ctx.lineWidth=2;for(let y=-470;y<480;y+=62){ctx.beginPath();ctx.moveTo(-440,y);ctx.lineTo(440,y);ctx.stroke()}
  ctx.font='italic 700 46px "Bitstream Charter", serif';ctx.textAlign='left';let shown=reveal;
  lines.forEach((l,i)=>{const y=-480+i*(o.lh||88);const n=Math.max(0,Math.min(l.t.length,Math.floor(shown)));shown-=l.t.length;ctx.fillStyle=l.c||'#2a1a14';ctx.fillText(l.t.slice(0,n),-430+(l.x||0),y);
    if(l.strike&&n===l.t.length){ctx.strokeStyle='rgba(120,20,20,0.8)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-430+(l.x||0),y-14);ctx.lineTo(-430+(l.x||0)+ctx.measureText(l.t).width,y-14);ctx.stroke()}});ctx.restore()}
Object.assign(SCN,{
 mirrorhook(lt,p,t,d){bathroom(t);mirrorFrame(210,420,660,880,()=>{ctx.fillStyle='#2a343a';ctx.fillRect(210,1000,660,300);glow(540,560,400,'rgba(220,240,255,A)',0.2)});
   ctx.strokeStyle=`rgba(255,60,60,${0.5+0.4*Math.sin(t*6)})`;ctx.lineWidth=6;ctx.setLineDash([22,16]);ctx.strokeRect(390,700,300,600);ctx.setLineDash([]);
   walker(540,1880,3.0,t,{speed:0,dir:1,look:Math.sin(t*1.5)*0.4,scared:0.8,reach:0.3+0.2*Math.sin(t*2),...HERO});heartbeat(t,0.45)},
 mirror(lt,p,t,d){bathroom(t);mirrorFrame(210,420,660,880,()=>{ctx.fillStyle='#2a343a';ctx.fillRect(210,1000,660,300)});
   ctx.fillStyle='#e8eef2';rr(240,1330,600,80,30);ctx.fill();walker(moveAlong(clamp(p*1.6,0,1),1200,560),1840,2.6,t,{speed:p<0.62?1.4:0,dir:-1,look:p>0.62?0.4:0,scared:p>0.7?1:0,...HERO})},
 lobby(lt,p,t,d){ctx.fillStyle='#202631';ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<4;i++){const x=((i*330-t*60)%1320+1320)%1320-160;ctx.fillStyle='#2b3341';ctx.fillRect(x,350,40,950)}
   glow(540,320,800,'rgba(255,230,180,A)',0.16);for(let i=0;i<3;i++)lightCone(220+i*320,300,0,1100,200,'255,230,180',0.08);fog(t,900,1500,'200,200,210',0.04);ctx.fillStyle='#151a22';ctx.fillRect(0,1300,W,700);
   if(lt>0.6&&lt<1.4) walker(moveAlong(clamp((lt-0.6)/0.8,0,1),-100,300),1180,0.9,t,{speed:1.5,dir:1,top:'#5b3f52',hair:'#3a2a22'}); // hidden clue: the woman from floor 13 crosses the lobby
   ctx.fillStyle='#3a2f28';rr(600,1060,420,240,14);ctx.fill();walker(820,1060,1.3,t,{speed:0,dir:-1,top:'#1d2a3a',hair:'#222'});ctx.fillStyle='#3a2f28';ctx.fillRect(600,1060,420,240);
   walker(moveAlong(p,80,520),1560,2.0,t,{speed:1.5,dir:1,...HERO})},
 cctv(lt,p,t,d,seg){cctvLobby(t,{open:false,base:47,extra:p*3});if(Math.sin(t*3.1)>0.93){for(let i=0;i<5;i++){const y=Math.random()*H;ctx.drawImage(cv,0,y,W,30,(Math.random()-.5)*60,y,W,30)}}},
 cctvstand(lt,p,t,d){cctvLobby(t,{open:true,figure:true,base:49,extra:p*24});const a=ease(p*2);ctx.strokeStyle=`rgba(255,77,79,${a})`;ctx.lineWidth=6;ctx.strokeRect(470,1080,140,280);
   ctx.font='700 34px "JetBrains Mono"';ctx.fillStyle=`rgba(255,77,79,${a})`;ctx.textAlign='center';ctx.fillText('NO MOTION · 26 MIN',540,1050);heartbeat(t,0.35)},
 logbook(lt,p,t,d,seg){ctx.fillStyle='#120f0c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,800,'rgba(255,200,130,A)',0.18);
   const L=[{t:'MAINTENANCE LOG — ELEVATOR'},{t:''},{t:'Car 2 — stops at 13'},{t:'every day 4:47 PM.',c:'#7a0d0d'},{t:''},{t:'DO NOT SERVICE.',c:'#7a0d0d'},{t:'Do not ride alone.',c:'#7a0d0d'}];
   const idx=TL.segs.indexOf(seg);const rev=(idx===7?p*28:28+p*90);book(540,980,L,rev);
   const px=-430+((idx===7?p*28:28+p*90)%40)*20;glow(540+px*0.2,700,120,'rgba(255,230,180,A)',0.25)},
 names(lt,p,t,d,seg){ctx.fillStyle='#120f0c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,800,'rgba(255,200,130,A)',0.15);
   const L=[{t:'STEPPED OUT:'},{t:'R. Alvarez — 1998',strike:1},{t:'M. Okafor — 2004',strike:1},{t:'J. Lindqvist — 2011',strike:1},{t:'S. Park — 2019',strike:1},{t:'',x:0}];
   const idx=TL.segs.indexOf(seg);book(540,900,L,idx===9?p*80:200,{lh:110});
   if(idx===10){const a=ease(p*1.5);ctx.save();ctx.globalAlpha=a;ctx.translate(540,1150);ctx.rotate(0.05);ctx.fillStyle='#f1f1f1';rr(-150,-90,300,180,12);ctx.fill();
     ctx.fillStyle=HERO.top;ctx.fillRect(-120,-60,110,120);ell(-65,-30,26,30,C.skin);ctx.fillStyle='#1d1512';ctx.beginPath();ctx.ellipse(-67,-44,28,20,0,Math.PI,0);ctx.fill();
     ctx.fillStyle='#333';ctx.font='700 26px Inter';ctx.textAlign='left';ctx.fillText('EMPLOYEE',10,-20);ctx.fillText('FLOOR 13',10,20);ctx.font='700 22px "JetBrains Mono"';ctx.fillStyle='#b00';ctx.fillText('4:47',10,55);ctx.restore();
     ctx.strokeStyle=`rgba(255,40,40,${a})`;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(540,1150,210,130,0.05,0,Math.PI*2);ctx.stroke();heartbeat(t,0.5)}},
 alarm(lt,p,t,d,seg){ctx.fillStyle='#06080c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,900,700,'rgba(255,80,80,A)',0.14);const sh=shakeAt(t,['buzz'],0.3,12)*(Math.random()-.5)*2;
   phone(540+sh,900,1.6,-0.03,()=>{const g=ctx.createLinearGradient(0,-380,0,380);g.addColorStop(0,'#2a0d12');g.addColorStop(1,'#0c0a10');ctx.fillStyle=g;ctx.fillRect(-200,-400,400,800);
     ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='300 96px Inter';ctx.fillText('4:47',0,-150);ctx.font='600 22px Inter';ctx.fillStyle='#ff9a9a';ctx.fillText('PM · ALARM',0,-105);
     ctx.fillStyle='#fff';ctx.font='700 26px Inter';ctx.fillText('Floor 13',0,-40);ctx.font='500 18px Inter';ctx.fillStyle='#aaa';ctx.fillText('created: not by you',0,-8);
     const pulse=0.5+0.5*Math.sin(t*8);ell(0,230,60+pulse*8,60+pulse*8,'rgba(255,60,60,0.5)');ell(0,230,52,52,'#ff4d4f');ctx.fillStyle='#fff';ctx.font='700 22px Inter';ctx.fillText('STOP',0,238)});heartbeat(t,0.5);
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
Object.assign(CAM,{mirrorhook:[1.05,1.0],mirror:[1,1.06],lobby:[1,1.04],cctv:[1,1.05],cctvstand:[1.02,1.12],logbook:[1,1.05],names:[1,1.06],alarm:[1,1.08]});
