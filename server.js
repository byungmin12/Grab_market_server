const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080;
const models = require('./models/index.js')
//multer는 multipart/form-data로 들어온 이미지를 처리하는 모듈로, 지정한 곳에 이미지 저장이 가능
const multer = require('multer')

const upload =  multer({
    storage: multer.diskStorage({
        //저장공간 위치
        destination : (req, file, cb)=>{
            cb(null, 'uploads/')
        },
        //파일 이름 설정 
        filename : (req, file, cb)=>{
            cb(null, file.originalname)
        }
    })
})

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'))

app.get("/products",(req,res)=>{
    models.Product.findAll({
        order : [
            ["createdAt","DESC"]
        ],
        attribute : [
            'id',
            'name',
            'price',
            'createdAt',
            'perseon'
        ]
    })
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
    console.log(body)
    const {name, price, person, description, img} = body;

    //방어 코드 
    if(!name ||!price || !person || !description ){
        res.status(400).send('모든 정보를 입력해주세요.')
    }

    //데이터베이스에 데이터 삽입
    models.Product.create({
        name,
        price,
        person,
        description,
        img
   
    })
    .then((result)=>{
        console.log(result.dataValues)
        let send = result.dataValues
        res.send({
            send 
        })
    })
    .catch(error=>{
        res.status(400).send('상품 업로드에 문제가 발생했습니다.')
    })
})

app.get('/products/:id' , (req,res)=>{
    
    const params = req.params;
    const {id} = params
    
    models.Product.findOne({
        where : {
            id : id
        }
    })
    .then((result )=>{
        console.log(result)
        res.send({
            product: result
        })
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).send('상품 조회 에러가 발생했습니다.')

    })
})

app.post('/image', upload.single('image'), (req,res)=>{
    console.log(req)
    const file = req.file;
    console.log(file)
    res.send({
        img : file.path
    })
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



