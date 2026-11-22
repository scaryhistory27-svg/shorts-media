// FearFiles #4: Room 0 — standalone. Clerk gives me a key to Room 0 (not on the floor plan); at 3 AM the hall fills with guests holding Room 0 keys; at dawn the clerk is gone — his name tag has my name. Loop: I hand YOU the key.
const ME={top:'#3a5f8a',topD:'#2c4868',hair:'#2a1a12',skin:'#d9a882',pants:'#2a3142'};
const CLERK={top:'#7a1e2a',topD:'#5e1620',hair:'#1a1410',skin:'#c99a74',pants:'#1a1a22'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function me(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},ME,o))}
function clerk(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},CLERK,o));nameTag(x+(o.dir||1)*-10*s,y-170*s,s,o.tag||'')}
function nameTag(x,y,s,txt){ctx.save();ctx.translate(x,y);ctx.scale(s,s);rr(-26,-10,52,20,4);ctx.fillStyle='#d8c27a';ctx.fill();if(txt){ctx.font='900 12px Inter';ctx.fillStyle='#2a1a10';ctx.textAlign='center';ctx.fillText(txt,0,5)}ctx.restore()}
function keyTag(x,y,s,t,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.strokeStyle='#c9a64a';ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,-150,26,0,7);ctx.stroke();
  ctx.fillStyle='#c9a64a';ctx.fillRect(-7,-124,14,120);ctx.fillRect(0,-40,30,10);ctx.fillRect(0,-20,22,10);
  rr(-70,10,140,190,30);ctx.fillStyle='#6a1a22';ctx.fill();ctx.strokeStyle='#c9a64a';ctx.lineWidth=6;ctx.stroke();ctx.font='900 120px Inter';ctx.fillStyle='#e8d08a';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('0',0,108);ctx.restore()}
function lobby(t,o={}){ctx.fillStyle='#1c1410';ctx.fillRect(-200,-200,W+400,H+400);
  // wallpaper stripes + sconces
  for(let x=-100;x<W+100;x+=70){ctx.fillStyle=(x/70)%2?'#2a1d16':'#241812';ctx.fillRect(x,0,70,1250)}
  for(const sx of[200,880]){const f=life.flicker(t+sx)*(o.dim?0.5:1);ell(sx,560,26,36,`rgba(255,200,120,${0.8*f})`);glow(sx,560,220,'rgba(255,190,110,A)',0.28*f)}
  // key rack with hooks
  ctx.fillStyle='#3a2a1c';rr(380,380,320,200,10);ctx.fill();for(let i=0;i<10;i++){const kx=410+(i%5)*60,ky=430+Math.floor(i/5)*80;ell(kx,ky,6,6,'#c9a64a');if(i!==4||o.allKeys)ctx.fillStyle='#c9a64a',ctx.fillRect(kx-3,ky,6,34)}
  ctx.fillStyle='#3a2418';ctx.fillRect(-200,1250,W+400,H);
  fog(t,900,1300,'255,200,150',0.04)}
