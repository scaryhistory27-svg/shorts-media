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
