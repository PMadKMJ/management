const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/api/customers', (req, res) => {
    //서버와 클라이언트 간의 연결 고리. 처음 클라이언트와 연결할때 하드코딩 데이터를 넣어보고 확인 후 데이터베이스로 연결하자.
    //클라이언트 package.json에서 프록시 설정으로 서로 연결 필요.
    //get 함수 내에는 전송해야할 데이터 내용 필요.
    res.send(
        [
            {
            'id' : '1',
            'image' : 'https://placeimg.com/64/64/any',
            'name' : 'minajeKIM',
            'birthday' : '950613',
            'gender' : 'male',
            'job' : 'student'
            },
            {
              'id' : '2',
              'image' : 'https://placeimg.com/64/64/any',
              'name' : 'somebody',
              'birthday' : '123456',
              'gender' : 'famale',
              'job' : 'student'
            },
            {
              'id' : '3',
              'image' : 'https://placeimg.com/64/64/any',
              'name' : 'nobody',
              'birthday' : '098765',
              'gender' : 'male',
              'job' : 'student'
            },
        ]
    )
});

app.listen(port, () => console.log(`listening on port ${port}`));