import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { productVariants } from "../data/variants";
import { categories } from "../data/taxonomy";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";
import Breadcrumbs from "../components/common/Breadcrumbs";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [filters, setFilters] = useState({
    category: categorySlug ? [categorySlug] : [],
    brand: [],
    color: [],
    size: [],
    maxPrice: 300,
  });
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= filters.maxPrice);

    if (filters.category.length) {
      list = list.filter((p) => {
        const cat = categories.find((c) => c.category_id === p.category_id);
        return cat && filters.category.includes(cat.slug);
      });
    }
    if (filters.brand.length) {
      list = list.filter((p) => filters.brand.includes(p.brand_id));
    }
    if (filters.color.length || filters.size.length) {
      list = list.filter((p) => {
        const variants = productVariants.filter((v) => v.product_id === p.product_id);
        const colorMatch = !filters.color.length || variants.some((v) => filters.color.includes(v.colors_id));
        const sizeMatch = !filters.size.length || variants.some((v) => filters.size.includes(v.size_id));
        return colorMatch && sizeMatch;
      });
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [filters, sort]);

  const activeCategory = categories.find((c) => filters.category[0] === c.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs
        trail={[
          { label: "Home", to: "/" },
          { label: activeCategory ? activeCategory.name : "Shop all" },
        ]}
      />

      <div className="flex items-end justify-between mt-4 mb-8">
        <h1 className="display text-4xl md:text-5xl">{activeCategory ? activeCategory.name : "Shop all"}</h1>
        <button
          className="md:hidden eyebrow border border-line-strong px-3 py-2"
          onClick={() => setMobileFiltersOpen((v) => !v)}
        >
          Filters
        </button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <div className={`${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
          <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
        </div>

        <div>
          <div className="flex items-center justify-end mb-6">
            <label className="eyebrow flex items-center gap-2">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mono text-xs border border-line-strong bg-paper px-2 py-1.5 focus:border-ink"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
