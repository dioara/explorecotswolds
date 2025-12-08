import { config } from "dotenv";
config();

import { getDb } from "./db";
import { attractions, restaurants, accommodations, tours, events, venues } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Update all database records with generated image paths
 */

async function updateImages() {
  console.log("🖼️  Updating database with image paths...");

  const db = await getDb();
  if (!db) {
    console.error("❌ Database not available");
    process.exit(1);
  }

  // Update attraction images
  const attractionImages = {
    "blenheim-palace": "/images/attractions/blenheim-palace.jpg",
    "bibury": "/images/attractions/bibury-village.jpg",
    "bourton-on-the-water": "/images/attractions/bourton-on-the-water.jpg",
    "castle-combe": "/images/attractions/castle-combe.jpg",
    "cotswold-wildlife-park": "/images/attractions/cotswold-wildlife-park.jpg",
    "sudeley-castle": "/images/attractions/sudeley-castle.jpg",
    "gloucester-cathedral": "/images/attractions/gloucester-cathedral.jpg",
    "lower-slaughter": "/images/attractions/lower-slaughter.jpg",
    "hidcote-manor-garden": "/images/attractions/hidcote-manor-garden.jpg",
    "cirencester": "/images/attractions/cirencester.jpg",
    "stow-on-the-wold": "/images/attractions/stow-on-the-wold.jpg",
    "burford": "/images/attractions/burford.jpg",
    "birdland-park": "/images/attractions/birdland-park.jpg",
    "cotswold-farm-park": "/images/attractions/cotswold-farm-park.jpg",
    "chipping-campden": "/images/attractions/chipping-campden.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(attractionImages)) {
    await db.update(attractions)
      .set({ imageUrl })
      .where(eq(attractions.slug, slug));
  }
  console.log("✅ Updated 15 attraction images");

  // Update restaurant images
  const restaurantImages = {
    "the-kingham-plough": "/images/restaurants/kingham-plough.jpg",
    "the-wild-rabbit": "/images/restaurants/wild-rabbit.jpg",
    "the-potting-shed-pub": "/images/restaurants/potting-shed.jpg",
    "the-swan-inn-swinbrook": "/images/restaurants/swan-inn.jpg",
    "the-five-alls": "/images/restaurants/five-alls.jpg",
    "lords-of-the-manor-restaurant": "/images/restaurants/lords-of-the-manor.jpg",
    "the-ebrington-arms": "/images/restaurants/ebrington-arms.jpg",
    "the-wheatsheaf-inn": "/images/restaurants/wheatsheaf-inn.jpg",
    "the-feathered-nest": "/images/restaurants/feathered-nest.jpg",
    "the-churchill-arms": "/images/restaurants/churchill-arms.jpg",
    "the-horse-and-groom": "/images/restaurants/horse-and-groom.jpg",
    "the-bell-inn-sapperton": "/images/restaurants/bell-inn.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(restaurantImages)) {
    await db.update(restaurants)
      .set({ imageUrl })
      .where(eq(restaurants.slug, slug));
  }
  console.log("✅ Updated 12 restaurant images");

  // Update accommodation images
  const hotelImages = {
    "slaughters-manor-house": "/images/hotels/slaughters-manor.jpg",
    "lords-of-the-manor": "/images/hotels/lords-of-the-manor-hotel.jpg",
    "the-lygon-arms": "/images/hotels/lygon-arms.jpg",
    "manor-house-hotel": "/images/hotels/manor-house-hotel.jpg",
    "cotswold-house-hotel": "/images/hotels/cotswold-house.jpg",
    "barnsley-house": "/images/hotels/barnsley-house.jpg",
    "calcot-spa": "/images/hotels/calcot-spa.jpg",
    "ellenborough-park": "/images/hotels/ellenborough-park.jpg",
    "the-painswick": "/images/hotels/painswick-hotel.jpg",
    "the-swan-bibury": "/images/hotels/swan-bibury.jpg",
    "the-village-pub": "/images/hotels/village-pub.jpg",
    "the-bay-tree-hotel": "/images/hotels/bay-tree-hotel.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(hotelImages)) {
    await db.update(accommodations)
      .set({ imageUrl })
      .where(eq(accommodations.slug, slug));
  }
  console.log("✅ Updated 12 hotel images");

  // Update tour images
  const tourImages = {
    "cotswolds-villages-tour": "/images/tours/village-tour.jpg",
    "cotswold-way-walking": "/images/tours/walking-tour.jpg",
    "food-and-drink-tour": "/images/tours/food-tour.jpg",
    "photography-tour": "/images/tours/photography-tour.jpg",
    "gardens-tour": "/images/tours/garden-tour.jpg",
    "historic-cotswolds-tour": "/images/tours/historic-tour.jpg",
    "cycling-tour": "/images/tours/cycling-tour.jpg",
    "private-luxury-tour": "/images/tours/private-tour.jpg",
    "cotswold-way-trail": "/images/tours/cotswold-way.jpg",
    "market-towns-tour": "/images/tours/market-tour.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(tourImages)) {
    await db.update(tours)
      .set({ imageUrl })
      .where(eq(tours.slug, slug));
  }
  console.log("✅ Updated 10 tour images");

  // Update event images
  const eventImages = {
    "cheltenham-jazz-festival": "/images/events/cheltenham-jazz.jpg",
    "cheltenham-literature-festival": "/images/events/cheltenham-literature.jpg",
    "cheltenham-gold-cup": "/images/events/gold-cup.jpg",
    "wilderness-festival": "/images/events/wilderness-festival.jpg",
    "moreton-show": "/images/events/moreton-show.jpg",
    "tetbury-woolsack-races": "/images/events/tetbury-woolsack.jpg",
    "chipping-campden-music-festival": "/images/events/chipping-campden-festival.jpg",
    "cirencester-farmers-market": "/images/events/cirencester-market.jpg",
    "stow-horse-fair": "/images/events/stow-fair.jpg",
    "cotswolds-christmas-markets": "/images/events/christmas-market.jpg",
    "cotswolds-food-festival": "/images/events/food-festival.jpg",
    "cotswolds-music-festival": "/images/events/music-festival.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(eventImages)) {
    await db.update(events)
      .set({ imageUrl })
      .where(eq(events.slug, slug));
  }
  console.log("✅ Updated 12 event images");

  // Update venue images
  const venueImages = {
    "ellenborough-park": "/images/venues/ellenborough-park-venue.jpg",
    "sudeley-castle-weddings": "/images/venues/sudeley-castle-venue.jpg",
    "cripps-barn": "/images/venues/cripps-barn.jpg",
    "hyde-barn": "/images/venues/hyde-barn.jpg",
    "kingscote-barn": "/images/venues/kingscote-barn.jpg",
    "stone-barn": "/images/venues/stone-barn.jpg",
    "caswell-house": "/images/venues/caswell-house.jpg",
    "barnsley-house-venue": "/images/venues/barnsley-house-venue.jpg",
    "cowley-manor": "/images/venues/cowley-manor.jpg",
    "the-painswick-venue": "/images/venues/painswick-venue.jpg"
  };

  for (const [slug, imageUrl] of Object.entries(venueImages)) {
    await db.update(venues)
      .set({ imageUrl })
      .where(eq(venues.slug, slug));
  }
  console.log("✅ Updated 10 venue images");

  console.log("✅ All images updated successfully!");
  process.exit(0);
}

updateImages().catch((error) => {
  console.error("❌ Error updating images:", error);
  process.exit(1);
});
