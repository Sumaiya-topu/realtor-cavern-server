const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

/*
DB_USER=realtorUser
DB_PASSWORD=0r5oNzrrusUWNOjD
*/
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

async function run() {
  try {
    const projectCollection = dbClient
      .db("realtorCavern")
      .collection("projects");

    /*  GET (/projects)
        GET (/projects/:projectId)
        PUT (/project/:projectId)
    */

    app.get("/projects", async (req, res) => {
      const query = {};
      const cursor = projectCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });

    app.get("/projects/:id", async (req, res) => {
      const projectId = req.params.id;
      const query = { project_id: projectId };
      const projectData = await projectCollection.findOne(query);
      res.send(projectData);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log(` server running on ${port}`);
});
