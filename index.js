const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 8000;



app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://Pro-clean:TyxXStU7WLy5i85x@cluster0.05rtw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db("proClean").collection("services")

        app.get('/service', async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            res.send(services);

        });


        app.post("add-service", async (req, res) => {
            const data = req.body;
            const result = await servicesCollection.insertOne(data);
            res.send(result);
        });

        app.put("update-service/:id", async (req, res) => {
            const { id } = req.params;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {$set: data};
            const options = {upsert : true};

            const result = await servicesCollection.updateOne(filter, updateDoc, options);

            res.send(result);
        });
        app.delete("delete-service", async (req, res) => {

        })




    } finally {
    }
}
run().catch(console.dir);





app.get('/', async (req, res) => {
    res.send('How are you?')
})

//  Pro-clean
//  TyxXStU7WLy5i85x

app.listen(port, () => {
    console.log(`Pro Cleane listening on port ${port}`)
});
