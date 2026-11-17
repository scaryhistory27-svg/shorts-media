// Strange Minute #2 — What if Earth stopped spinning for one second? (Max host + Tick) (light "wonder" style: deep blues, cyan + gold accents)
// Caption band y≈1250–1470 stays free of key objects.
const SM={sky1:'#0e2a4a',sky2:'#1d4f7a',gold:'#ffd57a',cyan:'#5fd4ff',sea:'#0f5d86',sea2:'#0a3d5c',sand:'#e8c88f'};
function label(x,y,txt,col=SM.cyan,size=44){ctx.save();ctx.font=`800 ${size}px Inter`;ctx.textAlign='center';ctx.textBaseline='middle';
  const w=ctx.measureText(txt).width+50;rr(x-w/2,y-size*0.85,w,size*1.7,size*0.85);ctx.fillStyle='rgba(5,20,40,0.75)';ctx.fill();
  ctx.lineWidth=3;ctx.strokeStyle=col;ctx.stroke();ctx.fillStyle=col;ctx.fillText(txt,x,y);ctx.restore()}
function bigMoon(x,y,r,a=1){ctx.save();ctx.globalAlpha=a;glow(x,y,r*2.6,'rgba(255,235,180,A)',0.35);
  const g=ctx.createRadialGradient(x-r*0.35,y-r*0.35,r*0.1,x,y,r);g.addColorStop(0,'#fff6d8');g.addColorStop(0.7,'#e9d79c');g.addColorStop(1,'#bfa86a');ell(x,y,r,r,g);
  for(const [dx,dy,rr2] of[[-.35,-.2,.17],[.33,.25,.12],[.1,-.48,.09],[-.15,.4,.13],[.45,-.15,.07]])ell(x+dx*r,y+dy*r,rr2*r,rr2*r,'rgba(160,135,80,0.55)');ctx.restore()}
function skyline(t,lit=1,yb=1250){const r=rnd(4);let x=-40;while(x<W+40){const w=90+r()*110,h=180+r()*420;ctx.fillStyle='#0a1626';ctx.fillRect(x,yb-h,w,h+700);
  for(let yy=yb-h+30;yy<yb-20;yy+=46)for(let xx=x+16;xx<x+w-24;xx+=34)if(r()<0.45){const f=Math.sin(t*0.7+xx*0.3+yy)>0.97?0.3:1;ctx.fillStyle=`rgba(255,213,122,${0.75*lit*f})`;ctx.fillRect(xx,yy,16,22)}x+=w+6}}
