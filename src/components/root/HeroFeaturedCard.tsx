import { Button } from "@/components/ui/button";
import { propertyImageNeedsUnoptimized } from "@/lib/property/property-image-unoptimized";
import { getPrimaryDisplayImageUrl } from "@/lib/property/resolve-thumbnail-url";
import type { PropertiesResponse } from "@/types/domain-types";
import { Bath, Bed, HomeIcon, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatPrice(currency: string | undefined, price: number | undefined) {
  if (!price) return "Price on request";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "KES",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency ?? ""} ${price}`;
  }
}

function HeroFeaturedCardFallback() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden border border-base-200 aspect-video max-h-[800px]">
      <div className="grid md:grid-cols-2 gap-0 h-full">
        <div className="relative h-full w-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-primary/20 rounded-lg transform rotate-45 absolute top-8 left-8"></div>
            <div className="w-24 h-24 bg-accent/30 rounded-full absolute top-16 right-8"></div>
            <div className="w-16 h-40 bg-primary/15 rounded-lg absolute bottom-8 left-16"></div>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-8 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>

            <div className="flex gap-4 pt-4">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-24"></div>
            </div>

            <div className="pt-4">
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeroFeaturedCardProps {
  property: PropertiesResponse | null;
}

export function HeroFeaturedCard({ property }: HeroFeaturedCardProps) {
  if (!property) {
    return <HeroFeaturedCardFallback />;
  }

  const imageUrl = getPrimaryDisplayImageUrl(property, "1200x800");
  const locationLabel = [property.city, property.state, property.country].filter(Boolean).join(", ");

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden border border-base-200 aspect-video max-h-[800px]">
      <div className="grid md:grid-cols-2 gap-0 h-full">
        <div className="relative h-full w-full min-h-[200px]">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={property.title ? `${property.title} image` : "Featured Property"}
                fill
                priority={true}
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                unoptimized={propertyImageNeedsUnoptimized(imageUrl)}
                decoding="sync"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/60">
              <div className="text-center">
                <HomeIcon className="h-20 w-20 mx-auto mb-4 opacity-70" />
                <p className="text-base font-medium tracking-wide">No Image Available</p>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium border border-base-200">
              {formatPrice(property.currency, property.price)}
              {property.listing_type === "rent" ? "/mo" : ""}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{locationLabel || "Location not specified"}</span>
          </div>

          <h2 className="text-3xl font-semibold text-foreground mb-4">
            {property.title || "Untitled Property"}
          </h2>

          <p className="text-muted-foreground text-base mb-6 flex-grow">
            {property.description ||
              "Discover this exceptional property in a prime location. Contact us for more details about this exclusive offering."}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-primary" />
              <span className="font-medium">{property.beds || 0} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-primary" />
              <span className="font-medium">{property.baths || 0} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-primary" />
              <span className="font-medium">{property.building_size_sqft || 0} sq ft</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href={`/properties/${property.id}`} className="w-full">
              <Button
                size="lg"
                className="w-full"
                aria-label={`View details for ${property.title || "featured property"} in ${locationLabel || "unspecified location"}`}
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
