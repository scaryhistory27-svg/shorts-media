// Mile Marker 214 — Part 3 (same evening, 7:34 PM; helpers from Parts 1–2)
const HERO={top:'#2f4a7a',topD:'#253c64'};const HZ=820; // horizon y
function seg7(x,y,txt,size,col){ctx.save();ctx.font=`800 ${size}px "JetBrains Mono"`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.shadowColor=col;ctx.shadowBlur=50;ctx.fillStyle=col;ctx.fillText(txt,x,y);ctx.restore()}
function sunsetSky(t,dark=0){const g=ctx.createLinearGradient(0,0,0,HZ);g.addColorStop(0,'#1b1430');g.addColorStop(0.55,'#7a2e3a');g.addColorStop(1,'#e2804a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,HZ+100);
  glow(540,HZ-40,520,'rgba(255,170,90,A)',0.55);ell(540,HZ-20,90,90,'#ffcf80');
  for(const [k,col,sp] of[[0,'#2a1830',6],[1,'#170f1d',14]]){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-100,HZ);for(let x=-100;x<=W+100;x+=40)ctx.lineTo(x,HZ-60-k*-20-50*Math.sin((x+t*sp)*0.006+k*2)-30*Math.sin((x+t*sp)*0.017));ctx.lineTo(W+100,HZ);ctx.fill()}
  if(dark){ctx.fillStyle=`rgba(5,5,15,${dark})`;ctx.fillRect(-100,-100,W+200,HZ+100)}}
function road(t,speed=1,o={}){ctx.fillStyle='#120d12';ctx.fillRect(-100,HZ,W+200,H-HZ+100);
  ctx.fillStyle='#232024';ctx.beginPath();ctx.moveTo(520,HZ);ctx.lineTo(560,HZ);ctx.lineTo(W+500,H);ctx.lineTo(-500,H);ctx.fill();
  const off=(t*speed*1.2)%1;for(let i=0;i<14;i++){const z=((i+off)/14),y=HZ+(H-HZ)*z*z,w=4+z*z*40,h=6+z*z*120;ctx.fillStyle=`rgba(240,200,90,${0.3+0.7*z})`;ctx.fillRect(540-w/2,y,w,h*0.5)}
  for(const s of[-1,1]){ctx.strokeStyle='rgba(230,230,230,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(540+s*25,HZ);ctx.lineTo(540+s*(W*0.85),H);ctx.stroke()}
  if(o.sign!=null) passing(o.sign,'sign',o);if(o.tree!=null) passing(o.tree,'tree',o)}
function passing(z,kind,o){ // z: 0 (horizon) → 1 (passes camera)
  const zz=clamp(z,0,1.15),y=HZ+(H-HZ)*zz*zz*0.8,x=540+(kind==='sign'?1:-1)*(40+zz*zz*700),s=0.05+zz*zz*1.6;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(kind==='sign'){ctx.fillStyle='#3a3a3a';ctx.fillRect(-8,-260,16,260);ctx.fillStyle='#1f6b3a';rr(-90,-420,180,180,14);ctx.fill();ctx.strokeStyle='#e8e8e8';ctx.lineWidth=6;rr(-80,-410,160,160,10);ctx.stroke();
    ctx.fillStyle='#fff';ctx.font='800 34px Inter';ctx.textAlign='center';ctx.fillText('MILE',0,-350);ctx.font='900 64px Inter';ctx.fillText(o.num||'214',0,-280);ctx.strokeStyle='#111';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-60,-405);ctx.lineTo(-20,-330);ctx.lineTo(-40,-280);ctx.stroke()}
  else{ctx.strokeStyle='#0d0a0e';ctx.lineCap='round';const br=(x0,y0,a,l,dp)=>{if(dp<0)return;const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;ctx.lineWidth=dp*5+2;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();br(x1,y1,a-0.5,l*0.7,dp-1);br(x1,y1,a+0.45,l*0.68,dp-1)};br(0,0,-Math.PI/2,160,6)}
  ctx.restore()}
