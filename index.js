import "dotenv/config";
import express from "express";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new item
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newtea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newtea);
  res.status(202).send(newtea); // Status must be mentioned according to the standard rules
});

// List all the tea items
app.get("/tea", (req, res) => {
  res.status(203).send(teaData);
});

// Find the item with id
app.get("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found bhadwe");
  }
  res.status(200).send(tea);
});

//Update the item
app.put("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found bhadwe");
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//Delete the item
app.delete("/tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index == -1) return res.status(404).send("Not found");
  teaData.splice(index, 1);
  return res.status(200).send("Deleted buddy");
});

app.listen(port, () => {
  console.log(`Server is listening to the port ${port}.........`);
});
