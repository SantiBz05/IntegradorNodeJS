require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express();

const port = 3000;
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/users.routes');
app.use('/usuarios', userRouter);

const productRouter = require('./routes/prodcuts.routes');
app.use('/productos', productRouter);

const salesRouter = require('./routes/sales.routes');
app.use('/ventas', salesRouter);

const authRouter = require('./routes/auth.routes')
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost: ${port}`);
});