function carInterior(t,o={}){ // windshield frame + dashboard + steering wheel + hands; dashboard clock frozen at 7:13 (hidden clue)
  ctx.fillStyle='#0a080b';ctx.beginPath();ctx.moveTo(-100,-100);ctx.lineTo(W+100,-100);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.closePath();
  ctx.moveTo(40,300);ctx.lineTo(W-40,300);ctx.lineTo(W+60,1240);ctx.lineTo(-60,1240);ctx.closePath();ctx.fill('evenodd');
  ctx.fillStyle='#161217';ctx.fillRect(-100,1220,W+200,800);const g=ctx.createLinearGradient(0,1220,0,1400);g.addColorStop(0,'#2a2328');g.addColorStop(1,'#161217');ctx.fillStyle=g;ctx.fillRect(-100,1220,W+200,180);
  rr(690,1450,220,100,14);ctx.fillStyle='#050608';ctx.fill();seg7(800,1502,o.clock||'7:13',54,'#4fd1ff');
  const sw=Math.sin(t*0.9)*0.05+(o.jerk||0);ctx.save();ctx.translate(380,1660);ctx.rotate(sw);ctx.strokeStyle='#2c262c';ctx.lineWidth=46;ctx.beginPath();ctx.arc(0,0,250,Math.PI*1.05,Math.PI*1.95);ctx.stroke();
  ctx.lineWidth=30;ctx.beginPath();ctx.moveTo(-90,-40);ctx.lineTo(90,-40);ctx.stroke();for(const s of[-1,1]){ctx.save();ctx.translate(s*215,-140);ell(0,0,46,56,C.skin);ctx.restore();ctx.strokeStyle=HERO.top;ctx.lineWidth=90;ctx.beginPath();ctx.moveTo(s*230,-90);ctx.lineTo(s*300,200);ctx.stroke()}ctx.restore()}
function gpsScreen(cx,cy,s,t,txt,o={}){ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);rr(-170,-110,340,220,22);ctx.fillStyle='#0b0f14';ctx.fill();ctx.strokeStyle='#2c313a';ctx.lineWidth=8;ctx.stroke();
  ctx.save();rr(-158,-98,316,196,16);ctx.clip();ctx.fillStyle='#16202b';ctx.fillRect(-160,-100,320,200);ctx.strokeStyle='#3a5a7a';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(0,110);ctx.lineTo(0,-120);ctx.stroke();
  ctx.fillStyle='#4fd1ff';ctx.beginPath();ctx.moveTo(0,30);ctx.lineTo(-18,60);ctx.lineTo(18,60);ctx.fill();const flash=o.alert&&Math.sin(t*10)>0;
  ctx.fillStyle=flash?'#ff3b3b':'#e33';ctx.fillRect(-160,-100,320,58);ctx.fillStyle='#fff';ctx.font='900 30px Inter';ctx.textAlign='center';ctx.fillText(txt,0,-60);ctx.restore();ctx.restore()}
function mirrorView(t,o={}){ctx.save();rr(250,330,580,220,40);ctx.clip();const g=ctx.createLinearGradient(0,330,0,550);g.addColorStop(0,'#3a2236');g.addColorStop(1,'#1a1418');ctx.fillStyle=g;ctx.fillRect(250,330,580,220);
  ctx.fillStyle='#232024';ctx.beginPath();ctx.moveTo(530,470);ctx.lineTo(550,470);ctx.lineTo(830,550);ctx.lineTo(250,550);ctx.fill();
  if(o.truck){const s=o.truck;ctx.save();ctx.translate(540,520);ctx.scale(s,s);ctx.fillStyle='#2b2a2e';rr(-120,-130,240,140,18);ctx.fill();ctx.fillStyle='#111';rr(-90,-120,180,60,8);ctx.fill();
    const on=o.flash?1:0.25;for(const sx of[-1,1]){glow(sx*80,-20,120,'rgba(255,250,220,A)',0.7*on);ell(sx*80,-20,22,16,on>0.5?'#fffbe6':'#9a9480')}ctx.fillStyle='#ddd';ctx.font='800 22px Inter';ctx.textAlign='center';ctx.fillText(o.plate?'RT9-1987':'',0,8);ctx.restore()}
  ctx.restore();ctx.strokeStyle='#0d0b0e';ctx.lineWidth=18;rr(250,330,580,220,40);ctx.stroke()}

