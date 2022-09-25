require('dotenv').config();

const express=require('express');
const cors=require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes/user.routes'));
app.use(require('./routes/media.routes'));
app.use(require('./routes/product.routes'));
app.use(require('./routes/order.routes'));
app.use(require('./routes/planner.routes'));
app.use(require('./routes/comment.routes'));
app.use(require('./routes/review.routes'));

const port = process.env.PORT ?? 8081;
app.listen(port, ()=>{
    console.log(`Listening in port ${port}`);
});
