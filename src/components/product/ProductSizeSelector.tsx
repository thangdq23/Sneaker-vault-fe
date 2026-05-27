interface ProductSizeSelectorProps {
  sizes: Array<string | number>;
  selectedSize: string | number | null;
  onSelectSize: (size: string | number) => void;
  onOpenSizeGuide: () => void;
}

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
}: ProductSizeSelectorProps): React.JSX.Element => (
  <div className="rounded-3xl bg-surface-container p-5 sm:p-6">
    {/* header */}
    <div className="mb-3 flex items-start justify-between">
      <p className="text-sm font-bold text-on-surface-variant">Kích cỡ</p>

      <button
        type="button"
        onClick={onOpenSizeGuide}
        className="text-sm font-semibold text-primary underline underline-offset-4"
      >
        Hướng dẫn chọn size
      </button>
    </div>

    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isSelected = selectedSize === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelectSize(size)}
            className={`min-w-12 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
              isSelected
                ? "border-primary bg-primary text-on-primary"
                : "border-outline-variant text-on-surface hover:border-primary"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  </div>
);

export default ProductSizeSelector;
