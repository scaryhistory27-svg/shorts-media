const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [name,w,h,mode] of [['strange_minute_logo',1024,1024,'logo'],['strange_minute_banner',2560,1440,'banner']]){
 await p.setContent(`<canvas id=c width=${w} height=${h}></canvas><script>${fs.readFileSync(__dirname+'/art.js')}</script>`);
 await p.evaluate(()=>document.fonts.load('900 150px Inter'));
 const d=await p.evaluate(([w,h,m])=>{const c=document.getElementById('c');draw(c.getContext('2d'),w,h,m);return c.toDataURL('image/png')},[w,h,mode]);
 fs.writeFileSync(`${__dirname}/${name}.png`,Buffer.from(d.split(',')[1],'base64'))}
await b.close()})();
