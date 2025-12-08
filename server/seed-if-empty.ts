import "dotenv/config";
import { getDb } from "./db";
import { attractions } from "../drizzle/schema";
import { sql } from "drizzle-orm";

/**
 * Smart seed script that only runs if the database is empty
 * This prevents re-seeding on every deployment
 */
async function seedIfEmpty() {
  try {
    console.log("🔍 Checking if database needs seeding...");
    
    const db = getDb();
    
    // Check if attractions table has any data
    const result = await db.select({ count: sql<number>`count(*)` }).from(attractions);
    const count = result[0]?.count || 0;
    
    if (count > 0) {
      console.log(`✅ Database already has ${count} attractions. Skipping seed.`);
      process.exit(0);
    }
    
    console.log("📦 Database is empty. Running seeds...");
    
    // Import and run the seed scripts
    const { seed: seedCotswolds } = await import("./cotswolds-seed");
    const { seed: seedBlog } = await import("./seed-blog");
    
    await seedCotswolds();
    await seedBlog();
    
    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Seed check failed:", error);
    // Don't fail the deployment if seeding fails
    // Just log the error and continue
    console.log("⚠️  Continuing with deployment despite seed error...");
    process.exit(0);
  }
}

seedIfEmpty();
