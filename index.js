const express =require('express')
const cors = require('cors');
const app =express();
require('dotenv').config()

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ot66xwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const CollegeDetailsCollection = client.db("CollegFacilityDB").collection("collegeView");
        const CollegfeedbackCollection = client.db("CollegfeedbackDB").collection("collegefeedback");
        const CollegadmisionCollection = client.db("CollegadmisionDB").collection("collegeadmision");


        app.post('/collegefeedback',async(req,res)=>{
            const query =req.body;
            const result =await CollegfeedbackCollection.insertOne(query);
            res.send(result);
        })

        app.get('/collegefeedback',async(req,res)=>{
            const result=await CollegfeedbackCollection.find().toArray();
            res.send(result);
        })

        app.get('/collegeView', async (req, res) => {
            const result = await CollegeDetailsCollection.find().toArray();
            res.send(result);
        });

        app.post('/collegeView',async(req,res)=>{
            const query =req.body;
            const result =await CollegeDetailsCollection.insertOne(query);
            res.send(result)
        })

        app.post('/collegeadmision', async (req, res) => {
            const query = req.body;
            const result = await CollegadmisionCollection.insertOne(query);
            res.send(result);
        });

        app.get('/collegeadmision', async (req, res) => {
            const result = await CollegadmisionCollection.find().toArray();
            res.send(result);
        });


        app.put('/collegeadmision/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: updatedData,
            };
            const result = await CollegadmisionCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("college server on")
})

app.listen(port,()=>{
    console.log(`Collge admission server is on port ${port}`);
})