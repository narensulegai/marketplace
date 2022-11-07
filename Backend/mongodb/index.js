const mongoose = require("mongoose");

console.log("Using mongo connection string", process.env.MONGODB_CONNECTION);

mongoose.connect(process.env.MONGODB_CONNECTION, {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("error", () => {
  console.log("Mongo error");
});
mongoose.connection.once("open", () => {
  console.log("Connected to mongo");
});

// Import and re-export models here

const Company = require("./schemas/company")(mongoose);
const Employee = require("./schemas/employee")(mongoose);
const Chat = require("./schemas/chat")(mongoose);
const Messages = require("./schemas/message")(mongoose);

module.exports = {
  Company,
  Employee,
  Chat,
  Messages,
};
