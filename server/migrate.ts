import "dotenv/config";
import { getDb } from "./db";
import { migrate } from "drizzle-orm/mysql2/migrator";
import * as schema from "../drizzle/schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

/**
 * Run database migrations programmatically
 * This creates all tables if they don't exist
 */
async function runMigrations() {
  try {
    console.log("🔄 Running database migrations...");
    
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    // Create connection
    const connection = await mysql.createConnection(databaseUrl);
    const db = drizzle(connection, { schema, mode: "default" });
    
    // Push schema to database (creates tables if they don't exist)
    console.log("📋 Creating database tables...");
    
    // Since we can't use drizzle-kit push in production, we'll create tables manually
    // This is a simplified approach - just ensure tables exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attractions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category VARCHAR(100),
        address TEXT,
        latitude VARCHAR(50),
        longitude VARCHAR(50),
        imageUrl TEXT,
        openingHours TEXT,
        pricing TEXT,
        website TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        featured BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        cuisine VARCHAR(100),
        address TEXT,
        latitude VARCHAR(50),
        longitude VARCHAR(50),
        imageUrl TEXT,
        logo TEXT,
        openingHours TEXT,
        priceRange VARCHAR(50),
        website TEXT,
        bookingUrl TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        menuUrl TEXT,
        reservationUrl TEXT,
        featured BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS accommodations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        type VARCHAR(100),
        address TEXT,
        latitude VARCHAR(50),
        longitude VARCHAR(50),
        imageUrl TEXT,
        logo TEXT,
        priceRange VARCHAR(50),
        amenities JSON,
        website TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        bookingUrl TEXT,
        featured BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS tours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        duration VARCHAR(100),
        price VARCHAR(100),
        imageUrl TEXT,
        bookingUrl TEXT,
        featured BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category VARCHAR(100),
        startDate DATE,
        endDate DATE,
        venue VARCHAR(255),
        address TEXT,
        imageUrl TEXT,
        logo TEXT,
        pricing TEXT,
        website TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        ticketUrl TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS venues (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        type VARCHAR(100),
        capacity INT,
        address TEXT,
        latitude VARCHAR(50),
        longitude VARCHAR(50),
        imageUrl TEXT,
        amenities JSON,
        pricing TEXT,
        website TEXT,
        phone VARCHAR(50),
        email VARCHAR(255),
        indoor BOOLEAN DEFAULT TRUE,
        outdoor BOOLEAN DEFAULT FALSE,
        parking BOOLEAN DEFAULT FALSE,
        catering BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        author VARCHAR(255),
        category VARCHAR(100),
        content TEXT,
        excerpt TEXT,
        imageUrl TEXT,
        tags JSON,
        featured BOOLEAN DEFAULT FALSE,
        views INT DEFAULT 0,
        publishedAt TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'published'
      )
    `);
    
    // Create other necessary tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        avatar TEXT,
        emailVerified BOOLEAN DEFAULT FALSE,
        provider VARCHAR(50),
        providerId VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        subscribedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        itemType VARCHAR(50),
        itemId INT,
        rating INT,
        comment TEXT,
        helpful INT DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS partner_listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        businessName VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        contactEmail VARCHAR(255),
        contactPhone VARCHAR(50),
        website TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        featured BOOLEAN DEFAULT FALSE,
        expiresAt TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS partnership_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        businessName VARCHAR(255) NOT NULL,
        contactName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT,
        partnershipType VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS advertising_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        companyName VARCHAR(255) NOT NULL,
        contactName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT,
        budget VARCHAR(100),
        adType VARCHAR(100),
        duration VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS itinerary_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        itemType VARCHAR(50),
        itemId INT,
        day INT,
        notes TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        lastLogin TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await connection.end();
    
    console.log("✅ Database migrations completed successfully!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
