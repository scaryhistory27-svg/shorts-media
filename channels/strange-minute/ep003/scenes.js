// Strange Minute #3 — What if a wave of syrup hit your street? (true story: Boston, 1919) — Max host + Tick (light "wonder" style: deep blues, cyan + gold accents)
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

const MOL='#5a2e10',MOL2='#7a4216';
function street1919(t,k=0){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#2c4a6a');g.addColorStop(1,'#d9b98a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
  const r=rnd(12);let x=-30;while(x<W+30){const w=150+r()*90,h=320+r()*260;ctx.fillStyle=['#8a4a3a','#6e3b2f','#9a5a42'][Math.floor(r()*3)];ctx.fillRect(x,1180-h,w,h);
   for(let yy=1180-h+40;yy<1140;yy+=70)for(let xx=x+20;xx<x+w-40;xx+=50){ctx.fillStyle='rgba(255,230,170,0.55)';ctx.fillRect(xx,yy,26,40)}x+=w+4}
  ctx.fillStyle='#4a4038';ctx.fillRect(-100,1180,W+200,900);ctx.fillStyle='#5a5048';for(let x2=-40;x2<W;x2+=90)ctx.fillRect(x2,1240,60,8)}
function wave(x,y,h,t,col=MOL){const gw=ctx.createLinearGradient(0,y-h,0,y);gw.addColorStop(0,'#8a5220');gw.addColorStop(0.5,col);gw.addColorStop(1,'#3a1c08');ctx.fillStyle=gw;ctx.beginPath();ctx.moveTo(-200,H);ctx.lineTo(-200,y-h*0.6);for(let xx=-200;xx<=x;xx+=30)ctx.lineTo(xx,y-h*0.6-14*Math.sin(xx*0.02+t*4));
  ctx.quadraticCurveTo(x+h*0.55,y-h*1.05,x+h*0.25,y-h*0.25);ctx.quadraticCurveTo(x+h*0.1,y,x+h*0.2,y+40);ctx.lineTo(x+h*0.2,H);ctx.closePath();ctx.fill();
  for(let b=0;b<3;b++){ctx.strokeStyle='rgba(255,200,140,0.18)';ctx.lineWidth=10;ctx.beginPath();for(let xx=-200;xx<=x;xx+=30)ctx.lineTo(xx,y-h*(0.45-b*0.12)-10*Math.sin(xx*0.025+t*3+b));ctx.stroke()}
  ctx.strokeStyle='rgba(255,210,150,0.5)';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-h*0.3,y-h*0.75);ctx.quadraticCurveTo(x+h*0.4,y-h*1.0,x+h*0.3,y-h*0.35);ctx.stroke();
  for(let i=0;i<8;i++){const r=rnd(i+40);ell(x+h*0.2+r()*80,y-h*0.3+r()*h*0.6+Math.sin(t*6+i)*8,8,12,col)}}
function tank(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#6d7680';rr(-200,-700,400,700,20);ctx.fill();ctx.fillStyle='#5a626b';ctx.beginPath();ctx.ellipse(0,-700,200,40,0,0,7);ctx.fill();
  ctx.strokeStyle='#4a525a';ctx.lineWidth=4;for(let yy=-640;yy<0;yy+=80){ctx.beginPath();ctx.moveTo(-200,yy);ctx.lineTo(200,yy);ctx.stroke();for(let xx=-180;xx<=180;xx+=30)ell(xx,yy,3,3,'#3a4148')}
  if(o.crack){ctx.strokeStyle='#1a1a1a';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(-20,-600);ctx.lineTo(10,-450*o.crack-150);ctx.lineTo(-15,-300);ctx.lineTo(20,-100);ctx.stroke();
   ctx.fillStyle=MOL;ctx.beginPath();ctx.moveTo(-15,-500);ctx.quadraticCurveTo(-200*o.crack,-200,-600*o.crack,0);ctx.lineTo(600*o.crack,0);ctx.quadraticCurveTo(200*o.crack,-200,15,-500);ctx.fill()}
  ctx.font='900 60px Georgia';ctx.fillStyle='rgba(255,255,255,0.7)';ctx.textAlign='center';ctx.fillText('MOLASSES',0,-380);ctx.restore()}
