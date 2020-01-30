import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(compression());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/good', async (req: express.Request, res: express.Response) => {
  res.body = 'good';
});

export default app;
