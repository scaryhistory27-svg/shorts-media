// Sample of the chosen Strange Minute style A+D: Max on Earth, astronaut in orbit, Tick mascot
function ground(t){sky('#123a63','#2a6a9c');stars(t,0.6);ctx.fillStyle='#0b2238';ctx.beginPath();ctx.moveTo(0,1180);ctx.quadraticCurveTo(540,1120,W,1180);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill()}
function planet(x,y,r,t){glow(x,y,r*1.8,'rgba(95,212,255,A)',0.25);ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();ctx.fillStyle='#1c6fb0';ctx.fillRect(x-r,y-r,2*r,2*r);
 const o=(t*20)%(r*2);for(const k of[0,1])for(const [cx,cy,rx,ry] of[[-0.4,-0.2,0.3,0.2],[0.3,0.3,0.35,0.22],[0.9,-0.1,0.3,0.25]])ell(x+cx*r+o-k*r*2,y+cy*r,rx*r,ry*r,'#3e9a5a');ctx.restore();
 ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.strokeStyle='#10243a';ctx.lineWidth=6;ctx.stroke()}
const SCN=({
 earth(lt,p,t,d,seg){ground(t);moon(860,330,70);
  smGuy(moveAlong(Math.min(1,p*1.6),-120,380),1180,1.7,t,{speed:p<0.62?1.6:0,look:p>0.62?-1:0,point:p>0.7?ease((p-0.7)*4):0,wow:p>0.8?1:0});
  smTick(800,1150,1.5,t,{wow:p>0.8?0.8:0.2});
  if(p>0.7){ctx.save();ctx.globalAlpha=ease((p-0.7)*4);ctx.font='800 46px Inter';ctx.textAlign='center';ctx.fillStyle='#ffd57a';ctx.fillText('?',860,230);ctx.restore()}},
 orbit(lt,p,t,d,seg){sky('#030814','#081a33');stars(t,1);planet(540,1500,520,t);
  const a=-2.2+p*1.5;smAstro(540+Math.cos(a)*420,1220+Math.sin(a)*120,1.4,t);
  smTick(260+Math.sin(t)*40,560+Math.cos(t*1.3)*30,1.2,t,{hop:0,wow:0.4});
  bigMoon(860,330,85,1)},
});
function bigMoon(x,y,r){glow(x,y,r*2.5,'rgba(255,235,180,A)',0.3);ell(x,y,r,r,'#efe0a8');ell(x-r*.3,y-r*.2,r*.17,r*.17,'rgba(160,135,80,0.5)');ell(x+r*.3,y+r*.25,r*.12,r*.12,'rgba(160,135,80,0.5)')}
const CAM={earth:[1,1.05],orbit:[1.04,1]};
