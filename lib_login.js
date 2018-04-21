const unirest = require("unirest");
const cheerio = require("cheerio");

const zjuinfo_login = require("./zjuinfo_login");

const username = "3170111705";
const password = 'asdfghjkl';

const login_lib = (cookie) => {
    return new Promise((resolve, reject) => {
        const req = unirest("GET", "http://webpac.zju.edu.cn/zjusso");
        req.headers({
            "Postman-Token": "ddcbca0f-5848-47ed-b735-17494d0dc81c",
            "Cache-Control": "no-cache",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like " +
                    "Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Upgrade-Insecure-Requests": "1",
            "Referer": "http://webpac.zju.edu.cn/F/1QCSH4TJY6YPXFSFFSPHG1JHQVSKN2HQN2BR3I1XGSR3891YRC-07" +
                    "300?func=bor-info",
            "Host": "webpac.zju.edu.cn",
            "Cookie": cookie,
            "Connection": "keep-alive",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;" +
                    "q=0.8"
        });

        req.end(function (res) {
            if (res.error) 
                reject(res.error);
            const $ = cheerio.load(res.body);
            console.log($('.td2').text());
            // console.log(res.body);
        });

    })
}

const main = async() => {
    const tmp = await zjuinfo_login(username, password);
    if (!tmp.status) {
        console.log("Wrong passwd");
    } else {
        // console.log("Get token successfully");
        let cookie = tmp.cookie;
        await login_lib(cookie);
    }
}

main();