import mongoose from 'mongoose';

const fragranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equivalent: { type: String, required: true },
  family: { type: String, required: true },
  layering: { type: [String], default: [] },
  aiSuggestions: { type: [String], default: [] }
});

const Fragrance = mongoose.models.Fragrance || mongoose.model('Fragrance', fragranceSchema);

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connesso con successo!");
    
    const existingFragrances = await Fragrance.countDocuments();
    if (existingFragrances === 0) {
      console.log("Database pronto per essere popolato con nuove fragranze.");
    }
  } catch (error) {
    console.error("Errore nella connessione al database:", error);
  }
}

export { Fragrance };