function desk(t){ctx.fillStyle='#4a2c1a';rr(160,1180,760,320,12);ctx.fill();ctx.fillStyle='#5e3a22';ctx.fillRect(140,1160,800,40);ell(820,1150,30,14,'#c9a64a');ell(820,1130,10,20,'#c9a64a')}
function corridor(t,o={}){ctx.fillStyle='#120c0a';ctx.fillRect(-200,-200,W+400,H+400);const vx=540,vy=760;
  // perspective walls
  ctx.fillStyle='#2a1c14';ctx.beginPath();ctx.moveTo(-200,-200);ctx.lineTo(vx-80,vy-120);ctx.lineTo(vx-80,vy+120);ctx.lineTo(-200,H+200);ctx.fill();
  ctx.beginPath();ctx.moveTo(W+200,-200);ctx.lineTo(vx+80,vy-120);ctx.lineTo(vx+80,vy+120);ctx.lineTo(W+200,H+200);ctx.fill();
  ctx.fillStyle='#5a1a20';ctx.beginPath();ctx.moveTo(-200,H+200);ctx.lineTo(vx-80,vy+120);ctx.lineTo(vx+80,vy+120);ctx.lineTo(W+200,H+200);ctx.fill();
  ctx.strokeStyle='rgba(201,166,74,0.25)';ctx.lineWidth=3;for(let i=1;i<6;i++){const k=i/6;ctx.beginPath();ctx.moveTo(lerp(-200,vx-80,k),lerp(H+200,vy+120,k));ctx.lineTo(lerp(W+200,vx+80,k),lerp(H+200,vy+120,k));ctx.stroke()}
  // side doors
  for(let i=0;i<4;i++){const k=0.15+i*0.2,x0=lerp(-200,vx-80,k),y0=lerp(-200,vy-120,k)+lerp(500,60,k),h=lerp(900,120,k);ctx.fillStyle='#3a2418';ctx.fillRect(x0,y0,lerp(110,14,k),h);ctx.fillRect(W-x0-lerp(110,14,k),y0,lerp(110,14,k),h)}
  // end door 0
  ctx.fillStyle='#4a2c1a';ctx.fillRect(vx-60,vy-110,120,230);ctx.fillStyle='#c9a64a';ctx.font='900 40px Inter';ctx.textAlign='center';ctx.fillText('0',vx,vy-60);ell(vx+40,vy+10,5,5,'#c9a64a');
  for(let i=0;i<4;i++){const k=0.1+i*0.22,f=life.flicker(t*0.7+i);glow(vx,lerp(-100,vy-110,k),lerp(160,30,k),'rgba(255,200,120,A)',0.25*f)}
  fog(t,600,1500,'255,200,160',0.04)}
function guest(x,y,s,t,ph){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const sw=Math.sin(t*1.2+ph)*3;const c='#0e0a0c';ctx.fillStyle=c;rr(-60+sw,-330,120,330,40);ctx.fill();ell(sw,-380,46,54,c);
  ell(sw-15,-388,6,6,'rgba(255,240,220,0.85)');ell(sw+15,-388,6,6,'rgba(255,240,220,0.85)');ctx.fillStyle='#d8c27a';ctx.fillRect(sw-20,-300,40,10); // old-fashioned collar
  ctx.restore();keyTag(x+50*s,y-170*s,0.35*s,t,Math.sin(t*2+ph)*0.15)}
function hotelRoom(t,o={}){ctx.fillStyle='#1e1612';ctx.fillRect(-200,-200,W+400,H+400);for(let x=-100;x<W+100;x+=90){ctx.fillStyle=(x/90)%2?'#2e2018':'#281c14';ctx.fillRect(x,0,90,1250)}
  ctx.fillStyle='#3a2418';ctx.fillRect(-200,1250,W+400,H);const f=life.flicker(t*0.5)*(o.dark?0.35:1);glow(860,760,380,'rgba(255,190,110,A)',0.35*f);ctx.fillStyle='#c9a64a';ctx.fillRect(845,820,30,200);ell(860,800,70,50,`rgba(255,210,140,${0.9*f})`);
  // bed with dent
  ctx.fillStyle='#e8e0d0';rr(140,1120,620,240,18);ctx.fill();ctx.fillStyle='#7a1e2a';rr(140,1200,620,180,18);ctx.fill();ctx.fillStyle='#f2ece0';rr(170,1080,200,80,30);ctx.fill();ell(270,1130,70,18,'rgba(120,100,80,0.35)');
  if(!o.noSteam)for(let i=0;i<3;i++){const q=(t*0.5+i/3)%1;ctx.strokeStyle=`rgba(255,240,220,${0.25*(1-q)})`;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(300+i*30,1120-q*200);ctx.quadraticCurveTo(320+i*30,1080-q*200,300+i*30,1040-q*200);ctx.stroke()}}
