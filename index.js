require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
  try {
    await client.connect();
    console.log('Connected to the database!');
    
    const collection = client.db('test').collection('students');

    // Clear the collection
    await collection.deleteMany({});

    const insertResult = await collection.insertOne({
      name: 'John Doe',
      age: 25,
      grade: 'A'
    });
    console.log(`Inserted document into the collection`);

    const docs = await collection.find({}).toArray();
    console.log(`Found ${docs.length} documents in the collection`);
    console.log(docs);
  } catch (error) {
    console.error(error);
  } finally {
    // Make sure to close the connection when done
    client.close();
  }
}

main();
