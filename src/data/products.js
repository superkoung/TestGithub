// Mirrors: products table
export const products = [
  {
    product_id: 1,
    category_id: 1,
    brand_id: 1,
    name: "Strata Runner",
    slug: "strata-runner",
    description:
      "A lightweight daily trainer with a dual-density foam stack and a breathable engineered-knit upper. Built for pavement miles and everything after.",
    price: 128,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 2,
    category_id: 1,
    brand_id: 4,
    name: "Glide Trainer",
    slug: "glide-trainer",
    description:
      "Low-profile court trainer with a rubberized toe cap and a grippy herringbone outsole. Sits close to the ground for quick direction changes.",
    price: 145,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 3,
    category_id: 2,
    brand_id: 2,
    name: "Ridge Shell Jacket",
    slug: "ridge-shell-jacket",
    description:
      "A 3-layer waterproof shell with sealed seams and pit zips. Packs into its own chest pocket for travel.",
    price: 210,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 4,
    category_id: 2,
    brand_id: 1,
    name: "Talus Parka",
    slug: "talus-parka",
    description:
      "Insulated long parka rated to -15°C, with a removable faux-fur trim hood and a storm cuff at the wrist.",
    price: 260,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 5,
    category_id: 3,
    brand_id: 3,
    name: "Core Tee",
    slug: "core-tee",
    description:
      "220gsm combed cotton tee with a boxy fit and a dropped shoulder seam. The everyday base layer.",
    price: 38,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 6,
    category_id: 3,
    brand_id: 2,
    name: "Mesh Knit Crew",
    slug: "mesh-knit-crew",
    description:
      "Open-gauge knit crewneck with a ribbed collar. Layers clean under the Ridge Shell or worn alone.",
    price: 68,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 7,
    category_id: 4,
    brand_id: 4,
    name: "Field Cap",
    slug: "field-cap",
    description:
      "Six-panel cap in brushed cotton twill with a curved brim and an adjustable webbing strap.",
    price: 32,
    status: "active",
    deleted_at: null,
  },
  {
    product_id: 8,
    category_id: 4,
    brand_id: 3,
    name: "Transit Tote",
    slug: "transit-tote",
    description:
      "Structured tote in coated canvas with a zip-top closure and an internal laptop sleeve.",
    price: 58,
    status: "active",
    deleted_at: null,
  },
];

// Base photography per product (unsplash), reused across color variants
export const productPhotos = {
  1: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
  ],
  2: [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
  ],
  3: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1000&auto=format&fit=crop",
  ],
  4: [
    "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1000&auto=format&fit=crop",
  ],
  5: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
  ],
  6: [
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
  ],
  7: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop",
  ],
  8: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
  ],
};
