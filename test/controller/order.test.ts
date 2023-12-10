import request from "supertest";

import app from "../../";
import connect, { MongoHelper } from "../db-helper";
import { number, string } from "zod";

describe("Category controller", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
    await request(app).post("/api/v1/users").send({
        _id: "655e1356be9cf967bdead01f", name: "Test cat" , email:"testcat@testcat.com", password:"1234", role:"USER",
      });
  });

  afterEach(async () => {
    //await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await request(app).delete("/api/v1/users/655e1356be9cf967bdead01f");
    await mongoHelper.closeDatabase();
  });

  it("Should create an order", async () => {
    const datee = new Date("2023-11-21T18:52:40.597Z");

    await request(app).delete("/api/v1/orders/655e1356be9cf967bdead01f");



    const response = await request(app).post("/api/v1/orders").send({
      _id: "655e1356be9cf967bdead01f", totalAmount: 500, userId:"655e1356be9cf967bdead01f", date:datee,
    });

    console.log('#############################', response.body)


    expect(response.body.data).toHaveProperty("userId");
    expect(response.body.data.userId).toEqual('655e1356be9cf967bdead01f');
    
    expect(response.body.data).toEqual({
      //_id: expect.any(string),
      _id: "655e1356be9cf967bdead01f",
      userId: "655e1356be9cf967bdead01f",
      date: "2023-11-21T18:52:40.597Z",
      totalAmount: 500,
      __v: 0,
    });
  });



  it("should get the order", async () => {
    const response = await request(app).get("/api/v1/orders/655e1356be9cf967bdead01f");
    //expect(response.body.data.length).toEqual(1);
    expect(response.body.data).toMatchObject({
      _id: "655e1356be9cf967bdead01f",
    });
  });

    it("should update the category", async () => {
      // update a category
      let category:any = {name: "Updated Order"}
  
      const response = await request(app).put("/api/v1/orders/655e1356be9cf967bdead01f").send({
         totalAmount:600,
      });;
        
      expect(response.body.data).toEqual({
        //_id: expect.any(string),
        _id: "655e1356be9cf967bdead01f",
        userId: "655e1356be9cf967bdead01f",
        date: "2023-11-21T18:52:40.597Z",
        totalAmount: 600,
        __v: 0,
      });
    });

    it("should delete the order", async () => {
      const response = await request(app).delete("/api/v1/orders/655e1356be9cf967bdead01f");
    expect(response.body.data._id).toEqual(
     "655e1356be9cf967bdead01f");
    });


});


