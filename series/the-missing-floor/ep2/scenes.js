// The Missing Floor — Part 1 (animated: walkers, doors sliding, frozen office, head turn)
function liftInterior(t,o={}){ // elevator cabin: brushed steel walls, handrail, flickering ceiling light
  const fl=o.flicker?life.flicker(t):1;ctx.fillStyle='#2b3038';ctx.fillRect(-100,-100,W+200,H+200);
  const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,'#3b414b');g.addColorStop(0.5,'#5a616c');g.addColorStop(1,'#3b414b');ctx.fillStyle=g;ctx.fillRect(60,260,960,1300);
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=2;for(let x=80;x<1000;x+=14){ctx.beginPath();ctx.moveTo(x,260);ctx.lineTo(x+40,1560);ctx.stroke()}
  ctx.fillStyle='#8c939e';ctx.fillRect(60,1080,960,16);ctx.fillStyle='#1c2027';ctx.fillRect(0,1560,W,400);
  ctx.fillStyle=`rgba(255,248,220,${0.9*fl})`;rr(330,250,420,26,10);ctx.fill();glow(540,300,700,'rgba(255,240,200,A)',0.28*fl);
  if(fl<1){ctx.fillStyle='rgba(0,0,0,0.45)';ctx.fillRect(0,0,W,H)}}
