require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URL = process.env.ATLAS_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@travelunbounded.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

if (!MONGODB_URL) {
  console.error("ATLAS_URL environment variable is required.");
  process.exit(1);
}

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" }
  },
  { timestamps: true }
);

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    country: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["india", "international"] },
    description: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    interests: [{ type: String }],
    highlights: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

const destinations = [
  {
    name: "Kerala",
    slug: "kerala",
    country: "India",
    category: "india",
    description: "Backwaters, beaches, greenery and unforgettable experiences.",
    price: "From ₹18,999",
    image: "/images/kerala.jpg",
    interests: ["relaxation", "beach", "culture"],
    highlights: ["Houseboat stay in Alleppey", "Munnar tea plantations", "Kovalam beach"],
    order: 1
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal",
    country: "India",
    category: "india",
    description: "Mountains, valleys and peaceful Himalayan escapes.",
    price: "From ₹16,999",
    image: "/images/himachal.jpg",
    interests: ["mountains", "adventure", "relaxation"],
    highlights: ["Shimla mall road", "Manali solang valley", "Rohtang Pass"],
    order: 2
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    country: "India",
    category: "india",
    description: "High-altitude landscapes, monasteries and adventure.",
    price: "From ₹24,999",
    image: "/images/ladakh.jpg",
    interests: ["adventure", "mountains", "culture"],
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass"],
    order: 3
  },
  {
    name: "Andaman",
    slug: "andaman",
    country: "India",
    category: "india",
    description: "Crystal-clear waters, beaches and island adventures.",
    price: "From ₹22,999",
    image: "/images/andaman.jpg",
    interests: ["beach", "adventure", "relaxation"],
    highlights: ["Radhanagar Beach", "Scuba diving at Havelock", "Cellular Jail"],
    order: 4
  },
  {
    name: "Goa",
    slug: "goa",
    country: "India",
    category: "india",
    description: "Beaches, culture, food and relaxed coastal experiences.",
    price: "From ₹12,999",
    image: "/images/goa.jpg",
    interests: ["beach", "culture", "food"],
    highlights: ["Baga Beach", "Old Goa churches", "Anjuna flea market"],
    order: 5
  },
  {
    name: "Kenya",
    slug: "kenya",
    country: "Africa",
    category: "international",
    description: "Safari adventures and spectacular African landscapes.",
    price: "From ₹74,999",
    image: "/images/kenya.jpg",
    interests: ["wildlife", "adventure", "sightseeing"],
    highlights: ["Masai Mara safari", "Amboseli National Park", "Great Migration"],
    order: 6
  },
  {
    name: "Vietnam",
    slug: "vietnam",
    country: "Asia",
    category: "international",
    description: "Culture, cuisine, beaches and beautiful cities.",
    price: "From ₹54,999",
    image: "/images/vietnam.jpg",
    interests: ["culture", "food", "beach"],
    highlights: ["Ha Long Bay cruise", "Hoi An ancient town", "Ho Chi Minh City"],
    order: 7
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    country: "Africa",
    category: "international",
    description: "Wildlife, Zanzibar and extraordinary natural beauty.",
    price: "From ₹89,999",
    image: "/images/tanzania.jpg",
    interests: ["wildlife", "beach", "adventure"],
    highlights: ["Serengeti safari", "Zanzibar beaches", "Mount Kilimanjaro"],
    order: 8
  },
  {
    name: "Iceland",
    slug: "iceland",
    country: "Europe",
    category: "international",
    description: "Glaciers, waterfalls, volcanoes and northern landscapes.",
    price: "From ₹1,39,999",
    image: "/images/iceland.jpg",
    interests: ["adventure", "wildlife", "heritage"],
    highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle"],
    order: 9
  },
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    country: "Asia",
    category: "international",
    description: "Tropical beaches, heritage and incredible cuisine.",
    price: "From ₹39,999",
    image: "/images/sri-lanka.jpg",
    interests: ["beach", "culture", "heritage"],
    highlights: ["Sigiriya Rock Fortress", "Ella train ride", "Galle Fort"],
    order: 10
  }
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URL);
  console.log("Connected.\n");

  // Seed admin
  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`Admin '${ADMIN_EMAIL}' already exists. Skipping.`);
  } else {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await Admin.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "superadmin"
    });
    console.log(`Admin created: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
  }

  // Seed destinations
  console.log("\nSeeding destinations...");
  let created = 0;
  let skipped = 0;

  for (const dest of destinations) {
    const existing = await Destination.findOne({ slug: dest.slug });
    if (existing) {
      skipped++;
    } else {
      await Destination.create(dest);
      created++;
      console.log(`  + ${dest.name}`);
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
