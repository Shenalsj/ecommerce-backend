import request from "supertest";

import app from "../..";
import connect, { MongoHelper } from "../db-helper";
import { number, string } from "zod";

describe("User controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    //await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("Should create a user", async () => {
    const response = await request(app).post("/api/v1/users").send({
        _id: "655e2273fe4c4f58b6a80113", 
        name: "Test user", 
        email:"test@gmail.com",
        password:"test123",
        role:"User"
    });
  console.log("###########################",response.body)
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data.name).toEqual('Test user');
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data.email).toEqual("test@gmail.com");
    expect(response.body.data).toHaveProperty("role");
    expect(response.body.data.role).toEqual("User");
    // expect(response.body.data).toEqual({
    //   name: "Test user",
    //   email:"test@gmail.com",
    //   password:"test123",
    //   role:"User",
    //   //_id: expect.any(string),
    //   _id: "655e2273fe4c4f58b6a80113",
    //   __v: 0,
    // });
  });


// it("should get the user", async () => {
//     const response = await request(app).get("/api/v1/users/655e2273fe4c4f58b6a80113");
   
//     expect(response.body.data).toMatchObject({
//       _id: "655e2273fe4c4f58b6a80113",
//     });
//   });

it("should update the user", async () => { 
   // let user:any = {name: "Updated user"}
    const response = await request(app).
    put("/api/v1/users/655e2273fe4c4f58b6a80113")
    .send({
        name: "Updated user",
        email:"update@gmail.com",
        password:"test123",
        role:"User",
    });
    //expect(response.body.user).toEqual({   
    expect(response.body.data).toEqual({
      name: "Updated user",
      email: "update@gmail.com",
      password: "test123",
      role: "User",
      _id: "655e2273fe4c4f58b6a80113",
      __v: 0,
    });
});

it("should delete the user", async () => {
    const response = await request(app)
      .delete("/api/v1/users/655e2273fe4c4f58b6a80113");
      expect(response.body.data._id).toEqual("655e2273fe4c4f58b6a80113");
    });

});


