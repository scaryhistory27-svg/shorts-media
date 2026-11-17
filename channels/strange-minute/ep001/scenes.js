// Strange Minute #1 — What if the Moon vanished tonight? (light "wonder" style: deep blues, cyan + gold accents)
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

const SCN=({
 moonhook(lt,p,t,d,seg){sky(SM.sky1,'#08182c');stars(t,1);
  const gone=ease((lt-1.25)/0.35), r=330*(1+0.04*Math.sin(t*2));
  if(gone<1){bigMoon(540,820,r*(1-0.25*gone),1-gone);}
  if(gone>0&&gone<1){ctx.save();ctx.globalAlpha=1-gone;ctx.strokeStyle=SM.gold;ctx.lineWidth=14*(1-gone);ctx.beginPath();ctx.arc(540,820,r*(1+gone*1.6),0,7);ctx.stroke();ctx.restore()}
  if(gone>=1){ctx.save();ctx.setLineDash([18,16]);ctx.strokeStyle='rgba(95,212,255,0.6)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(540,820,250,0,7);ctx.stroke();ctx.restore();ctx.font='900 80px Inter';ctx.textAlign='center';ctx.fillStyle=SM.cyan;ctx.fillText('?',540,848)}
  skyline(t,1,1250)},
 citydark(lt,p,t,d,seg){const k=TL.segs.indexOf(seg),dk=k===1?ease(p)*0.5:0.5+0.3*ease(p);
  sky(SM.sky1,'#0c2238');ctx.fillStyle=`rgba(0,4,12,${dk})`;ctx.fillRect(0,0,W,H);stars(t,0.6+dk*0.6);
  if(k===1){ctx.save();ctx.setLineDash([14,14]);ctx.strokeStyle=`rgba(95,212,255,${0.5*(1-p)})`;ctx.lineWidth=4;ctx.beginPath();ctx.arc(800,420,110,0,7);ctx.stroke();ctx.restore()}
  skyline(t,1-dk*0.6,1180);ctx.fillStyle='#07101c';ctx.fillRect(0,1180,W,800);
  // rooftop walker looks up, slows down
  const x=moveAlong(p,k===1?140:420,k===1?420:560);walker(x,1175,1.25,t,{speed:k===1?1.5:0.35,look:-0.6,dir:1});
  if(k===2){ctx.save();ctx.globalAlpha=ease(p*2);label(540,480,'FULL MOON: GONE',SM.gold,46);ctx.restore()}},
 ocean(lt,p,t,d,seg){sky('#123a63','#2a6a9c');stars(t,0.3);
  const lvl=1080-60*Math.sin(t*0.9);ctx.fillStyle=SM.sand;ctx.beginPath();ctx.moveTo(0,1000);ctx.quadraticCurveTo(540,930,W,1010);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
  for(let i=0;i<4;i++){ctx.fillStyle=i%2?SM.sea:SM.sea2;ctx.beginPath();ctx.moveTo(-50,lvl+i*70);for(let x=-50;x<=W+50;x+=30)ctx.lineTo(x,lvl+i*70-14*Math.sin(x*0.012+t*(2+i*0.4)+i));ctx.lineTo(W+50,H);ctx.lineTo(-50,H);ctx.fill()}
  ctx.strokeStyle='rgba(255,255,255,0.7)';ctx.lineWidth=5;ctx.beginPath();for(let x=-50;x<=W+50;x+=30)ctx.lineTo(x,lvl-14*Math.sin(x*0.012+t*2));ctx.stroke();
  // tide marker post
  ctx.fillStyle='#6b4a2a';ctx.fillRect(820,720,26,420);for(let y=740;y<1120;y+=40){ctx.fillStyle='#f4f4f4';ctx.fillRect(846,y,24,4)}
  label(540,480,'HIGH TIDE ↔ LOW TIDE',SM.cyan,42)},
 tides(lt,p,t,d,seg){sky('#071528','#0d2745');stars(t,0.9);const k=TL.segs.indexOf(seg);
  const moonA=k===4?1:1-ease(p*2.5), bulge=k===4?1:1-0.66*ease((p-0.15)*2);
  // sun on the left (small), moon on the right
  glow(80,880,260,'rgba(255,200,100,A)',0.5);ell(80,880,70,70,'#ffcf6a');
  bigMoon(940,880,70,moonA);if(k===5&&moonA<1){ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle='rgba(95,212,255,0.6)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(940,880,70,0,7);ctx.stroke();ctx.restore()}
  // water envelope stretched toward the moon
  ctx.save();ctx.translate(520,880);const wob=1+0.02*Math.sin(t*3);ctx.beginPath();ctx.ellipse(0,0,(260+120*bulge*0.75+40)*wob,300-30*bulge,0,0,7);ctx.fillStyle='rgba(95,212,255,0.35)';ctx.fill();ctx.restore();
  earth(520,880,250,t,0);
  if(moonA>0.2){ctx.strokeStyle=`rgba(255,213,122,${0.7*moonA})`;ctx.lineWidth=6;for(let i=0;i<3;i++){const x=780+((t*120+i*50)%120);ctx.beginPath();ctx.moveTo(x,860);ctx.lineTo(x-24,880);ctx.lineTo(x,900);ctx.stroke()}}
  label(540,480,k===5?`TIDES: ${Math.round(100-66*ease((p-0.15)*2))}%`:'MOON PULL → TIDES',k===5?SM.gold:SM.cyan,48)},
 reef(lt,p,t,d,seg){const k=TL.segs.indexOf(seg);
  if(k!==8){const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0b4a72');g.addColorStop(1,'#03192c');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);
   for(let i=0;i<7;i++){lightCone(150+i*140+Math.sin(t*0.5+i)*30,-50,0.15*Math.sin(i),1300,120,'190,235,255',0.07)}
   const r=rnd(9);for(let i=0;i<9;i++){const x=60+i*120,h=160+r()*220,c=['#ff7a8a','#ffb35c','#c77dff','#5fd4ff'][i%4];ctx.strokeStyle=c;ctx.lineWidth=16;ctx.lineCap='round';
    for(let b=-1;b<=1;b++){ctx.beginPath();ctx.moveTo(x,1240);ctx.quadraticCurveTo(x+b*50+life.sway(t+i,12),1240-h*0.6,x+b*70+life.sway(t*1.2+i,18),1240-h);ctx.stroke()}}
   ctx.fillStyle='#04121f';ctx.fillRect(-100,1236,W+200,800);
   // spawning particles rising (stop on line 7)
   const stop=k===7?ease(p*1.6):0;const pr=rnd(21);for(let i=0;i<90;i++){const x=pr()*W,sp=40+pr()*80,y=1220-((t*sp+pr()*900)%900)*(1-stop*0.9);ctx.globalAlpha=(0.5+0.5*Math.sin(t*3+i))*(1-stop);ell(x+Math.sin(t+i)*12,y,5,5,'#fff2c8')}ctx.globalAlpha=1;
   if(k===7){ctx.fillStyle=`rgba(0,8,20,${0.45*stop})`;ctx.fillRect(0,0,W,H);label(540,480,'⏸  MOON CLOCK: OFF',SM.gold,46)}
   else label(540,480,'SPAWN BY MOONLIGHT',SM.gold,46);
   turtle(moveAlong(p,-80,420),1000+20*Math.sin(t*1.3),2.2,t);}
  else{ // beach at night, hatchlings crawl the wrong way toward city lights
   sky('#040b16','#0b1a2c');stars(t,0.8);skyline(t,1,780);glow(300,700,400,'rgba(255,200,120,A)',0.18);
   ctx.fillStyle='#3b3226';ctx.fillRect(-100,780,W+200,1300);ctx.fillStyle=SM.sea2;ctx.beginPath();ctx.moveTo(W+100,780);ctx.lineTo(700,1700);ctx.lineTo(W+100,1900);ctx.fill();
   for(let i=0;i<5;i++){const x=moveAlong(p,640+i*60,380+i*40),y=1100+i*40;turtle(x,y,1.1,t,i);ctx.save();ctx.translate(x,y);ctx.scale(-1,1);ctx.restore()}
   ctx.save();ctx.strokeStyle=SM.cyan;ctx.lineWidth=6;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(700,1170);ctx.lineTo(960,1080);ctx.stroke();ctx.setLineDash([]);ctx.font='800 40px Inter';ctx.fillStyle=SM.cyan;ctx.fillText('SEA →',900,1040);ctx.restore()}},
 space(lt,p,t,d,seg){sky('#030814','#081a33');stars(t,1);const k=TL.segs.indexOf(seg);
  earth(540,880,300,t,0.41);
  if(k===10){const a=t*0.9;bigMoon(540+Math.cos(a)*440,880+Math.sin(a)*130,55,Math.sin(a)>-0.2?1:0.9);
   // "hand on a spinning top": steadying arc
   ctx.save();ctx.translate(540,880);ctx.rotate(0.41);ctx.strokeStyle=SM.gold;ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,-410,40,Math.PI*0.2,Math.PI*0.8);ctx.stroke();ctx.restore();
   label(540,430,'TILT 23.4° — STEADY',SM.gold,46)}
  else{ctx.save();ctx.globalAlpha=ease(p*2);label(540,430,'⏳  MILLIONS OF YEARS',SM.cyan,46);ctx.restore()}},
 wobble(lt,p,t,d,seg){sky('#030814','#0b1530');stars(t,1);const k=TL.segs.indexOf(seg);
  const amp=k===11?0.12+0.35*ease(p):0.5, tilt=0.41+amp*Math.sin(t*1.6);earth(540,880,290,t,tilt);
  ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle='rgba(95,212,255,0.4)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(540,880,420,-Math.PI/2-0.9,-Math.PI/2+0.9);ctx.stroke();ctx.restore();
  label(540,430,`TILT ${Math.abs(Math.round(23.4+amp*57*Math.sin(t*1.6)))}°`,SM.gold,48);
  if(k===12){const s=Math.sin(t*1.6);ctx.font='120px serif';ctx.textAlign='center';ctx.globalAlpha=Math.abs(s);ctx.fillText(s>0?'❄️':'☀️',880,560);ctx.globalAlpha=1}},
 eclipse(lt,p,t,d,seg){sky('#0a1c33','#1a3d63');const c=ease(p*2.2),gone=ease((p-0.55)*4);
  glow(540,640,520,'rgba(255,220,140,A)',0.55-0.3*c*(1-gone));ell(540,640,190,190,'#fff0b8');
  if(gone<1){ctx.save();ctx.globalAlpha=1-gone;ctx.strokeStyle='rgba(255,255,255,0.7)';ctx.lineWidth=10;ctx.beginPath();ctx.arc(540,640,198,0,7);ctx.stroke();ell(540+(1-c)*420,640,192,192,'#050a12');ctx.restore()}
  skyline(t,0.8,1560);
  if(gone>0){ctx.save();ctx.globalAlpha=gone;label(540,980,'TOTAL ECLIPSE: NEVER AGAIN',SM.gold,44);ctx.restore()}},
 endq(lt,p,t,d,seg){const k=TL.segs.indexOf(seg),last=k===TL.segs.length-1;sky(SM.sky1,'#0c2238');stars(t,1);
  // the moon fades back… then a cyan "?" ring flickers where it should be (loop to the hook)
  const back=k===14?ease(p*1.5):1;bigMoon(780,520,130,back*(last?(Math.sin(t*20)>0.2?1:0.25):1));
  skyline(t,1,1180);ctx.fillStyle='#07101c';ctx.fillRect(0,1180,W,800);walker(380,1175,1.3,t,{speed:0,look:-0.8,reach:k===14?ease(p):0.6});
  const lw=seg.words[seg.words.length-1].s;if(last&&t>lw+0.9){const a=ease((t-lw-0.9)/0.5);ctx.fillStyle=`rgba(3,10,22,${0.82*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';
   ctx.font='900 110px Inter';ctx.fillStyle=SM.gold;ctx.shadowColor=SM.gold;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
});
const CAM={moonhook:[1.08,1],citydark:[1,1.06],ocean:[1,1.05],tides:[1,1.04],reef:[1,1.06],space:[1,1.07],wobble:[1.02,1.06],eclipse:[1,1.05],endq:[1,1.06]};
