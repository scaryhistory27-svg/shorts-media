// FearFiles #10: Black Friday — 3 AM store, everything free, mannequins turn, doors lock, the new mannequin in the window is you.
const HERO={top:'#3b5a86',topD:'#2c4568'};const MQ={top:'#d8d2c8',topD:'#b8b2a8',pants:'#cfc9bf',skin:'#e4ded4',hair:'#e4ded4',shoe:'#bdb7ad'};
const endCard=(seg,t)=>{const last=seg.words[seg.words.length-1].s;if(TL.segs.indexOf(seg)===TL.segs.length-1&&t>last+0.9){const a=ease(clamp((t-last-0.9)/0.5,0,1));ctx.fillStyle=`rgba(0,0,0,${0.93*a})`;ctx.fillRect(-100,-100,W+200,H+200);ctx.globalAlpha=a;ctx.textAlign='center';ctx.font='900 104px Inter';ctx.fillStyle=C.red;ctx.shadowColor=C.red;ctx.shadowBlur=40;ctx.fillText(TL.endTitle,540,900);ctx.shadowBlur=0;ctx.font='700 40px Inter';ctx.fillStyle='#fff';ctx.fillText(TL.endSub,540,990);ctx.globalAlpha=1}};
function mannequin(x,y,s,t,o={}){ // faceless store dummy; look -1..1 head turn
  ctx.save();if(o.gray)ctx.globalAlpha=0.95;walker(x,y,s,t,Object.assign({speed:0,freeze:0},MQ,o.wear||{},{look:o.look||0}));ctx.restore();
  if(o.face){const hy=y+(-262)*s;ell(x+(o.look||0)*8*s+6*s,hy-4*s,16*s,18*s,'rgba(0,0,0,0)')}}
function nightLot(t){const g=ctx.createLinearGradient(0,0,0,1300);g.addColorStop(0,'#05070d');g.addColorStop(1,'#141a26');ctx.fillStyle=g;ctx.fillRect(-100,-100,W+200,H+200);stars(t,0.4);
  ctx.fillStyle='#0d1016';ctx.fillRect(-100,1250,W+200,H);ctx.strokeStyle='rgba(240,220,120,0.35)';ctx.lineWidth=6;for(let i=-3;i<6;i++){ctx.beginPath();ctx.moveTo(200*i+100,1300);ctx.lineTo(200*i-60,1900);ctx.stroke()}}
function storeFront(t,o={}){nightLot(t);const fl=life.flicker(t*0.7);
  ctx.fillStyle='#1b2130';ctx.fillRect(40,300,1000,960);if(!o.noBanner){ctx.fillStyle='#b3121a';rr(140,330,800,110,12);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 64px Inter';ctx.textAlign='center';ctx.fillText('BLACK FRIDAY',540,407);
  ctx.fillStyle='#ffd23a';ctx.font='900 40px Inter';ctx.fillText('DOORS OPEN 3 AM',540,490);}
  // window display (left) with mannequin wearing a blue hoodie (clue)
  ctx.fillStyle=`rgba(255,240,210,${0.55*fl})`;ctx.fillRect(80,540,300,560);glow(230,800,300,'rgba(255,230,180,A)',0.25*fl);mannequin(230,1080,1.0,t,{wear:{top:HERO.top,topD:HERO.topD},look:o.windowLook||0});
  ctx.strokeStyle='#3a4458';ctx.lineWidth=10;ctx.strokeRect(80,540,300,560);
  // sliding glass doors (centre-right)
  const op=o.open||0;ctx.fillStyle='rgba(255,250,230,0.85)';ctx.fillRect(460,600,480,520);
  for(const [x0,dir] of[[460,-1],[700,1]]){const x=x0+dir*op*230;ctx.fillStyle='rgba(120,160,200,0.35)';ctx.fillRect(x,600,240,520);ctx.strokeStyle='#8aa0b8';ctx.lineWidth=6;ctx.strokeRect(x,600,240,520)}
  ctx.strokeStyle='#3a4458';ctx.lineWidth=12;ctx.strokeRect(460,600,480,520);if(op>0)lightCone(700,1120,Math.PI/2,700,500*op+1,'255,245,220',0.12*op);fog(t,1000,H,'200,210,230',0.05)}
