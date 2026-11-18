// Strange Minute #4 — What if the Sun switched off right now? — Max host + Tick + astronaut (light "wonder" style)
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

const DAY1='#2f8fd8',DAY2='#a6dcff';
function daySky(t,dark=0){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,DAY1);g.addColorStop(1,DAY2);ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  if(dark>0){ctx.fillStyle=`rgba(4,10,24,${dark})`;ctx.fillRect(-100,-100,W+200,1400);if(dark>0.6)stars(t,(dark-0.6)/0.4)}}
function bigSun(x,y,r,t,a=1){if(a<=0)return;ctx.save();ctx.globalAlpha=a;glow(x,y,r*3,'rgba(255,210,90,A)',0.45);ctx.translate(x,y);ctx.rotate(t*0.25);
  ctx.strokeStyle='rgba(255,213,122,0.8)';ctx.lineCap='round';ctx.lineWidth=r*0.09;for(let i=0;i<12;i++){ctx.rotate(Math.PI/6);const k=1.25+0.08*Math.sin(t*4+i);ctx.beginPath();ctx.moveTo(0,r*1.12);ctx.lineTo(0,r*k+r*0.15);ctx.stroke()}
  const g=ctx.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#fff7d0');g.addColorStop(0.6,'#ffd04a');g.addColorStop(1,'#ff9a2a');ell(0,0,r,r,g);ctx.restore()}
function deadSun(x,y,r){ell(x,y,r,r,'#141820');ctx.strokeStyle='rgba(95,212,255,0.35)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke()}
function grassField(t,dark=0){ctx.fillStyle=dark>0.5?'#0b2a1c':'#3aa05a';ctx.beginPath();ctx.moveTo(-100,1180);ctx.quadraticCurveTo(540,1120,W+100,1180);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  if(dark>0&&dark<=0.5){ctx.fillStyle=`rgba(4,10,24,${dark})`;ctx.fillRect(-100,1100,W+200,900)}
  for(let i=0;i<40;i++){const x=i*28+10,s=Math.sin(t*2+i)*6;ctx.strokeStyle=dark>0.5?'#0f3a26':'#2e8a48';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,1190);ctx.quadraticCurveTo(x+s,1165,x+s*1.6,1145);ctx.stroke()}}
function spaceBg(t){ctx.fillStyle='#050b18';ctx.fillRect(-100,-100,W+200,H+200);stars(t,1)}
function photons(x0,y0,x1,y1,t,k=1,col='255,213,122'){for(let i=0;i<14;i++){const f=((t*0.35+i/14)%1);const x=x0+(x1-x0)*f,y=y0+(y1-y0)*f+Math.sin(f*20+i)*10;glow(x,y,26,`rgba(${col},A)`,0.8*k);ell(x,y,7,7,`rgba(${col},${k})`)}}
function timer(x,y,txt,col=SM.gold){ctx.save();ctx.font='800 64px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';const w=ctx.measureText(txt).width+60;rr(x-w/2,y-55,w,110,30);ctx.fillStyle='rgba(5,20,40,0.8)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle=col;ctx.fillText(txt,x,y+3);ctx.restore()}
function mmss(sec){sec=Math.max(0,Math.floor(sec));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')}
function bird(x,y,s,t,still){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const f=still?0:Math.sin(t*14)*0.6;ctx.fillStyle='#9fc3e6';ell(0,0,22,14,'#9fc3e6');ell(18,-10,10,10,'#9fc3e6');ctx.beginPath();ctx.moveTo(26,-10);ctx.lineTo(38,-6);ctx.lineTo(26,-4);ctx.fill();
  ctx.save();ctx.rotate(-0.3-f);ctx.beginPath();ctx.ellipse(-6,-8,20,7,-0.4,0,7);ctx.fill();ctx.restore();ctx.restore()}
function plant(x,y,s,t,close=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#2e7d45';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(Math.sin(t)*6,-80,0,-160);ctx.stroke();
  for(const [yy,k] of[[-60,-1],[-100,1],[-140,-1]]){ctx.save();ctx.translate(0,yy);ctx.rotate(k*(1.1-0.9*close)+Math.sin(t*2+yy)*0.05);ctx.fillStyle='#45b35f';ctx.beginPath();ctx.ellipse(k*30,0,34,13,0,0,7);ctx.fill();ctx.restore()}ctx.restore()}
function smEnd(seg,t){const lw=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>lw+0.9){const a=ease((t-lw-0.9)/0.5);ctx.fillStyle=`rgba(3,10,22,${0.82*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';
   ctx.font='900 110px Inter';ctx.fillStyle=SM.gold;ctx.shadowColor=SM.gold;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
const SCN={
 sunhook(lt,p,t,d,seg){daySky(t,lt>d-0.5?0.7*Math.sin(t*40)**2:0);bigSun(540,560,190,t,1);grassField(t);smGuy(330,1190,1.6,t,{look:-0.8,point:0.9,wow:0.8});smTick(800,1160-Math.abs(Math.sin(t*5))*24,1.4,t,{wow:1,hop:1});
   ctx.save();ctx.translate(820,420);ctx.rotate(-0.15);label(0,0,'OFF?',SM.gold,56);ctx.restore()},
 nothing(lt,p,t,d,seg){daySky(t);bigSun(820,330,120,t);grassField(t);smGuy(moveAlong(p,200,520),1190,1.45,t,{speed:1.6,look:-0.2});smTick(moveAlong(p,80,380),1160-Math.abs(Math.sin(t*6))*18,1.1,t,{hop:1});
   timer(540,760,mmss(480-(t-seg.s)*8*6))},
 lightTravel(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);bigSun(170,640,150,t);earth(900,640,90,t);photons(330,640,800,640,t);smAstro(560,1120,1.2,t);label(540,400,k?'STILL ON ITS WAY':'8 MIN 20 SEC',SM.gold,52)},
 orbit(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);if(k)deadSun(540,700,150);else bigSun(540,700,150,t,1-0.6*p);ctx.strokeStyle='rgba(95,212,255,0.35)';ctx.setLineDash([12,14]);ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(540,700,380,250,0,0,7);ctx.stroke();ctx.setLineDash([]);
   const a=t*0.5;earth(540+Math.cos(a)*380,700+Math.sin(a)*250,60,t);label(540,1080,k?'8 MINUTES… THEN':'GRAVITY = LIGHT SPEED',SM.cyan,44)},
 blackout(lt,p,t,d,seg){const dk=ease(clamp((lt-0.25)/0.5,0,1));daySky(t,dk*0.97);bigSun(540,420,150,t,1-dk);if(dk>0.9)deadSun(540,420,150);skyline(t,dk,1220);
   smGuy(420,1240,1.5,t,{look:-0.6,wow:dk});smTick(760,1210-Math.abs(Math.sin(t*9))*20*dk,1.2,t,{wow:dk})},
 moonOff(lt,p,t,d,seg){daySky(t,0.97);bigMoon(640,480,150,1-ease(p));label(540,740,'NO SUN = NO MOONLIGHT',SM.cyan,44);smGuy(330,1240,1.5,t,{look:-0.7,dir:1,wow:0.6});grassField(t,0.9)},
 stars(lt,p,t,d,seg){ctx.fillStyle='#030814';ctx.fillRect(-100,-100,W+200,H+200);const r=rnd(12);for(let i=0;i<180;i++){const x=r()*W,y=r()*1150,ap=clamp(p*3-r()*2,0,1);ell(x,y,1.5+r()*3,1.5+r()*3,`rgba(255,255,255,${ap*(0.5+0.5*Math.sin(t*3+i))})`)}
   grassField(t,0.9);smGuy(420,1240,1.5,t,{look:-0.9,wow:0.9,point:ease(p*2)});smTick(720,1210,1.2,t,{wow:1,look:-1})},
 planets(lt,p,t,d,seg){spaceBg(t);deadSun(160,700,90);const P=[['MERCURY',300,14],['VENUS',430,22],['MARS',600,18],['JUPITER',800,46],['SATURN',980,38]];
   P.forEach(([n,x,r],i)=>{const a=clamp(1-(p*6-i),0.1,1);glow(x,700,r*3,'rgba(255,213,122,A)',0.3*a);ell(x,700,r,r,`rgba(255,${200+i*8},${150+i*15},${a})`);ctx.globalAlpha=a;ctx.font='700 26px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(n,x,700+r+44);ctx.globalAlpha=1});
   smAstro(540,1080,1.2,t)},
 cold(lt,p,t,d,seg){ctx.fillStyle='#04101f';ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.8);grassField(t,0.9);const v=0.75-0.35*ease(p);bar(260,560,560,44,v,'#5fd4ff','AIR TEMPERATURE');label(540,720,'DROPS ABOUT 10°F',SM.cyan,52);
   smGuy(460,1240,1.5,t,{look:0.1,wow:0.5});ctx.save();ctx.translate(Math.sin(t*40)*3,0);ctx.restore();for(let i=0;i<3;i++){const f=(t*0.8+i/3)%1;ctx.globalAlpha=0.5*(1-f);ell(560+f*60,780+300-f*90,20+f*30,14+f*20,'#dff4ff')}ctx.globalAlpha=1;smTick(780,1210,1.2,t,{wow:0.6})},
 plants(lt,p,t,d,seg){ctx.fillStyle='#06142a';ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.8);grassField(t,0.9);for(let i=0;i<4;i++)plant(170+i*240,1200,1.2,t,ease(p));
   ctx.strokeStyle='#5f7f9f';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-50,520);ctx.quadraticCurveTo(540,600,W+50,520);ctx.stroke();for(let i=0;i<5;i++)bird(220+i*160,548-Math.sin(i)*6+(p>0.5?0:Math.abs(Math.sin(t*8+i))*-6),1.2,t,p>0.5);
   label(540,820,p<0.5?'PHOTOSYNTHESIS: PAUSED':'BIRDS GO QUIET',SM.gold,44)},
 back(lt,p,t,d,seg){const b=ease(clamp(p*1.4,0,1));daySky(t,0.97*(1-b));bigSun(540,520,170,t,b);grassField(t,0.9*(1-b));smGuy(380,1210,1.55,t,{wave:b,look:-0.5,wow:0.3});smTick(760,1180-Math.abs(Math.sin(t*6))*30*b,1.3,t,{hop:b})},
 old(lt,p,t,d,seg){const k=nth(seg);spaceBg(t);bigSun(260,700,160,t);earth(880,700,70,t);photons(420,700,810,700,t);smAstro(600,1160,1.15,t);label(540,400,k?'ALREADY HAPPENED':'YOU SEE IT 8 MIN LATE',SM.gold,46)},
 sunrise(lt,p,t,d,seg){const g=ctx.createLinearGradient(0,0,0,1200);g.addColorStop(0,'#1d4f7a');g.addColorStop(0.7,'#ff9a5a');g.addColorStop(1,'#ffd57a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
   bigSun(540,1150-140*ease(p),160,t);grassField(t,0.2);smGuy(300,1230,1.5,t,{look:-0.3,dir:1});smTick(820,1200,1.2,t,{look:-0.5})},
 endq(lt,p,t,d,seg){daySky(t);bigSun(540,520,170,t,0.85+0.15*Math.sin(t*6));grassField(t);smGuy(330,1200,1.55,t,{look:-0.8,wow:0.7,point:0.6});smTick(780,1180-Math.abs(Math.sin(t*5))*20,1.4,t,{wow:1});
   timer(540,860,mmss(500-(t-seg.s)*1.0),SM.cyan);smEnd(seg,t)}
};
const CAM={sunhook:[1.08,1],nothing:[1,1.04],lightTravel:[1,1.06],orbit:[1,1.05],blackout:[1,1.05],moonOff:[1,1.05],stars:[1,1.07],planets:[1,1.05],cold:[1,1.04],plants:[1,1.05],back:[1,1.05],old:[1,1.06],sunrise:[1,1.05],endq:[1,1.04]};
