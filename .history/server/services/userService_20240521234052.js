const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error("Email already exists");
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12);

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
    });

    let result = await newUser.save();
    return result;
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};

module.exports.getUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer ")[1]
      .trim();
    const decodedJwtToken = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY || "default-secret-key"
    );
    const user = await User.findById(decodedJwtToken.id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};

module.exports.loginUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error("User not found!");
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error("Password is invalid");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "default-secret-key",
      { expiresIn: "1d" }
    );

    return { token };
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};

module.exports.updateUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer ")[1]
      .trim();
    const decodedJwtToken = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY || "default-secret-key"
    );
    const updateData = {
      firstName: serviceData.body.firstName,
      lastName: serviceData.body.lastName,
      userName: serviceData.body.userName,
    };
    const user = await User.findByIdAndUpdate(decodedJwtToken.id, updateData, {
      new: true,
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};
