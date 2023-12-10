import request from "supertest";

import UserService from "../../services/userService";
import connect, { MongoHelper } from "../db-helper";
import UserRepo from "../../models/User";

describe("User service", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should create a new User", async () => {
    // create new user
    const user: any = {
       
        name: "Test user", 
        email:"test@gmail.com",
        password:"test123",
        role:"User"
    };
    const newUser = await UserService.createOne(user);

    expect(newUser).toHaveProperty("_id");
    expect(newUser.name).toEqual("Test user");
  });

//   it("should return a user list", async () => {
//     // create new user
//     const newUser = new UserRepo({
//       name: "test user",
//       email:"test@gmail.com",
//       password:"test123",
//       role:"User"
//     });

//     await newUser.save();

//     const users = await UserService.findAll();
//     expect(users.length).toEqual(1);// check length
//     expect(users[0]).toHaveProperty("name", "test user");
//   });

  it("should update a User", async () => {
         // create new User
    const user1: any = {
        _id: "655e2273fe4c4f58b6a80113", 
        name: "Test user", 
        email:"test@gmail.com",
        password:"test123",
        role:"User"
    };
    await UserService.createOne(user1);

    // create new user
    const user: any = {
      name: "Updated user",
      email: "update@gmail.com",
      password: "test123",
      role: "User",
    };
    const newUser = await UserService.findOneAndUpdate("655e1356be9cf967bdead01f", user);
    console.log('NewUser==', newUser)
    if(newUser){
      expect(newUser).toHaveProperty("_id");
      expect(newUser.name).toEqual("tester");
    }
  });

  it("should delete a user", async () => {
    const user: any = {                               //// create new user
      name: "tester",
      email:"test@gmail.com",
      password:"test123",
      role:"User"
    };
    const userObj = await UserService.createOne(user);

    const deleteUser = await UserService.findOneAndDelete(userObj._id.toString());
    expect(deleteUser).toHaveProperty("_id");
    expect(deleteUser).toHaveProperty("name", "tester");
    expect(deleteUser).toHaveProperty("email", "test@gmail.com");  
});

});