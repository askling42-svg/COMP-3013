import express from "express";
import cors from "cors";
import database from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/assignments", async (req, res) => {
  console.log("Get request recieved");
  res.json(database.assignments);
  console.log("Sent");
});

app.post("/assignments", async (req, res) => {
  const task: string = req.body.task;
  console.log(`Push request for '${task}' recieved`);
  const newAssignment = { id: crypto.randomUUID(), task: task, completed: false };
  database.assignments.push(newAssignment);
  res.json({test: "Success"});
  console.log("New assignment added");
});

app.post("/assignments/:id/delete", async (req, res) => {
  const id = req.params.id;
  console.log(`Delete request for assignment '${id}' recieved`);
  const updatedAssignmentList = database.assignments.filter(
      (assignment) => assignment.id !== id
    );
  database.assignments = updatedAssignmentList;
  res.json({test: "Deleted"});
  console.log("Assignment deleted");
});

app.post("/assignments/:id/toggle", async (req, res) => {
  const id = req.params.id;
  console.log(`Request to change status of assignment '${id}' recieved`)
  const updatedAssignmentList = database.assignments.map((assignment) =>
    assignment.id === id
      ? { ...assignment, completed: !assignment.completed }
      : assignment
  );
  database.assignments = updatedAssignmentList;
  res.json({test: "Toggled"})
  console.log("Assignment status changed");
});

app.listen(8000, () => {
  console.log("Backend Web Server has started 🚀");
});
