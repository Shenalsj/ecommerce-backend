import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

async function connect() {
  const mongod = await MongoMemoryServer.create()
  const uri = await mongod.getUri()

  await mongoose.connect(uri)

  return {
    closeDatabase: async () => {
      await mongoose.connection.dropDatabase()
      await mongoose.connection.close()

      await mongod.stop()
    },
    clearDatabase: async () => {
      const collections = mongoose.connection.collections

      for (const key in collections) {
        const collection = collections[key]
        collection.deleteMany({})
      }
    },
  }
}

export default connect

export type MongoHelper = {
  closeDatabase: () => Promise<void>
  clearDatabase: () => Promise<void>
}
