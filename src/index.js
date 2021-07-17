






const express = require("express");

const app = express();

const connectDB = require("../config/db");

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("APi running"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/review", require("./routes/api/review"));
app.use("/api/payment", require("./routes/api/payment"));
app.use("/api/order", require("./routes/api/order"));

app.listen(8080, () => console.log("server running"));
