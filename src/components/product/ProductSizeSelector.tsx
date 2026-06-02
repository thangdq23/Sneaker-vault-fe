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
  <div className="rounded-2xl bg-surface-container/60 p-4">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-xs font-bold text-on-surface-variant">Kích cỡ</p>

      <button
        type="button"
        onClick={onOpenSizeGuide}
        className="text-xs font-semibold text-primary underline underline-offset-4 cursor-pointer"
      >
        Hướng dẫn chọn size
      </button>
    </div>

    <div className="flex flex-wrap gap-1.5">
      {sizes && sizes.map((item) => {
        const isOutOfStock = item.stock <= 0;
        const isSelected = selectedSize === item.size;
        return (
          <button
            key={item.size}
            type="button"
            disabled={isOutOfStock}
            onClick={() => onSelectSize(item.size)}
            className={`min-w-10 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
              isOutOfStock
                ? "border-outline-variant/20 bg-surface-container/30 text-on-surface-variant/30 line-through cursor-not-allowed"
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

