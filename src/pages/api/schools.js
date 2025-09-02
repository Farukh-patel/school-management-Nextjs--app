// src/pages/api/schools.js
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { getDB } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false, // required for formidable
  },
};

export default async function handler(req, res) {
  try {
    const db = await getDB();

    if (req.method === "POST") {
      try {
        const uploadDir = path.join(process.cwd(), "public", "schoolImages");

        // ensure upload folder exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const form = formidable({
          multiples: false,
          uploadDir,
          keepExtensions: true,
        });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Formidable error:", err);
            return res.status(500).json({ error: "Error parsing form data" });
          }

          try {
            // ✅ destructure safely
            const name = fields.name?.[0] || fields.name;
            const address = fields.address?.[0] || fields.address;
            const city = fields.city?.[0] || fields.city;
            const state = fields.state?.[0] || fields.state;
            const contact = fields.contact?.[0] || fields.contact;
            const email_id = fields.email_id?.[0] || fields.email_id;

            const imageFile = files.image?.[0] || files.image;
            const image = imageFile ? path.basename(imageFile.filepath) : null;

            const [result] = await db.execute(
              "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [name, address, city, state, contact, email_id, image]
            );

            return res.status(200).json({
              message: "School added successfully!",
              id: result.insertId,
            });
          } catch (dbError) {
            console.error("DB insert error:", dbError);
            return res
              .status(500)
              .json({ error: "Database insert failed", details: dbError.message });
          }
        });
      } catch (postError) {
        console.error("POST handler error:", postError);
        return res.status(500).json({
          error: "Unexpected error in POST",
          details: postError.message,
        });
      }
    } else if (req.method === "GET") {
      try {
        const [rows] = await db.execute(
          "SELECT id, name, address, city, state, contact, email_id, image FROM schools"
        );
        return res.status(200).json(rows);
      } catch (error) {
        console.error("GET error:", error);
        return res.status(500).json({
          error: "Failed to fetch schools",
          details: error.message,
        });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        error: `Method ${req.method} not allowed`,
      });
    }
  } catch (outerError) {
    console.error("DB connection error:", outerError);
    return res.status(500).json({
      error: "Database connection failed",
      details: outerError.message,
    });
  }
}
