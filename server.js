const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


//json 파일 우선 읽기( fs require 필요)
const data = fs.readFileSync('./database.json');
//json parse
const conf = JSON.parse(data);
//require mysql
const mysql = require('mysql');
//mysql에 connect
const connection = mysql.createConnection({
    host: conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
})
// connection에 해당하는 (지금은 database.json에 기록된) 주소에 연결시킨다.
connection.connect();
//file 형태를 불러오기 위해서는 multer 필요
const multer = require('multer');
const upload = multer({dest : './upload'})

app.get('/api/customers', (req, res) => {
    //서버와 클라이언트 간의 연결 고리. 처음 클라이언트와 연결할때 하드코딩 데이터를 넣어보고 확인 후 데이터베이스로 연결하자.
    //클라이언트 package.json에서 프록시 설정으로 서로 연결 필요.
    //get 함수 내에는 전송해야할 데이터 내용 필요.
    //db connect 시 꼭 npm i --save mysql 할 것!
    // res.send(); 은 db 연결 전 server와 client 연결 확인시에 필요
    // 밑줄은 mysql에서 명령 실행 
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});
//upload파일에 사용자가 접근해서 프로필 사진을 확인할 수 있게 한다.
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)'
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    console.log(image);
    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(rows);
            console.log(err);
        })
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        });
});

app.listen(port, () => console.log(`listening on port ${port}`));