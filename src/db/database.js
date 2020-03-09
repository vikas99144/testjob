
const mongoose = require("mongoose");
const dbPath = "mongodb://localhost:27017/testdb";
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error to connect with database");
});
db.once("open", () => {
    console.log("Database connected successfully.");
});
module.exports = mongoose;
