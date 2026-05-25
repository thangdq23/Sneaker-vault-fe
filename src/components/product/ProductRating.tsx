interface ProductRatingProps {
  rating?: number;
  reviewCount?: number;
}

const ProductRating = ({
  rating = 5,
  reviewCount,
}: ProductRatingProps): React.JSX.Element => {
  const clamped = Math.min(5, Math.max(0, rating));
  const displayRating = clamped.toFixed(1);

  return (
    <div
      className="flex items-center gap-1 text-on-surface-variant"
      aria-label={`Đánh giá ${displayRating} trên 5`}
    >
      <span
        className="material-symbols-outlined text-[14px] leading-none text-amber-500"
        style={{ fontVariationSettings: "'FILL' 1" }}
        aria-hidden
      >
        star
      </span>
      <span className="text-xs font-semibold text-on-surface sm:text-sm">
        {displayRating}
      </span>
      {reviewCount != null ? (
        <span className="text-[11px] text-on-surface-variant/80">
          ({reviewCount})
        </span>
      ) : null}
    </div>
  );
};

export default ProductRating;