function seg7(x,y,txt,size,col){ctx.save();ctx.font=`800 ${size}px "JetBrains Mono"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=col;ctx.shadowBlur=50;ctx.fillStyle=col;ctx.fillText(txt,x,y);ctx.restore()}
function officeBg(t,tint){ctx.fillStyle='#1d2a24';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#24332c';ctx.fillRect(0,300,W,800);
  for(let i=0;i<5;i++){ctx.fillStyle='rgba(220,255,230,0.18)';rr(80+i*200,330,150,22,8);ctx.fill()}
  glow(540,360,700,'rgba(190,255,210,A)',0.14);ctx.fillStyle='#16201b';ctx.fillRect(0,1100,W,900);
  for(const [x,y,s] of [[150,1180,1],[860,1180,1],[500,1060,0.7]]){ctx.fillStyle='#3a4a42';ctx.fillRect(x-110*s,y-60*s,220*s,22*s);ctx.fillRect(x-95*s,y-40*s,14*s,90*s);ctx.fillRect(x+80*s,y-40*s,14*s,90*s);
    ctx.fillStyle='#0f1512';rr(x-50*s,y-150*s,100*s,80*s,6*s);ctx.fill();ctx.fillStyle='rgba(160,255,200,0.25)';rr(x-44*s,y-144*s,88*s,64*s,4*s);ctx.fill()}
  for(const x of [60,1010]){ctx.fillStyle='#3d2e22';ctx.fillRect(x-30,1030,60,70);ctx.fillStyle='#2f5a3a';for(let k=0;k<6;k++){ctx.beginPath();ctx.ellipse(x+Math.cos(k)*30,990-k*12,18,40,k-2.5,0,7);ctx.fill()}}
  if(tint){ctx.fillStyle=tint;ctx.fillRect(0,0,W,H)}}
function liftDoors(open,cx,top,bot,showInside){ // two steel panels sliding apart; open 0..1
  const half=330,gap=open*half;if(showInside){ctx.save();ctx.beginPath();ctx.rect(cx-half,top,2*half,bot-top);ctx.clip();showInside();ctx.restore()}
  for(const s of[-1,1]){const x0=s<0?cx-half-gap:cx+gap;const g=ctx.createLinearGradient(x0,0,x0+half,0);g.addColorStop(0,'#6b727d');g.addColorStop(0.5,'#9aa2ad');g.addColorStop(1,'#6b727d');
    ctx.fillStyle=g;ctx.fillRect(x0,top,half,bot-top);ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(s<0?x0+half-4:x0,top,4,bot-top)}
  ctx.strokeStyle='#22262d';ctx.lineWidth=26;ctx.strokeRect(cx-half-13,top-13,2*half+26,bot-top+26)}
const HERO={top:'#2f4a7a',topD:'#253c64'};
const SCN=({
 display13(lt,p,t,d){ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);glow(540,860,620,'rgba(255,40,40,A)',0.25);
   rr(230,620,620,480,40);ctx.fillStyle='#0b0d10';ctx.fill();ctx.strokeStyle='#2a2f37';ctx.lineWidth=10;ctx.stroke();
   const fl=Math.sin(t*19)>0.6?0.55:1;ctx.globalAlpha=fl;seg7(540,880,'13',300,'#ff3b3b');ctx.globalAlpha=1;
   ctx.fillStyle='#ff3b3b';ctx.beginPath();ctx.moveTo(540,680);ctx.lineTo(500,730);ctx.lineTo(580,730);ctx.fill()},
 panel(lt,p,t,d){liftInterior(t);ctx.fillStyle='#9aa2ad';rr(300,420,480,900,30);ctx.fill();ctx.strokeStyle='#5f6670';ctx.lineWidth=8;ctx.stroke();
   for(let i=0;i<14;i++){const c=i%2,r=Math.floor(i/2),x=420+c*240,y=1220-r*118;ell(x,y,52,52,'#5f6670');ell(x,y,44,44,'#cfd5dc');
     let lbl=i<12?String(i+1):(i===12?'':'★');if(i===12){const on=lt>0.4&&lt<0.95;if(on){ell(x,y,44,44,'#ff5a5a');glow(x,y,90,'rgba(255,60,60,A)',0.6)}}
     ctx.fillStyle='#1b1e23';ctx.font='800 40px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lbl,x,y+2)}
   walker(925,1560,1.55,t,{speed:0,dir:-1,look:-0.3,...HERO})},
 elevator(lt,p,t,d,seg){const w=seg.words.find(x=>x.w==='stopped');const jolt=w?shakeAt(t,['hit'],0.5,22):0;ctx.save();ctx.translate((Math.random()-.5)*jolt,(Math.random()-.5)*jolt);
   liftInterior(t,{flicker:w&&t>w.s});walker(540,1560,1.9,t,{speed:0,dir:1,look:w&&t>w.s?-0.5:0,scared:w&&t>w.s+0.3?0.6:0,...HERO});
   rr(470,300,140,70,10);ctx.fillStyle='#0b0d10';ctx.fill();seg7(540,337,w&&t>w.s?'--':'12',48,'#ff3b3b');ctx.restore()},
 display(lt,p,t,d){liftInterior(t,{flicker:true});rr(240,520,600,420,30);ctx.fillStyle='#0b0d10';ctx.fill();const v=lt<d*0.45?'12':'13';
   seg7(540,735,v,260,v==='13'?'#ff3b3b':'#ffb020');if(v==='13')glow(540,735,500,'rgba(255,40,40,A)',0.2)},
 doorsopen(lt,p,t,d){liftInterior(t);const o=ease(clamp((lt-0.3)/(d*0.7),0,1));
   liftDoors(o,540,330,1560,()=>{officeBg(t);walker(540,1500,1.0,t,{freeze:0.9,dir:-1,top:'#5b3f52',hair:'#3a2a22'})});
   walker(540,1700,2.4,t,{speed:0,dir:1,look:0,...HERO})},
 office(lt,p,t,d,seg){officeBg(t,'rgba(0,30,10,0.12)');const cam=lerp(0,-60,ease(p));ctx.save();ctx.translate(cam,0);
   walker(250,1500,1.25,t,{freeze:0.7,dir:1,top:'#6b6b4a'});walker(840,1520,1.3,t,{freeze:2.3,dir:-1,top:'#4a5a6b',hair:'#5a3a1a'});
   walker(560,1440,1.1,t,{freeze:1.5,dir:1,...HERO});ctx.restore();
   for(let i=0;i<40;i++){const x=(i*137)%W,y=(i*251)%1400+200;ell(x,y,2,2,'rgba(220,255,230,0.35)')}},
 turn(lt,p,t,d,seg){officeBg(t,'rgba(0,30,10,0.18)');walker(220,1520,1.2,t,{freeze:0.7,dir:1,top:'#6b6b4a'});
   const w=seg.words.find(x=>x.w==='turned');const a=w?ease(clamp((t-w.s)/1.2,0,1)):0;
   ctx.save();ctx.translate(640,940);const sx=Math.max(0.15,Math.abs(Math.cos(Math.PI*(1-a))));mom(0,0,1.0,{smile:a,creepy:a*0.6,blink:0});
   if(a<0.5){ctx.scale(sx,1);ell(0,-5,88,108,C.hair);ctx.fillStyle=C.hair;ctx.fillRect(-90,40,180,130)}ctx.restore()},
 face(lt,p,t,d){officeBg(t,'rgba(0,25,10,0.35)');const talk=lt>0.6&&lt<d*0.8?Math.abs(Math.sin(lt*12))*0.8:0;
   mom(540,900,2.9+0.25*p,{creepy:0.8+0.2*p,smile:1,talk});ctx.fillStyle='rgba(0,40,15,0.18)';ctx.fillRect(0,0,W,H)},
 button(lt,p,t,d,seg){liftInterior(t,{flicker:true});ctx.fillStyle='#9aa2ad';rr(240,380,600,1000,30);ctx.fill();
   const w=seg.words.find(x=>x.w==='smashed');const hit=w&&t>w.s;ell(540,880,120,120,'#5f6670');ell(540,880,104,104,hit?'#ffd36a':'#cfd5dc');
   ctx.fillStyle='#1b1e23';ctx.font='900 70px Inter';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('▶◀',540,884);if(hit)glow(540,880,240,'rgba(255,210,110,A)',0.5);
   const a=ease(clamp(p*1.8,0,1));const hx=lerp(1250,600,a),hy=lerp(1700,960,a);ctx.save();ctx.strokeStyle=HERO.top;ctx.lineWidth=150;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(1300,1950);ctx.lineTo(hx+60,hy+80);ctx.stroke();
   ctx.translate(hx,hy);ctx.rotate(-0.7);ell(0,0,62,80,C.skin);ctx.restore()},
 doorsclose(lt,p,t,d){liftInterior(t);const o=1-ease(clamp(p*1.4,0,1));
   liftDoors(o,540,330,1560,()=>{officeBg(t,'rgba(0,30,10,0.2)');mom(540,780+0*p,1.5+0.6*p,{creepy:1,smile:1})});
   walker(540,1720,2.4,t,{speed:0,dir:1,scared:1,reach:0.3,...HERO})},
 reflection(lt,p,t,d,seg){liftInterior(t);liftDoors(0,540,330,1560,null);
   ctx.save();ctx.beginPath();ctx.rect(210,330,660,1230);ctx.clip();ctx.globalAlpha=0.32;
   walker(lerp(560,700,ease(p)),1500-ease(p)*120,1.6-0.5*ease(p),t,{speed:p>0.15?1.2:0,dir:1,...HERO,top:'#3a4f70'});ctx.globalAlpha=1;ctx.restore();
   walker(540,1760,2.5,t,{speed:0,dir:-1,look:0.2,scared:p>0.4?1:0,...HERO});
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={display13:[1.06,1.0],panel:[1,1.05],elevator:[1,1.06],display:[1,1.1],doorsopen:[1,1.04],office:[1.02,1.1],turn:[1,1.08],face:[1,1.05],button:[1,1.06],doorsclose:[1,1.04],reflection:[1,1.06]};

// ===== Part 2 scenes (documented evidence) =====
function bathroom(t){ctx.fillStyle='#1b2226';ctx.fillRect(-100,-100,W+200,H+200);ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=3;
  for(let x=0;x<W;x+=90){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=90){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  glow(540,300,700,'rgba(220,240,255,A)',0.18*life.flicker(t*0.5))}
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
   walker(540,1880,3.0,t,{speed:0,dir:1,look:0,scared:0.6,...HERO})},
 mirror(lt,p,t,d){bathroom(t);mirrorFrame(210,420,660,880,()=>{ctx.fillStyle='#2a343a';ctx.fillRect(210,1000,660,300)});
   ctx.fillStyle='#e8eef2';rr(240,1330,600,80,30);ctx.fill();walker(moveAlong(clamp(p*1.6,0,1),1200,560),1840,2.6,t,{speed:p<0.62?1.4:0,dir:-1,look:p>0.62?0.4:0,scared:p>0.7?1:0,...HERO})},
 lobby(lt,p,t,d){ctx.fillStyle='#202631';ctx.fillRect(-100,-100,W+200,H+200);for(let i=0;i<4;i++){const x=((i*330-t*60)%1320+1320)%1320-160;ctx.fillStyle='#2b3341';ctx.fillRect(x,350,40,950)}
   glow(540,320,800,'rgba(255,230,180,A)',0.16);ctx.fillStyle='#151a22';ctx.fillRect(0,1300,W,700);
   if(lt>0.6&&lt<1.4) walker(moveAlong(clamp((lt-0.6)/0.8,0,1),-100,300),1180,0.9,t,{speed:1.5,dir:1,top:'#5b3f52',hair:'#3a2a22'}); // hidden clue: the woman from floor 13 crosses the lobby
   ctx.fillStyle='#3a2f28';rr(600,1060,420,240,14);ctx.fill();walker(820,1060,1.3,t,{speed:0,dir:-1,top:'#1d2a3a',hair:'#222'});ctx.fillStyle='#3a2f28';ctx.fillRect(600,1060,420,240);
   walker(moveAlong(p,80,520),1560,2.0,t,{speed:1.5,dir:1,...HERO})},
 cctv(lt,p,t,d,seg){cctvLobby(t,{open:false,base:47,extra:p*3})},
 cctvstand(lt,p,t,d){cctvLobby(t,{open:true,figure:true,base:49,extra:p*24});const a=ease(p*2);ctx.strokeStyle=`rgba(255,77,79,${a})`;ctx.lineWidth=6;ctx.strokeRect(470,1080,140,280);
   ctx.font='700 34px "JetBrains Mono"';ctx.fillStyle=`rgba(255,77,79,${a})`;ctx.textAlign='center';ctx.fillText('NO MOTION · 26 MIN',540,1050)},
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
     ctx.strokeStyle=`rgba(255,40,40,${a})`;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(540,1150,210,130,0.05,0,Math.PI*2);ctx.stroke()}},
 alarm(lt,p,t,d,seg){ctx.fillStyle='#06080c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,900,700,'rgba(255,80,80,A)',0.14);const sh=shakeAt(t,['buzz'],0.3,12)*(Math.random()-.5)*2;
   phone(540+sh,900,1.6,-0.03,()=>{const g=ctx.createLinearGradient(0,-380,0,380);g.addColorStop(0,'#2a0d12');g.addColorStop(1,'#0c0a10');ctx.fillStyle=g;ctx.fillRect(-200,-400,400,800);
     ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='300 96px Inter';ctx.fillText('4:47',0,-150);ctx.font='600 22px Inter';ctx.fillStyle='#ff9a9a';ctx.fillText('PM · ALARM',0,-105);
     ctx.fillStyle='#fff';ctx.font='700 26px Inter';ctx.fillText('Floor 13',0,-40);ctx.font='500 18px Inter';ctx.fillStyle='#aaa';ctx.fillText('created: not by you',0,-8);
     const pulse=0.5+0.5*Math.sin(t*8);ell(0,230,60+pulse*8,60+pulse*8,'rgba(255,60,60,0.5)');ell(0,230,52,52,'#ff4d4f');ctx.fillStyle='#fff';ctx.font='700 22px Inter';ctx.fillText('STOP',0,238)});
   const last=seg.words[seg.words.length-1].s;if(t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
Object.assign(CAM,{mirrorhook:[1.05,1.0],mirror:[1,1.06],lobby:[1,1.04],cctv:[1,1.05],cctvstand:[1.02,1.12],logbook:[1,1.05],names:[1,1.06],alarm:[1,1.08]});
