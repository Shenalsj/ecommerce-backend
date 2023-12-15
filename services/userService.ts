import mongoose, { ObjectId } from "mongoose";
import UserRepo from "../models/User";
//import { User } from "../types/users.js"
import { User } from "../types/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersRepo = new UserRepo();

async function paginateUsers(pageNumber: number, pageSize: number) {
  const skip = (pageNumber - 1) * pageSize;
  const users = await UserRepo.find().skip(skip).limit(pageSize).exec();
  return users;
}

async function findAll() {
  const users = await UserRepo.find().exec();
  return users;
}

async function findOne(userId: number) {
  const id = new mongoose.Types.ObjectId(userId);
  const user = await UserRepo.findById(userId);
  return user;
}

async function createOne(user: User) {
  const newUser = new UserRepo(user);
  return await newUser.save();
}

async function findOneAndUpdate(userId: string, user: User) {
  const id = new mongoose.Types.ObjectId(userId);
  return await UserRepo.findByIdAndUpdate(id, user, { new: true });
}

async function findOneAndDelete(userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  return await UserRepo.findByIdAndDelete(id);
}

async function findOneByEmail(email: string) {
  return UserRepo.findOne({ email });
}

//signup
async function createNewOne({
  name,
  email,
  password,
  avatar,
}: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log("HashedPassword:", hashedPassword);

  const userFromDB = await findOneByEmail(email);
  if (userFromDB) {
    return null;
  }
  const user = new UserRepo({
    name,
    email,
    password: hashedPassword,
    avatar,
  });
  await user.save();
  const userWithoutPass = {
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
  return userWithoutPass;
}

//login
async function login(email: string, password: string) {
  const user = await findOneByEmail(email);
  if (!user) {
    return {
      message: "User not found by email",
      status: false,
      accessToken: null,
    };
  }

  const hashedPassword = user.password;
  console.log("hashedPassword==", hashedPassword);
  console.log("Password==", password);

  const isValid = bcrypt.compareSync(password, hashedPassword);
  if (!isValid) {
    return {
      message: "bad credentials",
      status: false,
      accessToken: null,
    };
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
  console.log("AccessToken:", accessToken);
  console.log("RefreshToken:", refreshToken);

  return {
    message: "valid credentials",
    status: true,
    accessToken,
    refreshToken,
  };
}

async function refreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.TOKEN_SECRET as string
    ) as any;
    const payload = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      avatar: decoded.avatar,
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "12h",
    });
    const refresh_token = jwt.sign(
      payload,
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    return {
      message: "valid credentials",
      status: true,
      accessToken,
      refresh_token,
    };
  } catch (error) {
    return null;
  }
}

// get profile
async function getProfile(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as any;
    const user = await findOne(decoded.userId);
    if (!user) {
      return null;
    }
    const userWithoutPass = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
      avatar: user.avatar,
    };
    return userWithoutPass;
  } catch (error) {
    return null;
  }
}

export default {
  paginateUsers,
  findOne,
  findAll,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
  createNewOne,
  findOneByEmail,
  login,
  refreshToken,
  getProfile,
};
