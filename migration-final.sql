-- Drop existing tables
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS attractions, restaurants, accommodations, tours, events, venues, blog_posts;
SET FOREIGN_KEY_CHECKS=1;

-- Attractions table (exact match to schema.ts)
CREATE TABLE attractions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Restaurants table (exact match to schema.ts)
CREATE TABLE restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  cuisine VARCHAR(100) NOT NULL,
  address TEXT,
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  priceRange VARCHAR(20),
  imageUrl TEXT,
  logo TEXT,
  website VARCHAR(500),
  bookingUrl VARCHAR(500),
  phone VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Accommodations table (exact match to schema.ts)
CREATE TABLE accommodations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  type VARCHAR(100) NOT NULL,
  address TEXT,
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  priceRange VARCHAR(20),
  imageUrl TEXT,
  logo TEXT,
  bookingUrl VARCHAR(500),
  phone VARCHAR(50),
  featured BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Tours table (exact match to schema.ts)
CREATE TABLE tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  duration VARCHAR(100),
  price VARCHAR(100),
  imageUrl TEXT,
  bookingUrl VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Events table (exact match to schema.ts)
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  startDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP,
  location TEXT,
  imageUrl TEXT,
  ticketUrl VARCHAR(500),
  price VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Venues table (exact match to schema.ts) - FIXED!
CREATE TABLE venues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  capacity INT,
  address TEXT,
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  amenities TEXT,
  pricing TEXT,
  imageUrl TEXT,
  website VARCHAR(500),
  phone VARCHAR(50),
  email VARCHAR(320),
  featured BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

-- Blog posts table (exact match to schema.ts)
CREATE TABLE blog_posts (
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
);
