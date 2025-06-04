const express = require('express');
const cors = require('cors'); // <--- Importar cors

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

app.listen(port, () => {
  console.log(`Servidor escuchando en localhost: ${port}`);
});
