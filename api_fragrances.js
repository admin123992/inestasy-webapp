import { NextApiRequest, NextApiResponse } from "next";
import { connectDB, Fragrance } from "@/lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { family, search, limit = 10, page = 1 } = req.query;
      
      let query = {};
      if (family) {
        query.family = { $regex: family.toString(), $options: "i" };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search.toString(), $options: "i" } },
          { equivalent: { $regex: search.toString(), $options: "i" } }
        ];
      }
      
      const fragrances = await Fragrance.find(query)
        .limit(parseInt(limit.toString()))
        .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
        .exec();
      
      res.status(200).json({ fragrances, total: fragrances.length, page: parseInt(page.toString()), limit: parseInt(limit.toString()) });
    } catch (error) {
      res.status(500).json({ message: "Errore nel recupero delle fragranze", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}