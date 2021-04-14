const puppeteer = require('puppeteer');
const fs = require("fs");


(async () => {
  
  const urls = ['https://www.amazon.in/dp/B005MJFA2W/ref=s9_acsd_ri_bw_r2_r0_1_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-7&pf_rd_r=H83J7MV15MT8Y4F8TJFE&pf_rd_t=101&pf_rd_p=637205d1-2b98-449f-8c10-eee348f6099f&pf_rd_i=15358196031',
             'https://www.amazon.com/Black-Swan-Second-Improbable-Incerto-ebook/dp/B00139XTG4/ref=sr_1_2?dchild=1&keywords=black+swan&qid=1591410343&sr=8-2',
             'https://www.amazon.in/Art-Thinking-Clearly-Better-Decisions-ebook/dp/B00AJP267G/ref=pd_sim_6?pd_rd_w=jgzQv&pf_rd_p=c62f4509-8e92-48e5-ad9a-8854285b18d8&pf_rd_r=3WVDCFRCJCW347ZB3GRR&pd_rd_r=08e8210a-bbf4-4510-88db-eaa5a26b1978&pd_rd_wg=Udodm&pd_rd_i=B00AJP267G&psc=1',
             'https://www.amazon.in/Influence-Psychology-Persuasion-Business-Essentials-ebook/dp/B002BD2UUC/ref=pd_sim_6?pd_rd_w=zZd7I&pf_rd_p=c62f4509-8e92-48e5-ad9a-8854285b18d8&pf_rd_r=6WK5YKFZ85TZ96XKHES1&pd_rd_r=8b569cea-604c-4add-93d8-ef1edb63de1e&pd_rd_wg=EnzUH&pd_rd_i=B002BD2UUC&psc=1',
             'https://www.amazon.in/Lean-Startup-Innovation-Successful-Businesses-ebook/dp/B005PR422K/ref=pd_sim_6?pd_rd_w=Fmobr&pf_rd_p=c62f4509-8e92-48e5-ad9a-8854285b18d8&pf_rd_r=8CQ6THDEFZDY4R31G6D5&pd_rd_r=e71f85d4-dbed-4449-a6e9-5783ada0fe7d&pd_rd_wg=px2hs&pd_rd_i=B005PR422K&psc=1',
             'https://www.amazon.in/Innovators-Dilemma-Technologies-Management-Innovation-ebook/dp/B00E257S86/ref=pd_sim_5?pd_rd_w=nvJYe&pf_rd_p=c62f4509-8e92-48e5-ad9a-8854285b18d8&pf_rd_r=WV0H3962TS35D4V6EFTN&pd_rd_r=8e47d276-0432-4388-9103-5556fae659b6&pd_rd_wg=nki8s&pd_rd_i=B00E257S86&psc=1',
             'https://www.amazon.in/How-Will-Measure-Your-Life-ebook/dp/B006I1AE92/ref=pd_sim_4?pd_rd_w=Hd3YM&pf_rd_p=c62f4509-8e92-48e5-ad9a-8854285b18d8&pf_rd_r=2BJVNQ1VAX86W59M99ND&pd_rd_r=eccfbe51-a3e3-4857-a2cd-2765810b542b&pd_rd_wg=FsHDe&pd_rd_i=B006I1AE92&psc=1',
             'https://www.amazon.com/dp/B0832NYGKX/ref=sspa_dk_detail_right_aax_0?psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyWFVZMjVWTFRSOEU1JmVuY3J5cHRlZElkPUEwMzEzOTk2M0JZOFZEWFJUUjVQNSZlbmNyeXB0ZWRBZElkPUEwOTE3NTU2M0ZSSlFTRVhUWlRFMCZ3aWRnZXROYW1lPXNwX2RldGFpbF9yaWdodF9zaGFyZWQmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl'
             ]
             
  let finalData = [];

  const browser = await puppeteer.launch({ headless: false , defaultViewport: false });
  const page = await browser.newPage();
    try {     
            for (let i = 0; i < urls.length; i++) {


                const url = urls[i];

                await page.goto(url, { waitUntil: 'networkidle2' });
                
                const [el] = await page.$x('//*[@id="ebooksImgBlkFront"]');
                const src = await el.getProperty('src');
                const imgURL = await src.jsonValue();

                const [el2] = await page.$x('//*[@id="productTitle"]/text()');
                const txt = await el2.getProperty('textContent');
                const title = await txt.jsonValue();

                const [el3] = await page.$x('//*[@id="buybox"]/div/table/tbody/tr[1]/td[2]');
                const txt2 = await el3.getProperty('textContent');
                const price = await txt2.jsonValue();

                // const [el4] = await page.$x('//*[@id="iframeContent"]');
                // const txt3 = await el4.getProperty('textContent');
                // const content = await txt3.jsonValue();

            

                // console.log({ imgURL, title, price });
                finalData.push({ imgURL, title, price });

            }
        } catch (err) {
            finalData.push(err.message);
        }finally {
        fs.writeFileSync("finalD.json", JSON.stringify(finalData));
        await browser.close();
        }
      
})();