// ---- Part 2 helpers: dusk roadside (side view), cars, phone dashcam, news clipping ----
const GY=1180; // ground line for side views
function duskSide(t,k=0.7){const g=ctx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#0c0a18');g.addColorStop(0.6,'#3a1c32');g.addColorStop(1,'#7a3a3c');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,GY+100);
  stars(t,0.5);glow(860,GY-30,420,'rgba(255,120,80,A)',0.25*(1-k*0.5));
  for(const [col,amp,sp,base] of[['#1d1426',60,4,GY-90],['#120d18',40,9,GY-40]]){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-100,GY);for(let x=-100;x<=W+100;x+=30)ctx.lineTo(x,base-amp*Math.abs(Math.sin((x+t*sp)*0.004))-20*Math.sin((x+t*sp)*0.02));ctx.lineTo(W+100,GY);ctx.fill()}
  ctx.fillStyle='#17131a';ctx.fillRect(-100,GY,W+200,900);ctx.fillStyle='#232024';ctx.fillRect(-100,GY+20,W+200,170);
  ctx.fillStyle='rgba(240,200,90,0.6)';for(let x=-60;x<W+100;x+=160)ctx.fillRect(x,GY+100,90,10);
  fog(t,GY-120,GY+80,'170,140,160',0.07)}
function carSide(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const body=o.col||'#3d5a80';
  ell(0,8,250,18,'rgba(0,0,0,0.5)');ctx.fillStyle=body;ctx.beginPath();ctx.moveTo(-240,-30);ctx.lineTo(-230,-95);ctx.lineTo(-120,-105);ctx.lineTo(-70,-170);ctx.lineTo(90,-170);ctx.lineTo(150,-105);ctx.lineTo(235,-90);ctx.lineTo(245,-30);ctx.closePath();ctx.fill();
  ctx.fillStyle='#10161e';ctx.beginPath();ctx.moveTo(-60,-160);ctx.lineTo(10,-160);ctx.lineTo(10,-108);ctx.lineTo(-108,-108);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(25,-160);ctx.lineTo(85,-160);ctx.lineTo(135,-108);ctx.lineTo(25,-108);ctx.closePath();ctx.fill();
  if(o.door){ctx.save();ctx.translate(18,-30);ctx.scale(1-0.55*o.door,1);ctx.fillStyle=shade(body,1.15);ctx.fillRect(0,-75,115,75);ctx.restore()}
  for(const wx of[-150,150]){ell(wx,-28,44,44,'#0b0b0d');ell(wx,-28,20,20,'#5a5a60')}
  const haz=o.hazard&&Math.sin(t*7)>0;for(const hx of[-238,240]){ell(hx,-62,10,8,haz?'#ffb020':'#5a3a10');if(haz)glow(hx,-62,90,'rgba(255,170,30,A)',0.6)}
  ctx.restore()}
