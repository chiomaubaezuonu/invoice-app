import express from "express"
import cors from "cors"

const app = express()

const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "welcome"})
})
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})