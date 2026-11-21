// FearFiles: Stop 14 — standalone. Dawn bus stop, 7:40 AM. A man in a gray coat knows my name; ghost bus "NOT IN SERVICE · SINCE 1986"; he is me, 40 years older.
const ME={top:'#3f7a5a',topD:'#2f5e44',hair:'#2a1a12',skin:'#d9a882',pants:'#2a3142'};
const OLD={top:'#6a6e76',topD:'#55585f',hair:'#c9c9cf',skin:'#cfa080',pants:'#33363d'};
const nth=seg=>{const i=TL.segs.indexOf(seg);let n=0;for(let j=0;j<i;j++)if(TL.segs[j].scene===seg.scene)n++;return n};
function scar(x,y,s){ctx.save();ctx.strokeStyle='#8a2a2a';ctx.lineWidth=Math.max(2,3*s);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x+4*s,y-226*s);ctx.lineTo(x+16*s,y-216*s);ctx.stroke();ctx.restore()}
function me(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},ME,o));if(o.scar)scar(x,y,s*(o.dir||1)>0?s:s)}
function old(x,y,s,t,o={}){walker(x,y,s,t,Object.assign({},OLD,o));ctx.save();ctx.fillStyle=OLD.topD;const d=o.dir||1;ctx.translate(x,y);ctx.scale(s*d,s);rr(-40,-215,80,170,18);ctx.fill();ctx.restore();if(o.scar)scar(x,y,s)}
// dawn street with perspective, bus shelter, stop sign 14, lamp
function street(t,o={}){const g=ctx.createLinearGradient(0,0,0,1100);g.addColorStop(0,'#2a2f4a');g.addColorStop(0.6,'#8a6a7a');g.addColorStop(1,'#e8a07a');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,1300);
  glow(700,1000,500,'rgba(255,180,120,A)',0.25);
  // far skyline layers (parallax)
  const r=rnd(3);for(let L=0;L<2;L++){let x=-60+((t*(4+L*6))%60);ctx.fillStyle=L?'#2a2836':'#3a3646';while(x<W+60){const w=60+r()*90,h=(L?160:100)+r()*(L?260:160);ctx.fillRect(x,1050-h,w,h+50);x+=w+8}}
  // road
  ctx.fillStyle='#2c2c34';ctx.beginPath();ctx.moveTo(-100,1080);ctx.lineTo(W+100,1080);ctx.lineTo(W+100,1500);ctx.lineTo(-100,1500);ctx.fill();ctx.strokeStyle='rgba(255,220,120,0.5)';ctx.lineWidth=8;ctx.setLineDash([60,50]);ctx.beginPath();ctx.moveTo(-100,1290);ctx.lineTo(W+100,1290);ctx.stroke();ctx.setLineDash([]);
  // sidewalk
  ctx.fillStyle='#4a4650';ctx.fillRect(-100,1500,W+200,H);ctx.fillStyle='#5a5660';ctx.fillRect(-100,1500,W+200,22);
  // lamp
  ctx.fillStyle='#1a1a20';ctx.fillRect(90,700,16,820);ell(98,700,40,14,'#1a1a20');const on=Math.sin(t*13)>-0.9?1:0.3;ell(98,712,26,10,`rgba(255,220,160,${on})`);lightCone(98,712,0,820,260,'255,220,160',0.10*on);
  // shelter
  ctx.save();ctx.fillStyle='rgba(160,200,220,0.16)';ctx.fillRect(560,1120,460,400);ctx.strokeStyle='#22242a';ctx.lineWidth=12;ctx.strokeRect(560,1120,460,400);ctx.fillStyle='#22242a';ctx.fillRect(540,1100,500,30);
  ctx.fillStyle='#e8e2d0';rr(640,1180,150,220,6);ctx.fill();ctx.fillStyle='#3a5a8a';ctx.fillRect(655,1195,120,120);ctx.restore();
  if(o.refl){ctx.save();ctx.globalAlpha=0.35;old(900,1500,1.2,t,{speed:0,dir:-1});ctx.restore()}
  // stop sign
  ctx.fillStyle='#1a1a20';ctx.fillRect(470,880,12,640);ctx.fillStyle='#1f6fd0';rr(420,860,112,112,14);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 64px Inter';ctx.textAlign='center';ctx.fillText('14',476,940);
  fog(t,1000,1300,'255,210,190',0.05)}
