const MongoClient = require('mongodb').MongoClient,
ObjectID = require('mongodb').ObjectID;

//connect string given by mongoDB
const uri = "mongodb+srv://shahnh:testing1234@cluster0.7wdhd.mongodb.net/";

//creating a client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

//connecting to client
client.connect(err => {
	// database name = sample_mflix  collection = users
	const collection = client.db("sample_mflix").collection("users");

	// query
	var query = {"name": /Stark$/};

	//find query
	collection.find(query).toArray((err, result) => {
		console.log(result);
	});

	var objectId = new ObjectID();
	var myDoc = { "_id" : objectId, name: "Nishil Shah", email: "shahnh@miamioh.edu", password: "testing1234@Nishil"};
	collection.insertOne(myDoc, (err, result) => {
		console.log(result.insertedCount + " document inserted" );
		client.close();
	});
});
