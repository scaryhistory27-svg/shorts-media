// FearFiles #6: Mirror — landlord's one rule: keep the hall mirror covered. Behind my reflection: my future room; the old man wears the landlord's ring; my call rings inside the mirror.
const ME={top:'#3f6a8a',topD:'#2f5068',hair:'#2a1a12',skin:'#d9a882',pants:'#2a3142'};
const OLD={top:'#6a6e76',topD:'#55585f',hair:'#c9c9cf',skin:'#cfa080',pants:'#33363d'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function me(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},ME,o))}
function old(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},OLD,o))}
function hall(t){ctx.fillStyle='#1c1a1e';ctx.fillRect(-200,-200,W+400,H+400);for(let x=-100;x<W+100;x+=80){ctx.fillStyle=(x/80)%2?'#262228':'#221e24';ctx.fillRect(x,0,80,1300)}ctx.fillStyle='#2e2420';ctx.fillRect(-200,1300,W+400,H);
  const f=life.flicker(t*0.6);glow(540,250,500,'rgba(255,210,150,A)',0.18*f);lightCone(540,180,0,1200,500,'255,220,170',0.06*f)}
function frame(x,y,w,h){ctx.fillStyle='#4a3420';rr(x-w/2-30,y-h/2-30,w+60,h+60,14);ctx.fill();ctx.strokeStyle='#8a6a3a';ctx.lineWidth=6;ctx.strokeRect(x-w/2-14,y-h/2-14,w+28,h+28)}
function future(t,x,y,w,h){ // the room inside the mirror: gray walls, wheelchair, photos
  ctx.fillStyle='#4a4e56';ctx.fillRect(x-w/2,y-h/2,w,h);ctx.fillStyle='#3a3d44';ctx.fillRect(x-w/2,y+h*0.25,w,h*0.25);
  for(let i=0;i<3;i++){ctx.fillStyle='#2a2420';rr(x-w/2+40+i*130,y-h/2+60,100,120,6);ctx.fill();ctx.fillStyle='#8a8e96';ell(x-w/2+90+i*130,y-h/2+110,22,26,'#cfa080');ell(x-w/2+90+i*130,y-h/2+92,24,12,'#c9c9cf')}
  ctx.strokeStyle='#1a1a1e';ctx.lineWidth=10;ctx.beginPath();ctx.arc(x+w/2-120,y+h/2-70,60,0,7);ctx.stroke();ctx.beginPath();ctx.moveTo(x+w/2-170,y+h/2-180);ctx.lineTo(x+w/2-170,y+h/2-70);ctx.lineTo(x+w/2-60,y+h/2-70);ctx.stroke()}
function mirror(t,o={}){const x=540,y=720,w=560,h=900;frame(x,y,w,h);ctx.save();rr(x-w/2,y-h/2,w,h,6);ctx.clip();
  if(o.future)future(t,x,y,w,h);else{ctx.fillStyle='#2a2e36';ctx.fillRect(x-w/2,y-h/2,w,h)}
  if(o.oldMan)old(x+(o.oldX||0),y+h/2+40,1.6,t,{speed:0,dir:-1,look:-0.2,reach:o.wave?0.6+0.3*Math.sin(t*5):0});
  if(o.refl)me(x+80,y+h/2+40,1.6,t,{speed:0,dir:1,look:0,scared:o.scared||0});
  if(o.phone){const r=Math.sin(t*40)*3;ctx.fillStyle='#0e0f12';rr(x-120+r,y+120,60,110,10);ctx.fill();glow(x-90,y+175,80,'rgba(120,200,255,A)',0.6)}
  const g=ctx.createLinearGradient(x-w/2,y-h/2,x+w/2,y+h/2);g.addColorStop(0,'rgba(255,255,255,0.10)');g.addColorStop(0.5,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,0.06)');ctx.fillStyle=g;ctx.fillRect(x-w/2,y-h/2,w,h);ctx.restore();
  if(o.sheet!=null){const s=o.sheet;ctx.fillStyle='#d8d2c8';ctx.beginPath();ctx.moveTo(x-w/2-40,y-h/2-40+s*h);ctx.quadraticCurveTo(x,y-h/2-10+s*h+Math.sin(t*3)*10,x+w/2+40,y-h/2-40+s*h);ctx.lineTo(x+w/2+50,y+h/2+60+s*60);ctx.lineTo(x-w/2-50,y+h/2+60+s*60);ctx.fill();if(s<0.05)glow(x,y-h/2,400,'rgba(200,220,255,A)',0.12+0.06*Math.sin(t*2))}}
