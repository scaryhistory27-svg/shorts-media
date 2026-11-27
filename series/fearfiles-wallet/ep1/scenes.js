// FearFiles: The Wallet — last train; a wallet with my own ID from 2061; a note: don't get off at Hollow Creek; old me on the platform; my wallet is gone (loop).
const HERO={top:'#5a4a2e',topD:'#433722',hair:'#2a1c14'};const OLD={top:'#5a4a2e',topD:'#433722',hair:'#d8d8d8'};
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.93*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 84px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
function trainCar(t,o={}){const fl=life.flicker(t*1.3);ctx.fillStyle='#1b2a2a';ctx.fillRect(-100,-100,W+200,H+200);
  // perspective: floor, ceiling lights, side seats
  const vp=[540,760];ctx.fillStyle='#2a3a38';ctx.beginPath();ctx.moveTo(-100,1500);ctx.lineTo(vp[0]-80,vp[1]+60);ctx.lineTo(vp[0]+80,vp[1]+60);ctx.lineTo(W+100,1500);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  ctx.fillStyle='#22302f';ctx.beginPath();ctx.moveTo(-100,200);ctx.lineTo(vp[0]-80,vp[1]-80);ctx.lineTo(vp[0]+80,vp[1]-80);ctx.lineTo(W+100,200);ctx.lineTo(W+100,-100);ctx.lineTo(-100,-100);ctx.fill();
  for(let k=0;k<5;k++){const z=k/5,y=lerp(220,vp[1]-70,z*z*0+z),w=lerp(500,40,z);ctx.fillStyle=`rgba(230,255,240,${0.85*fl})`;ctx.fillRect(540-w/2,lerp(330,vp[1]-75,z),w,lerp(18,3,z))}
  // windows with moving night
  for(const side of[-1,1])for(let k=0;k<4;k++){const z=k/4,x=vp[0]+side*lerp(470,110,z),y=lerp(380,vp[1]-50,z),w=lerp(160,30,z),h=lerp(300,60,z);ctx.fillStyle='#050810';ctx.fillRect(x-w/2,y,w,h);
    ctx.fillStyle='rgba(255,220,150,0.6)';const lx=((t*400*side+k*90)%w+w)%w;ctx.fillRect(x-w/2+lx,y+h*0.6,3,3)}
  // seats
  for(const side of[-1,1])for(let k=3;k>=0;k--){const z=k/4,x=vp[0]+side*lerp(330,100,z),y=lerp(1230,vp[1]+70,z),s=lerp(1,0.25,z);ctx.fillStyle='#7a2a2a';rr(x-90*s,y-200*s,180*s,200*s,20*s);ctx.fill();ctx.fillStyle='#5a1f1f';rr(x-100*s,y-40*s,200*s,60*s,14*s);ctx.fill()}
  glow(540,600,700,'rgba(180,255,220,A)',0.08*fl);if(o.dark)ctx.fillStyle=`rgba(0,0,0,${o.dark})`,ctx.fillRect(-100,-100,W+200,H+200)}
function wallet(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.r||0);ctx.fillStyle='#5a3418';rr(-120,-80,240,160,14);ctx.fill();ctx.strokeStyle='#8a5a2a';ctx.setLineDash([8,6]);ctx.lineWidth=3;rr(-110,-70,220,140,10);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function idCard(t,o={}){ctx.save();ctx.translate(540,780);ctx.rotate(Math.sin(t*0.8)*0.02);ctx.fillStyle='#e8efe8';rr(-380,-240,760,480,26);ctx.fill();ctx.fillStyle='#2a6a5a';rr(-380,-240,760,80,26);ctx.fill();ctx.fillRect(-380,-190,760,30);
  ctx.fillStyle='#fff';ctx.font='900 40px Inter';ctx.textAlign='left';ctx.fillText('DRIVER LICENSE',-350,-185);
  ctx.fillStyle='#c8d4d0';ctx.fillRect(-350,-130,230,300);ctx.save();ctx.beginPath();ctx.rect(-350,-130,230,300);ctx.clip();walker(-235,330,1.35,t,Object.assign({speed:0,look:0},OLD));ctx.restore();
  ctx.fillStyle='#222';ctx.font='800 34px "JetBrains Mono"';ctx.fillText('NAME: [ME]',-90,-90);ctx.fillText('DOB: SAME AS MINE',-90,-30);ctx.fillStyle='#b3121a';ctx.font='900 44px "JetBrains Mono"';ctx.fillText('EXP: 2061',-90,60);
  if(o.hl){const a=0.5+0.5*Math.sin(t*8);ctx.strokeStyle=`rgba(255,40,40,${a})`;ctx.lineWidth=6;ctx.strokeRect(-100,15,300,60)}ctx.restore()}
