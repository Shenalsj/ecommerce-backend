import { NextFunction, Request, Response } from "express";
import UsersService from "../services/userService";
import { ApiError } from "../errors/ApiError";
import { ResponseHandler } from "../responses/ResponeHandler";

export async function getOffsetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  if (pageNumber < 0) {
    next(ApiError.internal("PageNumber Must be Non Negative"));
    return;
  }
  const users = await UsersService.paginateUsers(pageNumber, pageSize);
  if (!users) {
    next(ApiError.internal("Internal Server error"));
  }
  next(ResponseHandler.resourceFetched(JSON.stringify(users)));
}

export async function findAllUser(_: Request, res: Response) {
  const users = await UsersService.findAll();
  res.json({ users });
}

export async function findOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = Number(req.params.userId);

    const user = await UsersService.findOne(userId);

    if (!user) {
      throw ApiError.resourceNotFound("User not found.");
    }

    next(ResponseHandler.resourceFetched(JSON.stringify(user)));
  } catch (error) {
    next(error);
  }
}

export async function createOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser = req.body;
  if (!newUser) {
    next(ApiError.internal("Details are Required"));
  }
  const user = await UsersService.createOne(newUser);
  next(
    ResponseHandler.resourceCreated(
      JSON.stringify(user),
      `User with ${user._id} has been added`
    )
  );
}

export async function findOneAndUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser = req.body;
  const userId = req.params.userId;
  const updatedUser = await UsersService.findOneAndUpdate(userId, newUser);

  if (!updatedUser) {
    next(ApiError.resourceNotFound("User not found."));
    return;
  }
  next(
    ResponseHandler.resourceUpdated(
      JSON.stringify(updatedUser),
      `User with ${updatedUser._id} has been updated`
    )
  );
}

export async function findOneAndDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const deletedUser = await UsersService.findOneAndDelete(userId);

  if (!deletedUser) {
    next(ApiError.resourceNotFound("User not found."));
    return;
  }
  next(
    ResponseHandler.resourceDeleted(
      JSON.stringify(deletedUser),
      `User with ${deletedUser._id} has been Deleted`
    )
  );
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, avatar } = req.body;
  const user = await UsersService.createNewOne({
    name,
    email,
    password,
    avatar,
  });
  if (!user) {
    res.status(400).json({
      message: "User exists",
      user: null,
    });
    return;
  }
  next(
    ResponseHandler.resourceCreated(JSON.stringify(user), `User has been added`)
  );
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const login = await UsersService.login(email, password);

  if (login.status === false) {
    res.status(400).json({ accessToken: null, message: "Bad credentials" });
    return;
  }

  res.json({
    message: login.message,
    accessToken: login.accessToken,
    refresh_token: login.refreshToken,
  });
}

export async function refreshToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token is required" });
    return;
  }
  const newTokenPair = await UsersService.refreshToken(refreshToken);
  if (!newTokenPair) {
    res.status(401).json({ message: "Invalid refresh token" });
    return;
  }
  res.json(newTokenPair);
}

export async function getProfile(req: Request, res: Response) {
  const token = req.body.token;

  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }
  const profile = await UsersService.getProfile(token);
  if (!profile) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
  res.json(profile);
}

export default {
  getOffsetUser,
  findOneUser,
  findAllUser,
  createOneUser,
  findOneAndUpdate,
  findOneAndDelete,
  login,
  signup,
  refreshToken,
  getProfile,
};