function bus(x,t,o={}){ctx.save();ctx.translate(x,0);const y=1080;ctx.fillStyle=o.ghost?'#8a9a9a':'#c9b24a';rr(-480,y-330,960,360,30);ctx.fill();ctx.fillStyle='rgba(0,0,0,0.25)';ctx.fillRect(-480,y-60,960,40);
  for(let i=0;i<6;i++){const wx=-440+i*150;ctx.fillStyle='#1a2230';rr(wx,y-290,130,130,10);ctx.fill();if(o.full){ctx.save();ctx.beginPath();rr(wx,y-290,130,130,10);ctx.clip();ctx.fillStyle='#0a0f14';ell(wx+65,y-200,26,30,'#0a0f14');ctx.fillRect(wx+30,y-175,70,60);ctx.restore()}}
  ctx.fillStyle='#0a0a10';rr(-470,y-330,0,0,0);rr(320,y-330+20,120,40,8);ctx.fillStyle='#ff5a3a';ctx.fill();
  ctx.fillStyle='#111';ell(-300,y+30,70,70,'#111');ell(300,y+30,70,70,'#111');ell(-300,y+30,30,30,'#555');ell(300,y+30,30,30,'#555');
  glow(470,y-60,120,'rgba(255,240,200,A)',0.4);ctx.restore()}
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease((t-last-0.9)/0.5);ctx.fillStyle=`rgba(0,0,0,${0.8*a})`;ctx.fillRect(0,0,W,H);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
const SCN={
 hook(lt,p,t,d,seg){const k=nth(seg);street(t,{refl:k===0&&lt<0.5});old(780,1760,2.2,t,{speed:0,dir:-1,look:-0.4});me(300,1760,2.2,t,{speed:0,dir:1,look:0.3,scared:0.4});heartbeat(t,0.35);if(k)endCard(seg,t)},
 stop(lt,p,t,d,seg){const k=nth(seg);street(t);old(820,1620,1.6,t,{speed:0,dir:-1,look:-0.3,scar:k===1&&lt>0.6&&lt<1.0});me(k?320:moveAlong(clamp(p*1.3,0,1),-80,320),1620,1.6,t,{speed:k?0:(p<0.75?1.2:0),dir:1,look:k?0.4:0})},
 talk(lt,p,t,d,seg){const k=nth(seg);street(t);const grab=k===1?ease(clamp(p*2,0,1)):0;old(640-grab*60,1700,2.0,t,{speed:0,dir:-1,look:-0.2,reach:k===1?0.8*grab:0.15*Math.abs(Math.sin(t*2))});me(300,1700,2.0,t,{speed:0,dir:1,look:0.3,scared:k?0.7:0.4});if(k===2)ctx.fillStyle='rgba(0,0,0,0.25)',ctx.fillRect(0,0,W,H);heartbeat(t,0.3+0.1*k)},
 me(lt,p,t,d,seg){ctx.fillStyle='#1a1a26';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,600,'rgba(255,180,120,A)',0.15);me(540,2050,3.6,t,{speed:0,dir:1,look:0.5,scared:0.8});heartbeat(t,0.4)},
 bus(lt,p,t,d,seg){const k=nth(seg);street(t);const bx=k?moveAlong(p,560,1900):moveAlong(clamp(p*1.4,0,1),1700,560);bus(bx,t,{full:true,ghost:true});me(300,1700,2.0,t,{speed:0,dir:1,look:0.3,scared:0.6});if(k)old(560,1700,2.0,t,{speed:0,dir:-1,look:-0.3})},
 busIn(lt,p,t,d,seg){ctx.fillStyle='#0b0f14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,700,'rgba(160,200,200,A)',0.22);
   // inside: rows of seated silhouettes, none move; one head turns slowly at the end
   for(let r=0;r<3;r++)for(let c=0;c<4;c++){const s=0.9+r*0.35,x=140+c*270,y=820+r*260;ctx.fillStyle='#2e3842';rr(x-80*s,y-30*s,160*s,150*s,20*s);ctx.fill();ell(x,y-90*s,44*s,54*s,'#3a4652');
     if(r===2&&c===2&&p>0.6){ell(x+16*s,y-96*s,6*s,4*s,'rgba(255,240,220,0.9)')}}
   lightCone(540,300,0,1300,500,'200,220,210',0.06);heartbeat(t,0.35)},
 sign(lt,p,t,d,seg){street(t);bus(lerp(900,1500,ease(p)),t,{full:true,ghost:true});ctx.save();ctx.translate(540,620);ctx.scale(1+0.05*p,1+0.05*p);rr(-420,-110,840,220,18);ctx.fillStyle='#080808';ctx.fill();ctx.strokeStyle='#333';ctx.lineWidth=8;ctx.stroke();
   const fl=Math.sin(t*20)>-0.7?1:0.4;ctx.fillStyle=`rgba(255,150,40,${fl})`;ctx.font='800 64px "JetBrains Mono"';ctx.textAlign='center';ctx.fillText('NOT IN SERVICE',0,-10);ctx.fillText('SINCE 1986',0,70);ctx.restore();me(300,1700,2.0,t,{speed:0,dir:1,look:0.6,scared:0.9})},
 face(lt,p,t,d,seg){const k=nth(seg);ctx.fillStyle='#1a1622';ctx.fillRect(-100,-100,W+200,H+200);glow(540,700,700,'rgba(255,170,120,A)',0.15);
   if(k===0){old(560,2150,4.2,t,{speed:0,dir:-1,look:0});scar(560,2150,4.2)}
   else{const sp=ease(clamp(p*1.3,0,1));ctx.save();ctx.beginPath();ctx.rect(-100,-100,640,H+200);ctx.clip();me(300,2150,4.2,t,{speed:0,dir:1,look:0,scared:0.5});scar(300,2150,4.2);ctx.restore();
     ctx.save();ctx.beginPath();ctx.rect(540,-100,640,H+200);ctx.clip();old(800,2150,4.2,t,{speed:0,dir:-1,look:0});scar(800,2150,4.2);ctx.restore();ctx.fillStyle='rgba(255,60,60,0.8)';ctx.fillRect(536,0,8,H*sp)}
   heartbeat(t,0.45)}
};
const CAM={hook:[1.06,1.0],stop:[1,1.05],talk:[1,1.06],me:[1,1.08],bus:[1,1.04],busIn:[1,1.07],sign:[1,1.06],face:[1,1.1]};
