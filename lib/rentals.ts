// =============================================================
//  EDIT YOUR LISTINGS HERE
//  Replace the photos in /public/rentals with your own images,
//  add a `video` path (e.g. "/rentals/unit-1-tour.mp4") to show
//  a video tour, and update the text/specs for each unit.
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
  size: number // in square meters
  floor: string
  /** First image is used as the cover photo. */
  images: string[]
  /** Optional video tour. Add an mp4 to /public/rentals and reference it here. */
  video?: string
  amenities: string[]
}

export const landlord = {
  buildingName: "Maple Court Residences",
  tagline: "A small, well-kept building with a handful of homes for rent.",
  intro:
    "Welcome! This is a private building with a few comfortable homes available to rent. Browse the photos and video tours below, and reach out anytime with questions or to arrange a visit.",
  address: "12 Maple Court, Riverside",
  phone: "+1 (555) 123-4567",
  // Digits only, with country code, no symbols — used for the WhatsApp link.
  whatsapp: "15551234567",
  email: "hello@maplecourt.example",
}

export const rentals: Rental[] = [
  {
    id: "unit-1",
    name: "Unit 1 — Garden Studio",
    status: "available",
    shortDescription: "Bright ground-floor studio with a private entrance.",
    description:
      "A cozy, light-filled studio on the ground floor with its own private entrance. Freshly painted with warm neutral tones, a comfortable living area, and plenty of natural daylight throughout the day. Ideal for one person or a couple.",
    price: 850,
    currency: "$",
    bedrooms: 0,
    bathrooms: 1,
    size: 32,
    floor: "Ground floor",
    images: ["/rentals/unit-1-living.png", "/rentals/unit-3-kitchen.png"],
    amenities: ["Private entrance", "Furnished", "Heating", "Wi-Fi ready", "Kitchenette"],
  },
  {
    id: "unit-2",
    name: "Unit 2 — One Bedroom",
    status: "available",
    shortDescription: "Quiet one-bedroom with a calm, restful bedroom.",
    description:
      "A comfortable one-bedroom home with a separate, restful bedroom and a bright living space. Tucked away at the back of the building for extra quiet. Comes partly furnished and ready to move in.",
    price: 1100,
    currency: "$",
    bedrooms: 1,
    bathrooms: 1,
    size: 48,
    floor: "Ground floor",
    images: ["/rentals/unit-2-bedroom.png", "/rentals/unit-1-living.png", "/rentals/unit-3-kitchen.png"],
    amenities: ["Furnished", "Heating", "Wi-Fi ready", "Full kitchen", "Quiet location"],
  },
  {
    id: "unit-3",
    name: "Unit 3 — Modern Kitchen Flat",
    status: "occupied",
    shortDescription: "Open-plan flat with a modern, light-wood kitchen.",
    description:
      "An open-plan apartment built around a modern light-wood kitchen with a small dining nook. Great natural light and a clean, contemporary feel. Currently occupied — get in touch to join the waiting list.",
    price: 1200,
    currency: "$",
    bedrooms: 1,
    bathrooms: 1,
    size: 52,
    floor: "First floor",
    images: ["/rentals/unit-3-kitchen.png", "/rentals/unit-4-living.png"],
    amenities: ["Modern kitchen", "Dining nook", "Heating", "Wi-Fi ready", "Lots of light"],
  },
  {
    id: "unit-4",
    name: "Unit 4 — Spacious Living",
    status: "available",
    shortDescription: "Larger flat with a generous, sunlit living room.",
    description:
      "Our largest layout, with a generous sunlit living room, room for a dining table, and views over the greenery outside. A great fit for those who want a little more space to spread out.",
    price: 1450,
    currency: "$",
    bedrooms: 2,
    bathrooms: 1,
    size: 68,
    floor: "First floor",
    images: ["/rentals/unit-4-living.png", "/rentals/unit-2-bedroom.png", "/rentals/unit-5-bathroom.png"],
    amenities: ["Spacious living room", "2 bedrooms", "Heating", "Wi-Fi ready", "Full kitchen", "Garden view"],
  },
  {
    id: "unit-5",
    name: "Unit 5 — Top Floor Retreat",
    status: "coming-soon",
    shortDescription: "Top-floor home with a fresh bathroom, available soon.",
    description:
      "A bright top-floor home with a freshly renovated bathroom and a peaceful atmosphere. Final touches are underway and it will be available to rent soon — reach out to be the first to know.",
    price: 1300,
    currency: "$",
    bedrooms: 1,
    bathrooms: 1,
    size: 54,
    floor: "Top floor",
    images: ["/rentals/unit-5-bathroom.png", "/rentals/unit-1-living.png"],
    amenities: ["Renovated bathroom", "Top floor", "Heating", "Wi-Fi ready", "Extra quiet"],
  },
  {
    id: "unit-6",
    name: "Unit 6 — Balcony Apartment",
    status: "available",
    shortDescription: "Charming flat with a private balcony for sunsets.",
    description:
      "A charming apartment with its own private balcony — the perfect spot for morning coffee or watching the sunset. Comfortable and full of character, with a warm, welcoming feel throughout.",
    price: 1250,
    currency: "$",
    bedrooms: 1,
    bathrooms: 1,
    size: 50,
    floor: "Top floor",
    images: ["/rentals/unit-6-balcony.png", "/rentals/unit-4-living.png"],
    amenities: ["Private balcony", "Furnished", "Heating", "Wi-Fi ready", "Sunset views"],
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
