import { config } from "dotenv";
config();

import { getDb } from "./db";
import { attractions, restaurants, accommodations, tours, events, venues } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function fixImagePaths() {
  console.log("Fixing image paths...");

  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  // Fix attractions
  const attractionUpdates = [
    { id: 2, imageUrl: "/images/attractions/bibury-village.jpg" },
    { id: 6, imageUrl: "/images/attractions/sudeley-castle.jpg" },
    { id: 7, imageUrl: "/images/attractions/gloucester-cathedral.jpg" },
    { id: 8, imageUrl: "/images/attractions/lower-slaughter.jpg" },
    { id: 9, imageUrl: "/images/attractions/hidcote-manor-garden.jpg" },
    { id: 10, imageUrl: "/images/attractions/cirencester.jpg" },
    { id: 11, imageUrl: "/images/attractions/stow-on-the-wold.jpg" },
    { id: 12, imageUrl: "/images/attractions/burford.jpg" },
    { id: 13, imageUrl: "/images/attractions/birdland-park.jpg" },
    { id: 14, imageUrl: "/images/attractions/cotswold-farm-park.jpg" },
    { id: 15, imageUrl: "/images/attractions/chipping-campden.jpg" },
  ];

  for (const update of attractionUpdates) {
    await db.update(attractions)
      .set({ imageUrl: update.imageUrl })
      .where(eq(attractions.id, update.id));
  }

  console.log(`✓ Fixed ${attractionUpdates.length} attraction images`);

  // Check if there are any other missing images
  const allAttractions = await db.select().from(attractions);
  const allRestaurants = await db.select().from(restaurants);
  const allAccommodations = await db.select().from(accommodations);
  const allTours = await db.select().from(tours);
  const allEvents = await db.select().from(events);
  const allVenues = await db.select().from(venues);

  console.log("\nImage status:");
  console.log(`Attractions: ${allAttractions.filter(a => a.imageUrl).length}/${allAttractions.length} have images`);
  console.log(`Restaurants: ${allRestaurants.filter(r => r.imageUrl).length}/${allRestaurants.length} have images`);
  console.log(`Accommodations: ${allAccommodations.filter(a => a.imageUrl).length}/${allAccommodations.length} have images`);
  console.log(`Tours: ${allTours.filter(t => t.imageUrl).length}/${allTours.length} have images`);
  console.log(`Events: ${allEvents.filter(e => e.imageUrl).length}/${allEvents.length} have images`);
  console.log(`Venues: ${allVenues.filter(v => v.imageUrl).length}/${allVenues.length} have images`);

  console.log("\nImage paths fixed successfully!");
  process.exit(0);
}

fixImagePaths().catch((error) => {
  console.error("Error fixing image paths:", error);
  process.exit(1);
});