function aisle(t,o={}){ctx.fillStyle='#e9ece6';ctx.fillRect(-100,-100,W+200,H+200);const vp=[540,700];
  ctx.fillStyle='#cfd3cc';ctx.beginPath();ctx.moveTo(-100,1500);ctx.lineTo(vp[0]-60,vp[1]+40);ctx.lineTo(vp[0]+60,vp[1]+40);ctx.lineTo(W+100,1500);ctx.lineTo(W+100,H+100);ctx.lineTo(-100,H+100);ctx.fill();
  for(const side of[-1,1]){for(let k=0;k<6;k++){const z=k/6,x0=vp[0]+side*(80+z*z*900),y0=vp[1]-120-z*z*500,h=200+z*z*900,w=40+z*z*200;ctx.fillStyle=k%2?'#8a3a3a':'#a84a3a';ctx.fillRect(x0-(side<0?w:0),y0,w,h);
      for(let r=0;r<4;r++){ctx.fillStyle=['#e0b040','#4a8ac0','#60b070','#d06a8a'][(k+r)%4];ctx.fillRect(x0-(side<0?w:0)+6,y0+r*h/4+10,w-12,h/4-24)}
      if(o.tags&&k>2){ctx.fillStyle='#fff';rr(x0-(side<0?w:0)+w*0.2,y0+h*0.9,w*0.6,h*0.08,6);ctx.fill();ctx.fillStyle='#b3121a';ctx.font=`900 ${Math.max(10,h*0.05)}px Inter`;ctx.textAlign='center';ctx.fillText('$0.00',x0-(side<0?w:0)+w*0.5,y0+h*0.965)}}}
  for(let i=0;i<4;i++){const f=life.flicker(t+i*1.3);ctx.fillStyle=`rgba(255,255,240,${0.9*f})`;rr(540-120+i*0,180+i*120,240-i*50,14,6);ctx.fill()}
  {ctx.fillStyle=`rgba(5,8,14,${o.dark||0.5})`;ctx.fillRect(-100,-100,W+200,H+200)}}
