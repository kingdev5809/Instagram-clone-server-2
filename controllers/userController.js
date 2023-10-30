const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, fullName, email, password } = req.body;

    const usernameCheck = await User.findOne({ name });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullName,
      name,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "avatarImage",
      "_id",
      "fullName",
      "folowingUsers",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
module.exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateOneUser = async (req, res, next) => {
  const { id, name, fullName } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { fullName: fullName, name: name } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.followUser = async (req, res, next) => {
  const { id, followingUsers } = req.body;
  console.log(req.body);
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { folowingUsers: followingUsers } }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.getOfflineUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "_id",
      "isActive",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
