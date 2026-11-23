// Strange Minute #16: What if every ocean turned into fresh water? (helpers from ep012-015)
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
function jupiter(x,y,r,t,o={}){ctx.save();glow(x,y,r*1.6,'rgba(255,200,140,A)',0.25);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();const cols=['#e9d2b0','#c99a6a','#f2e2c6','#b8784a','#e6c9a0','#a86a42','#f0dcc0','#c48a5a'];
  for(let i=0;i<16;i++){const yy=y-r+i*(2*r/16);ctx.fillStyle=cols[i%cols.length];ctx.beginPath();ctx.moveTo(x-r,yy);for(let xx=-r;xx<=r;xx+=20)ctx.lineTo(x+xx,yy+6*Math.sin((xx+t*40*(i%2?1:-1))*0.02+i));ctx.lineTo(x+r,yy+2*r/16+8);ctx.lineTo(x-r,yy+2*r/16+8);ctx.fill()}
  ctx.fillStyle='#c0503a';ctx.beginPath();ctx.ellipse(x+r*0.3,y+r*0.35,r*0.22,r*0.12,0,0,7);ctx.fill();ctx.strokeStyle='rgba(255,240,220,0.5)';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(x+r*0.3,y+r*0.35,r*0.15,r*0.07,t,0,5);ctx.stroke();
  const sh=ctx.createLinearGradient(x-r,0,x+r,0);sh.addColorStop(0,'rgba(0,0,0,0)');sh.addColorStop(0.7,'rgba(0,0,0,0.15)');sh.addColorStop(1,'rgba(0,0,20,0.6)');ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore()}
function probe(x,y,s,t,heat){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(heat>0){for(let i=0;i<10;i++){const f=(t*3+i/10)%1;ctx.globalAlpha=heat*(1-f);ell(0,-60-f*260,40+f*60,30+f*40,i%2?'#ffb347':'#ff6a3d')}ctx.globalAlpha=1;glow(0,-40,200,'rgba(255,140,60,A)',0.8*heat)}
  ctx.fillStyle='#8a5a3a';ctx.beginPath();ctx.moveTo(-90,-20);ctx.quadraticCurveTo(0,-110,90,-20);ctx.closePath();ctx.fill();ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#c9d2dc';rr(-60,-20,120,70,14);ctx.fill();ctx.stroke();ell(0,15,14,14,Math.sin(t*6)>0?'#5fd4ff':'#1b4a6b');ctx.restore()}
function cloudLayer(t,y,col,sp,a=1){ctx.globalAlpha=a;for(let i=0;i<7;i++){const x=((i*220+t*sp)%(W+400))-200;ell(x,y+Math.sin(i)*30,170,60,col);ell(x+90,y-25,110,50,col)}ctx.globalAlpha=1}

function rock(x,y,r,t,col='#8a7a6a',seed=1){ctx.save();ctx.translate(x,y);ctx.rotate(t*0.2*seed);const rr2=rnd(seed);ctx.beginPath();for(let i=0;i<14;i++){const a=i/14*Math.PI*2,R=r*(0.82+rr2()*0.3);i?ctx.lineTo(Math.cos(a)*R,Math.sin(a)*R):ctx.moveTo(Math.cos(a)*R,Math.sin(a)*R)}ctx.closePath();
  const g=ctx.createRadialGradient(-r*0.3,-r*0.3,r*0.1,0,0,r);g.addColorStop(0,'#d8c8b0');g.addColorStop(1,col);ctx.fillStyle=g;ctx.fill();ctx.lineWidth=5;ctx.strokeStyle='#10243a';ctx.stroke();
  for(let i=0;i<5;i++)ell((rr2()-0.5)*r,(rr2()-0.5)*r,r*0.12,r*0.09,'rgba(60,50,40,0.45)');ctx.restore()}
function pair(t,cx,cy,s,ang){rock(cx,cy,180*s,t,'#7a6a5a',2);const a=ang??t*0.9;rock(cx+Math.cos(a)*330*s,cy+Math.sin(a)*120*s,55*s,t,'#8a7a6a',5);
  ctx.strokeStyle='rgba(95,212,255,0.5)';ctx.setLineDash([12,10]);ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(cx,cy,330*s,120*s,0,0,7);ctx.stroke();ctx.setLineDash([])}
function vend(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle='#10243a';rr(-70,-160,140,320,14);ctx.fillStyle='#ff5fa2';ctx.fill();ctx.stroke();ctx.fillStyle='#bfe9ff';rr(-50,-130,70,200,8);ctx.fill();ctx.stroke();for(let i=0;i<4;i++){ell(40,-110+i*40,10,10,'#ffd57a')}ctx.restore()}
function sea(t,o={}){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,o.dark?'#0a1830':'#7fc4ff');g.addColorStop(1,o.dark?'#123a6a':'#cfeaff');ctx.fillStyle=g;ctx.fillRect(-200,-200,W+400,1300);
  const wc=o.ice?'#d8f0ff':'#1f6fb5';ctx.fillStyle=wc;ctx.beginPath();ctx.moveTo(-200,1000);for(let x=-200;x<=W+200;x+=20)ctx.lineTo(x,1000+Math.sin(x*0.02+t*2)*14*(o.ice?0.1:1));ctx.lineTo(W+200,H+200);ctx.lineTo(-200,H+200);ctx.fill();
  ctx.fillStyle=o.ice?'#eef8ff':'#2a85d0';ctx.beginPath();ctx.moveTo(-200,1060);for(let x=-200;x<=W+200;x+=20)ctx.lineTo(x,1060+Math.sin(x*0.015-t*1.6)*10*(o.ice?0.1:1));ctx.lineTo(W+200,H+200);ctx.lineTo(-200,H+200);ctx.fill()}