const SCN={
  hook:(lt,p,t,d,seg)=>{storeFront(t,{open:0});walker(820,1240,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1});heartbeat(t,0.2);endCard(seg,t)},
  ad:(lt,p,t)=>{ctx.fillStyle='#0a0d14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,600,'rgba(255,60,60,A)',0.18);
    phone(540,820,1.6,Math.sin(t*1.5)*0.04,()=>{const w=344,h=724;ctx.translate(-172,-362);ctx.fillStyle='#111';ctx.fillRect(0,0,w,h);ctx.fillStyle='#b3121a';ctx.fillRect(0,40,w,140);ctx.fillStyle='#fff';ctx.font='900 34px Inter';ctx.textAlign='center';ctx.fillText('BLACK FRIDAY',w/2,100);ctx.font='800 22px Inter';ctx.fillText('DOORS OPEN 3:00 AM',w/2,150);
      ctx.fillStyle='#ffd23a';ctx.font='900 40px Inter';ctx.fillText('100% OFF',w/2,260);ctx.fillStyle='#ddd';ctx.font='700 18px Inter';ctx.fillText('first customer only',w/2,300);ctx.fillStyle='#777';ctx.font='600 13px Inter';ctx.fillText('all sales are final',w/2,h-30)})},
  line:(lt,p,t)=>{storeFront(t,{open:0});walker(moveAlong(p,1150,800),1240,1.05,t,{speed:p<0.85?1.2:0,top:HERO.top,topD:HERO.topD,dir:-1,look:p>0.85?-1:0});clock('2:59',820,1550,60,'#ff3a3a',t)},
  open:(lt,p,t)=>{storeFront(t,{open:ease(clamp(lt/1.4,0,1))});walker(800,1240,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:0.4})},
  shelves:(lt,p,t)=>{aisle(t,{tags:true});walker(540,lerp(1300,1220,p),1.0,t,{speed:0.9,top:HERO.top,topD:HERO.topD,look:Math.sin(t*1.2)})},
  pa:(lt,p,t)=>{aisle(t,{dark:0.35});ctx.fillStyle='#333';rr(470,300,140,90,20);ctx.fill();for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(255,80,80,${0.6-0.15*i})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(540,400,60+i*40+((t*60)%40),0.2*Math.PI,0.8*Math.PI);ctx.stroke()}
    walker(540,1260,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,look:0,scared:1});heartbeat(t,0.4)},
  mannequins:(lt,p,t)=>{aisle(t,{dark:0.45});const turn=jerky(clamp(lt/0.9,0,1),4,3);for(const i of[0,1,3,4]){const x=150+i*195,y=1150+(i%2)*60;glow(x,y-200,160,'rgba(230,240,255,A)',0.12);mannequin(x,y,0.95,t,{look:turn>0.5?(x<540?1:-1):(i%2?0.8:-0.8)})}
    walker(540,1260,1.05,t,{speed:0,top:HERO.top,topD:HERO.topD,look:0,scared:1})},
  locked:(lt,p,t)=>{storeFront(t,{open:0});const sh=shakeAt(t,['knockglass'],0.4,14);walker(700+sh,1240,1.15,t,{speed:0,top:HERO.top,topD:HERO.topD,reach:1,scared:1,look:1});
    ctx.fillStyle='rgba(255,40,40,0.85)';rr(610,640,180,60,10);ctx.fill();ctx.fillStyle='#fff';ctx.font='900 34px Inter';ctx.textAlign='center';ctx.fillText('LOCKED',700,682)},
  window:(lt,p,t,d,seg)=>{const k=seg.words[0].w==='The';ctx.save();ctx.translate(230,800);ctx.scale(2.2,2.2);ctx.translate(-230,-800);storeFront(t,{windowLook:k?1:0,noBanner:true});ctx.restore();
    if(k){ctx.save();ctx.translate(230,800);ctx.scale(2.2,2.2);ctx.translate(-230,-800);walker(230,1080,1.0,t,{speed:0,freeze:0,top:HERO.top,topD:HERO.topD,look:1});ctx.restore()}
    walker(900,1700,1.0,t,{speed:0,top:HERO.top,topD:HERO.topD,look:-1,scared:k?1:0.5})},
  tag:(lt,p,t)=>{ctx.fillStyle='#0b0d14';ctx.fillRect(-100,-100,W+200,H+200);glow(540,800,500,'rgba(255,40,40,A)',0.2);const sw=Math.sin(t*2)*0.12;
    ctx.save();ctx.translate(540,520);ctx.rotate(sw);ctx.strokeStyle='#ddd';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,160);ctx.stroke();ctx.fillStyle='#f3efe4';rr(-210,160,420,520,24);ctx.fill();ell(0,210,18,18,'#0b0d14');
    ctx.fillStyle='#111';ctx.font='900 48px Inter';ctx.textAlign='center';ctx.fillText('LAST ONE',0,330);ctx.fillStyle='#b3121a';ctx.font='900 78px Inter';ctx.fillText('FINAL',0,460);ctx.fillText('SALE',0,550);ctx.fillStyle='#555';ctx.font='700 28px Inter';ctx.fillText('NO RETURNS',0,630);ctx.restore()},
};
const CAM={hook:[1.08,1.0],ad:[1.0,1.08],line:[1.0,1.05],open:[1.0,1.08],shelves:[1.0,1.08],pa:[1.0,1.1],mannequins:[1.12,1.0],locked:[1.0,1.06],window:[1.0,1.06],tag:[1.0,1.1]};
