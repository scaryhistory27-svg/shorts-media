// FearFiles #3: Trail Cam — standalone. Night-vision trail-cam photos: deer, then a tall figure getting closer; camera stolen; last photo = my bedroom from the closet, dated tomorrow.
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
const SCN={
 // phone in my hand showing the night-5 photo: figure right in front of the lens
 hook(lt,p,t,d,seg){const k=nth(seg);nightBg(t);const sh=Math.sin(t*9)*3*(0.5+p);
   phone(540+sh,780,1.05,-0.05+Math.sin(t*1.1)*0.02,()=>{ctx.save();ctx.translate(-540,-770);ctx.scale(1,1);nvWoods(t);figure(540,1400+30*ease(p),1.3+0.12*p,t);ctx.restore();ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(-172,300,344,60);ctx.font='700 30px "JetBrains Mono"';ctx.fillStyle='#d8ffd8';ctx.textAlign='center';ctx.fillText(k?'NIGHT 6 · 3:12 AM':'NIGHT 5 · 3:12 AM',0,342)});
   heartbeat(t,0.4);if(k)endCard(seg,t)},
 cam(lt,p,t,d,seg){yard(t);trailCam(795,1000,1.0,{ir:false});const r=ease(clamp(p*2,0,1));me(moveAlong(clamp(p*1.6,0,1),150,610),1640,2.0,t,{speed:p<0.6?1.3:0,dir:1,look:-0.3,reach:p>0.6?0.9:0});
   // chewed plants clue
   ell(170,1560,18,8,'#6a4a2e');ell(290,1620,18,8,'#6a4a2e')},
 photo(lt,p,t,d,seg){const k=nth(seg);nightBg(t);const slide=ease(clamp(lt/0.35,0,1));ctx.save();ctx.translate((1-slide)*700,0);
   const lab=['NIGHT 1 · 3:12 AM','NIGHT 3 · 3:12 AM','NIGHT 5 · 3:12 AM'][k];
   nvPhoto(t,()=>{nvWoods(t);if(k===0){deer(560,1150,1.3,t);if(p>0.3&&p<0.45){ell(880,560,16,20,'rgba(220,255,220,0.35)')} /* hidden face behind the tree */}
     else if(k===1){figure(830,1080,0.55,t)}else{const q=jerky(clamp(p*1.4,0,1),6,4);figure(lerp(760,560,q),lerp(1120,1300,q),lerp(0.85,1.35,q),t)}},lab,{red:k>0});ctx.restore();
   if(k>0)heartbeat(t,0.3+0.1*k)},
 me(lt,p,t,d,seg){ctx.fillStyle='#10141e';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,600,'rgba(120,255,140,A)',0.10);me(540,2050,3.6,t,{speed:0,dir:1,look:0.2+0.3*Math.sin(t*0.9),scared:0.7});
   // NV photos fanned in the foreground
   for(let i=0;i<3;i++){ctx.save();ctx.translate(250+i*290,1500+Math.sin(t+i)*6);ctx.rotate(-0.15+i*0.15);ctx.fillStyle='#0b2a12';rr(-120,-90,240,180,8);ctx.fill();ctx.strokeStyle='#d8ffd8';ctx.lineWidth=3;ctx.stroke();ctx.font='700 26px "JetBrains Mono"';ctx.fillStyle='#ff5050';ctx.textAlign='center';ctx.fillText('3:12 AM',0,70);figure(0,40,0.12+i*0.04,t);ctx.restore()}heartbeat(t,0.35)},
 walk(lt,p,t,d,seg){yard(t,{dawn:true,fog:true});const x=moveAlong(p,40,600);me(x,1640,2.0,t,{speed:1.2,dir:1,look:0.2});lightCone(x+60,1300,-1.5,700,200,'255,240,200',0.16);heartbeat(t,0.25)},
 tree(lt,p,t,d,seg){const z=1.5;ctx.save();ctx.translate(795,1000);ctx.scale(z,z);ctx.translate(-795,-1000);yard(t,{dawn:true,fog:true});
   // cut strap swaying where the camera was
   ctx.strokeStyle='#c8b890';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(735,960);ctx.lineTo(855,960);ctx.stroke();const sw=Math.sin(t*2.2)*0.25;ctx.save();ctx.translate(855,960);ctx.rotate(sw);ctx.fillStyle='#c8b890';ctx.fillRect(-6,0,12,120);ctx.fillStyle='#fff';ctx.fillRect(-8,118,16,6);ctx.restore();
   ell(795,1000,70,60,'rgba(0,0,0,0)');ctx.restore();
   me(280,1760,2.2,t,{speed:0,dir:1,look:0.4,scared:0.5,reach:0.6*ease(clamp(p*2,0,1))})},
 phone(lt,p,t,d,seg){bedroom(t);bed(560,1520,1.1,t);const ev=lastEv(t,['buzz']);const bz=ev&&t-ev.t<1.2?Math.sin(t*90)*6:0;
   // nightstand + phone glowing
   ctx.fillStyle='#1e1a26';ctx.fillRect(820,1360,220,300);phone(930+bz,1330,0.22,0.2,()=>{ctx.fillStyle='#0b2a12';ctx.fillRect(-200,-400,400,800);ctx.fillStyle='#d8ffd8';ctx.font='700 70px Inter';ctx.textAlign='center';ctx.fillText('CAM 07',0,-40);ctx.fillText('1 NEW',0,60)});
   glow(930,1330,160,'rgba(120,255,140,A)',ev?0.35:0.1);
   // my hand reaching from the bed
   const r=ease(clamp((p-0.4)*2,0,1));ctx.fillStyle='#d9a882';rr(lerp(600,800,r),1390,130,44,22);ctx.fill()},
 photoIn(lt,p,t,d,seg){const k=nth(seg);nightBg(t);const slide=ease(clamp(lt/0.35,0,1));const z=k?1+0.05*ease(p):1;ctx.save();ctx.translate(540,770);ctx.scale(z,z);ctx.translate(-540,-770);ctx.translate(k?0:(1-slide)*700,0);
   nvPhoto(t,()=>{ctx.fillStyle='#0b2a12';ctx.fillRect(0,0,W,H);ctx.fillStyle='#103a1a';ctx.fillRect(0,1050,W,400);
     // window + me asleep in bed (NV green)
     ctx.fillStyle='#2a7a3a';rr(620,420,260,320,8);ctx.fill();bed(600,1060,1.0,t,{skin:'#b8f0b8'});
     ctx.fillStyle='rgba(120,255,140,0.18)';ctx.fillRect(0,0,W,H);
     // closet slats in the foreground (photo taken from INSIDE the closet)
     ctx.fillStyle='#020804';ctx.fillRect(60,250,150,1040);ctx.fillRect(900,250,120,1040);for(let y=270;y<1290;y+=46){ctx.fillRect(200,y,30,18);ctx.fillRect(880,y,30,18)}},
     k?'TOMORROW · 3:12 AM':'??? · 3:12 AM',{red:true});ctx.restore();heartbeat(t,0.45)},
 clock(lt,p,t,d,seg){bedroom(t,{open:0});bed(560,1600,1.1,t);clock('3:11',540,700,120,'#ff3030',t);glow(540,700,300,'rgba(255,40,40,A)',0.18);
   // my eyes open wide on the pillow (close)
   heartbeat(t,0.4)},
 closet(lt,p,t,d,seg){const op=jerky(clamp((p-0.15)*1.6,0,1),5,9)*0.35;bedroom(t,{open:op,eyes:clamp((p-0.45)*2.5,0,1)});bed(620,1600,1.1,t);
   ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(0,0,W,H);heartbeat(t,0.5)}
};
const CAM={hook:[1.06,1.0],cam:[1,1.05],photo:[1,1.04],me:[1,1.08],walk:[1,1.04],tree:[1,1.06],phone:[1,1.06],photoIn:[1,1.03],clock:[1,1.1],closet:[1,1.12]};
