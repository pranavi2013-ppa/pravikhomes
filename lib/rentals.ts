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
    "PravikHomes is a newly built residential building with a handful of bright, semi-furnished 2BHK flats for rent. Each home comes with a modern modular kitchen, fitted wardrobes, large windows and attached bathrooms. Browse the photos and walkthrough video below, and reach out anytime to arrange a visit.",
  address: "Bengaluru, Karnataka",
  // TODO: replace with your real phone number.
  phone: "+91 90000 00000",
  // Digits only, with country code, no symbols — used for the WhatsApp link.
  whatsapp: "919000000000",
  // TODO: replace with your real email.
  email: "pravikhomes@example.com",
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
    id: "flat-2f",
    name: "2nd Floor — 2BHK",
    status: "available",
    shortDescription: "Bright 2BHK with a spacious hall, modular kitchen and balcony.",
    description:
      "A bright, semi-furnished 2BHK on the second floor. A spacious hall with marble-finish flooring opens onto a balcony, and the modular kitchen comes with granite counters, a chimney and a separate utility area. Both bedrooms have fitted wardrobes with dressers and warm wooden-finish flooring, plus modern attached bathrooms. Ready to move in.",
    price: 22000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    floor: "2nd floor",
    images: [
      "/pravik/photo-18.jpeg",
      "/pravik/photo-5.jpeg",
      "/pravik/photo-16.jpeg",
      "/pravik/photo-15.jpeg",
      "/pravik/photo-14.jpeg",
      "/pravik/photo-12.jpeg",
    ],
    video: "/pravik/tour.mp4",
    amenities: commonAmenities,
  },
  {
    id: "flat-3f",
    name: "3rd Floor — 2BHK",
    status: "available",
    shortDescription: "Quiet upper-floor 2BHK with great light and fitted wardrobes.",
    description:
      "A peaceful 2BHK on the third floor with excellent natural light. The open hall flows into a teal modular kitchen with granite counters and a marble backsplash. Both bedrooms feature full-height glossy wardrobes with dressing mirrors and attached bathrooms finished in marble tile. Move-in ready.",
    price: 23000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    floor: "3rd floor",
    images: [
      "/pravik/photo-11.jpeg",
      "/pravik/photo-1.jpeg",
      "/pravik/photo-8.jpeg",
      "/pravik/photo-17.jpeg",
      "/pravik/photo-9.jpeg",
    ],
    video: "/pravik/tour.mp4",
    amenities: commonAmenities,
  },
  {
    id: "flat-1f",
    name: "1st Floor — 2BHK",
    status: "occupied",
    shortDescription: "Comfortable first-floor 2BHK — currently occupied.",
    description:
      "A comfortable semi-furnished 2BHK on the first floor with the same modern finishes as the rest of the building — modular kitchen, fitted wardrobes and attached bathrooms. This flat is currently occupied; get in touch to join the waiting list and we'll let you know as soon as it frees up.",
    price: 21000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1000,
    floor: "1st floor",
    images: [
      "/pravik/photo-3.jpeg",
      "/pravik/photo-4.jpeg",
      "/pravik/photo-7.jpeg",
      "/pravik/photo-10.jpeg",
    ],
    amenities: commonAmenities,
  },
  {
    id: "flat-top",
    name: "Top Floor — 2BHK",
    status: "coming-soon",
    shortDescription: "Top-floor 2BHK with final touches underway — available soon.",
    description:
      "A bright top-floor 2BHK with a little extra privacy and the same quality finishes throughout — modular kitchen, fitted wardrobes, wooden-finish bedroom flooring and modern bathrooms. Final touches are underway and it will be available to rent soon. Reach out to be the first to know.",
    price: 23000,
    currency: "₹",
    bedrooms: 2,
    bathrooms: 2,
    size: 1050,
    floor: "Top floor",
    images: [
      "/pravik/photo-6.jpeg",
      "/pravik/photo-16.jpeg",
      "/pravik/photo-13.jpeg",
      "/pravik/photo-18.jpeg",
    ],
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