function roomPhone(x,y,s,t,ring){ctx.save();ctx.translate(x+(ring?Math.sin(t*80)*5:0),y);ctx.scale(s,s);ctx.fillStyle='#e8d8b8';rr(-110,-40,220,100,20);ctx.fill();ctx.fillStyle='#d8c8a8';rr(-120,-90,240,56,28);ctx.fill();
  for(let i=0;i<9;i++)ell(-50+(i%3)*50,-10+Math.floor(i/3)*24,8,8,'#6a5a48');if(ring){ctx.strokeStyle='rgba(255,220,150,0.8)';ctx.lineWidth=5;for(let k=0;k<2;k++){ctx.beginPath();ctx.arc(0,-60,140+k*40+((t*200)%40),-2.6,-0.5);ctx.stroke()}}ctx.restore()}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
 hook(lt,p,t,d,seg){lobby(t,{dim:true});keyTag(540,lerp(1000,920,ease(p)),2.2,t,Math.sin(t*1.8)*0.12);heartbeat(t,0.3)},
 desk(lt,p,t,d,seg){lobby(t);clerk(540,1240,1.6,t,{speed:0,dir:1,look:0.2,reach:ease(clamp((p-0.5)*2,0,1))*0.8});desk(t);
   me(moveAlong(clamp(p*1.6,0,1),-60,300),1720,2.0,t,{speed:p<0.6?1.2:0,dir:1,look:0.2});
   // suitcase with tag (clue: ALEX)
   const sx=moveAlong(clamp(p*1.6,0,1),-60,300)+90;ctx.fillStyle='#4a3a2a';rr(sx,1560,110,150,12);ctx.fill();ctx.fillStyle='#e8d8b8';rr(sx+30,1540,60,26,4);ctx.fill();if(p>0.25&&p<0.45){ctx.font='900 16px Inter';ctx.fillStyle='#2a1a10';ctx.textAlign='center';ctx.fillText('ALEX',sx+60,1559)}},
 key(lt,p,t,d,seg){lobby(t,{dim:true});keyTag(540,900,2.6,t,Math.sin(t*2.4)*0.2*(1-p*0.5));glow(540,1100,300,'rgba(255,200,120,A)',0.2)},
 map(lt,p,t,d,seg){ctx.fillStyle='#2a1d16';ctx.fillRect(-200,-200,W+400,H+400);ctx.save();ctx.translate(540,820);ctx.rotate(-0.02);rr(-420,-380,840,700,16);ctx.fillStyle='#e8e2d0';ctx.fill();ctx.strokeStyle='#8a1a1a';ctx.lineWidth=10;ctx.stroke();
   ctx.font='900 40px Inter';ctx.fillStyle='#8a1a1a';ctx.textAlign='center';ctx.fillText('FIRE ESCAPE PLAN',0,-310);ctx.strokeStyle='#2a2a2a';ctx.lineWidth=4;ctx.strokeRect(-360,-260,720,500);ctx.fillStyle='#d0c8b0';ctx.fillRect(-360,-40,720,80);
   ctx.font='800 26px Inter';ctx.fillStyle='#2a2a2a';for(let i=0;i<20;i++){const c=i%10,r=Math.floor(i/10);const x=-330+c*70,y=r?120:-160;ctx.strokeRect(x,y-40,62,100);ctx.fillText(String(i+1),x+31,y+20)}
   ell(-350+ease(p)*690,0,12,12,'#e02020');ctx.restore();ctx.fillStyle='#d9a882';rr(lerp(140,840,ease(p)),900,60,180,30);ctx.fill()},
 hall(lt,p,t,d,seg){corridor(t);const q=clamp(p*1.2,0,1);const s=lerp(2.2,0.7,q),y=lerp(1800,1100,q);me(540,y,s,t,{speed:1.0,dir:1,look:0})},
 room(lt,p,t,d,seg){hotelRoom(t);me(moveAlong(clamp(p*1.4,0,1),1100,760),1700,2.0,t,{speed:p<0.7?1.1:0,dir:-1,look:-0.4,reach:p>0.7?0.6:0})},
 phone(lt,p,t,d,seg){const k=nth(seg);hotelRoom(t,{dark:true,noSteam:true});const ev=lastEv(t,['buzz']);const ring=k===0&&ev&&t-ev.t<2.5;ctx.fillStyle='#2a1a12';ctx.fillRect(700,1240,300,300);roomPhone(850,1200,1.0,t,ring);
   if(k===1){ctx.save();ctx.translate(480,900);ctx.fillStyle='rgba(0,0,0,0.6)';rr(-380,-70,760,140,24);ctx.fill();ctx.font='800 40px "JetBrains Mono"';ctx.fillStyle='#ffb070';ctx.textAlign='center';ctx.fillText('"…DON\'T OPEN THE DOOR."',0,14);ctx.restore()}
   me(420,1750,2.0,t,{speed:0,dir:1,look:0.3,scared:k?0.6:0.3,reach:k?0.8:0.4});heartbeat(t,0.3+0.15*k)},
 door(lt,p,t,d,seg){ctx.fillStyle='#120c0a';ctx.fillRect(-200,-200,W+400,H+400);const sh=shakeAt(t,['knock'],0.6,14)+(p>0.5?Math.sin(t*40)*6:0);door(540,900,sh);ctx.fillStyle='rgba(255,200,120,0.5)';ctx.fillRect(330,1318,420,6);
   // shadows of many feet under the door
   for(let i=0;i<6;i++){const v=clamp(p*2-i*0.15,0,1);ctx.fillStyle=`rgba(0,0,0,${0.85*v})`;ctx.fillRect(340+i*66,1316,40,10)}me(250,1780,1.9,t,{speed:0,dir:1,look:0.4,scared:0.8});heartbeat(t,0.5)},
 peek(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#000';ctx.fillRect(-200,-200,W+400,H+400);ctx.save();ctx.beginPath();ctx.arc(540,820,430,0,7);ctx.clip();ctx.translate(540,820);ctx.scale(0.62,0.62);ctx.translate(-540,-820);corridor(t);
   const n=k?9:6;for(let i=0;i<n;i++){const row=i%3,col=Math.floor(i/3);const x=300+col*240+(row%2)*80,y=1150+row*260;guest(x,y,0.9+row*0.35,t,i)}
   if(k){const z=jerky(clamp(p*1.3,0,1),5,3);guest(540,1450+z*200,1.5+z*1.2,t,99)}ctx.restore();
   const v=ctx.createRadialGradient(540,820,250,540,820,440);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.9)');ctx.fillStyle=v;ctx.beginPath();ctx.arc(540,820,440,0,7);ctx.fill();heartbeat(t,0.5)},
 lobby(lt,p,t,d,seg){lobby(t,{dim:true,allKeys:true});desk(t);me(moveAlong(clamp(p*1.5,0,1),-60,340),1720,2.0,t,{speed:p<0.66?2.0:0,dir:1,look:0.3,scared:0.4});const dw=lerp(0.2,1,p);glow(540,300,600,'rgba(255,220,180,A)',0.1*dw)},
 tag(lt,p,t,d,seg){lobby(t,{dim:true,allKeys:true});ctx.save();ctx.translate(540,980);const z=1+0.2*ease(p);ctx.scale(z,z);ctx.fillStyle='#5e3a22';rr(-420,-80,840,300,14);ctx.fill();ctx.save();ctx.rotate(-0.06);rr(-190,-60,380,150,12);ctx.fillStyle='#d8c27a';ctx.fill();ctx.strokeStyle='#8a6f2c';ctx.lineWidth=6;ctx.stroke();ctx.font='900 64px Inter';ctx.fillStyle='#2a1a10';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p>0.35?'ALEX':'',0,42);ctx.font='700 22px Inter';ctx.fillText('NIGHT CLERK',0,-32);ctx.restore();ctx.restore();
   ctx.fillStyle='#d9a882';rr(lerp(900,700,ease(p)),1150,160,60,30);ctx.fill();heartbeat(t,0.45)},
 clerk(lt,p,t,d,seg){const k=nth(seg);lobby(t);desk(t);me(540,1240,1.6,t,{speed:0,dir:1,look:0,top:CLERK.top,topD:CLERK.topD,reach:0.9*ease(clamp(p*2,0,1))});nameTag(530,1240-170*1.6,1.6,'ALEX');
   keyTag(540,lerp(1600,1520,ease(p)),1.05,t,Math.sin(t*1.6)*0.1);heartbeat(t,0.25);endCard(seg,t)}
};
const CAM={hook:[1.06,1.0],desk:[1,1.04],key:[1,1.08],map:[1,1.05],hall:[1,1.08],room:[1,1.05],phone:[1,1.06],door:[1,1.08],peek:[1,1.06],lobby:[1,1.04],tag:[1,1.1],clerk:[1.04,1.0]};
