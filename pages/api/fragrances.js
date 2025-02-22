import connectDB from "../../lib/mongodb.js";
import Fragrance from "../../models/Fragrance.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const fragrances = await Fragrance.find({});

      // Generiamo suggerimenti di layering
      const layeringSuggestions = {};
      fragrances.forEach(frag => {
        layeringSuggestions[frag._id] = fragrances
          .filter(other => 
            other.family === frag.family && 
            other._id.toString() !== frag._id.toString()
          )
          .map(f => f.name);
      });

      // Aggiungiamo i suggerimenti ai profumi
      const updatedFragrances = fragrances.map(frag => ({
        ...frag.toObject(),
        suggestions: layeringSuggestions[frag._id] || []
      }));

      res.status(200).json({ success: true, data: updatedFragrances });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: "Metodo non supportato" });
  }
}
