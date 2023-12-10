import request from "supertest";


import CategoryService from "../../services/categoryService";
import connect, { MongoHelper } from "../db-helper";
import CategoryRepo from "../../models/Category";

describe("Category controller", () => {
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

  it("should create a new category", async () => {
    // create new category
    const category: any = {
      _id: "655e1356be9cf967bdead01f",
      name: "test",
    };
    const newCategory = await CategoryService.createOne(category);

    expect(newCategory).toHaveProperty("_id");
    expect(newCategory.name).toEqual("test");
  });

  it("should return a list", async () => {
    // create new category
    const newCategory = new CategoryRepo({
      name: "test",
    });

    await newCategory.save();

    // way1: use createOne()
    // way2: save()

    const categories = await CategoryService.findAll();
    expect(categories.length).toEqual(1);
    // check length
  });
  it("should update a category", async () => {
         // create new category
    const categorry: any = {
      _id: "655e1356be9cf967bdead01f",
      name: "test",
    };
    await CategoryService.createOne(categorry);

    // create new category
    const category: any = {
      name: "testeee",
    };
    const newCategory = await CategoryService.updateOne("655e1356be9cf967bdead01f", category);
    console.log('#############!@#@!#', newCategory)
    if(newCategory){
      expect(newCategory).toHaveProperty("_id");
      expect(newCategory.name).toEqual("testeee");
    }
  });

  it("should delete a category", async () => {
  
        // create new category
    const category: any = {
      _id: "655e1356be9cf967bdead01f",
      name: "testeee",
    };
    await CategoryService.createOne(category);

    const newCategory = await CategoryService.deleteOne("655e1356be9cf967bdead01f");
    if(newCategory){
    expect(newCategory).toHaveProperty("_id");
    
      expect(newCategory.name).toEqual("testeee");
    }
  });


});

