const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080;
const models = require('./models/index.js')

const  products  = require('./data.json');

app.use(express.json());
app.use(cors());

app.get("/products",(req,res)=>{
    models.Product.findAll()
    .then((result)=>{
        console.log(result)
        res.send({
            products : result
        })
    })
    .catch((error)=>{
        console.error(error)
        res.send('에러 발생')
    })
    // const query = req.query;
    // res.status(200).json(products)
})

app.post('/products', (req,res)=>{
    const body = req.body;
    const {name, price, person, desc} = body;

    //방어 코드 
    if(!name ||!price || !person || !desc ){
        res.send('모든 정보를 입력해주세요.')
    }

    //데이터베이스에 데이터 삽입
    models.Product.create({
        name,
        price,
        person,
        desc,
   
    })
    .then((result)=>{
        console.log(result)
        res.send({
            result,
        })
    })
    .catch(error=>{
        console.error(error)
        res.send('상품 업로드에 문제가 발생했습니다.')
    })
})

app.get('/products/:id' , (req,res)=>{
    
    const params = req.params;
    const {id} = params
    res.send(`id는 ${id}입니다.`)
})

app.listen(port,() => {
    console.log('그랩 마켓의 서버가 돌아가고 있습니다.');
    models.sequelize
        .sync()
        .then(() => {
            console.log('✓ DB 연결 성공');
        })
        .catch(function (err) {
            console.error(err);
            console.log('✗ DB 연결 에러');
            process.exit();
        });
});