/**
 * express : GET
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');

app.use(express.static('html'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/public/" + "index.html" );
})
app.get('/process_get', function (req, res) {
  // 准备以JSON的格式输出
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/post', urlencodedParser, function (req, res) {
  // 准备以JSON的格式输出
  console.dir(req.body);
  res.send(req.body);
})

app.get('/like',async function (req, res) {
  let result = [];

      // console.log(data.d.total)
      for(var i=0; i<10;i++){
       
        if (i<10){
          let aaa = await axios.get('https://user-like-wrapper-ms.juejin.im/v1/user/592e24c60ce463006b4b8c23/like/entry', {
            params: {
              page: i,
              pageSize: 20
            },
            headers: {
              "X-Juejin-Client": "1540293443055",
              "X-Juejin-Src": "web",
              "X-Juejin-Token": "eyJhY2Nlc3NfdG9rZW4iOiJQdDVVTEpueVI2SUdOaEw3IiwicmVmcmVzaF90b2tlbiI6InZpbHF4dHF1aEVHRUhFajUiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==",
              "X-Juejin-Uid": "592e24c60ce463006b4b8c23"
            }
          })
          let bbb = aaa.data.d.entryList;
          // console.log(bbb.length, i)

          result = [...result,...bbb]

          console.log(result.length, bbb.length, i)

        }
      }

    console.log(result.length)

    res.send(result);

})

app.listen(8081, function () {
  console.log("Example app listening at http://localhost:8081")
})