// Mirrors: colors, sizes, categories, brands, roles tables

export const colors = [
  { color_id: 1, color_name: "Jet Black", color_code: "#14140F" },
  { color_id: 2, color_name: "Chalk White", color_code: "#F4F2EC" },
  { color_id: 3, color_name: "Signal Blue", color_code: "#1D3AF2" },
  { color_id: 4, color_name: "Flare Orange", color_code: "#FF4B1F" },
  { color_id: 5, color_name: "Olive", color_code: "#5B5E3F" },
  { color_id: 6, color_name: "Clay", color_code: "#B8654A" },
  { color_id: 7, color_name: "Stone Grey", color_code: "#9C978A" },
];

export const sizes = [
  { size_id: 1, name: "XS" },
  { size_id: 2, name: "S" },
  { size_id: 3, name: "M" },
  { size_id: 4, name: "L" },
  { size_id: 5, name: "XL" },
  { size_id: 6, name: "US 8" },
  { size_id: 7, name: "US 9" },
  { size_id: 8, name: "US 10" },
  { size_id: 9, name: "US 11" },
];

export const categories = [
  {
    category_id: 1,
    name: "Footwear",
    slug: "footwear",
    description: "Runners, trainers and everyday sneakers.",
    image_path: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    status: "active",
    deleted_at: null,
  },
  {
    category_id: 2,
    name: "Outerwear",
    slug: "outerwear",
    description: "Jackets and shells built for weather.",
    image_path: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    status: "active",
    deleted_at: null,
  },
  {
    category_id: 3,
    name: "Tops",
    slug: "tops",
    description: "Tees, knits and layering pieces.",
    image_path: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    status: "active",
    deleted_at: null,
  },
  {
    category_id: 4,
    name: "Accessories",
    slug: "accessories",
    description: "Bags, caps and the finishing pieces.",
    image_path: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    status: "active",
    deleted_at: null,
  },
];

export const brands = [
  {
    brand_id: 1,
    brand_name: "NOTCH",
    slug: "notch",
    image_path: "",
    status: "active",
    deleted_at: null,
  },
  {
    brand_id: 2,
    brand_name: "Fieldwork Co.",
    slug: "fieldwork-co",
    image_path: "",
    status: "active",
    deleted_at: null,
  },
  {
    brand_id: 3,
    brand_name: "Aux Studio",
    slug: "aux-studio",
    image_path: "",
    status: "active",
    deleted_at: null,
  },
  {
    brand_id: 4,
    brand_name: "Low Orbit",
    slug: "low-orbit",
    image_path: "",
    status: "active",
    deleted_at: null,
  },
];

export const roles = [
  { role_id: 1, name: "customer", description: "Storefront shopper" },
  { role_id: 2, name: "admin", description: "Back-office administrator" },
];
