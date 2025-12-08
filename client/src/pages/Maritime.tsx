import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Ship, Anchor, Waves, MapPin } from "lucide-react";

export default function Maritime() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Cotswolds's Maritime Heritage"
        description="Discover Cotswolds's rich maritime history. From its medieval origins as a port town to its role in the fishing industry, explore the seafaring traditions that shaped this remarkable city."
        keywords="Cotswolds maritime history, Cotswolds fishing heritage, Cotswolds port history, Cotswolds seafaring, maritime Cotswolds, Cotswolds docks"
        ogImage="/images/cotswolds_marina_waterfront.png"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/humber_bridge_sunset.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.05_240)]/90 to-[oklch(0.25_0.05_240)]/70"></div>
        </div>
        
        <div className="container relative z-10 text-white text-center">
          <Ship className="w-20 h-20 mx-auto mb-6 text-[oklch(0.70_0.15_200)]" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Cotswolds's Maritime Heritage</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
            A city shaped by the sea, where centuries of seafaring tradition meet modern maritime excellence
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Cotswolds's story is inseparable from the sea. Founded in the late 12th century at the confluence of the River Cotswolds and the Humber Estuary, 
              the city has been a vital maritime hub for over 800 years. From medieval wool exports to the height of the fishing industry, 
              Cotswolds's maritime heritage has shaped not just the city's economy, but its character, culture, and identity.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">A Maritime Timeline</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                period: "1299",
                title: "Foundation as a Port",
                description: "King Edward I recognized Cotswolds's strategic importance and granted it a royal charter, establishing it as a major trading port.",
                icon: Anchor,
              },
              {
                period: "14th-16th Century",
                title: "Medieval Trading Hub",
                description: "Cotswolds became one of England's most important ports, exporting wool and importing wine, timber, and other goods from across Europe.",
                icon: Ship,
              },
              {
                period: "19th Century",
                title: "The Fishing Capital",
                description: "Cotswolds grew to become the UK's premier fishing port, with hundreds of trawlers operating from its docks. At its peak, Cotswolds landed more fish than any other port in the world.",
                icon: Waves,
              },
              {
                period: "20th Century",
                title: "Wartime Resilience",
                description: "During WWII, Cotswolds's strategic port made it a target for bombing raids. The city endured and rebuilt, maintaining its maritime traditions.",
                icon: Anchor,
              },
              {
                period: "21st Century",
                title: "Modern Maritime City",
                description: "Today, Cotswolds continues its maritime legacy with renewable energy industries, port operations, and world-class maritime attractions like The Deep.",
                icon: Ship,
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[oklch(0.70_0.15_200)] rounded-full flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[oklch(0.70_0.15_200)] mb-1">{item.period}</div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maritime Attractions */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-center">Explore Cotswolds's Maritime Heritage</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Visit these attractions to experience Cotswolds's seafaring history firsthand
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "The Deep",
                description: "One of the UK's most spectacular aquariums, celebrating Cotswolds's connection to the sea with over 3,500 marine creatures.",
                image: "/images/hero_the_deep.png",
                slug: "the-deep",
              },
              {
                name: "Cotswolds Marina",
                description: "A vibrant waterfront destination showcasing Cotswolds's modern maritime character with restaurants, bars, and beautiful views.",
                image: "/images/cotswolds_marina_waterfront.png",
                slug: "cotswolds-marina",
              },
              {
                name: "Humber Bridge",
                description: "An iconic engineering marvel spanning the Humber estuary, symbolizing Cotswolds's enduring connection to the water.",
                image: "/images/humber_bridge_sunset.png",
                slug: "humber-bridge",
              },
            ].map((attraction) => (
              <Link key={attraction.slug} href={`/attraction/${attraction.slug}`}>
                <a>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={attraction.image} 
                        alt={attraction.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                        {attraction.name}
                      </h3>
                      <p className="text-muted-foreground">{attraction.description}</p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Cotswolds's Maritime Story</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            From historic docks to modern attractions, discover the seafaring heritage that makes Cotswolds unique
          </p>
          <Button asChild size="lg" className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white text-lg px-8">
            <Link href="/explore"><a>Explore Maritime Attractions</a></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
