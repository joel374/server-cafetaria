require("dotenv/config")
const express = require("express")
const cors = require("cors")
const db = require("../src/models")
const fs = require("fs")
const path = require("path")

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, "./public")))

const userRouter = require("../src/routers/userRouter")
const menuRouter = require("../src/routers/menuRouter")
const orderRouter = require("../src/routers/orderRouter")

app.use("/user", userRouter)
app.use("/menu", menuRouter)
app.use("/order", orderRouter)

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello, API!",
  })
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`)
  } else {
    db.sequelize.sync({ alter: true })
    if (!fs.existsSync("src/public")) {
      fs.mkdirSync("src/public")
    }
    console.log(`APP RUNNING at ${PORT} ✅`)
  }
})
