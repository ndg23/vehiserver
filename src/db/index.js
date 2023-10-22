
const mongoose=require("mongoose")
mongoose
  .connect(
    `mongodb+srv://Ndg:anto2023@ndgcl.dgwur.mongodb.net/paynet?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));