const SCN=({
 hook(lt,p,t,d,seg){street1919(t);const wx=moveAlong(Math.min(1,lt/2.6),250,430);wave(wx,1180,560,t);smGuy(720,1180,1.6,t,{dir:-1,wow:1,look:-0.3});smTick(900,1150,1.2,t,{wow:1})},
 boston(lt,p,t,d,seg){street1919(t);smGuy(moveAlong(p,140,520),1180,1.6,t,{speed:1.4});ctx.save();ctx.globalAlpha=ease(p*3);label(540,420,'BOSTON · JANUARY 15, 1919',SM.gold,46);ctx.restore()},
 harborTank(lt,p,t,d,seg){const k=nth(seg);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a6a92');g.addColorStop(1,'#cfe0ee');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
   ctx.fillStyle='#2f6f9a';ctx.fillRect(-100,1050,W+200,140);for(let i=0;i<6;i++){ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo((i*200+t*40)%W,1100);ctx.lineTo((i*200+t*40)%W+60,1100);ctx.stroke()}
   ctx.fillStyle='#4a4038';ctx.fillRect(-100,1180,W+200,900);tank(560,1180,k===0?0.9:1.0);smGuy(200,1180,1.1,t,{look:-1,point:k===1?ease(p*2):0,wow:k===1?1:0});
   if(k===1){ctx.save();ctx.globalAlpha=ease(p*3);label(540,300,'≈ 2.3 MILLION GALLONS',SM.gold,48);label(540,410,'50 FT TALL',SM.cyan,40);ctx.restore()}},
 burst(lt,p,t,d,seg){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a6a92');g.addColorStop(1,'#cfe0ee');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);ctx.fillStyle='#4a4038';ctx.fillRect(-100,1180,W+200,900);
   const c=ease((p-0.3)*2.5);tank(540+(c>0?Math.sin(t*50)*6:0),1180,1.0,{crack:c});if(c>0){for(let i=0;i<14;i++){const r=rnd(i+2);const a=r()*Math.PI*2,dd=c*(200+r()*400);ell(540+Math.cos(a)*dd,700+Math.sin(a)*dd*0.6,6,6,'#3a4148')}}
   label(540,420,'WARM DAY · STEEL BURSTS',SM.gold,44);smTick(160,1150,1.2,t,{wow:1})},
 waveRoll(lt,p,t,d,seg){const k=nth(seg);street1919(t);const wx=moveAlong(p,k===0?220:480,k===0?480:720);wave(wx,1180,600,t);
   if(k===0){ctx.save();ctx.strokeStyle='#ffd57a';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(980,1180);ctx.lineTo(980,1180-600*0.95);ctx.stroke();ctx.restore();label(860,560,'≈ 25 FT',SM.gold,44)}
   else label(540,400,'≈ 35 MPH',SM.gold,56)},
 run(lt,p,t,d,seg){street1919(t);const wx=moveAlong(p,80,470);wave(wx,1180,560,t);smGuy(moveAlong(p,560,1000),1180,1.5,t,{speed:3.2,wow:1});
   label(540,400,'YOU RUN ≈ 15 MPH',SM.cyan,44)},
 rail(lt,p,t,d,seg){street1919(t);const b=ease(p*1.5);ctx.save();ctx.strokeStyle='#2a2a2e';ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(-50,700);for(let x=-50;x<=W+50;x+=40){ctx.lineTo(x,700+Math.max(0,1-Math.abs(x-540)/300)*b*160)}ctx.stroke();
   for(let x=60;x<W;x+=200){const dx=Math.max(0,1-Math.abs(x-540)/300)*b;ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(x,700+dx*160);ctx.lineTo(x+dx*120,1180);ctx.stroke()}ctx.restore();
   wave(moveAlong(p,120,430),1180,480,t);label(540,400,'ELEVATED RAILWAY · BENT',SM.gold,44)},
 strange(lt,p,t,d,seg){sky('#071a33','#0e2a4a');stars(t,1);ground(t);smGuy(380,1180,1.7,t,{look:-0.6,wow:0.6});smTick(760,1150-Math.abs(Math.sin(t*4))*20,1.6,t,{wow:1});label(540,450,"BUT HERE'S THE STRANGE PART",SM.gold,42)},
 cool(lt,p,t,d,seg){const k=nth(seg);street1919(t);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(10,20,50,0.0)');g.addColorStop(1,'rgba(10,20,50,0.0)');
   ctx.fillStyle=`rgba(8,16,40,${0.15+0.45*(k>=1?ease(p):0)+(k===2?0.45:0)})`;ctx.fillRect(-100,-100,W+200,H+200);
   ctx.fillStyle=k===0?MOL2:MOL;ctx.fillRect(-100,1080,W+200,900);for(let i=0;i<10;i++){ell(100+i*100,1100+Math.sin(t*(k===0?3:0.5)+i)*6,40,10,'rgba(255,210,150,'+(k===0?0.35:0.12)+')')}
   const stuck=k>=1;smGuy(420,1150,1.6,t,{speed:stuck?0:0.6,wow:stuck?1:0.3,look:0.6});
   ctx.save();ctx.translate(930,760);rr(-24,-220,48,280,24);ctx.fillStyle='#fff';ctx.fill();const lvl=k===0?0.7:k===1?0.7-0.4*ease(p):0.3;ctx.fillStyle='#ff5a5a';rr(-12,40-260*lvl,24,260*lvl,12);ctx.fill();ell(0,60,36,36,'#ff5a5a');ctx.restore();
   label(540,400,k===0?'COLDER = THICKER':k===1?'NIGHT FALLS · IT HARDENS':'RESCUERS WADE LIKE IN GLUE',SM.cyan,42)},
 harbor(lt,p,t,d,seg){const k=nth(seg);const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#3a6a92');g.addColorStop(1,'#cfe0ee');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
   ctx.fillStyle='#6a4a2a';ctx.fillRect(-100,900,W+200,1100);for(let i=0;i<8;i++){ctx.strokeStyle='rgba(255,220,170,0.35)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo((i*170+t*30)%W,960+i*60);ctx.lineTo((i*170+t*30)%W+70,960+i*60);ctx.stroke()}
   ctx.save();ctx.translate(300+Math.sin(t*0.8)*30,950+Math.sin(t*2)*8);ctx.fillStyle='#e9eef5';ctx.beginPath();ctx.moveTo(-120,0);ctx.lineTo(120,0);ctx.lineTo(90,50);ctx.lineTo(-90,50);ctx.fill();ctx.fillStyle='#8a5a3c';ctx.fillRect(-5,-160,10,160);ctx.fillStyle='#ffd57a';ctx.beginPath();ctx.moveTo(5,-150);ctx.lineTo(90,-30);ctx.lineTo(5,-30);ctx.fill();ctx.restore();
   if(k===0)label(540,420,'HARBOR: BROWN FOR MONTHS',SM.gold,44);
   else{smGuy(760,1300,1.4,t,{look:-0.3,wow:0.4});for(let i=0;i<3;i++){ctx.strokeStyle='rgba(255,180,200,0.8)';ctx.lineWidth=5;ctx.beginPath();const yy=1000-((t*60+i*60)%180);ctx.moveTo(680,yy);ctx.quadraticCurveTo(660+Math.sin(t*3+i)*20,yy-30,680,yy-60);ctx.stroke()}label(540,420,'"SMELLED SWEET FOR DECADES"',SM.cyan,40)}},
 endq(lt,p,t,d,seg){street1919(t);wave(moveAlong(p,180,340),1180,500,t);smGuy(640,1180,1.6,t,{dir:-1,look:-0.2,wave:ease(p*2),wow:0.5});smTick(880,1150,1.3,t,{wow:1});
   const lw=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>lw+0.9){const a=ease((t-lw-0.9)/0.5);ctx.fillStyle=`rgba(3,10,22,${0.82*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';
   ctx.font='900 110px Inter';ctx.fillStyle=SM.gold;ctx.shadowColor=SM.gold;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={hook:[1.08,1],boston:[1,1.04],harborTank:[1,1.05],burst:[1,1.07],waveRoll:[1,1.06],run:[1.02,1],rail:[1,1.05],strange:[1,1.05],cool:[1,1.04],harbor:[1,1.05],endq:[1,1.04]};
