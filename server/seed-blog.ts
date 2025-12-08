import { config } from "dotenv";
config();

import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

async function seedBlog() {
  console.log("Seeding blog posts...");

  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const blogDir = path.join(__dirname, "../blog");
  const files = await fs.readdir(blogDir);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      const titleMatch = content.match(/# (.*?)\n/);
      const publishedOnMatch = content.match(/\*\*Published on:\*\* (.*?) \|/);
      const authorMatch = content.match(/\*\*Author:\*\* (.*?) \|/);
      const categoryMatch = content.match(/\*\*Category:\*\* (.*?)\n/);
      const imageUrlMatch = content.match(/!\[.*\]\((.*?)\)/);
      const excerptMatch = content.match(/\n\n(.*?)\n\n/);

      const title = titleMatch ? titleMatch[1] : "Untitled";
      const publishedOn = publishedOnMatch ? publishedOnMatch[1].trim() : new Date().toDateString();
      const author = authorMatch ? authorMatch[1].trim() : "Manus AI";
      const category = categoryMatch ? categoryMatch[1].trim() : "Uncategorized";
      const imageUrl = imageUrlMatch ? imageUrlMatch[1] : null;
      const excerpt = excerptMatch ? excerptMatch[1] : "";
      const slug = file.replace(".md", "");

      await db.insert(blogPosts).values({
        title,
        slug,
        author,
        category,
        content,
        imageUrl,
        excerpt,
        publishedAt: new Date(publishedOn),
      });
    }
  }

  console.log("Blog posts seeded successfully!");
  process.exit(0);
}

seedBlog().catch((error) => {
  console.error("Error seeding blog posts:", error);
  process.exit(1);
});