function earth(x,y,r,t,tilt=0.41){ctx.save();ctx.translate(x,y);glow(0,0,r*1.7,'rgba(95,212,255,A)',0.25);ctx.rotate(tilt);
  ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.save();ctx.clip();ctx.fillStyle='#1c6fb0';ctx.fillRect(-r,-r,2*r,2*r);
  const off=(t*0.18*r)%(r*4);for(const k of[-1,0,1])for(const [cx,cy,rx,ry] of[[-0.3,-0.3,0.35,0.25],[0.5,0.1,0.28,0.4],[1.2,-0.4,0.3,0.2],[1.6,0.35,0.35,0.22]]){
    ell(cx*r*2+off-r*4*k-r*1.5,cy*r,rx*r,ry*r,'#3e9a5a')}
  ell(0,-r*0.92,r*0.55,r*0.16,'#eef6ff');ell(0,r*0.92,r*0.55,r*0.16,'#eef6ff');
  const sh=ctx.createLinearGradient(-r,0,r,0);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(0.55,'rgba(0,0,0,0.1)');sh.addColorStop(1,'rgba(0,10,30,0.75)');ctx.fillStyle=sh;ctx.fillRect(-r,-r,2*r,2*r);ctx.restore();
  ctx.strokeStyle='rgba(255,255,255,0.8)';ctx.lineWidth=5;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(0,-r*1.35);ctx.lineTo(0,r*1.35);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function turtle(x,y,s,t,ph=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const k=Math.sin(t*7+ph);
  ctx.fillStyle='#2e5f3a';for(const [a,b] of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.save();ctx.translate(a*22,b*16);ctx.rotate(a*b*(0.5+0.4*k*a));ell(a*10,0,16,7,'#3f7d4c');ctx.restore()}
  ell(36,0,13,11,'#4c8f5a');ell(41,-4,2.5,2.5,'#111');ell(0,0,30,24,'#2b5233');ell(0,0,22,17,'#3b6e45');ctx.restore()}

function nth(seg){let n=0;for(const x of TL.segs){if(x===seg)return n;if(x.scene===seg.scene)n++}return n}
function ground(t,col='#0b2238'){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1130,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill()}
function streaks(t,k,col='255,255,255',y0=200,y1=1150){const r=rnd(5);for(let i=0;i<60*k;i++){const y=y0+r()*(y1-y0),L=80+r()*260,x=((r()*W*2+t*(900+r()*900)*k)%(W+L*2))-L;ctx.strokeStyle=`rgba(${col},${0.15+0.35*r()})`;ctx.lineWidth=2+r()*4;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+L,y);ctx.stroke()}}
function bar(x,y,w,h,v,col,txt){rr(x,y,w,h,h/2);ctx.fillStyle='rgba(255,255,255,0.12)';ctx.fill();rr(x,y,Math.max(h,w*v),h,h/2);ctx.fillStyle=col;ctx.fill();ctx.font='800 34px Inter';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(txt,x,y-16)}
function mug(x,y,s,t,tilt=0){ctx.save();ctx.translate(x,y);ctx.rotate(tilt);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';rr(-40,-80,80,80,10);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(44,-40,18,-1.4,1.4);ctx.stroke();
  for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(255,255,255,${0.4})`;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-20+i*20,-90);ctx.quadraticCurveTo(-30+i*20+Math.sin(t*3+i)*10,-120,-20+i*20,-150);ctx.stroke()}ctx.restore()}
const SCN=({
 hook(lt,p,t,d,seg){sky('#071a33','#0e2a4a');stars(t,1);const sp=lt<1.6?1:Math.max(0,1-(lt-1.6)*2);earth(540,820,330,t*(1+sp*3),0.41);
   if(lt>1.6){ctx.save();ctx.globalAlpha=ease((lt-1.6)*3);label(540,1220-90,'⏸  SPIN: 0',SM.gold,48);ctx.restore()}},
 moving(lt,p,t,d,seg){const k=nth(seg);sky('#123a63','#2a6a9c');stars(t,0.3);streaks(t,0.25,'200,230,255',300,1100);ground(t);
   smGuy(k===0?moveAlong(p,200,430):430,1180,1.7,t,{speed:k===0?1.4:0,look:k===1?-0.5:0,point:k===1?ease(p*2):0,wow:k===1&&p>0.5?1:0});
   smTick(820,1150,1.4,t,{wow:k===1?0.8:0.2});
   if(k===1){ctx.save();ctx.globalAlpha=ease(p*3);label(540,430,'EQUATOR ≈ 1,000 MPH',SM.gold,50);ctx.restore()}},
 together(lt,p,t,d,seg){const k=nth(seg);sky('#123a63','#2a6a9c');ground(t);
   ctx.fillStyle='#5a3a22';rr(560,1010,360,26,8);ctx.fill();ctx.fillRect(600,1036,18,150);ctx.fillRect(860,1036,18,150);mug(740,1010,1.2,t);
   smGuy(380,1180,1.7,t,{look:0.2,wave:k===1?0.6:0});const items=k===1?['AIR','OCEANS','COFFEE']:[];
   items.forEach((w,i)=>{const a=ease((p-i*0.25)*4);if(a>0){ctx.save();ctx.globalAlpha=a;label(540,380+i*110,'→ '+w+' MOVES TOO',SM.cyan,40);ctx.restore()}});
   if(k===0){ctx.save();ctx.globalAlpha=ease(p*3);label(540,420,'YOU FEEL NOTHING',SM.gold,46);ctx.restore()}},
 brake(lt,p,t,d,seg){const k=nth(seg);sky('#071a33','#0e2a4a');stars(t,1);const stop=k===0?ease((p-0.5)*3):1;earth(540,820,330,t*(1-stop)+ (k===0?0:0),0.41);
   const sg=k===0?ease((p-0.4)*4):1;if(sg>0){ctx.save();ctx.translate(540,820);ctx.scale(sg,sg);ctx.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;ctx.lineTo(Math.cos(a)*130,Math.sin(a)*130)}ctx.closePath();ctx.fillStyle='rgba(230,60,60,0.92)';ctx.fill();ctx.lineWidth=8;ctx.strokeStyle='#fff';ctx.stroke();ctx.font='900 60px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('STOP',0,22);ctx.restore()}
   smTick(170+Math.sin(t*2)*20,420,1.3,t,{hop:0,wow:1});
   if(k===1){ctx.save();ctx.globalAlpha=ease(p*3);label(540,1230-100,'GROUND: STOPS · AIR: KEEPS GOING',SM.cyan,36);ctx.restore()}},
 wind(lt,p,t,d,seg){const k=nth(seg);sky('#16304f','#3a6a92');streaks(t,1.2,'230,245,255',150,1150);skyline(t,0.6,1190);
   for(let i=0;i<4;i++){const x=120+i*260;ctx.save();ctx.translate(x,1190);ctx.rotate(0.5+0.08*Math.sin(t*12+i));ctx.fillStyle='#3e9a5a';ell(0,-150,55,110,'#3e9a5a');ctx.fillStyle='#4a3020';ctx.fillRect(-8,-60,16,60);ctx.restore()}
   if(k===0){smGuy(moveAlong(p,120,900),1190,1.4,t,{speed:3,wow:1,wave:0.4})}
   else{bar(140,380,800,46,1,'#ffd57a','STOPPED EARTH WIND · 1,000 MPH');bar(140,520,800,46,ease(p*2)*0.3,'#5fd4ff','STRONGEST TORNADO · ~300 MPH');smTick(860,1150,1.3,t,{wow:1})}},
 ocean(lt,p,t,d,seg){sky('#16304f','#3a6a92');streaks(t,0.6,'230,245,255',150,900);skyline(t,0.6,1080);ctx.fillStyle='#3e7a4a';ctx.fillRect(-100,1080,W+200,900);
   const front=moveAlong(p,-150,W+150);ctx.fillStyle=SM.sea;ctx.beginPath();ctx.moveTo(-100,H);ctx.lineTo(-100,1010);
   for(let x=-100;x<=front;x+=24)ctx.lineTo(x,1010-18*Math.sin(x*0.02+t*7));ctx.quadraticCurveTo(front+140,860,front+40,1120);ctx.lineTo(front+30,H);ctx.closePath();ctx.fill();
   ctx.strokeStyle='rgba(255,255,255,0.85)';ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(front-60,960);ctx.quadraticCurveTo(front+120,860,front+50,1010);ctx.stroke();
   for(let i=0;i<14;i++){const r=rnd(i+9);ell(front+r()*60-20,950+r()*80+Math.sin(t*9+i)*10,6,6,'rgba(255,255,255,0.8)')}
   smTick(860,1060,1.2,t,{wow:1});label(540,430,'OCEANS SLOSH EAST →',SM.cyan,46)},
 fly(lt,p,t,d,seg){sky('#16304f','#3a6a92');streaks(t,1,'230,245,255',150,1150);ground(t,'#14304a');const r=rnd(8);
   const items=[['🚗',90],['🪑',70],['📦',80],['🛹',70],['🗑️',80],['☕',60]];items.forEach(([e,s],i)=>{const x=((t*700+i*260)%(W+300))-150,y=360+i*120+Math.sin(t*3+i)*30;ctx.save();ctx.translate(x,y);ctx.rotate(t*3+i);ctx.font=s+'px serif';ctx.textAlign='center';ctx.fillText(e,0,0);ctx.restore()});
   smGuy(300,1180,1.6,t,{wow:1,look:0});ctx.save();ctx.strokeStyle='#ffd57a';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(140,1210);ctx.lineTo(140,1100);ctx.stroke();ctx.restore();label(700,1120,'BOLTED DOWN ✓',SM.gold,36)},
 turn(lt,p,t,d,seg){sky('#071a33','#0e2a4a');stars(t,1);earth(540,820,300,t*0.3,0.41);ctx.save();ctx.translate(540,820);ctx.rotate(0.41);
   const pole=ease(p*2);ctx.strokeStyle='#ffd57a';ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,-300,60*pole+10,0,7);ctx.stroke();ctx.restore();
   smTick(860,380,1.4,t,{hop:0,wow:0.6});label(540,1180-60,"BUT HERE'S THE STRANGE PART",SM.gold,40)},
 pole(lt,p,t,d,seg){const k=nth(seg);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d4f7a');g.addColorStop(1,'#cfe6ff');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.4);
   for(let i=0;i<70;i++){const r=rnd(i+3);const x=(r()*W+t*20)%W,y=(r()*H+t*(40+r()*40))%H;ell(x,y,3,3,'rgba(255,255,255,0.8)')}
   ctx.fillStyle='#f4f9ff';ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1100,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
   ctx.fillStyle='#8a5a3c';ctx.fillRect(720,760,14,420);ctx.fillStyle='#e33';ctx.beginPath();ctx.moveTo(734,770);ctx.lineTo(860,800);ctx.lineTo(734,830);ctx.fill();ctx.font='900 46px Inter';ctx.fillStyle='#10243a';ctx.textAlign='center';ctx.fillText('N',727,750);
   smGuy(430,1175,1.7,t,{hood:'#e9eef5',pants:'#2b3a55',look:k===0?0:-0.4,wave:k===2?0.8:0,wow:k===1?0.6:0});smTick(600,1150,1.2,t,{wow:0.3});
   if(k===0){ctx.save();ctx.globalAlpha=ease(p*3);label(540,430,'NORTH POLE: SPIN SPEED ≈ 0',SM.cyan,42);ctx.restore()}
   if(k===2){ctx.save();ctx.globalAlpha=ease(p*3);label(540,430,'SAFEST SPOT = COLDEST SPOT',SM.gold,42);ctx.restore()}},
 endq(lt,p,t,d,seg){sky('#071a33','#0e2a4a');stars(t,1);earth(540,700,260,t*(0.2+ease(p)*2),0.41);ground(t);smGuy(380,1180,1.6,t,{look:-0.6,point:ease(p*2),wow:0.5});smTick(780,1150,1.4,t,{wow:1});
   const lw=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>lw+0.9){const a=ease((t-lw-0.9)/0.5);ctx.fillStyle=`rgba(3,10,22,${0.82*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';
   ctx.font='900 110px Inter';ctx.fillStyle=SM.gold;ctx.shadowColor=SM.gold;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={hook:[1.06,1],moving:[1,1.05],together:[1,1.04],brake:[1,1.06],wind:[1.03,1],ocean:[1,1.04],fly:[1,1.05],turn:[1,1.06],pole:[1,1.05],endq:[1,1.04]};
