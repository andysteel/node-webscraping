import puppeteer from "puppeteer";
import readlineSync from "readline-sync";
import { Mail } from "../util/mail.util";

class Robo {

    private mail = new Mail()

    public async cotacaoMoeda() {
        const browser = await puppeteer.launch({headless: true})
        const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar'
        const moedaFinal = readlineSync.question('Informe uma moeda desejada: ') || 'real'
        const page = await browser.newPage()
        const url = `https://www.google.com/search?sxsrf=ALeKk02uvGgL2rRLBRPAW8lk5XDz7n_nXA%3A1587082659263&ei=o_WYXvjWD7HF5OUP5qWN-AY&q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&gs_lcp=CgZwc3ktYWIQAzIHCAAQRhCCAjICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADoECAAQRzoECCMQJzoECAAQQzoFCAAQgwFQy_JxWN6HcmDZj3JoAHAEeACAAZ0CiAGrHZIBBDItMTWYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwi4tInRl-7oAhWxIrkGHeZSA28Q4dUDCAs&uact=5`
        await page.goto(url, {timeout: 0, waitUntil: 'load'})

        //await page.screenshot({path: 'example.png'});
        const resultado = await page.evaluate(() => {
            return {
              valorMoedaFinal: document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc')?.getAttribute('value')
            };
        });
        console.log(`o valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado.valorMoedaFinal}`)
        await browser.close()
    }

    public async consultaPrecoPanela() {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        //configurando agent mobile para funcionar o headless true
        await page.setUserAgent('Mozilla/5.0 (Linux; Android 9; SM-G950F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36')
        await page.goto('https://www.americanas.com.br/produto/127886671/panela-de-pressao-eletrica-electrolux-chef-pcc20-6l?chave_search=acproduct&voltagem=110V',{timeout: 0, waitUntil: 'load'})

        const resultado = await page.evaluate(() => {
          return {
                  valor: document.querySelector('.price__SalesPrice-ej7lo8-2.kjGSBk.TextUI-sc-12tokcy-0.bLZSPZ')?.textContent
              };
          });

        const data = new Date()
        const msg = `${data.toLocaleString()} - A panela de Luciana esta custando ${resultado.valor}`
        console.log(msg)
        await browser.close()
        const destinatario = 'lucianabatera@gmail.com'
        this.mail.enviaEmail(msg, destinatario)
    }

    public async consultaPrecoNotebook() {
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
      const url = 'https://www.google.com/search?tbm=shop&sxsrf=ALeKk03YjLqAllPEMjeFD3V_3yi0VOHl7A:1587181256047&q=lenovo-ideapad-320-intel-core-i7-7500u-16gb-geforce-940mx&tbs=vw:l,mr:1,cat:328,pdtr0:1020720%7C16.0%2416.0,init_ar:SgVKAwjIAkoKUggI2PsqINr7Kg%3D%3D&sa=X&ved=0ahUKEwjMq9f3hvHoAhUWK7kGHSd1BDkQvSsI_QMoBA&biw=1600&bih=758'
      await page.goto(url, {timeout: 0, waitUntil: 'load'});

      const resultado = await page.evaluate(() => {
        return {
                titulo: Array.from(document.querySelectorAll('.xsRiS'), e => e.textContent),
                preco:  Array.from(document.querySelectorAll('.Nr22bf'), e => e.textContent),
                loja:  Array.from(document.querySelectorAll('.shntl.hy2WroIfzrX__merchant-name'), e => e.textContent)
            };
        });
        await browser.close()
        const data = new Date()
        let indice = 0;
        const msgs = [];
        if(resultado.titulo.length > 0) {
          let produto = '';

          while(indice <= resultado.titulo.length -1 ) {
            produto = resultado.titulo[indice] + " - " + resultado.preco[indice] + " - " +
                      resultado.loja[indice];
            msgs[indice] = data.toLocaleString() + " - " +  produto.concat('\n');
            console.log(msgs[indice]);
            indice ++;
          }
        }
        this.mail.enviaEmail(msgs.toString(),'andersoninfonet@gmail.com');
    }
}

export default new Robo()