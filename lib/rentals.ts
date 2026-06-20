// =============================================================
//  EDIT YOUR LISTINGS HERE
//  Photos live in /public/pravik. To add a new photo, drop the
//  file in that folder and reference it as "/pravik/your-file.jpeg".
//  Update the contact details, rent, and text for each flat below.
// =============================================================

export type Rental = {
  id: string
  name: string
  status: "available" | "occupied" | "coming-soon"
  shortDescription: string
  description: string
  price: number // monthly rent
  currency: string
  bedrooms: number
  bathrooms: number
  size: number // in square feet
  floor: string
  /** First image is used as the cover photo. */
  images: string[]
  /** Optional video tour. Add an mp4 to /public/pravik and reference it here. */
  video?: string
  amenities: string[]
}

export const landlord = {
  buildingName: "PravikHomes",
  tagline: "Brand-new, semi-furnished 2BHK flats for rent in a quiet, well-kept building.",
  intro:
    "PravikHomes is a newly built residential building with a handful of bright, semi-furnished 2BHK flats for rent. Each home comes with a modern modular kitchen, fitted wardrobes, large windows and plenty of light.",
  address: "Bengaluru, Karnataka",
  // Contact email used in the Contact section and enquiry mailto links.
  email: "pravikpremiumappartments@gmail.com",
}

/**
 * Building-wide features shared by every flat. Edit the title/description
 * of each item, or add a new one following the same shape.
 */
export const buildingFeatures: { icon: BuildingFeatureIcon; title: string; description: string }[] = [
  {
    icon: "droplet",
    title: "Water softener",
    description: "Soft water throughout the building — gentle on skin, hair, appliances and fittings.",
  },
  {
    icon: "sun",
    title: "Solar water heaters",
    description: "Hot water powered by rooftop solar, so you enjoy warm showers with lower running costs.",
  },
  {
    icon: "door",
    title: "Separate residential entrance",
    description: "A private entrance reserved for residents, kept apart from any other access.",
  },
  {
    icon: "car",
    title: "Secure tenant parking",
    description: "Gated parking exclusively for tenants — no outside access to the parking area.",
  },
]

export type BuildingFeatureIcon = "droplet" | "sun" | "door" | "car"

const commonAmenities = [
  "Modern modular kitchen",
  "Fitted wardrobes",
  "Attached bathrooms with geyser point",
  "Vitrified tile flooring",
  "Wooden-finish flooring in bedrooms",
  "Balcony",
  "Ceiling fans & lights fitted",
  "Lift access",
  "24/7 water supply",
  "Covered parking",
]

export const rentals: Rental[] = [
  {
    id: "301",
    name: "301 — 2BHK",
    status: "occupied",
    shortDescription: "Comfortable 2BHK on the 3rd floor.",
    description:
      "A semi-furnished 2BHK with modular kitchen, fitted wardrobes and attached bathrooms. Quiet and well lit.",
    price: 22000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1000,
    floor: "3rd floor",
    images: ["/pravik/photo-3.jpeg", "/pravik/photo-4.jpeg", "/pravik/photo-7.jpeg"],
    amenities: commonAmenities,
  },
  {
    id: "302",
    name: "302 — 2BHK",
    status: "occupied",
    shortDescription: "Bright 2BHK on the 3rd floor with balcony.",
    description:
      "A bright 2BHK on the third floor with modern finishes and a balcony. Semi-furnished and comfortable.",
    price: 23000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    floor: "3rd floor",
    images: ["/pravik/photo-11.jpeg", "/pravik/photo-1.jpeg", "/pravik/photo-8.jpeg"],
    amenities: commonAmenities,
  },
  {
    id: "401",
    name: "401 — 2BHK",
    status: "occupied",
    shortDescription: "Spacious 2BHK on the 4th floor.",
    description:
      "A spacious 2BHK on the 4th floor with the same quality finishes throughout — modular kitchen, fitted wardrobes and attached bathrooms.",
    price: 21000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    floor: "4th floor",
    images: ["/pravik/photo-6.jpeg", "/pravik/photo-16.jpeg"],
    amenities: commonAmenities,
  },
  {
    id: "402",
    name: "402 — 2BHK",
    status: "available",
    shortDescription: "Now available — 2BHK on the 3rd floor.",
    description:
      "Unit 402 is available for immediate move-in. Located on the 3rd floor, semi-furnished with modular kitchen, fitted wardrobes and attached bathrooms. Rent ₹29,000/month.",
    price: 29000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
    floor: "3rd floor",
    images: ["/pravik/photo-18.jpeg", "/pravik/photo-5.jpeg", "/pravik/photo-16.jpeg"],
    amenities: commonAmenities,
  },
]

export function getRental(id: string) {
  return rentals.find((r) => r.id === id)
}

export const statusLabels: Record<Rental["status"], string> = {
  available: "Available",
  occupied: "Occupied",
  "coming-soon": "Coming soon",
}
