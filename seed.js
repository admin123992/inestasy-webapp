import connectDB from "./lib/mongodb.js";
import Fragrance from "./models/Fragrance.js";

const seedData = [
  { name: "Fragranza 1", equivalent: "Invictus", family: "Fresco", layering: ["Vaniglia"], aiSuggestions: ["Cocco"] },
  { name: "Fragranza 2", equivalent: "La Vie Est Belle", family: "Floreale", layering: ["Gelsomino"], aiSuggestions: ["Ambra"] }
];

async function seedDB() {
  await connectDB();
  await Fragrance.deleteMany({});
  await Fragrance.insertMany(seedData);
  console.log("Database popolato con successo!");
  process.exit();
}

seedDB();
