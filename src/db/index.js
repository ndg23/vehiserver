
const mongoose=require("mongoose")
mongoose
  .connect(
    `mongodb+srv://Ndg:anto2023@ndgcl.dgwur.mongodb.net/vehicheck?retryWrites=true&w=majority`
  )
  .then((d) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));