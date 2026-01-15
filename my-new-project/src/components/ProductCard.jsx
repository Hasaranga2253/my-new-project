function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  isRecommended = false,
  onView,
}) {
  /* 🛡️ HARD SAFETY GUARD */
  if (!product) return null;

  const {
    id,
    title = "Untitled Product",
    image = "",
    price = 0,
    category = "unknown",
    rating,
  } = product;

  // ⭐ Render stars safely
  const renderStars = (rate = 0) => {
    const safeRate =
      typeof rate === "number" && rate > 0 ? rate : 0;
    const rounded = Math.round(safeRate);

    return (
      <>
        {"★".repeat(rounded)}
        {"☆".repeat(5 - rounded)}
      </>
    );
  };

  return (
    <div
      className="group relative flex flex-col
      rounded-xl border bg-white
      p-4 shadow-sm
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* ⭐ Recommended Badge */}
      {isRecommended && (
        <span
          className="absolute top-2 left-2 z-10
          rounded bg-green-600 px-2 py-1
          text-xs font-medium text-white"
        >
          Recommended
        </span>
      )}

      {/* ❤️ Favorite Button */}
      {onToggleFavorite && id != null && (
        <button
          type="button"
          onClick={() => onToggleFavorite(id)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="absolute top-2 right-2 z-10
          flex h-9 w-9 items-center justify-center
          rounded-full bg-black/70 text-xl text-white
          transition-transform duration-200
          hover:scale-110 focus:outline-none"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}

      {/* 🖼 Product Image */}
      <div className="mb-4 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-40 w-full object-contain
            transition-transform duration-300
            group-hover:scale-105"
          />
        ) : (
          <div className="h-40 w-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* 🏷 Title */}
      <h2 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
        {title}
      </h2>

      {/* ⭐ Rating */}
      {rating && (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="tracking-wide text-yellow-500">
            {renderStars(rating.rate)}
          </span>
          <span className="text-xs text-gray-400">
            ({rating.count ?? 0})
          </span>
        </div>
      )}

      {/* 💲 Price */}
      <p className="mb-1 font-semibold text-gray-900">
        ${price}
      </p>

      {/* 🏷 Category */}
      <p className="mb-4 text-xs capitalize text-gray-500">
        {category}
      </p>

      {/* 🔍 View Product */}
      <button
        type="button"
        onClick={onView}
        disabled={!onView}
        className="mt-auto rounded-lg bg-blue-600 py-2
        text-center text-white
        transition-all duration-300
        hover:bg-blue-700 hover:scale-[1.02]
        focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-60"
      >
        View Product
      </button>
    </div>
  );
}

export default ProductCard;