function ringHand(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=o.old?'#cfa080':'#c99a74';rr(-200,-50,260,100,50);ctx.fill();for(let i=0;i<4;i++){rr(40,-50+i*26,90-i*10,24,12);ctx.fill()}ctx.fillStyle='#b8862a';rr(30,-12,22,30,6);ctx.fill();ell(41,-14,14,12,'#c0182a');glow(41,-14,40,'rgba(255,40,60,A)',0.4);ctx.restore()}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
 hook(lt,p,t,d,seg){const k=nth(seg);hall(t);mirror(t,k?{future:true,oldMan:true,wave:true,sheet:null}:{future:true,oldMan:true,sheet:0.32+0.04*Math.sin(t*2)});if(!k)me(840,1900,1.8,t,{speed:0,dir:-1,look:-0.4,reach:0.3*ease(p)});heartbeat(t,0.3);if(k)endCard(seg,t)},
 lease(lt,p,t,d,seg){hall(t);ctx.fillStyle='#3a2a1c';ctx.fillRect(100,1250,880,40);ringHand(lerp(-100,420,ease(clamp(p*2,0,1))),1180,1.4,t);ctx.fillStyle='#c9a64a';ctx.fillRect(lerp(80,600,ease(clamp(p*2,0,1))),1190,60,14);me(820,1900,1.8,t,{speed:0,dir:-1,look:-0.3,reach:0.5*ease(p)});mirror(t,{sheet:0});},
 sheet(lt,p,t,d,seg){hall(t);mirror(t,{sheet:jerky(clamp((p-0.2)*1.4,0,1),5,3),refl:true});me(860,1900,1.8,t,{speed:0,dir:-1,look:-0.4,scared:0.4})},
 reflect(lt,p,t,d,seg){const k=nth(seg);hall(t);mirror(t,{future:true,refl:true,scared:0.3+0.2*k});me(860,1900,1.8,t,{speed:0,dir:-1,look:-0.4,scared:0.5});heartbeat(t,0.3)},
 photos(lt,p,t,d,seg){ctx.fillStyle='#2a2e36';ctx.fillRect(-200,-200,W+400,H+400);for(let i=0;i<3;i++){ctx.save();ctx.translate(200+i*340,780+Math.sin(t+i)*6);ctx.rotate(-0.08+i*0.08);ctx.fillStyle='#2a2420';rr(-140,-180,280,360,10);ctx.fill();ctx.fillStyle='#4a4e56';ctx.fillRect(-120,-160,240,300);ell(0,-20,70,84,'#cfa080');ell(0,-80,74,36,'#c9c9cf');ell(-24,-30,8,6,'#222');ell(24,-30,8,6,'#222');ctx.strokeStyle='#8a2a2a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(10,40);ctx.lineTo(30,52);ctx.stroke();ctx.restore()}glow(540,780,600,'rgba(200,210,230,A)',0.08);heartbeat(t,0.3)},
 wave(lt,p,t,d,seg){hall(t);mirror(t,{future:true,oldMan:true,wave:true,oldX:-60});me(860,1900,1.8,t,{speed:0,dir:-1,look:-0.4,scared:0.7});heartbeat(t,0.45)},
 ring(lt,p,t,d,seg){ctx.fillStyle='#14121a';ctx.fillRect(-200,-200,W+400,H+400);ringHand(lerp(560,500,ease(p)),820,3.0,t,{old:true});glow(660,780,300,'rgba(255,40,60,A)',0.12)},
 call(lt,p,t,d,seg){const k=nth(seg);hall(t);mirror(t,{future:true,oldMan:k>0,phone:true});phone(860,1250,0.35,0.1,()=>{ctx.fillStyle='#0b1626';ctx.fillRect(-200,-400,400,800);ctx.font='800 60px Inter';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText('LANDLORD',0,-60);ctx.fillText('calling…',0,40)});me(720,1900,1.7,t,{speed:0,dir:-1,look:-0.3,reach:0.7,scared:0.6});heartbeat(t,0.45)},
 final(lt,p,t,d,seg){hall(t);mirror(t,{future:true,oldMan:true,oldX:lerp(-60,40,ease(p))});const back=ease(p);me(lerp(800,950,back),1900,1.8,t,{speed:back<1?0.6:0,dir:-1,look:-0.4,scared:0.9});heartbeat(t,0.55)}
};
const CAM={hook:[1.06,1.0],lease:[1,1.04],sheet:[1,1.06],reflect:[1,1.06],photos:[1,1.08],wave:[1,1.06],ring:[1,1.1],call:[1,1.05],final:[1,1.08]};
