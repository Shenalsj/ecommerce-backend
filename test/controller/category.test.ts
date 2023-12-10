import request from "supertest";

import app from "../../";
import connect, { MongoHelper } from "../db-helper";
import { number, string } from "zod";

describe("Category controller", () => {
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

  it("Should create a category", async () => {

    const response = await request(app).post("/api/v1/categories").send({
      _id: "655e1356be9cf967bdead01f", name: "Test cat",
    });

    expect(response.body.data).toHaveProperty("name");
    //expect(response.body.data.name).toMatchObject('Test cat');
    expect(response.body.data.name).toEqual('Test cat');
    
    expect(response.body.data).toEqual({
      name: "Test cat",
      //_id: expect.any(string),
      _id: "655e1356be9cf967bdead01f",
      __v: 0,
    });
  });



  it("should get the category", async () => {
    // get a category
    const response = await request(app).get("/api/v1/categories/655e1356be9cf967bdead01f");
    //expect(response.body.data.length).toEqual(1);
    expect(response.body.data).toMatchObject({
      _id: "655e1356be9cf967bdead01f",
    });
  });

    it("should update the category", async () => {
      // update a category
      let category:any = {name: "Updated Category"}
  
      const response = await request(app).put("/api/v1/categories/655e1356be9cf967bdead01f").send({
         name: "Updated cat",
      });;
        
    expect(response.body.data).toEqual({
      name: "Updated cat",
      //_id: expect.any(string),
      _id: "655e1356be9cf967bdead01f",
      __v: 0,
    });
    });

    it("should delete the category", async () => {
      const response = await request(app).delete("/api/v1/categories/655e1356be9cf967bdead01f");
    expect(response.body.data._id).toEqual(
     "655e1356be9cf967bdead01f");
    });


});


