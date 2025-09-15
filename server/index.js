require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./utilities/db");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
// const chatRouter = require("./routes/chat")
const errorFunction = require("./middlewares/error-func");
const cors = require("cors");

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PATCH, DELETE, PUT, HEAD",
    credentials: true,
}

const PORT = 8080;

app.use(express.json());
app.use(cors(corsOption));

app.use("/api", authRouter);
app.use("/api/user", userRouter);
// app.use("/api/chat", chatRouter);
app.use(errorFunction);

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log("listening...");
    });
})