function fish(x,y,s,t,col='#ffb347',dead=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(dead*Math.PI);const w=Math.sin(t*8)*0.3*(1-dead);ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(0,0,60,32,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(50,0);ctx.lineTo(95,-30+w*30);ctx.lineTo(95,30+w*30);ctx.fill();ell(-30,-8,8,8,'#111');ctx.restore()}
function coral(x,y,s,t,dead){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=dead?'#d8d2c8':'#ff6f91';ctx.lineWidth=18;ctx.lineCap='round';for(const [a,l] of [[-0.6,120],[-0.2,160],[0.3,140],[0.7,100]]){ctx.beginPath();ctx.moveTo(0,0);const ex=Math.sin(a)*l,ey=-Math.cos(a)*l;ctx.quadraticCurveTo(ex*0.5+Math.sin(t+a)*6,ey*0.5,ex,ey);ctx.stroke()}ctx.restore()}
function saltPile(x,y,s){ctx.fillStyle='#f4f1ea';ctx.beginPath();ctx.moveTo(x-260*s,y);ctx.quadraticCurveTo(x,y-420*s,x+260*s,y);ctx.fill();for(let i=0;i<30;i++)ell(x-200*s+(i*37)%400*s,y-20-(i*53)%200*s,4,4,'#fff')}
function glass(x,y,s,fill){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-60,-120);ctx.lineTo(-45,120);ctx.lineTo(45,120);ctx.lineTo(60,-120);ctx.stroke();ctx.fillStyle='rgba(120,200,255,0.7)';ctx.beginPath();ctx.moveTo(-58+15*(1-fill),120-240*fill);ctx.lineTo(-45,118);ctx.lineTo(45,118);ctx.lineTo(58-15*(1-fill),120-240*fill);ctx.fill();ctx.restore()}
const SCN={
 hook(lt,p,t,d,seg){sea(t);for(let i=0;i<4;i++)fish(200+i*230+Math.sin(t+i)*30,1300+i%2*120,0.8,t,i%2?'#ffb347':'#ffd57a');label(540,300,'FRESH WATER OCEANS?',SM.gold,56);smGuy(540,990,0.9,t,{hood:'#ff8a3d',wow:1});smTick(880,980-Math.abs(Math.sin(t*6))*20,0.8,t,{wow:1})},
 salt(lt,p,t,d,seg){sea(t);glass(300,700,1.4,1);ctx.fillStyle='#fff';for(let i=0;i<20;i++)ell(260+(i*13)%80,780-(i*29)%160+Math.sin(t*3+i)*6,5,5,'#fff');timer(720,700,'35 G / LITER',SM.gold)},
 pile(lt,p,t,d,seg){daySky(t,0.2);ground(t,'#3a6a3a');saltPile(540,1180,0.6+0.8*ease(p));smGuy(160,1650,0.9,t,{hood:'#ff8a3d',wow:0.8});label(540,300,'500+ FEET OF SALT',SM.gold,56)},
 poof(lt,p,t,d,seg){sea(t);const a=1-ease(clamp(p*1.5,0,1));ctx.globalAlpha=a;saltPile(540,1000,0.8);ctx.globalAlpha=1;for(let i=0;i<20;i++){const f=ease(p);ell(540+Math.cos(i)*f*600,1000-200+Math.sin(i*1.3)*f*400,10*(1-f)+2,10*(1-f)+2,'rgba(255,255,255,0.8)')}label(540,300,'POOF.',SM.cyan,80)},
 drink(lt,p,t,d,seg){sea(t);glass(540,800,1.6,0.3+0.7*ease(p));smGuy(820,1650,1.0,t,{hood:'#ff8a3d',wow:0.4,point:1});label(540,300,'DRINKABLE OCEAN',SM.cyan,56)},
 life(lt,p,t,d,seg){const k=nth(seg);sea(t,{dark:k>0});for(let i=0;i<5;i++){const dead=k?ease(clamp(p*1.5-i*0.15,0,1)):0;fish(180+i*180,1250+Math.sin(t+i)*30-dead*400,0.7,t,i%2?'#ffb347':'#7fd4ff',dead)}coral(200,1800,1.2,t,k>0&&p>0.5);coral(860,1820,1.0,t,k>0&&p>0.6);label(540,300,k?'SALT SHOCK':'BUILT FOR SALT',k?'#ff4d6d':SM.gold,56)},
 reef(lt,p,t,d,seg){sea(t,{dark:true});for(let i=0;i<4;i++)coral(180+i*240,1800,1.1,t,p>0.2+i*0.15);label(540,300,'REEFS DIE',  '#ff4d6d',60)},
 freeze(lt,p,t,d,seg){const k=nth(seg);sea(t,{ice:k>0&&p>0.3});timer(540,560,k?'ICE SPREADS':'32°F VS 28°F',SM.cyan);if(!k){bar(150,800,780,46,0.5,'#7fd4ff','');}smAstro(860,1000+Math.sin(t*2)*6,0.8,t)},
 current(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#071426';ctx.fillRect(-200,-200,W+400,H+400);stars(t,0.6);earth(540,820,330,t);const sp=k?Math.max(0.15,1-ease(p)):1;ctx.strokeStyle=`rgba(255,120,90,0.9)`;ctx.lineWidth=12;ctx.setLineDash([30,24]);ctx.lineDashOffset=-t*120*sp;ctx.beginPath();ctx.arc(540,820,400,-2.4,-0.6);ctx.stroke();ctx.strokeStyle='rgba(90,170,255,0.9)';ctx.beginPath();ctx.arc(540,820,440,0.6,2.4);ctx.stroke();ctx.setLineDash([]);label(540,300,k?'CURRENTS SLOW':'OCEAN CONVEYOR BELT',k?'#ff4d6d':SM.gold,50)},
 europe(lt,p,t,d,seg){daySky(t,0.4);ctx.fillStyle='#e8f4ff';ctx.fillRect(-200,1050,W+400,H);for(let i=0;i<40;i++){const f=(t*0.3+i/40)%1;ell((i*97)%W,f*1300,6,6,'rgba(255,255,255,0.9)')}smGuy(540,1650,1.1,t,{hood:'#ff8a3d',wow:0.6});label(540,300,'COLDER EUROPE',SM.cyan,58)},
 ask(lt,p,t,d,seg){sea(t);glass(300,800,1.2,0.8);saltPile(780,950,0.4);smTick(880,1650-Math.abs(Math.sin(t*5))*16,0.9,t,{wow:0.6});smGuy(380,1650,1.0,t,{hood:'#ff8a3d',point:1});smEnd(seg,t)}
};
const CAM={hook:[1.06,1.0],salt:[1,1.05],pile:[1,1.05],poof:[1,1.04],drink:[1,1.05],life:[1,1.04],reef:[1,1.05],freeze:[1,1.05],current:[1,1.04],europe:[1,1.05],ask:[1,1.05]};
