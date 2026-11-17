const OL='#10243a';
function bg(t){sky('#123a63','#2a6a9c');stars(t,0.4);ctx.fillStyle='#0b2238';ctx.fillRect(0,1250,W,700);}
function tag(txt,sub){ctx.save();ctx.textAlign='center';ctx.font='900 120px Inter';ctx.fillStyle='#ffd57a';ctx.fillText(txt,W/2,1520);ctx.font='700 44px Inter';ctx.fillStyle='#fff';ctx.fillText(sub,W/2,1600);ctx.restore()}
// E: clay / soft-3D — rounded shapes with strong highlight + shadow gradients
function clay(x,y,s,t,col,o={}){const b=Math.sin(t*3+(o.ph||0))*5;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,4,55,11,'rgba(0,0,0,0.3)');
 const sh=(cx,cy,r,c)=>{const g=ctx.createRadialGradient(cx-r*0.35,cy-r*0.4,r*0.1,cx,cy,r*1.1);g.addColorStop(0,shade(c,1.35));g.addColorStop(0.6,c);g.addColorStop(1,shade(c,0.55));return g};
 for(const k of[-1,1]){ctx.beginPath();rr(k*20-13,-60,26,60,13);ctx.fillStyle=sh(k*20,-30,30,'#3a4f7a');ctx.fill()}
 ctx.beginPath();ctx.ellipse(0,-120+b,58,70,0,0,7);ctx.fillStyle=sh(0,-120+b,70,col);ctx.fill();
 ctx.save();ctx.translate(52,-150+b);ctx.rotate(-0.4-Math.sin(t*4)*0.5);ctx.beginPath();rr(-12,0,24,62,12);ctx.fillStyle=sh(0,30,35,col);ctx.fill();ctx.restore();
 ctx.beginPath();ctx.arc(0,-235+b,62,0,7);ctx.fillStyle=sh(0,-235+b,62,'#f2c29b');ctx.fill();
 ctx.beginPath();ctx.arc(0,-262+b,58,Math.PI*1.05,Math.PI*1.95);ctx.fillStyle=sh(0,-280+b,50,'#5a3a22');ctx.fill();
 const bl=Math.sin(t*1.7)>0.97;for(const ex of[-20,22]){ell(ex,-232+b,11,bl?2:13,'#ffffff');if(!bl)ell(ex+2,-230+b,6,7,'#10243a')}
 ctx.beginPath();ctx.arc(2,-206+b,13,0.15,Math.PI-0.15);ctx.strokeStyle='#7a3a2a';ctx.lineWidth=5;ctx.lineCap='round';ctx.stroke();ctx.restore()}
// F: retro 60s line-art — thin black line, flat warm palette, big nose, sideways glance
function retro(x,y,s,t,col,o={}){const b=Math.abs(Math.sin(t*4))*-6;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=3.5;ctx.strokeStyle='#1a1410';ctx.lineJoin='round';ctx.lineCap='round';
 for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(k*14,-80+b);ctx.lineTo(k*14+Math.sin(t*8*k)*14,-6);ctx.lineTo(k*14+Math.sin(t*8*k)*14+k*26,-6);ctx.stroke()}
 ctx.beginPath();ctx.moveTo(-44,-80+b);ctx.lineTo(-30,-210+b);ctx.lineTo(32,-210+b);ctx.lineTo(48,-80+b);ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.moveTo(30,-195+b);ctx.quadraticCurveTo(90,-210+b,96,-260+b+Math.sin(t*5)*8);ctx.stroke();
 ctx.beginPath();ctx.ellipse(0,-262+b,50,58,0,0,7);ctx.fillStyle='#f3d2a8';ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.moveTo(-48,-280+b);ctx.quadraticCurveTo(-30,-340+b,30,-320+b);ctx.quadraticCurveTo(52,-300+b,48,-280+b);ctx.quadraticCurveTo(0,-300+b,-48,-280+b);ctx.fillStyle='#1a1410';ctx.fill();
 ctx.beginPath();ctx.ellipse(22,-250+b,16,11,0.3,0,7);ctx.fillStyle='#f0b48c';ctx.fill();ctx.stroke();
 const lk=Math.sin(t*1.2)*4;for(const ex of[-14,12]){ctx.beginPath();ctx.ellipse(ex,-272+b,8,11,0,0,7);ctx.fillStyle='#fff';ctx.fill();ctx.stroke();ell(ex+lk,-271+b,3.5,5,'#1a1410')}
 ctx.beginPath();ctx.moveTo(-10,-228+b);ctx.quadraticCurveTo(6,-220+b,20,-230+b);ctx.stroke();ctx.restore()}