function pickupSide(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,8,270,18,'rgba(0,0,0,0.55)');glow(0,-110,330,'rgba(255,170,140,A)',0.12);ctx.fillStyle='#4a4652';
  ctx.beginPath();ctx.moveTo(-260,-35);ctx.lineTo(-260,-120);ctx.lineTo(-20,-120);ctx.lineTo(-10,-200);ctx.lineTo(120,-200);ctx.lineTo(170,-125);ctx.lineTo(260,-115);ctx.lineTo(265,-35);ctx.closePath();ctx.fill();
  ctx.fillStyle='#0a0a0c';ctx.beginPath();ctx.moveTo(5,-190);ctx.lineTo(110,-190);ctx.lineTo(150,-130);ctx.lineTo(5,-130);ctx.closePath();ctx.fill();
  if(o.inside){ctx.save();ctx.globalAlpha=o.inside;ctx.fillStyle='#000';ell(70,-150,22,28,'#000');ctx.restore()}
  const d=o.door||0;ctx.save();ctx.translate(0,-40);ctx.scale(1-0.8*d,1);ctx.fillStyle='#57535f';ctx.fillRect(0,-90,150,90);ctx.restore();
  if(d>0.05){ctx.save();ctx.globalAlpha=d;lightCone(80,-60,-0.2,700,260,'255,240,200',0.35);ctx.restore()}
  for(const wx of[-170,170]){ell(wx,-32,48,48,'#0b0b0d');ell(wx,-32,20,20,'#47474d')}
  const hl=o.lights??1;ell(258,-80,12,14,hl>0.5?'#fffbe6':'#6a6450');if(hl>0.5){glow(258,-80,200,'rgba(255,250,220,A)',0.7);lightCone(258,-80,-Math.PI/2,1400,180,'255,250,220',0.12*hl)}
  ctx.fillStyle='#ddd';ctx.font='800 26px Inter';ctx.textAlign='center';ctx.fillText(o.plate?'RT9-1987':'',-230,-50);ctx.restore()}
function phoneDash(t,o={}){ctx.fillStyle='#0a0a0e';ctx.fillRect(-100,-100,W+200,H+200);glow(540,860,700,'rgba(80,140,200,A)',0.12);
  ctx.save();ctx.translate(540,860);ctx.rotate(-0.04+Math.sin(t*1.3)*0.015);rr(-300,-560,600,1120,60);ctx.fillStyle='#111';ctx.fill();ctx.strokeStyle='#333';ctx.lineWidth=8;ctx.stroke();
  ctx.save();rr(-275,-530,550,1060,40);ctx.clip();ctx.fillStyle='#000';ctx.fillRect(-300,-560,600,1120);
  // dashcam footage: road from inside a car, scrolling
  ctx.save();ctx.translate(-275,-300);ctx.scale(550/W,600/H*1.6);const tt=o.frame0?0:t;const g=ctx.createLinearGradient(0,0,0,HZ);g.addColorStop(0,'#2a1830');g.addColorStop(1,'#c46a40');ctx.fillStyle=g;ctx.fillRect(0,0,W,HZ);road(tt,o.frame0?0:1,{});
  if(o.carAhead){ctx.save();ctx.translate(540,HZ+150);ctx.scale(o.carAhead,o.carAhead);ctx.fillStyle='#3d5a80';rr(-120,-110,240,110,20);ctx.fill();ctx.fillStyle='#10161e';rr(-90,-150,180,50,10);ctx.fill();
    for(const sx of[-1,1]){ell(sx*90,-60,16,10,'#ff3030');glow(sx*90,-60,60,'rgba(255,40,40,A)',0.6)}ctx.fillStyle='#ddd';ctx.font='800 22px Inter';ctx.textAlign='center';ctx.fillText('RT9-1987',0,-20);ctx.restore()}
  ctx.restore();
  ctx.fillStyle='#ff3b3b';ell(-230,-490,10,10,Math.sin(t*4)>0?'#ff3b3b':'#551111');ctx.font='700 30px "JetBrains Mono"';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('DASHCAM',-210,-480);
  ctx.textAlign='right';ctx.fillText(o.stamp||'',255,-480);
  ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillRect(-250,470,500,8);ctx.fillStyle='#4fd1ff';ctx.fillRect(-250,470,500*(o.scrub??(t*0.08%1)),8);
  ctx.restore();ctx.restore();
  // hand holding the phone
  ctx.save();ctx.translate(540+250,1420);ell(0,0,90,120,C.skin);ctx.fillStyle=HERO.top;ctx.fillRect(-60,80,160,400);ctx.restore()}
