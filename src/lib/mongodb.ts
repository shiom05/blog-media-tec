import { MongoClient, ServerApiVersion } from "mongodb";

let uri: any = process.env.MONGODBO_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient: any = null;
let cachedDB: any = null;

if (!uri) {
  throw new Error("Please define mongo uri");
}

if (!dbName) {
  throw new Error("Please define mongodb");
}

export async function connectToDataBase() {
  if (cachedClient && cachedDB) {
    return { client: cachedClient, db: cachedDB };
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDB = db;

  return { client, db };
}
