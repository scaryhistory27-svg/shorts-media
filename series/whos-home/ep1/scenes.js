// Who's Home — Part 1 (DAY 1 · 5:12 PM): rented house at dusk, smart speaker that counts two people.
const HER={top:'#6b4a8a',topD:'#53386e',hair:'#2a1a12',skin:'#e0b08c',pants:'#2a3142'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function her(x,y,s,t,o={}){ctx.save();ctx.fillStyle=HER.hair;const dir=o.dir||1;const bob=(o.speed||0)>0?-Math.abs(Math.sin(t*(o.speed||0)*Math.PI*2))*7*s:Math.sin(t*2.2)*2.5*s;
  rr(x-34*s*dir-(dir<0?-0:0),y-292*s+bob,56*s,120*s,22*s);ctx.fill();ctx.restore();
  walker(x,y,s,t,Object.assign({top:HER.top,topD:HER.topD,hair:HER.hair,skin:HER.skin,pants:HER.pants},o))}
// living room with perspective: back wall, window at dusk, floor boards, couch, wall photo (clue: Margaret looks at camera; later at the attic)
function room(t,o={}){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#1a1622');g.addColorStop(1,'#2a2230');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1400);
  // back wall + window
  ctx.fillStyle='#2e2735';ctx.fillRect(160,300,760,760);const wg=ctx.createLinearGradient(0,380,0,760);wg.addColorStop(0,'#2b2346');wg.addColorStop(0.6,'#a8506a');wg.addColorStop(1,'#f0a060');
  ctx.fillStyle=wg;ctx.fillRect(560,380,280,380);ctx.strokeStyle='#120e16';ctx.lineWidth=14;ctx.strokeRect(560,380,280,380);ctx.beginPath();ctx.moveTo(700,380);ctx.lineTo(700,760);ctx.moveTo(560,570);ctx.lineTo(840,570);ctx.stroke();
  // trees outside sway
  ctx.fillStyle='#160f1a';for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(600+i*100+Math.sin(t*0.8+i)*6,740-i*20,60,110,0,0,7);ctx.fill()}
  lightCone(700,400,0.25,900,260,'255,170,120',0.10);
  // photo on the wall
  ctx.save();ctx.translate(330,520);ctx.rotate(-0.03+(o.photoTilt||0));rr(-95,-120,190,240,6);ctx.fillStyle='#4a3a28';ctx.fill();rr(-80,-105,160,210,3);ctx.fillStyle='#8a7a64';ctx.fill();
  ctx.save();rr(-80,-105,160,210,3);ctx.clip();mom(o.look?14:0,-30,0.42,{smile:o.look?0:0.35,creepy:o.look?0.6:0,blink:0});ctx.restore();ctx.restore();
  // side walls + floor perspective
  ctx.fillStyle='#231d29';ctx.beginPath();ctx.moveTo(-100,-100);ctx.lineTo(160,300);ctx.lineTo(160,1060);ctx.lineTo(-100,1500);ctx.fill();ctx.beginPath();ctx.moveTo(W+100,-100);ctx.lineTo(920,300);ctx.lineTo(920,1060);ctx.lineTo(W+100,1500);ctx.fill();
  ctx.fillStyle='#3a2a22';ctx.beginPath();ctx.moveTo(160,1060);ctx.lineTo(920,1060);ctx.lineTo(W+400,H+100);ctx.lineTo(-400,H+100);ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.25)';ctx.lineWidth=3;for(let i=-6;i<=6;i++){ctx.beginPath();ctx.moveTo(540+i*60,1060);ctx.lineTo(540+i*330,H+100);ctx.stroke()}
  // couch
  ctx.fillStyle='#3d3550';rr(200,930,420,140,24);ctx.fill();rr(180,880,460,90,30);ctx.fill();
  fog(t,800,1150,'200,170,200',0.05)}
// smart speaker: fabric cylinder + light ring. o.ring: 'blue'|'red'; o.two: two arcs (clue); o.talk: pulse
function speaker(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const col=o.ring==='red'?'255,60,60':'95,190,255';const pulse=o.talk?0.6+0.4*Math.abs(Math.sin(t*9)):0.5;
  glow(0,-200,320,`rgba(${col},A)`,0.35*pulse);ell(0,10,120,20,'rgba(0,0,0,0.5)');
  const g=ctx.createLinearGradient(-110,0,110,0);g.addColorStop(0,'#1a1b20');g.addColorStop(0.5,'#3a3c44');g.addColorStop(1,'#141519');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-110,-200);ctx.lineTo(-110,0);ctx.ellipse(0,0,110,22,0,Math.PI,0,true);ctx.lineTo(110,-200);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=2;for(let i=-100;i<=100;i+=10){ctx.beginPath();ctx.moveTo(i,-195);ctx.lineTo(i,10);ctx.stroke()}
  ell(0,-200,110,22,'#25262c');ctx.lineWidth=10;ctx.lineCap='round';
  if(o.two){for(const a0 of[0.3,3.4]){ctx.strokeStyle=`rgba(${col},0.95)`;ctx.beginPath();ctx.ellipse(0,-200,96,17,0,a0,a0+1.4);ctx.stroke()}}
  else{const sp=o.talk?t*5:0;ctx.strokeStyle=`rgba(${col},${0.5+0.5*pulse})`;ctx.beginPath();ctx.ellipse(0,-200,96,17,0,sp,sp+Math.PI*2);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,0.8)';ctx.beginPath();ctx.ellipse(0,-200,96,17,0,sp,sp+0.6);ctx.stroke()}
  ctx.restore()}
