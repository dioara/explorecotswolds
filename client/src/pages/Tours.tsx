import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { MapPin, Clock, Users, Star, ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function Tours() {
  const { data: tours, isLoading } = trpc.tours.list.useQuery();
  const { data: featuredTours } = trpc.tours.featured.useQuery({ limit: 3 });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Cotswolds Tours & Experiences"
        description="Discover the best guided tours and experiences in the Cotswolds. From walking tours through picturesque villages to private luxury tours, find the perfect way to explore England's most beautiful countryside."
        keywords="Cotswolds tours, guided tours Cotswolds, walking tours, Cotswolds experiences, day tours, private tours, Cotswolds villages tour"
        ogImage="/images/countryside-walk.jpg"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/tours-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.02_75)]/90 to-[oklch(0.25_0.02_75)]/70"></div>
        </div>
        
        <div className="container relative z-10 text-white text-center">
          <MapPin className="w-20 h-20 mx-auto mb-6 text-[oklch(0.72_0.12_75)]" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Cotswolds Tours & Experiences</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
            Discover the beauty of the Cotswolds with expert guides and unforgettable experiences
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              The Cotswolds is best explored with local experts who know the hidden gems, historic stories, and scenic routes. 
              Whether you prefer guided walking tours through charming villages, luxury private tours in comfort, or active cycling adventures, 
              our carefully selected tours offer authentic experiences that showcase the very best of this stunning region.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      {featuredTours && featuredTours.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold mb-4 text-center">Featured Tours</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our most popular and highly-rated Cotswolds experiences
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage 
                      src={tour.imageUrl || "/images/countryside-walk.jpg"} 
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-[oklch(0.72_0.12_75)] text-white">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[oklch(0.72_0.12_75)] transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{tour.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {tour.duration && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                      )}
                      {tour.price && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.45_0.08_85)]">
                          <span>{tour.price}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild className="w-full bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.68_0.12_75)] text-white">
                      <a href={tour.bookingUrl || "#"} target="_blank" rel="noopener noreferrer">
                        Book Now <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tours */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">All Tours & Experiences</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Browse our complete collection of Cotswolds tours
          </p>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[oklch(0.72_0.12_75)]"></div>
            </div>
          ) : tours && tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <OptimizedImage 
                      src={tour.imageUrl || "/images/countryside-walk.jpg"} 
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[oklch(0.72_0.12_75)] transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">{tour.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {tour.duration && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                      )}
                      {tour.price && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.45_0.08_85)]">
                          <span>{tour.price}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button asChild className="w-full bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.68_0.12_75)] text-white">
                      <a href={tour.bookingUrl || "#"} target="_blank" rel="noopener noreferrer">
                        Book Now <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No tours available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Tour Types */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Types of Tours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Walking Tours",
                description: "Explore the Cotswolds on foot with guided walks through villages and countryside",
                icon: MapPin,
              },
              {
                title: "Private Tours",
                description: "Customizable luxury tours with personal chauffeur guides",
                icon: Users,
              },
              {
                title: "Day Tours",
                description: "Full-day experiences visiting multiple villages and attractions",
                icon: Clock,
              },
              {
                title: "Specialist Tours",
                description: "Photography, gardens, food & drink, and themed experiences",
                icon: Star,
              },
            ].map((type, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[oklch(0.72_0.12_75)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-[oklch(0.72_0.12_75)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.25_0.02_75)] to-[oklch(0.35_0.04_85)] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore the Cotswolds?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Book your perfect Cotswolds tour today and discover the beauty of England's most enchanting countryside
          </p>
          <Button asChild size="lg" className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.68_0.12_75)] text-white text-lg px-8">
            <Link href="/contact"><a>Contact Us for Custom Tours</a></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
