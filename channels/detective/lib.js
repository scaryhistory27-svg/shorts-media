// channels/detective/lib.js — PSEUDO-3D toolkit for the detective channel (owner 2026-11-27: "make it look like 3D, totally different from my other channels").
// Loaded by render.js before scenes.js. Everything is shaded with ONE global key light (upper-left, warm) + cool rim light (right), soft contact shadows,
// one-point-perspective sets, depth-of-field blur and parallax camera layers.
const KEY={x:-0.55,y:-0.7};                       // light direction (from upper-left)
const RIM='rgba(120,190,255,0.55)';                // cool rim light
const hx=(h)=>{if(h.startsWith('rgb'))return h.match(/[\d.]+/g).slice(0,3).map(Number);h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]};
const rgb=(a,k=1,al=1)=>`rgba(${Math.min(255,Math.round(a[0]*k))},${Math.min(255,Math.round(a[1]*k))},${Math.min(255,Math.round(a[2]*k))},${al})`;
const tone=(h,k,al=1)=>rgb(hx(h),k,al);
// ---------- shaded primitives ----------
function sph(x,y,r,base,o={}){const g=ctx.createRadialGradient(x+KEY.x*r*0.45,y+KEY.y*r*0.45,r*0.08,x,y,r*1.05);
  g.addColorStop(0,tone(base,1.35));g.addColorStop(0.45,tone(base,1.0));g.addColorStop(0.85,tone(base,0.62));g.addColorStop(1,tone(base,0.45));
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r*(o.sx||1),r*(o.sy||1),o.rot||0,0,7);ctx.fill();
  if(o.rim!==false){ctx.save();ctx.beginPath();ctx.ellipse(x,y,r*(o.sx||1),r*(o.sy||1),o.rot||0,0,7);ctx.clip();ctx.strokeStyle=RIM;ctx.lineWidth=r*0.16;ctx.beginPath();ctx.ellipse(x+r*0.12,y,r*(o.sx||1),r*(o.sy||1),o.rot||0,-0.9,0.9);ctx.stroke();ctx.restore()}
  if(o.spec!==false){ctx.fillStyle='rgba(255,255,255,0.35)';ctx.beginPath();ctx.ellipse(x+KEY.x*r*0.42,y+KEY.y*r*0.48,r*0.18,r*0.11,-0.6,0,7);ctx.fill()}}
function cap3(x1,y1,x2,y2,r,base){ctx.save();ctx.lineCap='round';const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,lo=(nx*KEY.x+ny*KEY.y)>0?1:-1;
  const ln=(w,col,off)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1+nx*off*lo,y1+ny*off*lo);ctx.lineTo(x2+nx*off*lo,y2+ny*off*lo);ctx.stroke()};
  ln(r*2,tone(base,0.55),0);ln(r*1.55,tone(base,0.9),r*0.18);ln(r*0.7,tone(base,1.25),r*0.5);ctx.restore()}
function body3(x,y,w,h,r,base){const g=ctx.createLinearGradient(x-w/2,0,x+w/2,0);g.addColorStop(0,tone(base,1.25));g.addColorStop(0.45,tone(base,1));g.addColorStop(1,tone(base,0.5));
  rr(x-w/2,y,w,h,r);ctx.fillStyle=g;ctx.fill();const v=ctx.createLinearGradient(0,y,0,y+h);v.addColorStop(0,'rgba(255,255,255,0.08)');v.addColorStop(1,'rgba(0,0,0,0.35)');ctx.fillStyle=v;rr(x-w/2,y,w,h,r);ctx.fill();
  ctx.save();rr(x-w/2,y,w,h,r);ctx.clip();const rg=ctx.createLinearGradient(x+w/2-18,0,x+w/2,0);rg.addColorStop(0,'rgba(120,190,255,0)');rg.addColorStop(1,'rgba(120,190,255,0.35)');ctx.fillStyle=rg;ctx.fillRect(x+w/2-18,y,18,h);ctx.restore()}
