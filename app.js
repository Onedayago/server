import express from 'express';
import bodyParser from 'body-parser'
import config from './config'
import './mongodb/db'
import './model/user'
import router from './route';

const app = express();

app.use(express.static('img'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

router(app);

const server = app.listen(config.port, async () => {
  console.log(`成功监听端口：${config.port}`)
});
