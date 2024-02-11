const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:02041996@practisecluster.agvl9l9.mongodb.net/football-news?appName=mongosh+2.1.3"
);

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: { type: String, required: true },
  lastName: String,
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  id: Number,
  heading: String,
  description: String,
  date: Date, //Create / Update post date and time
  media: String, //Picture OR Video URL
  content: String, //text
  socialLinks: {
    facebook: String,
    twitter: String,
    whatsapp: String,
    email: Email,
  },
  createdBy: String, //username
  createdAt: String,
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = {
  User,
  Post,
};
