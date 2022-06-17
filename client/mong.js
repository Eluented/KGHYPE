
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Vic:vicpitic@cluster0.nwmk1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  var col = db.getSisterDB("shop").products;
col.insert({
   _id: "111445GB3",
   name: "Simsong Mobile",
   description: "Awesome new 70G Phone",
   quantity: 99,
   price: 1000
});
  client.close();
});
