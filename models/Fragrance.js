import mongoose from 'mongoose';

const FragranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equivalent: { type: String, required: true },
  family: { type: String, required: true },
  layering: { type: [String], default: [] },
  aiSuggestions: { type: [String], default: [] }
});

export default mongoose.models.Fragrance || mongoose.model("Fragrance", FragranceSchema);
