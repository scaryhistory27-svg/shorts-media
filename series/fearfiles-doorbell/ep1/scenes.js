// FearFiles #5: Doorbell — the smart doorbell chimes from under my bed; chime history shows 3:04 AM every night for 11 months (I moved in 10 months ago). Helpers from Trail Cam.
const ME={top:'#4a5a6a',topD:'#36424e',hair:'#2a1a12',skin:'#d9a882',pants:'#2a3142'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function me(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},ME,o))}
// tall thin figure (night-vision silhouette with eyeshine)
function figure(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const sw=Math.sin(t*1.3)*3;const col=o.col||'#06140a';
  ctx.fillStyle=col;ctx.strokeStyle=col;ctx.lineCap='round';ctx.lineWidth=22;
  ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(-14+sw,-260);ctx.moveTo(18,0);ctx.lineTo(14+sw,-260);ctx.stroke();
  rr(-42+sw,-560,84,320,30);ctx.fill();ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(-36+sw,-530);ctx.lineTo(-70+sw,-300);ctx.lineTo(-74+sw,-200);ctx.moveTo(36+sw,-530);ctx.lineTo(70+sw,-300);ctx.lineTo(76+sw,-190);ctx.stroke();
  ell(sw,-620,40,54,col);const blink=Math.sin(t*1.7)>0.97?0.1:1;
  glow(-14+sw,-628,30,'rgba(230,255,230,A)',0.5);glow(14+sw,-628,30,'rgba(230,255,230,A)',0.5);ell(-14+sw,-628,7,7*blink,'#f4fff4');ell(14+sw,-628,7,7*blink,'#f4fff4');ctx.restore()}
function deer(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const c='#0a2410';ctx.fillStyle=c;ctx.strokeStyle=c;ctx.lineWidth=12;ctx.lineCap='round';
  ell(0,-150,110,50,c);const k=Math.sin(t*2)*6;for(const lx of[-80,-55,60,85]){ctx.beginPath();ctx.moveTo(lx,-130);ctx.lineTo(lx+(lx>0?k:-k)*0.3,0);ctx.stroke()}
  ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(-90,-170);ctx.lineTo(-140,-250+k);ctx.stroke();ell(-160,-262+k,34,22,c);
  ell(-172,-268+k,6,6,'#eaffea');glow(-172,-268+k,20,'rgba(230,255,230,A)',0.5);ctx.restore()}
// night-vision woods backdrop (inside a photo frame)
function nvWoods(t,o={}){ctx.fillStyle='#0b2a12';ctx.fillRect(-200,-200,W+400,H+400);const g=ctx.createRadialGradient(540,720,60,540,720,700);g.addColorStop(0,'rgba(140,255,140,0.35)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const r=rnd(11);for(let i=0;i<9;i++){const x=r()*W,w=30+r()*50,d=r();ctx.fillStyle=`rgba(4,${20+d*30},8,${0.6+d*0.4})`;ctx.fillRect(x,180,w,1000)}
  ctx.fillStyle='#14401c';ctx.fillRect(0,1000,W,300);ctx.fillStyle='#071c0c';ctx.fillRect(130,200,70,900);ctx.fillRect(860,200,90,900)}
function nvPhoto(t,draw,label,o={}){ // full NV photo card with noise + timestamp, slight handheld drift
  ctx.save();ctx.translate(Math.sin(t*0.8)*4,Math.cos(t*0.7)*3);ctx.save();rr(60,250,960,1040,18);ctx.clip();draw();
  const r=rnd(Math.floor(t*12));for(let i=0;i<260;i++){ctx.fillStyle=`rgba(200,255,200,${r()*0.08})`;ctx.fillRect(60+r()*960,250+r()*1040,3,3)}
  for(let y=250;y<1290;y+=6){ctx.fillStyle='rgba(0,0,0,0.12)';ctx.fillRect(60,y,960,2)}
  const v=ctx.createRadialGradient(540,770,200,540,770,720);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.7)');ctx.fillStyle=v;ctx.fillRect(60,250,960,1040);
  ctx.fillStyle='rgba(0,0,0,0.55)';ctx.fillRect(60,1236,960,54);ctx.font='700 34px "JetBrains Mono"';ctx.fillStyle=o.red?'#ff5050':'#d8ffd8';ctx.textAlign='left';ctx.fillText(label,84,1274);
  ctx.textAlign='right';ctx.fillText('CAM 07  IR ●',996,1274);ctx.restore();ctx.strokeStyle='#d8ffd8';ctx.lineWidth=4;rr(60,250,960,1040,18);ctx.stroke();ctx.restore()}
