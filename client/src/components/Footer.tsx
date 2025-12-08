import { Link } from "wouter";
import { TreePine } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.02_75)] text-white py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="w-6 h-6 text-[oklch(0.72_0.12_75)]" />
              <span className="text-xl font-bold">Explore Cotswolds</span>
            </div>
            <p className="text-gray-300">Your guide to discovering the best of the Cotswolds' attractions, events, and experiences.</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/explore"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Attractions</a></Link></li>
              <li><Link href="/events"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Events</a></Link></li>
              <li><Link href="/eat-drink"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Eat & Drink</a></Link></li>
              <li><Link href="/stay"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Stay</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Discover</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/tours"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Tours</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Blog</a></Link></li>
              <li><Link href="/travel-info"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Travel Info</a></Link></li>
              <li><Link href="/partner"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Partner With Us</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/contact"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Contact Us</a></Link></li>
              <li><Link href="/privacy"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-[oklch(0.72_0.12_75)] transition-colors">Terms of Service</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ExploreCotswolds.com. Operated by <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.72_0.12_75)] transition-colors underline">Lampstand Consulting</a>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