// G: owl professor mascot — round owl, big glasses, tiny bow tie, flapping wing, head tilt
function owl(x,y,s,t,o={}){const tilt=Math.sin(t*1.3)*0.12,b=Math.sin(t*2.5)*5;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=5;ctx.strokeStyle=OL;ctx.lineJoin='round';
 ell(0,4,60,11,'rgba(0,0,0,0.3)');for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(k*18,-14);ctx.lineTo(k*18,0);ctx.strokeStyle='#ffb347';ctx.lineWidth=8;ctx.stroke()}ctx.strokeStyle=OL;ctx.lineWidth=5;
 ctx.beginPath();ctx.ellipse(0,-130+b,95,120,0,0,7);ctx.fillStyle='#8a5a3c';ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(0,-100+b,62,80,0,0,7);ctx.fillStyle='#e9c9a0';ctx.fill();
 for(let i=0;i<3;i++)for(let j=0;j<3;j++){ctx.beginPath();ctx.arc(-26+j*26,-120+i*28+b,9,0.2,Math.PI-0.2);ctx.strokeStyle='rgba(138,90,60,0.6)';ctx.lineWidth=3;ctx.stroke()}ctx.strokeStyle=OL;ctx.lineWidth=5;
 ctx.save();ctx.translate(-88,-150+b);ctx.rotate(0.3+Math.max(0,Math.sin(t*5))*-1.2);ctx.beginPath();ctx.ellipse(0,40,26,60,0,0,7);ctx.fillStyle='#6e4630';ctx.fill();ctx.stroke();ctx.restore();
 ctx.save();ctx.translate(0,-205+b);ctx.rotate(tilt);
 for(const k of[-1,1]){ctx.beginPath();ctx.moveTo(k*40,-70);ctx.lineTo(k*70,-110);ctx.lineTo(k*76,-60);ctx.closePath();ctx.fillStyle='#8a5a3c';ctx.fill();ctx.stroke()}
 const bl=Math.sin(t*1.7)>0.97;for(const k of[-1,1]){ctx.beginPath();ctx.arc(k*36,-30,32,0,7);ctx.fillStyle='#ffffff';ctx.fill();ctx.lineWidth=7;ctx.stroke();if(bl){ctx.beginPath();ctx.moveTo(k*36-14,-30);ctx.lineTo(k*36+14,-30);ctx.stroke()}else{ell(k*36+4,-28,13,13,OL);ell(k*36+8,-33,4,4,'#fff')}}
 ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-4,-30);ctx.lineTo(4,-30);ctx.stroke();ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(10,0);ctx.lineTo(0,20);ctx.closePath();ctx.fillStyle='#ffb347';ctx.fill();ctx.lineWidth=4;ctx.stroke();ctx.restore();
 ctx.beginPath();ctx.moveTo(0,-150+b);ctx.lineTo(-26,-164+b);ctx.lineTo(-26,-136+b);ctx.closePath();ctx.moveTo(0,-150+b);ctx.lineTo(26,-164+b);ctx.lineTo(26,-136+b);ctx.closePath();ctx.fillStyle='#ff5a7a';ctx.fill();ctx.lineWidth=4;ctx.stroke();ctx.restore()}
// H: silhouette + glow — dark silhouettes with a bright coloured rim and glowing eyes-free face (cinematic, minimal)
function glowman(x,y,s,t,col,o={}){const b=Math.abs(Math.sin(t*3.2))*-7,ph=t*3.2*Math.PI/1.6;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
 ctx.shadowColor=col;ctx.shadowBlur=30;ctx.fillStyle='#071423';ctx.strokeStyle=col;ctx.lineWidth=4;
 for(const k of[0,Math.PI]){const a=Math.sin(ph+k)*0.5;ctx.save();ctx.translate(0,-110+b);ctx.rotate(a);ctx.beginPath();rr(-12,0,24,108,12);ctx.fill();ctx.stroke();ctx.restore()}
 ctx.beginPath();rr(-38,-230+b,76,130,30);ctx.fill();ctx.stroke();ctx.save();ctx.translate(34,-215+b);ctx.rotate(-0.3+Math.sin(ph)*0.4);ctx.beginPath();rr(-11,0,22,90,11);ctx.fill();ctx.stroke();ctx.restore();
 ctx.beginPath();ctx.arc(0,-280+b,46,0,7);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.restore()}
const SCN=({
 e(lt,p,t){bg(t);clay(330,1250,1.9,t,'#ff8a3d');clay(760,1250,1.9,t+0.5,'#3fb6a8',{ph:1});tag('E','Soft clay / 3D look')},
 f(lt,p,t){bg(t);retro(330,1250,1.9,t,'#e8a33d');retro(760,1250,1.9,t+0.3,'#4f9dd9');tag('F','Retro 60s line cartoon')},
 g(lt,p,t){bg(t);owl(360,1250,1.6,t);smTick(800,1180,2.0,t,{wow:0.6});tag('G','Owl professor host + Tick')},
 h(lt,p,t){bg(t);glowman(330,1250,1.8,t,'#5fd4ff');glowman(760,1250,1.8,t+0.4,'#ffd57a');tag('H','Glowing silhouettes (cinematic)')}
});
const CAM={e:[1,1],f:[1,1],g:[1,1],h:[1,1]};
