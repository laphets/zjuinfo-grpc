const unirest = require("unirest");
const cheerio = require("cheerio");

const zjuinfo_login = require("./zjuinfo_login");

const username = "3170111705";
const password = 'asdfghjkl';

const login_jwb = (cookie) => {
    return new Promise((resolve, reject) => {
        const req = unirest("GET", "http://jwbinfosys.zju.edu.cn/default2.aspx");
        req.headers({
            "Postman-Token": "774ccf9d-2b94-46b3-853f-a9eccf390c8e",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like " +
                    "Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "Upgrade-Insecure-Requests": "1",
            "Referer": "http://jwbinfosys.zju.edu.cn/?ticket=ST-15769-DZemV9PCucZ9eSPvd104-zju.edu.cn",
            "Host": "jwbinfosys.zju.edu.cn",
            "Cookie": cookie,
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;" +
                    "q=0.8"
        });
        req.end(function (res) {
            if (res.error) 
                reject(res.error);
            resolve(res.headers["set-cookie"]);
        });

    });
}

const main = async () => {
    const tmp = await zjuinfo_login(username, password);
    if (!tmp.status) {
        console.log("Wrong passwd");
    } else {
        // console.log("Get token successfully");
        let cookie = tmp.cookie;
        let session = await login_jwb(cookie);
        console.log(session);
    }
}

main();