// global imports
import asyncHandler from "express-async-handler";

// import model
import User from "../models/User.js";

// import generatetoken
import generateToken from "../utils/generateToken.js";

// @desc    Register
// @route   POST api/a1/users/register
// @access  public
export const registerUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user) {
    res.status(400);
    throw new Error("Dieser Benutzer ist schon angemeldet");
  }
  const newUser = await User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Registrieren");
  }
});

// @desc    Login
// @route   POST api/a1/users/login
// @access  public
export const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400);
    throw new Error("Dieser Benutzer ist noch nicht angemeldet");
  }
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Falsches Passwort");
  }
  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Es gab ein Fehler beim Einloggen");
  }
});

// @desc    get logged User
// @route   GET api/a1/users/me
// @access  private
export const getLoggedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Du hast keine Rechte");
  }
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// @desc    update own profile
// @route   PUT api/a1/users/me
// @access  private/OWNER
export const updateProfileOwner = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("Du hast keine Rechte");
  }
  // Not all users want to update all fields therefore checking is necessary
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
  });
});
// =======================================================================================================
// ============================================ADMIN======================================================
// =======================================================================================================
// @desc    get all User
// @route   GET api/a1/users
// @access  private/ADMIN
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Fehler beim fetchen");
  }
});

// @desc    delete a User
// @route   DELETE api/a1/users/:id
// @access  private/ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Kein User gefunden!");
  }
  await user.remove();
  res.status(200).json({ msg: "User wurde gelöscht" });
});

// @desc    get User by ID
// @route   GET api/a1/users/:id
// @access  private/ADMIN
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Kein User gefunden!");
  }
  res.status(200).json(user);
});

// @desc    update a User
// @route   PUT api/a1/users/:id
// @access  private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("Kein User gefunden!");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updatedUser);
});
