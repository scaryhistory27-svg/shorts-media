const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2560,height:1440}});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+__dirname+'/brand.html');await p.evaluate(()=>document.fonts.ready);
 for(const m of ['logo','banner']){const d=await p.evaluate(m=>window.draw(m),m);fs.writeFileSync(__dirname+'/'+m+'_raw.png',Buffer.from(d.split(',')[1],'base64'))}await b.close()})();
