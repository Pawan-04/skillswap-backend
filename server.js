require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const connectionRoutes = require("./routes/connectionRoutes");

const app = express();

app.use(cors());

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/connections", connectionRoutes);

app.get("/", (req, res) => {
    res.send("SkillSwap API is running");
});
connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});