import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./user/user.route.js";
import authRouter from "./auth/auth.route.js";


dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!")
});

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
