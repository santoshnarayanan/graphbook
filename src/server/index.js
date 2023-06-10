import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

const app = express();

/* app.get('/', function (req, res, next) {
    console.log('first function');
    next();
}, function (req, res) {
    console.log('second function');
    res.send('Hello World!');
}); */

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// all files and folders are served in begining with '/'
const root = path.join(__dirname, '../../');
app.use('/', express.static(path.join(root, 'dist/client')));
// uploading images
app.use('/uploads', express.static(path.join(root, 'uploads')));

app.use(cors());
// add compress at very high  before all responses
app.use(compress());
app.get('/', (req, res) => {
    res.sendFile(path.join(root, '/dist/client/index.html'));
});
app.listen(8000, () => console.log('Listening on port 8000'));