const express = require ('express');
const cors = require ('cors');
const {dbConfig} = require('./config');
const {roleRouter, userRouter, loginRouter, registerRouter} = require ('./routes');





const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());



app.use('/api/role', roleRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.listen (PORT, async () => {
    await dbConfig.initDB();
    console.log(`Servidor corriendo en puerto ${PORT}`);
});