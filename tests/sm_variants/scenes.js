// Character style variants for Strange Minute (owner picks one)
const OL='#10243a';
function bg(t){sky('#123a63','#2a6a9c');stars(t,0.4);ctx.fillStyle='#0b2238';ctx.fillRect(0,1250,W,700);}
function tag(txt,sub){ctx.save();ctx.textAlign='center';ctx.font='900 120px Inter';ctx.fillStyle='#ffd57a';ctx.fillText(txt,W/2,1520);ctx.font='700 44px Inter';ctx.fillStyle='#fff';ctx.fillText(sub,W/2,1600);ctx.restore()}
// B: soft "bean" people — capsule body, no outline, pastel, dot eyes, rosy cheeks
function bean(x,y,s,t,col,o={}){const b=Math.sin(t*3+(o.ph||0))*6;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,4,60,12,'rgba(0,0,0,0.25)');
 for(const k of[-1,1]){ctx.save();ctx.translate(k*22,-40);ctx.rotate(Math.sin(t*6+k)*0.25*(o.walk?1:0));ctx.beginPath();rr(-12,0,24,40,12);ctx.fillStyle=shade(col,0.7);ctx.fill();ctx.restore()}
 ctx.beginPath();rr(-60,-250+b,120,215,60);ctx.fillStyle=col;ctx.fill();
 const g=ctx.createLinearGradient(-60,0,60,0);g.addColorStop(0,'rgba(255,255,255,0.18)');g.addColorStop(1,'rgba(0,0,0,0.15)');ctx.fillStyle=g;ctx.fill();
 ctx.save();ctx.translate(-58,-150+b);ctx.rotate(0.6+Math.sin(t*5)*0.3*(o.wave?1:0)-(o.wave?2.4:0));ctx.beginPath();rr(-12,0,24,70,12);ctx.fillStyle=shade(col,0.85);ctx.fill();ctx.restore();
 const blink=Math.sin(t*1.8)>0.97;for(const ex of[-20,22]){if(blink){ctx.fillStyle='#10243a';ctx.fillRect(ex-8,-195+b,16,4)}else ell(ex,-193+b,9,11,'#10243a')}
 ell(-34,-170+b,11,7,'rgba(255,120,140,0.5)');ell(36,-170+b,11,7,'rgba(255,120,140,0.5)');ctx.beginPath();ctx.arc(2,-170+b,12,0.2,Math.PI-0.2);ctx.strokeStyle='#10243a';ctx.lineWidth=5;ctx.lineCap='round';ctx.stroke();ctx.restore()}
// C: paper cut-out — layered paper shapes with offset shadows and slight jitter (stop-motion feel)
function paper(x,y,s,t,col,o={}){const j=jerky((t%1),8,3)*4;ctx.save();ctx.translate(x,y+j);ctx.scale(s,s);
 const P=(draw,fill)=>{ctx.save();ctx.translate(7,9);draw();ctx.fillStyle='rgba(0,0,0,0.35)';ctx.fill();ctx.restore();draw();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=2;ctx.stroke()};
 for(const k of[-1,1])P(()=>{ctx.beginPath();ctx.moveTo(k*14-10,-90);ctx.lineTo(k*14+10,-90);ctx.lineTo(k*14+12+Math.sin(t*6*k)*6,0);ctx.lineTo(k*14-14,0);ctx.closePath()},'#2d4b6b');
 P(()=>{ctx.beginPath();ctx.moveTo(-50,-90);ctx.lineTo(-38,-200);ctx.lineTo(40,-205);ctx.lineTo(52,-88);ctx.closePath()},col);
 P(()=>{ctx.beginPath();ctx.moveTo(42,-190);ctx.lineTo(110,-260+Math.sin(t*4)*10);ctx.lineTo(120,-248+Math.sin(t*4)*10);ctx.lineTo(50,-170);ctx.closePath()},shade(col,0.85));
 P(()=>{ctx.beginPath();ctx.moveTo(-42,-205);ctx.lineTo(-48,-285);ctx.lineTo(-10,-318);ctx.lineTo(38,-300);ctx.lineTo(46,-212);ctx.closePath()},'#f0c7a0');
 P(()=>{ctx.beginPath();ctx.moveTo(-50,-280);ctx.lineTo(-14,-332);ctx.lineTo(44,-310);ctx.lineTo(40,-282);ctx.lineTo(-8,-300);ctx.closePath()},'#2a1a12');
 ell(-14,-258,7,7,'#10243a');ell(18,-258,7,7,'#10243a');ctx.fillStyle='#10243a';ctx.fillRect(-6,-232,22,5);ctx.restore()}
// D: chibi explorer astronaut — round helmet with visor reflection, backpack light, floating bob
function astro(x,y,s,t,o={}){const f=Math.sin(t*2)*10;ctx.save();ctx.translate(x,y+f);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.lineJoin='round';
 ell(0,10-f,50,10,'rgba(0,0,0,0.25)');
 for(const k of[-1,1]){ctx.beginPath();rr(k*22-14,-70,28,62,12);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.beginPath();rr(k*22-16,-14,32,16,7);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke()}
 ctx.beginPath();rr(-70,-190,26,90,10);ctx.fillStyle='#9fb3c8';ctx.fill();ctx.stroke();ell(-57,-170,6,6,Math.sin(t*6)>0?'#5fd4ff':'#1b4a6b');
 ctx.beginPath();rr(-50,-200,100,135,40);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.beginPath();rr(-22,-160,44,26,6);ctx.fillStyle='#ff8a3d';ctx.fill();ctx.stroke();
 ctx.save();ctx.translate(48,-180);ctx.rotate(-0.6-Math.sin(t*4)*0.4);ctx.beginPath();rr(-12,0,24,64,12);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();ctx.restore();
 ctx.beginPath();ctx.arc(0,-260,78,0,7);ctx.fillStyle='#e8eef7';ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.ellipse(6,-255,58,48,0,0,7);const g=ctx.createLinearGradient(-40,-300,60,-210);g.addColorStop(0,'#2b6fa8');g.addColorStop(1,'#0b2238');ctx.fillStyle=g;ctx.fill();ctx.stroke();
 ell(-14,-258,8,10,'#ffffff');ell(24,-258,8,10,'#ffffff');ctx.beginPath();ctx.arc(6,-236,10,0.2,Math.PI-0.2);ctx.strokeStyle='#ffffff';ctx.lineWidth=4;ctx.stroke();
 ctx.beginPath();ctx.ellipse(-22,-282,16,8,-0.6,0,7);ctx.fillStyle='rgba(255,255,255,0.45)';ctx.fill();ctx.restore()}
const SCN=({
 a(lt,p,t){bg(t);smGuy(330,1250,1.9,t,{speed:1.5});smGuy(780,1250,1.9,t,{look:-1,point:1,wow:1,dir:-1});tag('A','Cartoon with outline · host "Max"')},
 b(lt,p,t){bg(t);bean(330,1250,1.9,t,'#ff8a65',{walk:1});bean(760,1250,1.9,t,'#7c9cff',{wave:1,ph:1});tag('B','Soft round "bean" people')},
 c(lt,p,t){bg(t);paper(330,1250,1.9,t,'#ff8a3d');paper(760,1250,1.9,t+0.4,'#3fb6a8');tag('C','Paper cut-out, stop-motion')},
 d(lt,p,t){bg(t);astro(330,1250,1.8,t);smTick(780,1180,2.2,t,{wow:0.7});tag('D','Little astronaut-explorer + Tick')}
});
const CAM={a:[1,1],b:[1,1],c:[1,1],d:[1,1]};
