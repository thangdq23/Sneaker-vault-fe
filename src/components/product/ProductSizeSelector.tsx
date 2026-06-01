interface ProductSizeInfo {
  size: number | string;
  stock: number;
}

interface ProductSizeSelectorProps {
  sizes: ProductSizeInfo[];
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
      {sizes && sizes.map((item) => {
        const isOutOfStock = item.stock <= 0;
        const isSelected = selectedSize === item.size;
        return (
          <button
            key={item.size}
            type="button"
            disabled={isOutOfStock}
            onClick={() => onSelectSize(item.size)}
            className={`min-w-12 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
              isOutOfStock
                ? "border-outline-variant/30 bg-surface-container/50 text-on-surface-variant/40 line-through cursor-not-allowed"
                : isSelected
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline-variant text-on-surface hover:border-primary cursor-pointer"
            }`}
          >
            {item.size}
          </button>
        );
      })}
    </div>
  </div>
);

export default ProductSizeSelector;

