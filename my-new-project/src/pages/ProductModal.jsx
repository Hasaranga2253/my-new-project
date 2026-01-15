import { useEffect } from "react";

function ProductModal({ product, onClose }) {
  if (!product) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🌫 Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* 🪟 Modal */}
<div
  className="relative bg-white dark:bg-gray-800
  rounded-xl shadow-2xl 
  max-w-4xl w-full mx-4 
  p-6 z-10
  animate-scale-in"
>

        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        {/* 📦 Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 w-full object-contain"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">
              {product.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product.description}
            </p>

            <p className="text-xl font-semibold mb-2">
              ${product.price}
            </p>

            {product.rating && (
              <p className="text-yellow-500 mb-2">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </p>
            )}

            <p className="text-sm text-gray-500 capitalize">
              Category: {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
