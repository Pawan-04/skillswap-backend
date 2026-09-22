require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json())

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("SkillSwap API is running");
});
connectDB();
app.post("/test", (req, res) => {
    console.log(req.body);

    res.send(req)
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});