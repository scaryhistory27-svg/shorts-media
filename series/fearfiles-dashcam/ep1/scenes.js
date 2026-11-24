// FearFiles #7: Dashcam — a hitchhiker in a yellow raincoat; the dashcam shows an empty seat with the belt buckled; audio recorded 1996. Helpers from Mile Marker 214.
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
function raincoat(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({top:'#e8c22a',topD:'#c9a316',hair:'#e8c22a',skin:'#b8a890',pants:'#2a2a30',speed:0},o))}
function camScreen(x,y,s,t,draw,label){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-300,-180,600,360,20);ctx.fillStyle='#0b0d10';ctx.fill();ctx.strokeStyle='#3a3f48';ctx.lineWidth=8;ctx.stroke();ctx.save();rr(-285,-165,570,330,14);ctx.clip();draw();for(let y=-165;y<165;y+=6){ctx.fillStyle='rgba(0,0,0,0.12)';ctx.fillRect(-285,y,570,2)}ctx.restore();
  ctx.font='700 22px "JetBrains Mono"';ctx.fillStyle='#ff5050';ctx.textAlign='left';ctx.fillText('● REC  '+label,-270,150);ctx.restore()}
function seatView(t,o={}){ctx.fillStyle='#1a1d24';ctx.fillRect(-300,-170,600,340);ctx.fillStyle='#2c2f38';rr(-120,-120,240,260,30);ctx.fill();ctx.fillStyle='#24262e';rr(-90,-160,180,70,20);ctx.fill();
  ctx.strokeStyle='#888';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(110,-110);ctx.lineTo(-60,120);ctx.stroke();if(o.ghost){ctx.globalAlpha=o.ghost;raincoat(0,170,0.7,t,{look:0.3});ctx.globalAlpha=1}}
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
 hook(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,600,'rgba(255,60,60,A)',0.15);camScreen(540,800,1.5,t,()=>seatView(t,{ghost:k?0.25+0.15*Math.sin(t*3):0}),'02:13 AM · CAM 1');heartbeat(t,0.35);if(k)endCard(seg,t)},
 wave(lt,p,t,d,seg){sunsetSky(t,1);road(t,0.6);raincoat(lerp(820,700,ease(p)),1560,1.6,t,{reach:0.6+0.3*Math.sin(t*4),look:-0.4});lightCone(540,1900,-3.14,900,500,'255,240,200',0.10)},
 inside(lt,p,t,d,seg){const k=nth(seg);sunsetSky(t,1);road(t,1);carInterior(t);raincoat(900,2000,2.3,t,{look:-0.3,reach:k?0.9:0})},
 station(lt,p,t,d,seg){ctx.fillStyle='#0a0c12';ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#d8dde6';ctx.fillRect(100,420,880,60);for(let i=0;i<2;i++){ctx.fillStyle='#2a3140';ctx.fillRect(250+i*420,480,40,700)}glow(540,460,500,'rgba(255,255,230,A)',0.3*life.flicker(t));
   ctx.fillStyle='#1d2b48';rr(360,1100,360,200,20);ctx.fill();ctx.font='900 60px Inter';ctx.fillStyle='#ffd57a';ctx.textAlign='center';ctx.fillText('GAS',540,1225);walker(lerp(80,300,ease(p)),1800,1.8,t,{speed:p<0.7?1.2:0,dir:1,look:0.3})},
 dash(lt,p,t,d,seg){ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);camScreen(540,820,1.5,t,()=>seatView(t),'00:04 AM · PASSENGER');ctx.font='900 44px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(Math.floor(lerp(4,58,ease(p)))+' MIN · EMPTY',540,1180);heartbeat(t,0.3)},
 belt(lt,p,t,d,seg){ctx.fillStyle='#14161c';ctx.fillRect(-100,-100,W+200,H+200);const z=1+0.3*ease(p);ctx.save();ctx.translate(540,800);ctx.scale(z,z);ctx.strokeStyle='#777';ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(-500,-500);ctx.lineTo(0,0);ctx.stroke();ctx.fillStyle='#9aa0aa';rr(-60,-40,160,80,14);ctx.fill();ctx.fillStyle='#c0182a';rr(40,-20,40,40,8);ctx.fill();ctx.restore();glow(540,800,300,'rgba(255,40,60,A)',0.12)},
 audio(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#07080a';ctx.fillRect(-100,-100,W+200,H+200);camScreen(540,760,1.5,t,()=>{ctx.fillStyle='#0b0d10';ctx.fillRect(-300,-170,600,340);for(let i=0;i<40;i++){const h=10+Math.abs(Math.sin(t*9+i*0.6))*90*(i/40<p?1:0.2);ctx.fillStyle=i/40<p?'#e8c22a':'#334';ctx.fillRect(-260+i*13,-h/2,8,h)}},k?'ROUTE 6 · OCT 1996':'AUDIO · 02:13 AM');if(k){ctx.font='900 80px "JetBrains Mono"';ctx.fillStyle='#ff5050';ctx.textAlign='center';ctx.fillText('1996',540,1190)}heartbeat(t,0.4)},
 seat(lt,p,t,d,seg){sunsetSky(t,1);road(t,0.3);carInterior(t);ctx.strokeStyle='#888';ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(900,1200);ctx.lineTo(700,1600);ctx.stroke();const g=p>0.5?0.18+0.1*Math.sin(t*4):0;if(g){ctx.globalAlpha=g;raincoat(900,2000,2.3,t,{look:-0.3});ctx.globalAlpha=1}heartbeat(t,0.5)}
};
const CAM={hook:[1.06,1.0],wave:[1,1.05],inside:[1,1.05],station:[1,1.04],dash:[1,1.06],belt:[1,1.1],audio:[1,1.05],seat:[1,1.08]};