function shadow(x,y,rx,ry,a=0.45){const g=ctx.createRadialGradient(x,y,0,x,y,rx);g.addColorStop(0,`rgba(0,0,0,${a})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.save();ctx.scale(1,ry/rx);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y*rx/ry,rx,0,7);ctx.fill();ctx.restore()}
function box3(x,y,w,h,d,base,o={}){ // front face at (x,y,w,h); depth goes up-left toward the vanishing point (dx,dy per unit)
  const dx=o.dx??-0.35,dy=o.dy??-0.55;ctx.fillStyle=tone(base,1.25);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+d*dx,y+d*dy);ctx.lineTo(x+w+d*dx,y+d*dy);ctx.lineTo(x+w,y);ctx.fill();
  ctx.fillStyle=tone(base,0.6);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+d*dx,y+d*dy);ctx.lineTo(x+d*dx,y+h+d*dy);ctx.lineTo(x,y+h);ctx.fill();
  const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,tone(base,1.05));g.addColorStop(1,tone(base,0.72));ctx.fillStyle=g;ctx.fillRect(x,y,w,h)}
// ---------- camera / depth ----------
const CAMX={x:0,y:0};
function layer(depth,fn,blur=0){ctx.save();ctx.translate(-CAMX.x/depth,-CAMX.y/depth);if(blur)ctx.filter=`blur(${blur}px)`;fn();ctx.filter='none';ctx.restore()}
function dolly(t,ax=60,ay=0,sp=0.35){CAMX.x=Math.sin(t*sp)*ax;CAMX.y=Math.cos(t*sp*0.8)*ay}
function dust(t,x,y,w,h,n=40){ctx.save();for(let i=0;i<n;i++){const px=x+((i*73+t*12*(1+i%3))%w),py=y+((i*131+t*20)%h);ctx.globalAlpha=0.25+0.35*Math.sin(t*2+i);ell(px,py,1.6+(i%3),1.6+(i%3),'#fff3d0')}ctx.restore()}
function godRays(x,y,ang,len,w,col='255,214,150',a=0.22){ctx.save();ctx.globalCompositeOperation='screen';for(let i=0;i<5;i++){const k=i/4,g=ctx.createLinearGradient(x,y,x+Math.cos(ang)*len,y+Math.sin(ang)*len);g.addColorStop(0,`rgba(${col},${a*(1-k*0.6)})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;const ww=w*(0.4+k*0.6);
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(ang-0.0)*len-Math.sin(ang)*ww/2,y+Math.sin(ang)*len+Math.cos(ang)*ww/2);ctx.lineTo(x+Math.cos(ang)*len+Math.sin(ang)*ww/2,y+Math.sin(ang)*len-Math.cos(ang)*ww/2);ctx.fill()}ctx.restore()}
function grade(warm=0.18,cool=0.22){ctx.save();ctx.globalCompositeOperation='soft-light';ctx.fillStyle=`rgba(40,90,130,${cool})`;ctx.fillRect(-200,-200,W+400,H+400);ctx.globalCompositeOperation='overlay';const g=ctx.createRadialGradient(380,520,50,380,520,1100);g.addColorStop(0,`rgba(255,170,80,${warm})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-200,-200,W+400,H+400);ctx.restore()}
// one-point perspective room. o={wall,floor,ceil,vp:[x,y], back:[x0,y0,x1,y1], window:true, rain:true, door:true, tiles:'wood'|'check'}
function room3(t,o={}){const [bx0,by0,bx1,by1]=o.back||[260,420,820,1060];const wall=o.wall||'#3a4a5c',floor=o.floor||'#4a3526',ceil=o.ceil||'#1c2028';
  ctx.fillStyle=tone(ceil,1);ctx.beginPath();ctx.moveTo(-200,-200);ctx.lineTo(W+200,-200);ctx.lineTo(bx1,by0);ctx.lineTo(bx0,by0);ctx.fill();
  const fl=ctx.createLinearGradient(0,by1,0,H);fl.addColorStop(0,tone(floor,0.55));fl.addColorStop(1,tone(floor,1.1));ctx.fillStyle=fl;ctx.beginPath();ctx.moveTo(-200,H+200);ctx.lineTo(W+200,H+200);ctx.lineTo(bx1,by1);ctx.lineTo(bx0,by1);ctx.fill();
  ctx.strokeStyle=tone(floor,0.45,0.8);ctx.lineWidth=3;for(let i=-10;i<=10;i++){ctx.beginPath();ctx.moveTo(bx0+(bx1-bx0)*(i+10)/20,by1);ctx.lineTo(540+i*260,H+200);ctx.stroke()}
  for(let k=1;k<8;k++){const f=Math.pow(k/8,1.8),y=by1+(H+200-by1)*f;ctx.beginPath();ctx.moveTo(-200,y);ctx.lineTo(W+200,y);ctx.globalAlpha=0.5;ctx.stroke();ctx.globalAlpha=1}
  const lw=ctx.createLinearGradient(-200,0,bx0,0);lw.addColorStop(0,tone(wall,0.5));lw.addColorStop(1,tone(wall,0.85));ctx.fillStyle=lw;ctx.beginPath();ctx.moveTo(-200,-200);ctx.lineTo(bx0,by0);ctx.lineTo(bx0,by1);ctx.lineTo(-200,H+200);ctx.fill();
  const rw=ctx.createLinearGradient(bx1,0,W+200,0);rw.addColorStop(0,tone(wall,0.75));rw.addColorStop(1,tone(wall,0.38));ctx.fillStyle=rw;ctx.beginPath();ctx.moveTo(W+200,-200);ctx.lineTo(bx1,by0);ctx.lineTo(bx1,by1);ctx.lineTo(W+200,H+200);ctx.fill();
  const bw=ctx.createLinearGradient(bx0,by0,bx1,by1);bw.addColorStop(0,tone(wall,1.05));bw.addColorStop(1,tone(wall,0.8));ctx.fillStyle=bw;ctx.fillRect(bx0,by0,bx1-bx0,by1-by0);
  ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(bx0,by1-14,bx1-bx0,14); // skirting shadow (AO)
  if(o.window){const wx=bx0+(bx1-bx0)*0.55,wy=by0+70,ww=(bx1-bx0)*0.34,wh=(by1-by0)*0.42;ctx.fillStyle='#0b1422';ctx.fillRect(wx,wy,ww,wh);
    if(o.rain!==false){ctx.save();ctx.beginPath();ctx.rect(wx,wy,ww,wh);ctx.clip();ctx.strokeStyle=o.rainHL?'rgba(255,210,58,0.9)':'rgba(170,200,230,0.55)';ctx.lineWidth=2;for(let i=0;i<26;i++){const rx=wx+((i*37)%ww),ry=wy+((i*59+t*260)%wh);ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-3,ry+22);ctx.stroke()}ctx.restore()}
    else{ell(wx+ww*0.7,wy+wh*0.3,18,18,'#e8e8e0');for(let i=0;i<8;i++)ell(wx+((i*53)%ww),wy+((i*29)%wh),1.5,1.5,'#cfd6ff')}
    ctx.strokeStyle='#5a4a3a';ctx.lineWidth=10;ctx.strokeRect(wx,wy,ww,wh);ctx.beginPath();ctx.moveTo(wx+ww/2,wy);ctx.lineTo(wx+ww/2,wy+wh);ctx.moveTo(wx,wy+wh/2);ctx.lineTo(wx+ww,wy+wh/2);ctx.lineWidth=5;ctx.stroke()}}
function pendant(x,y,t,on=1){ctx.strokeStyle='#111';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,-50);ctx.lineTo(x,y-40);ctx.stroke();ctx.fillStyle='#2a3a2a';ctx.beginPath();ctx.moveTo(x-70,y);ctx.quadraticCurveTo(x,y-80,x+70,y);ctx.fill();
  const f=on*(0.85+0.15*life.flicker(t*0.3));ell(x,y+4,26,12,`rgba(255,230,170,${f})`);glow(x,y+40,420,'rgba(255,190,110,A)',0.3*f);godRays(x,y+10,Math.PI/2,1100,700,'255,214,150',0.14*f)}
// ---------- CHARACTERS (stylised 3D toon) ----------
// o: {skin,hair,hairStyle:'short'|'bun'|'bald'|'slick', hat:'fedora'|'cap'|null, coat,coatD,pants,shoe, look:-1..1 (head yaw), walk:speed, dir, talk:0..1,
//     brow:'neutral'|'angry'|'worried'|'raised', eyes:'open'|'narrow'|'wide', armL, armR (angles, rad), glasses, moustache, badge, apron, belly, collar}
function toon(x,y,s,t,o={}){const sp=o.walk||0,ph=t*sp*Math.PI*2,walking=sp>0,dir=o.dir||1;const bob=walking?-Math.abs(Math.sin(ph))*9:Math.sin(t*2.1)*2.5,br=1+0.02*Math.sin(t*2.1);
  shadow(x,y+4,70*s,16*s,0.5);ctx.save();ctx.translate(x,y);ctx.scale(s*dir,s);
  const skin=o.skin||'#e0b494',coat=o.coat||'#6b5a44',pants=o.pants||'#2b2f38',shoe=o.shoe||'#1a1a1e',belly=o.belly||0;
  // legs
  const leg=(a,back)=>{const th=walking?Math.sin(a)*0.5:0,kn=walking?Math.max(0,-Math.cos(a))*0.8:0,hy=-118+bob,kx=Math.sin(th)*56,ky=hy+Math.cos(th)*56,fx=kx+Math.sin(th-kn)*58,fy=ky+Math.cos(th-kn)*58;
    cap3(back?-14:14,hy,kx+(back?-14:14),ky,20,back?shade(pants,0.75):pants);cap3(kx+(back?-14:14),ky,fx+(back?-14:14),fy,18,back?shade(pants,0.75):pants);sph(fx+(back?-4:18),fy+4,22,shoe,{sx:1.5,sy:0.65,rim:false})};
  leg(ph+Math.PI,true);
  // back arm
  const arm=(a,front,ang)=>{let sw=walking?Math.sin(a)*0.6:Math.sin(t*1.4)*0.05;if(ang!=null)sw=ang;const sx=front?50:-46,sy=-240+bob,ex=sx+Math.sin(sw)*52,ey=sy+Math.cos(sw)*52,el=walking?0.4:0.2,wx=ex+Math.sin(sw-el)*48,wy=ey+Math.cos(sw-el)*48;
    const c=front?coat:shade(coat,0.7);cap3(sx,sy,ex,ey,19,c);cap3(ex,ey,wx,wy,17,c);sph(wx,wy+8,17,skin,{rim:false})};
  arm(ph,false,o.armL);
  if(o.long)leg(ph,false);
  // torso (+ belly)
  ctx.save();ctx.translate(0,bob);ctx.scale(1,br);body3(0,-268,124+belly*40,o.long?230:160,44,coat);if(o.long){ctx.fillStyle='rgba(0,0,0,0.22)';ctx.fillRect(-2,-150,4,110)}
  if(o.apron){ctx.fillStyle='#e8e4da';rr(-34,-210,68,96,10);ctx.fill();ctx.fillStyle='rgba(0,0,0,0.15)';rr(-34,-140,68,26,8);ctx.fill()}
  if(o.collar){ctx.fillStyle=shade(coat,0.8);ctx.beginPath();ctx.moveTo(-44,-262);ctx.lineTo(0,-212);ctx.lineTo(44,-262);ctx.lineTo(30,-270);ctx.lineTo(0,-232);ctx.lineTo(-30,-270);ctx.fill();ctx.fillStyle=shade(coat,0.55);ctx.fillRect(-62-belly*20,-150,124+belly*40,16)}
  if(o.badge){sph(26,-226,9,'#d8b23a',{rim:false})}
  if(o.tie){ctx.fillStyle=o.tie;ctx.beginPath();ctx.moveTo(-8,-258);ctx.lineTo(8,-258);ctx.lineTo(10,-196);ctx.lineTo(0,-184);ctx.lineTo(-10,-196);ctx.fill()}
  ctx.restore();
  if(!o.long)leg(ph,false);
  // head
  const look=o.look||0,hx0=look*6,hy0=-318+bob+(o.nod||0)*10,R=64;cap3(0,-258+bob,0,-280+bob,16,skin);
  // back hair / bun
  if(o.hairStyle==='bun')sph(hx0-look*40-14,hy0-46,26,o.hair||'#3a2a1e',{rim:false});
  if(Math.abs(look)>0.15)sph(hx0-Math.sign(look)*R*0.9,hy0+8,14,skin,{rim:false,spec:false});else{sph(hx0-R*0.97,hy0+8,13,skin,{rim:false,spec:false});sph(hx0+R*0.97,hy0+8,13,skin,{rim:false,spec:false})}
  sph(hx0,hy0,R,skin,{sy:1.05});
  // ear on the far side from the look direction (3D turn illusion)
  // hair
  const hair=o.hair||'#2a1e16';
  if(o.hairStyle!=='bald'){ctx.save();ctx.beginPath();ctx.ellipse(hx0,hy0,R+2,R*1.07+2,0,0,7);ctx.clip();const hg=ctx.createLinearGradient(0,hy0-R,0,hy0);hg.addColorStop(0,tone(hair,1.3));hg.addColorStop(1,tone(hair,0.8));ctx.fillStyle=hg;
    ctx.beginPath();ctx.ellipse(hx0-look*10,hy0-R*0.55,R*1.15,R*0.62,0,0,7);ctx.fill();if(o.hairStyle==='slick'){ctx.strokeStyle='rgba(255,255,255,0.25)';ctx.lineWidth=4;for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(hx0-look*10,hy0-R*0.2,R*(0.6+i*0.12),-2.6,-1.1);ctx.stroke()}}ctx.restore()}
  // face features shift with yaw; far eye foreshortened
  const fx=hx0+look*R*0.42,ey=hy0+4,sep=R*0.36,blink=(t%4.2)<0.12||o.eyes==='closed';
  const eye=(ex,k)=>{const w=11*k,h=blink?1.5:(o.eyes==='narrow'?6:o.eyes==='wide'?15:12);ell(ex,ey,w,h,'#fbfbf6');if(!blink){ell(ex+look*3,ey+1,w*0.62,Math.min(h,w*0.62),o.iris||'#4a3a2a');ell(ex+look*3,ey+1,w*0.32,Math.min(h,w*0.32),'#0d0d0d');ell(ex+look*3-3,ey-3,2.6,2.6,'#fff')}
    ctx.strokeStyle='rgba(0,0,0,0.45)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(ex,ey,w,h,0,Math.PI*1.05,Math.PI*1.95);ctx.stroke()};
  const kL=1-Math.max(0,look)*0.45,kR=1-Math.max(0,-look)*0.45;eye(fx-sep*kL,kL);eye(fx+sep*kR,kR);
  // brows
  const bAng={neutral:0,angry:0.35,worried:-0.35,raised:-0.1}[o.brow||'neutral'],bUp=o.brow==='raised'?-8:0;ctx.strokeStyle=tone(hair==='#e8e8e8'?'#888888':hair,0.8);ctx.lineWidth=6;ctx.lineCap='round';
  for(const sd of[-1,1]){const bx=fx+sd*sep*(sd<0?kL:kR);ctx.beginPath();ctx.moveTo(bx-12*sd,ey-22+bUp-bAng*8*sd*-1);ctx.lineTo(bx+12*sd,ey-22+bUp+bAng*8*sd*-1);ctx.stroke()}
  // nose (strongest parallax) + mouth
  sph(fx+look*10,ey+20,10,shade(skin,1.02),{rim:false,sx:1,sy:1.2});
  const tk=o.talk?Math.abs(Math.sin(t*13))*o.talk:0;ctx.fillStyle='#4a1f1a';ctx.beginPath();ctx.ellipse(fx+look*6,ey+42,12+tk*2,2+tk*9,0,0,7);ctx.fill();
  if(o.moustache){ctx.fillStyle=tone(hair,0.9);ctx.beginPath();ctx.ellipse(fx+look*8-9,ey+33,12,5,0.2,0,7);ctx.ellipse(fx+look*8+9,ey+33,12,5,-0.2,0,7);ctx.fill()}
  if(o.glasses){ctx.strokeStyle='#1a1a1a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(fx-sep*kL,ey,16*kL,0,7);ctx.moveTo(fx+sep*kR+16*kR,ey);ctx.arc(fx+sep*kR,ey,16*kR,0,7);ctx.moveTo(fx-sep*kL+16*kL,ey);ctx.lineTo(fx+sep*kR-16*kR,ey);ctx.stroke();ctx.fillStyle='rgba(200,230,255,0.18)';ell(fx-sep*kL,ey,16*kL,16*kL,'rgba(200,230,255,0.18)');ell(fx+sep*kR,ey,16*kR,16*kR,'rgba(200,230,255,0.18)')}
  // cheeks AO
  ell(fx-sep-6,ey+26,9,5,'rgba(200,90,80,0.15)');ell(fx+sep+6,ey+26,9,5,'rgba(200,90,80,0.15)');
  // hats
  if(o.hat==='fedora'){ctx.save();ctx.translate(hx0,hy0-R*0.72);ctx.rotate(-look*0.08);sph(0,6,R*1.35,'#2a2724',{sx:1,sy:0.22,spec:false});body3(0,-58,R*1.4,62,22,'#36322e');ctx.fillStyle='#16140f';ctx.fillRect(-R*0.7,-14,R*1.4,12);ctx.restore()}
  if(o.hat==='cap'){ctx.save();ctx.translate(hx0,hy0-R*0.7);sph(0,-6,R*0.98,'#2c3a5a',{sx:1.05,sy:0.6});ctx.fillStyle='#1a2236';ctx.beginPath();ctx.ellipse(look*30+20,14,R*0.75,R*0.18,0,0,7);ctx.fill();sph(0,-24,9,'#d8b23a',{rim:false});ctx.restore()}
  // front arm last
  arm(ph+Math.PI,true,o.armR);
  ctx.restore()}
// a little "evidence" glow marker
function evidence(x,y,r,t){ctx.save();ctx.strokeStyle='rgba(255,210,58,0.95)';ctx.lineWidth=6;ctx.setLineDash([16,10]);ctx.lineDashOffset=-t*40;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();ctx.restore();glow(x,y,r*1.6,'rgba(255,210,58,A)',0.18)}
