// Mile Marker 214 — Part 1 (road, car interior, GPS, radio, mirror; animated road scrolling)
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
  rr(690,1450,220,100,14);ctx.fillStyle='#050608';ctx.fill();seg7(800,1502,'7:13',54,'#4fd1ff');
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
const SCN={
 gpshook(lt,p,t,d){ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);glow(540,860,700,'rgba(255,40,40,A)',0.25);const sh=Math.sin(t*40)*3;
   gpsScreen(540+sh,860,2.6,t,'TURN AROUND',{alert:true});ctx.font='900 46px Inter';ctx.fillStyle='rgba(255,255,255,0.8)';ctx.textAlign='center';ctx.fillText('MILE 214',540,1240);heartbeat(t,0.4)},
 drive(lt,p,t,d){sunsetSky(t);road(t,1,{tree:((lt*0.35)%1.3)});carInterior(t);gpsScreen(880,1110,0.65,t,'ROUTE 9')},
 gps(lt,p,t,d,seg){sunsetSky(t,0.2);road(t,1);carInterior(t);const w=seg.words.find(x=>x.w==='said:');const on=w&&t>w.s;gpsScreen(540,900,on?1.8:1.1,t,on?'TURN AROUND':'ROUTE 9',{alert:on})},
 gps2(lt,p,t,d){sunsetSky(t,0.3);road(t,1.3);carInterior(t,{jerk:Math.sin(t*20)*0.02});gpsScreen(540+Math.sin(t*35)*6,900,1.9,t,'TURN AROUND!!',{alert:true});heartbeat(t,0.35)},
 marker(lt,p,t,d){sunsetSky(t,0.35);const z=(lt*0.55)%1.25;road(t,1.4,{sign:z,tree:((lt*0.55)+0.4)%1.25});carInterior(t);
   if(z>0.9&&z<1.0){ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(0,0,W,H)}},
 radio(lt,p,t,d,seg){sunsetSky(t,0.5);road(t,1);carInterior(t);rr(170,1440,300,110,14);ctx.fillStyle='#0b0d10';ctx.fill();const idx=TL.segs.indexOf(seg);
   seg7(320,1496,idx===7&&lt<0.5?'--.-':'87.0',56,'#ff9a3c');for(let i=0;i<12;i++){const h=10+Math.abs(Math.sin(t*9+i))*40*(idx===8?1:0.4);ctx.fillStyle='rgba(255,154,60,0.8)';ctx.fillRect(200+i*20,1430-h,10,h)}
   if(idx===8){glow(540,700,500,'rgba(180,40,60,A)',0.15);heartbeat(t,0.45)}},
 mirror(lt,p,t,d){sunsetSky(t,0.55);road(t,1);carInterior(t);mirrorView(t,{truck:0.6+0.4*ease(p),flash:false,plate:lt>0.3&&lt<0.8});heartbeat(t,0.4)},
 mirror2(lt,p,t,d,seg){sunsetSky(t,0.6);road(t,1);carInterior(t);const ev=lastEv(t,['knock']);const fl=ev&&t-ev.t<0.25;mirrorView(t,{truck:1,flash:fl});
   if(fl){ctx.fillStyle='rgba(255,250,220,0.18)';ctx.fillRect(0,0,W,H)}heartbeat(t,0.45)},
 arrived(lt,p,t,d,seg){sunsetSky(t,0.75);road(t,0.05*(1-p),{sign:0.62});carInterior(t);gpsScreen(860,1100,0.85,t,'ARRIVED',{alert:true});fog(t,800,1300,'180,150,170',0.06);
   const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
};
const CAM={gpshook:[1.05,1],drive:[1,1.03],gps:[1,1.05],gps2:[1.02,1.08],marker:[1,1.04],radio:[1,1.06],mirror:[1,1.07],mirror2:[1,1.05],arrived:[1,1.08]};