function newsClip(t,p,o={}){ctx.fillStyle='#0d0a0c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,700,'rgba(255,154,60,A)',0.12);
  const a=0.55+0.45*ease(p*3);ctx.save();ctx.translate(540,800+(1-a)*300);ctx.rotate(-0.05+0.02*Math.sin(t*0.8));ctx.globalAlpha=a;
  rr(-380,-500,760,1000,6);ctx.fillStyle='#e8e0cc';ctx.fill();ctx.fillStyle='#1a1610';ctx.textAlign='center';
  ctx.font='900 40px Georgia';ctx.fillText('THE ROUTE 9 COURIER',0,-430);ctx.fillRect(-340,-410,680,4);ctx.font='700 26px Georgia';ctx.fillText('NOVEMBER 17, 1987',0,-372);
  ctx.font='900 62px Georgia';ctx.fillText('CAR VANISHES',0,-290);ctx.fillText('ON ROUTE 9',0,-220);
  // photo of the driver (blue jacket)
  rr(-300,-170,260,330,4);ctx.fillStyle='#8a8478';ctx.fill();ctx.save();ctx.beginPath();rr(-300,-170,260,330,4);ctx.clip();walker(-170,190,0.95,t,{speed:0,top:HERO.top,topD:HERO.topD});ctx.restore();
  ctx.fillStyle='#3b3628';for(let i=0;i<9;i++)ctx.fillRect(-10,-160+i*38,300-(i%3)*40,14);
  ctx.font='italic 700 30px Georgia';ctx.fillStyle='#1a1610';ctx.fillText(o.caption||'Last seen 7:13 PM',0,230);
  for(let i=0;i<5;i++){ctx.fillStyle='#3b3628';ctx.fillRect(-330,270+i*38,660-(i%2)*80,14)}
  if(o.circle){ctx.strokeStyle='rgba(220,30,30,0.85)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(-170,30,150*o.circle,190*o.circle,0,0,7);ctx.stroke()}
  ctx.restore()}
// ---- Part 3 helpers: 1987 patrolman, mile-marker post, rusty car, mom's polaroid, mirror with the next car ----
const COP={top:'#27334b',topD:'#1b2436',pants:'#1a2131',hair:'#2a221c'};
function officer(x,y,s,t,o={}){const dir=o.dir||1;const sil=o.sil;
  if(sil)glow(x,y-160*s,260*s,'rgba(255,240,200,A)',0.45);
  walker(x,y,s,t,{speed:o.speed||0,dir,look:o.look||0,reach:o.reach||0,top:sil?'#08080b':COP.top,topD:sil?'#050507':COP.topD,pants:sil?'#060608':COP.pants,skin:sil?'#0a0a0c':undefined,hair:sil?'#050506':COP.hair,shoe:'#050505'});
  const bob=(o.speed||0)>0?-Math.abs(Math.sin(t*(o.speed||0)*Math.PI*2))*7*s:Math.sin(t*2.2)*2.5*s;const hx=x+(o.look||0)*4*s*dir,hy=y-262*s+bob;
  ctx.save();ctx.fillStyle=sil?'#050506':'#1a2133';ell(hx,hy-26*s,46*s,11*s,ctx.fillStyle);rr(hx-30*s,hy-62*s,60*s,38*s,10*s);ctx.fill();
  if(!sil){ctx.fillStyle='#d9b54a';ell(hx,hy-44*s,7*s,7*s,'#d9b54a');ctx.save();ctx.translate(x+12*s*dir,y-205*s+bob);ctx.rotate(0.1);ctx.beginPath();for(let i=0;i<10;i++){const r=i%2?7*s:16*s,a=i*Math.PI/5-Math.PI/2;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.fill();ctx.restore();
    ctx.fillStyle='#e8e2cc';rr(x-22*s*dir-12*s,y-212*s+bob,26*s,9*s,2*s);ctx.fill()}
  ctx.restore();
  if(o.flash!=null){const a=o.flash;lightCone(x+40*s*dir,y-150*s+bob,a,1300,260,'255,245,210',0.2);ell(x+40*s*dir,y-150*s+bob,9*s,9*s,'#fffbe6');glow(x+40*s*dir,y-150*s+bob,70*s,'rgba(255,250,220,A)',0.8)}}
function markerPost(x,y,s,num,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(o.glow)glow(0,-340,260,'rgba(80,255,150,A)',o.glow);
  ctx.fillStyle='#3a3a3a';ctx.fillRect(-8,-260,16,260);ctx.fillStyle='#1f6b3a';rr(-90,-420,180,180,14);ctx.fill();ctx.strokeStyle='#e8e8e8';ctx.lineWidth=6;rr(-80,-410,160,160,10);ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='800 34px Inter';ctx.textAlign='center';ctx.fillText('MILE',0,-350);ctx.font='900 64px Inter';ctx.fillText(num,0,-280);ctx.restore()}
function rustCar(x,y,s,t,o={}){carSide(x,y,s,t,{col:'#5b4536',door:o.door||0});ctx.save();ctx.translate(x,y);ctx.scale(s,s);const r=rnd(9);
  for(let i=0;i<22;i++){const rx=-220+r()*440,ry=-150+r()*110;if(ry<-110&&Math.abs(rx)>120)continue;ell(rx,ry,6+r()*16,4+r()*10,`rgba(${120+r()*60|0},${60+r()*30|0},30,0.75)`)}
  for(const wx of[-150,150]){ctx.fillStyle='#0b0b0d';ctx.fillRect(wx-50,-14,100,22)} // flat tyres
  ctx.fillStyle='#d8d2bf';rr(-262,-70,70,30,4);ctx.fill();ctx.fillStyle='#14304f';ctx.font='900 15px Inter';ctx.textAlign='center';ctx.fillText('RT9-1987',-227,-50);
  ctx.strokeStyle='rgba(10,10,12,0.7)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(30,-150);ctx.lineTo(60,-120);ctx.lineTo(45,-112);ctx.stroke();ctx.restore()}
function cassette(x,y,s,t,run){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-170,-90,340,180,16);ctx.fillStyle='#1d1b20';ctx.fill();rr(-140,-62,280,70,8);ctx.fillStyle='#c9b98f';ctx.fill();
  for(const sx of[-1,1]){ctx.save();ctx.translate(sx*70,-27);ell(0,0,26,26,'#2a2420');ctx.rotate(run?t*4*sx:0);ctx.strokeStyle='#e9e2d0';ctx.lineWidth=5;for(let i=0;i<3;i++){ctx.rotate(Math.PI*2/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,20);ctx.stroke()}ctx.restore()}
  ctx.fillStyle='#e9e2d0';ctx.font='italic 700 20px Georgia';ctx.textAlign='center';ctx.fillText('for the car — Mom, 11/17/87',0,50);ctx.restore()}
function endCard(seg,t){const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
const SCN={
 stranger(lt,p,t,d,seg){duskSide(t,0.95);pickupSide(200,GY+80,0.9,t,{lights:1,door:1});
   officer(moveAlong(clamp(p*1.1,0,1),320,470),GY+70,1.08,t,{speed:0.7,sil:true});
   walker(moveAlong(clamp(p*1.2,0,1),780,860),GY+70,1.0,t,{speed:0.9,dir:-1,look:0.2,scared:0.9,top:HERO.top,topD:HERO.topD});
   carSide(1000,GY+60,0.75,t,{hazard:true,door:1});heartbeat(t,0.45)},
 officer(lt,p,t,d,seg){const k=nth(seg);duskSide(t,0.97);pickupSide(-150,GY+80,1.0,t,{lights:1,door:1});fog(t,900,1300,'200,190,200',0.06);
   const sway=Math.sin(t*1.7)*0.25;if(k){ctx.save();ctx.translate(540,1300);ctx.scale(1.25,1.25);ctx.translate(-540,-1300)}officer(k?600:540+moveAlong(p,-60,0),1250,2.25,t,{speed:k?0:0.5,look:Math.sin(t*0.8)*0.3,reach:k?0.45+0.1*Math.sin(t*3):0,flash:Math.PI*0.55+sway});if(k)ctx.restore()},
 marker(lt,p,t,d,seg){duskSide(t,0.97);if(lt>0.9&&lt<1.5){carSide(moveAlong((lt-0.9)/0.6,-300,1400),GY+30,0.35,t,{col:'#3d5a80'})} // hidden clue: a blue car passes far away
   markerPost(760,GY+90,1.35,'214',{glow:0.1+0.15*(Math.sin(t*3)>0?1:0.5)});officer(250,GY+70,1.0,t,{speed:0,look:0.4,flash:-Math.PI*0.42+Math.sin(t*0.9)*0.08});
   walker(560,GY+70,0.95,t,{speed:0,dir:1,look:0.6,top:HERO.top,topD:HERO.topD})},
 carReveal(lt,p,t,d,seg){const k=nth(seg);duskSide(t,0.97);rustCar(650,GY+60,1.2,t,{door:1});
   const ang=k?-Math.PI*0.47:-Math.PI*0.3-ease(clamp(p*1.6,0,1))*0.2;officer(130,GY+70,1.0,t,{speed:0,look:0.3,flash:ang});
   walker(k?moveAlong(p,560,330):560,GY+70,1.0,t,{speed:k&&p<0.95?0.9:0,dir:k?-1:1,look:0.4,scared:0.7,top:HERO.top,topD:HERO.topD});
   if(!k){const e=lastEv(t,['sting']);if(e&&t-e.t<0.5){ctx.fillStyle='rgba(255,250,220,0.12)';ctx.fillRect(0,0,W,H)}}heartbeat(t,0.35)},
 gpsMom(lt,p,t,d,seg){const k=nth(seg);sunsetSky(t,0.93);road(t,0,{});if(k){ctx.save();ctx.globalAlpha=0.28+0.12*Math.sin(t*2);mom(540,470,1.1,{smile:0.5,talk:Math.abs(Math.sin(t*9)),blink:0});ctx.restore()}
   carInterior(t);gpsScreen(540+Math.sin(t*25)*2,880,2.0,t,'TURN AROUND',{alert:k===1});
   for(let i=0;i<16;i++){const h=8+Math.abs(Math.sin(t*11+i*0.7))*(k?50:30);ctx.fillStyle='rgba(79,209,255,0.85)';ctx.fillRect(400+i*18,1070-h,10,h)}heartbeat(t,0.3)},
 momPhoto(lt,p,t,d,seg){ctx.fillStyle='#0d0a0c';ctx.fillRect(-100,-100,W+200,H+200);glow(540,760,700,'rgba(255,170,90,A)',0.14);
   ctx.save();ctx.translate(540,700);ctx.rotate(-0.06+Math.sin(t*0.9)*0.02);rr(-260,-300,520,600,6);ctx.fillStyle='#efe8d6';ctx.fill();rr(-230,-270,460,440,2);ctx.fillStyle='#6b5d58';ctx.fill();
   ctx.save();rr(-230,-270,460,440,2);ctx.clip();const g=ctx.createLinearGradient(0,-270,0,170);g.addColorStop(0,'#c8875a');g.addColorStop(1,'#5a3a3a');ctx.fillStyle=g;ctx.fillRect(-230,-270,460,440);
   mom(-80,-60,1.0,{smile:0.7,blink:Math.sin(t*1.3)>0.97?1:0});walker(110,180,0.95,t,{speed:0,look:-0.3,top:HERO.top,topD:HERO.topD});ctx.restore();
   ctx.fillStyle='#2b2620';ctx.font='italic 700 34px Georgia';ctx.textAlign='center';ctx.fillText('Nov 17, 1987',0,240);ctx.restore();
   cassette(540,1180,1.1,t,true)},
 talk(lt,p,t,d,seg){duskSide(t,0.97);rustCar(870,GY+60,0.75,t,{door:1});officer(380,GY+70,1.2,t,{speed:0,dir:1,look:0.2,reach:0.35+0.3*Math.abs(Math.sin(t*2.2)),flash:-Math.PI*0.55});
   walker(680,GY+70,1.15,t,{speed:0,dir:-1,look:Math.sin(t*3)*0.5,scared:0.5,top:HERO.top,topD:HERO.topD})},
 uturn(lt,p,t,d,seg){ctx.save();ctx.translate(540,900);ctx.rotate(-ease(p)*0.35);ctx.translate(-540,-900);sunsetSky(t*3,0.93);road(t,1.6,{});ctx.restore();
   carInterior(t,{jerk:-0.6*ease(clamp(p*1.4,0,1))});const e=lastEv(t,['whoosh']);if(e&&t-e.t<0.6){glow(200+(t-e.t)*1200,700,200,'rgba(255,240,200,A)',0.4)}},
 darkRoad(lt,p,t,d,seg){sunsetSky(t,1);road(t,0.8,{sign:0.12+p*0.5,num:'215'});lightCone(540,1240,Math.PI,700,420,'255,245,210',0.08);fog(t,700,1150,'160,170,190',0.08);carInterior(t)},
 m215(lt,p,t,d,seg){sunsetSky(t,0.8);road(t,0.4,{sign:0.42+0.2*ease(p),num:'215'});glow(700,700,380,'rgba(80,255,150,A)',0.12+0.06*Math.sin(t*4));carInterior(t,{clock:'7:14'})}, // clue payoff: clock finally moves
 mirror3(lt,p,t,d,seg){sunsetSky(t,0.9);road(t,0.7,{});carInterior(t,{clock:'7:14'});
   ctx.save();rr(250,330,580,220,40);ctx.clip();const g=ctx.createLinearGradient(0,330,0,550);g.addColorStop(0,'#3a2236');g.addColorStop(1,'#1a1418');ctx.fillStyle=g;ctx.fillRect(250,330,580,220);
   ctx.fillStyle='#232024';ctx.beginPath();ctx.moveTo(530,470);ctx.lineTo(550,470);ctx.lineTo(830,550);ctx.lineTo(250,550);ctx.fill();
   markerPost(moveAlong(p,660,740),545,0.5,'214');const s=0.4+0.3*ease(p);ctx.save();ctx.translate(540,520);ctx.scale(s,s);glow(0,-80,260,'rgba(120,170,255,A)',0.25);ctx.fillStyle='#5b86c4';rr(-140,-120,280,120,22);ctx.fill();ctx.fillStyle='#4a72aa';rr(-100,-170,200,60,12);ctx.fill();ctx.fillStyle='#10161e';rr(-85,-160,170,42,8);ctx.fill();
   for(const sx of[-1,1]){glow(sx*90,-60,110,'rgba(255,250,220,A)',0.8);ell(sx*90,-60,18,12,'#fffbe6')}ctx.restore();ctx.restore();ctx.strokeStyle='#0d0b0e';ctx.lineWidth=18;rr(250,330,580,220,40);ctx.stroke();
   heartbeat(t,0.45);endCard(seg,t)}
};
const CAM={stranger:[1.08,1.0],officer:[1,1.07],marker:[1,1.05],carReveal:[1,1.07],gpsMom:[1,1.06],momPhoto:[1,1.1],talk:[1,1.05],uturn:[1,1.04],darkRoad:[1,1.05],m215:[1,1.06],mirror3:[1.02,1.12]};