function nightBg(t){ctx.fillStyle='#070a10';ctx.fillRect(-200,-200,W+400,H+400);glow(540,760,700,'rgba(60,120,80,A)',0.12)}
function yard(t,o={}){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,o.dawn?'#3a3a5a':'#7fa7c8');g.addColorStop(1,o.dawn?'#c88a6a':'#cfe0d0');ctx.fillStyle=g;ctx.fillRect(-200,-200,W+400,1500);
  const r=rnd(5);for(let L=0;L<2;L++){let x=-80+((t*(3+L*5))%80);while(x<W+80){const w=50+r()*70,h=300+r()*400;ctx.fillStyle=L?(o.dawn?'#1e2a26':'#3f6a4a'):(o.dawn?'#2a3832':'#5a8a62');ctx.beginPath();ctx.moveTo(x,1250);ctx.lineTo(x+w/2,1250-h-L*120);ctx.lineTo(x+w,1250);ctx.fill();x+=w+10}}
  ctx.fillStyle=o.dawn?'#2e3a2a':'#5f8a4a';ctx.fillRect(-200,1250,W+400,H);
  // garden rows
  for(let i=0;i<4;i++){ctx.fillStyle=o.dawn?'#3a2e22':'#6a4a2e';rr(80,1560+i*60,420,30,12);ctx.fill();for(let j=0;j<7;j++)ell(110+j*60,1560+i*60,14+life.sway(t+j,2),10,o.dawn?'#3d5a32':'#6fae4a')}
  // the tree
  ctx.fillStyle=o.dawn?'#2a1e16':'#5a3e2a';ctx.fillRect(740,600,110,1000);ell(795,560,260,220,o.dawn?'#1e3024':'#3f7a45');
  if(o.fog)fog(t,1100,1500,'230,210,200',0.06)}
function trailCam(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#3a4a2e';rr(-60,-80,120,160,14);ctx.fill();ctx.fillStyle='#1a2014';ell(0,-25,26,26,'#0a0c08');ell(0,-25,12,12,'#1d3a5a');
  ctx.fillStyle='#0a0c08';rr(-34,24,68,30,6);ctx.fill();if(o.ir){ell(-38,-60,6,6,'#ff3030');glow(-38,-60,18,'rgba(255,40,40,A)',0.6)}ctx.restore()}
function bedroom(t,o={}){ctx.fillStyle='#0c0f18';ctx.fillRect(-200,-200,W+400,H+400);ctx.fillStyle='#121726';ctx.fillRect(-200,1300,W+400,H);
  // window with moon light
  ctx.fillStyle='#1c2a44';rr(620,420,300,380,8);ctx.fill();ctx.strokeStyle='#080a10';ctx.lineWidth=14;ctx.strokeRect(620,420,300,380);ctx.beginPath();ctx.moveTo(770,420);ctx.lineTo(770,800);ctx.stroke();lightCone(770,800,-0.5,900,360,'160,190,255',0.07);
  // closet (left)
  ctx.fillStyle='#1a1410';ctx.fillRect(40,420,380,880);const op=o.open||0;ctx.fillStyle='#000';ctx.fillRect(228,430,10+op*90,860);
  if(o.eyes){const a=o.eyes;glow(236+op*40,760,40,'rgba(230,255,230,A)',0.45*a);ell(228+op*40,760,6,6*(Math.sin(t*1.7)>0.97?0.1:1),`rgba(240,255,240,${a})`);ell(250+op*40,760,6,6*(Math.sin(t*1.7)>0.97?0.1:1),`rgba(240,255,240,${a})`)}
  ctx.fillStyle='#2a201a';ctx.fillRect(50,430,178,860);ctx.fillRect(238+op*90,430,172,860);ell(212,870,8,8,'#8a7a4a');ell(254+op*90,870,8,8,'#8a7a4a')}
