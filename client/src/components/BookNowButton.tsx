import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BookNowButtonProps {
  bookingUrl: string;
  businessName: string;
  type: "accommodation" | "restaurant";
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

export function BookNowButton({ 
  bookingUrl, 
  businessName, 
  type,
  className = "",
  variant = "default",
  size = "default"
}: BookNowButtonProps) {
  
  const handleClick = () => {
    // Track booking button click for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'booking_click', {
        event_category: type,
        event_label: businessName,
        value: 1
      });
    }
    
    // Add affiliate tracking parameters if needed
    // For example, append ?ref=explorecotswolds or &utm_source=explorecotswolds
    let trackedUrl = bookingUrl;
    
    // Add tracking parameter based on URL structure
    if (trackedUrl.includes('?')) {
      trackedUrl += '&ref=explorecotswolds';
    } else {
      trackedUrl += '?ref=explorecotswolds';
    }
    
    // Open in new tab
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
    >
      <span>Book Now</span>
      <ExternalLink className="w-4 h-4" />
    </Button>
  );
}