function table(x,y){ctx.fillStyle='#4a3424';rr(x-170,y,340,30,8);ctx.fill();ctx.fillRect(x-150,y+30,20,170);ctx.fillRect(x+130,y+30,20,170)}
function attic(t,open){ctx.fillStyle='#241e2a';ctx.fillRect(-100,-100,W+200,H+200);
  // ceiling in steep perspective (looking up)
  ctx.fillStyle='#3a3340';ctx.beginPath();ctx.moveTo(-100,-100);ctx.lineTo(W+100,-100);ctx.lineTo(W+100,900);ctx.lineTo(-100,900);ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.25)';ctx.lineWidth=4;for(let i=0;i<10;i++){ctx.beginPath();ctx.moveTo(-100,i*110);ctx.lineTo(W+100,i*110-40);ctx.stroke()}
  // hatch
  ctx.save();ctx.translate(540,520);ctx.fillStyle='#050406';rr(-230,-150,460,300,6);ctx.fill();if(open>0.05){glow(0,0,260,'rgba(255,220,160,A)',0.12*open);const ey=Math.sin(t*0.7)>0.9?0.2:1;ell(-40,-20,10,8*ey,'rgba(255,240,200,0.9)');ell(40,-20,10,8*ey,'rgba(255,240,200,0.9)')}
  ctx.save();ctx.translate(0,-150);ctx.scale(1,1-open*1.4);ctx.fillStyle='#5a4c42';rr(-230,0,460,300,6);ctx.fill();ctx.strokeStyle='#3a2e26';ctx.lineWidth=6;ctx.strokeRect(-200,30,400,240);ctx.restore();
  ctx.strokeStyle='#8a7a6a';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(150,150-open*300);ctx.lineTo(150+Math.sin(t*3)*6,260);ctx.stroke();ell(150+Math.sin(t*3)*6,268,10,10,'#c9b080');ctx.restore();
  lightCone(540,370,0,900,380,'255,220,160',0.08*open)}
function hallway(t,lit){ctx.fillStyle='#120e16';ctx.fillRect(-100,-100,W+200,H+200);const vx=540,vy=640;
  ctx.fillStyle='#2a2330';ctx.beginPath();ctx.moveTo(-100,-100);ctx.lineTo(vx-120,vy-160);ctx.lineTo(vx-120,vy+200);ctx.lineTo(-100,1600);ctx.fill();ctx.beginPath();ctx.moveTo(W+100,-100);ctx.lineTo(vx+120,vy-160);ctx.lineTo(vx+120,vy+200);ctx.lineTo(W+100,1600);ctx.fill();
  ctx.fillStyle='#3a2a22';ctx.beginPath();ctx.moveTo(vx-120,vy+200);ctx.lineTo(vx+120,vy+200);ctx.lineTo(W+500,H+100);ctx.lineTo(-500,H+100);ctx.fill();ctx.fillStyle='#08060a';ctx.fillRect(vx-120,vy-160,240,360);
  for(let i=0;i<4;i++){const k=(i+1)/5,y=vy-160-(1-k)*700,on=lit>i;const fl=on&&Math.sin(t*23+i*5)>-0.85?1:0.2;const r=30+(1-k)*60;ell(vx,y,r,r*0.35,on?`rgba(255,240,200,${fl})`:'#2a2a30');if(on){glow(vx,y,r*5,'rgba(255,230,180,A)',0.35*fl);lightCone(vx,y,0,600*(1-k)+200,240*(1-k)+60,'255,230,180',0.12*fl)}}}