function bed(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#2a2238';rr(-330,-120,660,240,20);ctx.fill();ctx.fillStyle='#3a304e';rr(-320,-150,640,120,40);ctx.fill();
  ctx.fillStyle='#d8d2c8';rr(-300,-190,180,90,30);ctx.fill();const br=Math.sin(t*1.6)*4;ell(-210,-165,48,44,o.skin||'#d9a882');ell(-215,-200,54,30,'#2a1a12');
  ctx.fillStyle='#4a5a8a';rr(-170,-170+br*0.3,470,90,40);ctx.fill();ctx.restore()}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
function timer(x,y,txt,col){ctx.save();ctx.font='800 64px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';const w=ctx.measureText(txt).width+60;rr(x-w/2,y-55,w,110,24);ctx.fillStyle='rgba(0,0,0,0.75)';ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle=col;ctx.fillText(txt,x,y+3);ctx.restore()}
function ringDev(x,y,s,t,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#1a1d24';rr(-40,-90,80,180,30);ctx.fill();ctx.fillStyle='#0a0c10';ell(0,-40,22,22,'#0a0c10');const p=on?0.6+0.4*Math.sin(t*8):0.25;ctx.strokeStyle=`rgba(80,170,255,${p})`;ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,40,26,0,7);ctx.stroke();if(on)glow(0,40,120,'rgba(80,170,255,A)',0.5*p);ctx.restore()}
function underBed(t,on){ctx.fillStyle='#05060a';ctx.fillRect(220,1480,700,60);ringDev(560,1505,0.6,t,on);if(on)glow(560,1505,260,'rgba(80,170,255,A)',0.35*(0.6+0.4*Math.sin(t*8)))}
function scr(drawFn){return()=>{ctx.fillStyle='#0b0f16';ctx.fillRect(-200,-400,400,800);drawFn()}}
function notif(y,t1,t2,a=1){ctx.save();ctx.globalAlpha=a;rr(-160,y,320,110,20);ctx.fillStyle='#e8ecf2';ctx.fill();ctx.fillStyle='#2a8cff';rr(-145,y+18,40,40,10);ctx.fill();ctx.font='800 22px Inter';ctx.fillStyle='#111';ctx.textAlign='left';ctx.fillText(t1,-95,y+42);ctx.font='600 20px Inter';ctx.fillStyle='#444';ctx.fillText(t2,-145,y+88);ctx.restore()}
const SCN={
 hook(lt,p,t,d,seg){const k=nth(seg);bedroom(t);bed(560,1520,1.1,t);underBed(t,true);const ev=Math.sin(t*6)>0;glow(560,1505,300,'rgba(80,170,255,A)',0.15+0.1*ev);heartbeat(t,0.35);if(k)endCard(seg,t)},
 notif(lt,p,t,d,seg){nightBg(t);const bz=lt<1.2?Math.sin(t*90)*5:0;phone(540+bz,820,1.05,-0.04,scr(()=>{ctx.font='700 64px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('3:04',0,-250);notif(-160,'DOORBELL','Person detected',ease(clamp(lt/0.4,0,1)))}));glow(540,820,500,'rgba(80,170,255,A)',0.1)},
 porch(lt,p,t,d,seg){nightBg(t);phone(540,820,1.05,-0.03,scr(()=>{ctx.save();ctx.beginPath();ctx.arc(0,-30,230,0,7);ctx.clip();ctx.fillStyle='#1a2030';ctx.fillRect(-250,-280,500,500);ctx.fillStyle='#2a2f3a';ctx.fillRect(-250,60,500,200);glow(0,-200,200,'rgba(255,220,150,A)',0.4*life.flicker(t));ctx.fillStyle='#3a2a1c';ctx.fillRect(-60,-160,120,220);ctx.restore();ctx.font='700 22px "JetBrains Mono"';ctx.fillStyle='#ff5050';ctx.textAlign='center';ctx.fillText('● LIVE · FRONT DOOR · 3:04',0,250);ctx.fillStyle='#9aa';ctx.fillText('No one there',0,290)}))},
 me(lt,p,t,d,seg){const k=nth(seg);bedroom(t);if(k===0)glow(560,1700,260,'rgba(80,170,255,A)',0.25*(0.6+0.4*Math.sin(t*8)));me(560,1720,2.2,t,{speed:0,dir:k?-1:1,look:k?-0.6:0.5*Math.sin(t*1.5),scared:0.6+0.2*k});heartbeat(t,0.4)},
 under(lt,p,t,d,seg){ctx.fillStyle='#05060a';ctx.fillRect(-200,-200,W+400,H+400);const z=1+0.25*ease(p);ctx.save();ctx.translate(540,1100);ctx.scale(z,z);ctx.fillStyle='#120e14';ctx.fillRect(-700,-500,1400,260);ctx.fillStyle='#0a080c';ctx.fillRect(-700,-240,1400,400);ringDev(0,0,1.2,t,true);ctx.restore();glow(540,1100,500,'rgba(80,170,255,A)',0.25);lightCone(540,300,0,900,300,'255,240,200',0.06)},
 history(lt,p,t,d,seg){const k=nth(seg);nightBg(t);phone(540,820,1.05,0.02,scr(()=>{ctx.font='800 30px Inter';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText('Chime history',-150,-300);const off=(k?ease(p)*900:ease(p)*300);const months=['NOV','OCT','SEP','AUG','JUL','JUN','MAY','APR','MAR','FEB','JAN','DEC'];
   for(let i=0;i<40;i++){const y=-240+i*60-off;if(y<-260||y>330)continue;ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(-160,y,320,50);ctx.font='700 22px "JetBrains Mono"';ctx.fillStyle='#ff5050';ctx.fillText('● 3:04 AM',-145,y+33);ctx.fillStyle='#9aa';ctx.fillText(months[Math.floor(i/3.4)%12]+' '+(28-(i*7)%27),40,y+33)}}));
   if(k)timer(540,1500,'11 MONTHS','#ff5050')},
 boxes(lt,p,t,d,seg){bedroom(t,{});for(let i=0;i<4;i++){ctx.fillStyle=['#8a6a44','#7a5a38','#9a7a50','#6a4a2e'][i];rr(620+(i%2)*150,1300-Math.floor(i/2)*150,140,140,6);ctx.fill();ctx.strokeStyle='#5a4028';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(620+(i%2)*150,1370-Math.floor(i/2)*150);ctx.lineTo(760+(i%2)*150,1370-Math.floor(i/2)*150);ctx.stroke()}
   me(330,1720,2.0,t,{speed:0,dir:1,look:0.4,scared:0.5});timer(540,520,'10 MONTHS AGO','#ffd57a')},
 whisper(lt,p,t,d,seg){nightBg(t);phone(540,820,1.05,0,scr(()=>{ctx.font='800 28px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('Voice message · 3:04 AM',0,-260);for(let i=0;i<28;i++){const h=10+Math.abs(Math.sin(t*9+i*0.7))*70*(i/28<p?1:0.2);ctx.fillStyle=i/28<p?'#2a8cff':'#445';ctx.fillRect(-150+i*11,-h/2,7,h)}ell(0,180,50,50,'#2a8cff');ctx.fillStyle='#fff';ctx.fillRect(-14,160,10,40);ctx.fillRect(6,160,10,40)}));heartbeat(t,0.4)},
 behind(lt,p,t,d,seg){bedroom(t);bed(560,1600,1.1,t);const q=jerky(clamp(p*1.4,0,1),6,7);figure(lerp(820,700,q),lerp(1700,1580,q),lerp(0.8,1.15,q),t,{col:'#030305'});glow(lerp(820,700,q),1000,200,'rgba(150,170,255,A)',0.15);me(380,1900,2.3,t,{speed:0,dir:1,look:-0.2,scared:0.9});heartbeat(t,0.55);endCard(seg,t)}
};
const CAM={hook:[1.06,1.0],notif:[1,1.05],porch:[1,1.06],me:[1,1.08],under:[1,1.04],history:[1,1.03],boxes:[1,1.05],whisper:[1,1.06],behind:[1,1.1]};
