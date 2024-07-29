import express from 'express'
import cors from 'cors';
import router from './resources/price.router'


const app = express();
app.use(cors());
const port = 3001;

app.use('/token', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});