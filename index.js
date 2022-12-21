/*
DB_USER=realtorUser
DB_PASSWORD=0r5oNzrrusUWNOjD
*/

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: "success" });
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qkzu9ty.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const dbClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log(dbClient);
async function run() {
  try {
    const projectCollection = dbClient
      .db("realtorCavern")
      .collection("projects");
    const proposalCollection = dbClient
      .db("realtorCavern")
      .collection("proposals");
    const userCollection = dbClient.db("realtorCavern").collection("users");

    /*  GET (/projects)
        GET (/projects/:id)
        PUT (/project/:id)
        GET (/projects/agency-code)
    */

    app.get("/projects", async (req, res) => {
      const query = {};
      const cursor = projectCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const projectData = await projectCollection.find(query);
      res.send(projectData);
    });

    app.get("/agencyprojects/:exec", async (req, res) => {
      const agencyCode = req.params.exec;
      const query = { exec: agencyCode };
      let projectsData = await projectCollection.find(query).toArray();
      let proposalsData = await proposalCollection.find(query).toArray();
      projectsData = [...projectsData, proposalsData];

      res.send(projectsData);
    });

    /*
      GET (/proposals)
      POST (/proposals)
      
     */
    app.get("/proposals", async (req, res) => {
      const query = {};
      const cursor = proposalCollection.find(query);
      const proposals = await cursor.toArray();
      res.send(proposals);
    });

    app.post("/proposals", async (req, res) => {
      let proposalsData = req.body;
      proposalsData = {
        ...proposalsData,
        isApproved: false,
        proposal_date: new Date(),
      };
      const result = await proposalCollection.insertOne(proposalsData);
      res.send(result);
    });

    /*
      POST (/users)
      GET (/users)
    */

    app.post("/users", async (req, res) => {
      let user = req.body;
      user = {
        ...user,
        verified: false,
      };
      const email = user.email;
      const query = { email };
      const userFindResult = await userCollection.findOne(query);
      if (!userFindResult) {
        const result = await userCollection.insertOne(user);
        res.send(result);
      } else {
        res.send({});
      }
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const userData = await cursor.toArray();
      res.send(userData);
    });

    /*
      PUT (/approved/:id)
    */
    app.put("/approved/:id", async (req, res) => {
      let isApproved = await proposalCollection.updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            isApproved: true,
          },
        }
      );
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const updatedDoc = await proposalCollection.findOne(query);

      const result = await projectCollection.insertOne(updatedDoc);
      const dlt = await proposalCollection.deleteOne(query);

      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log(` server running on ${port}`);
});
