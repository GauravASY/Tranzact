import express from 'express'
import cors from 'cors'
import  userRouter  from './Routes/userRoutes';
import transactRouter from './Routes/transactRouter';
import accountRouter from './Routes/accountRouter'
const app = express();

app.use(cors({
    origin : "https://tranzact-lneo.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
}));
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactRouter);
app.use("/api/v1/account", accountRouter)


app.listen(3000, ()=> console.log("Server listening on 3000"));
