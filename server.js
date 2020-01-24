const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/resources", async (req, res) => {
  const resources = await db("resources");
  res.status(200).json(resources);
});

server.post("/api/resources", async (req, res) => {
  const resources = await db("resources").insert(req.body);
  res.status(201).json(resources);
});

server.get("/api/projects", async (req, res) => {
  const projects = await db("projects");

  res.status(200).json(conversion(projects));
});

server.post("/api/projects", async (req, res) => {
  const projects = await db("projects").insert(req.body);
  res.status(201).json(projects);
});

server.get("/api/projects/tasks", async (req, res) => {
  const tasks = await db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select([
      "p.name as Project Name",
      "p.description as Project Description",
      "p.completed as Project Completed",
      "t.description as Task Description",
      "t.notes as Task Notes",
      "t.completed as Task completed"
    ]);

  res.status(200).json(conversion2(tasks));
});

server.post("/api/projects/:id/tasks", async (req, res) => {
  req.body.project_id = req.params.id;
  const tasks = await db("tasks").insert(req.body);
  res.status(201).json(tasks);
});

function conversion(arr) {
  return arr.map(el => {
    if (el.completed) {
      el.completed = true;
    } else el.completed = false;
    return el;
  });
}

function conversion2(arr) {
  return arr.map(el => {
    if (el["Project Completed"]) {
      el["Project Completed"] = true;
    } else el["Project Completed"] = false;
    if (el["Task Completed"]) {
      el["Task completed"] = true;
    } else el["Task completed"] = false;
    return el;
  });
}
module.exports = server;