const SCN={
 speakerHook(lt,p,t,d,seg){room(t);table(540,1080);const clue=lt<0.55;speaker(540,1080,1.5,t,{two:clue,talk:!clue});her(860,1300,1.15,t,{dir:-1,look:0.2,scared:0.3});heartbeat(t,0.3)},
 moveIn(lt,p,t,d,seg){room(t);table(760,1080);speaker(760,1080,0.8,t,{});const x=moveAlong(clamp(p*1.2,0,1),-80,420);her(x,1300,1.2,t,{speed:p<0.85?1.3:0,dir:1});ctx.save();ctx.translate(x+40,1080+Math.sin(t*8)*4);ctx.fillStyle='#b98a5a';rr(-70,-60,140,110,6);ctx.fill();ctx.strokeStyle='#8a6a3a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-70,-20);ctx.lineTo(70,-20);ctx.stroke();ctx.restore()},
 askRoom(lt,p,t,d,seg){const k=nth(seg);room(t,{look:k>0});table(700,1080);speaker(700,1080,0.95,t,{talk:k===0&&p>0.7});her(330,1300,1.25,t,{dir:1,look:k?-0.3:0.3,scared:k?0.5:0,reach:k?0:0.3*Math.abs(Math.sin(t*2))});if(k)heartbeat(t,0.35)},
 speakerClose(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#0d0a10';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,700,'rgba(95,190,255,A)',0.08);table(540,1150);speaker(540,1150,2.4,t,{talk:true,ring:k===2?'red':'blue'});
   ctx.save();ctx.globalAlpha=0.5+0.5*Math.sin(t*3);ctx.font='800 50px "JetBrains Mono"';ctx.textAlign='center';ctx.fillStyle=k===2?'#ff6b6b':'#8fd0ff';ctx.fillText(k===0?'OCCUPANCY: 2':k===1?'VOICES: 2':'LOCATION: ATTIC',540,470);ctx.restore();heartbeat(t,0.3+0.1*k)},
 hallway(lt,p,t,d,seg){const k=nth(seg);hallway(t,k?4:ease(p*1.4)*4.5);her(k?moveAlong(p,560,600):520,1420,1.6,t,{dir:-1,look:-0.6,scared:k?0.9:0.6});if(k){const e=lastEv(t,['heart']);ctx.fillStyle='rgba(0,0,0,'+(0.25*Math.abs(Math.sin(t*14)))+')';ctx.fillRect(0,0,W,H)}heartbeat(t,0.4)},
 photo(lt,p,t,d,seg){ctx.fillStyle='#1a1622';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,600,'rgba(255,170,120,A)',0.1);ctx.save();ctx.translate(540,720);ctx.rotate(-0.03);ctx.scale(1+0.06*p,1+0.06*p);rr(-300,-380,600,760,10);ctx.fillStyle='#4a3a28';ctx.fill();rr(-260,-340,520,680,4);ctx.fillStyle='#8a7a64';ctx.fill();
   ctx.save();rr(-260,-340,520,680,4);ctx.clip();mom(0,-90,1.35,{smile:0.35,blink:Math.sin(t*1.7)>0.97?1:0});ctx.restore();ctx.restore();lightCone(200,200,-0.5,1100,300,'255,200,150',0.1)},
 photoBack(lt,p,t,d,seg){ctx.fillStyle='#1a1622';ctx.fillRect(-100,-100,W+200,H+200);const f=ease(clamp(p*2,0,1));ctx.save();ctx.translate(540,720);ctx.scale(Math.cos(f*Math.PI)||0.01,1);
   if(f<0.5){rr(-300,-380,600,760,10);ctx.fillStyle='#4a3a28';ctx.fill();rr(-260,-340,520,680,4);ctx.fillStyle='#8a7a64';ctx.fill()}else{ctx.scale(-1,1);rr(-300,-380,600,760,10);ctx.fillStyle='#d9ccb0';ctx.fill();ctx.fillStyle='#3a2a1a';ctx.font='italic 700 92px Georgia';ctx.textAlign='center';ctx.fillText('Margaret',0,-40);ctx.font='italic 700 60px Georgia';ctx.fillText("'94",0,60)}ctx.restore();
   for(const sx of[-1,1]){ell(540+sx*310,900,46,60,'#e0b08c')}heartbeat(t,0.35)},
 phoneCall(lt,p,t,d,seg){room(t,{look:true});ctx.fillStyle='rgba(0,0,0,0.45)';ctx.fillRect(-100,-100,W+200,H+200);phone(540,760,0.95,-0.05+Math.sin(t*1.5)*0.02,()=>{ctx.fillStyle='#0d1a2a';ctx.fillRect(-200,-400,400,800);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='800 44px Inter';ctx.fillText('LANDLORD',0,-160);ctx.font='600 30px Inter';ctx.fillStyle='#9fb3c8';ctx.fillText('00:'+String(Math.floor(lt)+3).padStart(2,'0'),0,-110);
   for(let i=0;i<14;i++){const h=10+Math.abs(Math.sin(t*10+i))*60;ctx.fillStyle='#5fbfff';ctx.fillRect(-140+i*20,40-h/2,12,h)}ell(0,260,60,60,'#e33');});heartbeat(t,0.35)},
 attic(lt,p,t,d,seg){const k=nth(seg);const op=k?1:jerky(clamp(p*1.3,0,1),8,3);attic(t,op);her(780,1500,1.5,t,{dir:-1,look:-1,scared:0.9});if(k){speaker(200,1500,0.7,t,{talk:true,ring:'red'})}heartbeat(t,0.45);
   const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 110px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}}
};
const CAM={speakerHook:[1.08,1.0],moveIn:[1,1.04],askRoom:[1,1.06],speakerClose:[1,1.08],hallway:[1,1.07],photo:[1,1.05],photoBack:[1,1.05],phoneCall:[1,1.05],attic:[1,1.08]};