function platformBg(t,o={}){ctx.fillStyle='#070a10';ctx.fillRect(-100,-100,W+200,H+200);fog(t,1100,H,'180,200,220',0.08);ctx.fillStyle='#2a2a2e';ctx.fillRect(-100,1150,W+200,H);ctx.fillStyle='#d8c040';ctx.fillRect(-100,1150,W+200,10);
  const f=life.flicker(t*0.9);ctx.fillStyle='#333';ctx.fillRect(760,300,14,850);ell(767,300,30,14,`rgba(255,230,170,${f})`);lightCone(767,310,Math.PI/2,900,380,'255,230,170',0.16*f);
  ctx.fillStyle='#1a3a2a';rr(160,340,430,110,10);ctx.fill();ctx.fillStyle='#e8e8d8';ctx.font='900 50px Inter';ctx.textAlign='center';ctx.fillText('HOLLOW CREEK',375,412)}
function doors(op){ctx.fillStyle='#3a4a48';const w=lerp(560,0,op);ctx.fillRect(-100,-100,100+w,H+200);ctx.fillRect(W-w,-100,w+100,H+200);ctx.fillStyle='#0a0f14';ctx.fillRect(w-200,500,140,380);ctx.fillRect(W-w+60,500,140,380)}
const SCN={
  hook:(lt,p,t,d,seg)=>{trainCar(t);ctx.save();ctx.globalAlpha=0.35;if(lt<0.5)walker(640,960,0.5,t,Object.assign({speed:0},OLD));ctx.restore();walker(380,1290,1.15,t,{speed:0,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:0.6,reach:0.6});
    wallet(620,1060,1.1,t,{r:-0.2});ctx.save();ctx.translate(620,1060);ctx.fillStyle='#e8efe8';rr(-40,-130,170,110,10);ctx.fill();ctx.fillStyle='#b3121a';ctx.font='900 26px "JetBrains Mono"';ctx.fillText('2061',-20,-60);ctx.restore();heartbeat(t,0.2);endCard(seg,t)},
  car:(lt,p,t)=>{trainCar(t);walker(moveAlong(clamp(lt/2.5,0,1),760,560),lerp(1300,1260,p),1.1,t,{speed:lt<2.5?1:0,dir:-1,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:Math.sin(t)*0.6})},
  seat:(lt,p,t)=>{trainCar(t,{dark:0.2});const k=ease(clamp(lt/1.2,0,1));walker(330,1290,1.15,t,{speed:0,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:0.8,reach:k});wallet(lerp(700,560,k),lerp(1270,1140,k),1.0,t,{r:-0.3+k*0.3});glow(700,1270,150,'rgba(255,200,120,A)',0.2*(1-k))},
  id:(lt,p,t,d,seg)=>{ctx.fillStyle='#0d1414';ctx.fillRect(-100,-100,W+200,H+200);glow(540,780,600,'rgba(180,255,220,A)',0.12);idCard(t,{hl:seg.words[0].w==='Expires:'})},
  note:(lt,p,t,d,seg)=>{ctx.fillStyle='#0d1414';ctx.fillRect(-100,-100,W+200,H+200);const two=seg.words[0].w.startsWith('"');ctx.save();ctx.translate(540,800);ctx.rotate(-0.04+Math.sin(t)*0.01);ctx.fillStyle='#f2ecd8';ctx.fillRect(-360,-300,720,520);
    ctx.strokeStyle='rgba(80,120,200,0.3)';ctx.lineWidth=2;for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(-340,-220+i*60);ctx.lineTo(340,-220+i*60);ctx.stroke()}
    const txt="Don't get off at";const k=two?clamp(lt/1.2,0,1):0.15;ctx.fillStyle='#1a2a6a';ctx.font='italic 700 62px Georgia';ctx.textAlign='center';ctx.fillText(txt.slice(0,Math.ceil(txt.length*k)),0,-110);if(k>0.9){ctx.fillStyle='#8a1010';ctx.fillText('HOLLOW CREEK.',0,0)}
    ctx.restore()},
  speaker:(lt,p,t)=>{trainCar(t,{dark:0.25});const sh=shakeAt(t,['buzz'],0.5,6);ctx.fillStyle='#333';rr(440+sh,240,200,90,14);ctx.fill();for(let i=0;i<5;i++)ctx.fillRect(470+i*32+sh,265,14,40);
    for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(255,80,80,${0.6-0.15*i})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(540,330,60+i*40+((t*60)%40),0.2*Math.PI,0.8*Math.PI);ctx.stroke()}
    walker(540,1290,1.15,t,{speed:0,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:0,scared:1})},
  map:(lt,p,t)=>{ctx.fillStyle='#0d1414';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#e8e8e0';rr(90,420,900,560,20);ctx.fill();ctx.strokeStyle='#2a6a5a';ctx.lineWidth=14;ctx.beginPath();ctx.moveTo(160,700);ctx.lineTo(920,700);ctx.stroke();
    const st=['ELM','RIVER','MILL','HOME'];st.forEach((s,i)=>{const x=200+i*230;ell(x,700,22,22,'#fff');ctx.lineWidth=6;ctx.strokeStyle='#2a6a5a';ctx.beginPath();ctx.arc(x,700,22,0,7);ctx.stroke();ctx.fillStyle='#222';ctx.font='800 32px Inter';ctx.textAlign='center';ctx.fillText(s,x,770)});
    const k=(Math.sin(t*6)+1)/2;ctx.fillStyle=`rgba(255,40,40,${0.5+0.5*k})`;ctx.font='900 44px Inter';ctx.fillText('HOLLOW CREEK?',540,560);ctx.fillText('?',545,700);ctx.fillStyle='#fff';ctx.fillRect(0,0,0,0);
    walker(540,1400,1.0,t,{speed:0,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:Math.sin(t*2),scared:0.8})},
  platform:(lt,p,t)=>{platformBg(t);ctx.save();ctx.globalAlpha=0.9;walker(767,1150,1.0,t,Object.assign({speed:0,look:-1},OLD));ctx.restore();doors(ease(clamp(lt/1.0,0,1)))},
  oldman:(lt,p,t)=>{platformBg(t);ctx.save();ctx.translate(767,900);ctx.scale(1.7,1.7);ctx.translate(-767,-900);walker(767,1150,1.0,t,Object.assign({speed:0,look:-1,reach:0.5+0.5*Math.sin(t*5)},OLD));ctx.restore();
    for(let i=0;i<2;i++){const y=(t*120+i*60)%120;ell(745+i*30,690+y,4,7,'rgba(160,200,255,0.8)')}doors(1)},
  close:(lt,p,t)=>{platformBg(t);walker(767,1150,1.0,t,Object.assign({speed:0,look:-1,reach:0.3},OLD));doors(1-ease(clamp(lt/0.8,0,1)));if(lt>0.8){ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(520,500,40,380)}},
  pocket:(lt,p,t,d,seg)=>{trainCar(t,{dark:0.35});const k=ease(clamp(lt/1.0,0,1));walker(540,1290,1.2,t,{speed:0,top:HERO.top,topD:HERO.topD,hair:HERO.hair,look:k>0.6?1:0,reach:k,scared:k});
    ctx.fillStyle='#333';rr(610,1150,90,110,10);ctx.fill();ctx.fillStyle='#111';ctx.fillRect(620,1160,70,20);if(lt>1.2){ctx.fillStyle='rgba(255,60,60,0.9)';ctx.font='900 60px Inter';ctx.textAlign='center';ctx.fillText('EMPTY',650,1110)}heartbeat(t,0.4);endCard(seg,t)},
};
const CAM={hook:[1.08,1.0],car:[1.0,1.06],seat:[1.0,1.1],id:[1.0,1.08],note:[1.0,1.1],speaker:[1.0,1.08],map:[1.0,1.06],platform:[1.0,1.06],oldman:[1.0,1.1],close:[1.08,1.0],pocket:[1.0,1.12]};
