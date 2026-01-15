import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filters";
import useFavorites from "../hooks/useFavorites";
import ProductModal from "./ProductModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* 📦 Load Products */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* 🛑 Lock scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

  /* ⭐ Average price (safe) */
  const averagePrice = useMemo(() => {
    if (!products.length) return 0;
    return (
      products.reduce(
        (sum, p) => sum + (typeof p.price === "number" ? p.price : 0),
        0
      ) / products.length
    );
  }, [products]);

  /* 🏷 Categories (safe) */
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  /* 🔍 Filter + Sort (safe) */
  const sortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        const title = product?.title?.toLowerCase() || "";
        const category = product?.category || "";

        const matchesSearch = title.includes(
          searchTerm.toLowerCase()
        );

        const matchesCategory =
          selectedCategory === "all" ||
          category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "lowToHigh") return a.price - b.price;
        if (sortOrder === "highToLow") return b.price - a.price;
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortOrder]);

  /* 🦴 Skeleton Loader */
  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-72 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ❌ Error State */
  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

      {/* 🔥 HERO */}
      <div
        className="relative h-56 md:h-64 flex items-center justify-center mb-8"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/f2/1c/dc/f21cdc5e254c27a37b1237de25fdad2f.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Discover Products You’ll Love
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            Browse, filter, and explore curated items
          </p>
        </div>
      </div>

      {/* 📦 CONTENT */}
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔍 Search + Filter + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort by price</option>
            <option value="lowToHigh">Low → High</option>
            <option value="highToLow">High → Low</option>
          </select>
        </div>

        {/* 🛍 PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12">
          {sortedProducts.length ? (
            sortedProducts.map((product) => {
              if (!product?.id) return null;

              const isRecommended =
                (product.rating?.rate > 4) ||
                product.price < averagePrice;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={toggleFavorite}
                  isRecommended={isRecommended}
                  onView={() => setSelectedProduct(product)}
                />
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      </div>

      {/* 🪟 PRODUCT MODAL (SAFE) */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;
