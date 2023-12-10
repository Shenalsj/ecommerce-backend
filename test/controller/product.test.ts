import request from "supertest";
import app from "../../";
 import connect, { MongoHelper } from '../db-helper';
 import mongoose from 'mongoose';


  describe("Product controller", () => {
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


  it("Should create a product", async () => {
    const response = await request(app).post("/api/v1/products").send({
      _id: "655e78935512aa4109537c03",
      name: "Smartphone",
      description: "High-end smartphone with advanced features",
      price: 799.99,
      image: "https://example.com/smartphone.jpg",
      categoryId: "654e9ddac9cca8d8e6641666",
    });

    expect(response.body.product).toHaveProperty("name");
    expect(response.body.product.name).toEqual("Smartphone");
    expect(response.body.product).toHaveProperty("description");
    expect(response.body.product.description).toEqual(
      "High-end smartphone with advanced features"
    );
    expect(response.body.product).toHaveProperty("price");
    expect(response.body.product.price).toEqual(799.99);
    expect(response.body.product).toHaveProperty("image");
    expect(response.body.product.image).toEqual(
      "https://example.com/smartphone.jpg"
    );
    expect(response.body.product).toHaveProperty("categoryId");
    expect(response.body.product.categoryId).toEqual(
      "654e9ddac9cca8d8e6641666"
    );
  });

  it("Should get the product", async () => {
    const response = await request(app).get(
      "/api/v1/products/655e78935512aa4109537c03"
    );


    expect(response.body.product).toHaveProperty("name");
    expect(response.body.product.name).toEqual("Smartphone");
    expect(response.body.product).toHaveProperty("description");
    expect(response.body.product.description).toEqual(
      "High-end smartphone with advanced features"
    );
    expect(response.body.product).toHaveProperty("price");
    expect(response.body.product.price).toEqual(799.99);
    expect(response.body.product).toHaveProperty("image");
    expect(response.body.product.image).toEqual(
      "https://example.com/smartphone.jpg"
    );
    expect(response.body.product).toHaveProperty("categoryId");
  });

  it("Should update the product", async () => {
    const response = await request(app)
      .put("/api/v1/products/655e78935512aa4109537c03")
      .send({
        name: "Updated Smartphone",
        description: "Updated description for the smartphone",
        price: 899.99,
        image: "https://example.com/updated-smartphone.jpg",
        categoryId: "655e9e08106158f8d895ccbe",
      });

    expect(response.body.product).toHaveProperty("name");
    expect(response.body.product.name).toEqual("Updated Smartphone");
    expect(response.body.product).toHaveProperty("description");
    expect(response.body.product.description).toEqual(
      "Updated description for the smartphone"
    );
    expect(response.body.product).toHaveProperty("price");
    expect(response.body.product.price).toEqual(899.99);
    expect(response.body.product).toHaveProperty("image");
    expect(response.body.product.image).toEqual(
      "https://example.com/updated-smartphone.jpg"
    );
    expect(response.body.product).toHaveProperty("categoryId");
  });

  it("Should delete the product", async () => {
    const response = await request(app).delete(
      "/api/v1/products/655e78935512aa4109537c03"
    );

    const responseBody = JSON.parse(response.text);
    const message = responseBody.message;

    expect(responseBody).toHaveProperty("message");
    expect(message).toEqual("Product deleted successfully");
  });
});

