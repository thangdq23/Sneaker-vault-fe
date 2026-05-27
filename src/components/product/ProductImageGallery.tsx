import type { MouseEvent } from "react";

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string;
  onSelectImage: (image: string) => void;
  isNewProduct: boolean;
  productName: string;
}

const ProductImageGallery = ({
  images,
  selectedImage,
  onSelectImage,
  isNewProduct,
  productName,
}: ProductImageGalleryProps): React.JSX.Element => (
  <div className="flex flex-col gap-4 md:col-span-7 md:flex-row">
    <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto md:flex-col md:overflow-visible">
      {images.map((image) => (
        <button
          key={image}
          type="button"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            onSelectImage(image);
          }}
          className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border md:h-24 md:w-24 ${
            selectedImage === image
              ? "border-primary"
              : "border-surface-container"
          } shadow-sm transition-shadow`}
        >
          <img
            src={image}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </div>

    <div className="relative aspect-square grow overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container shadow-lg">
      {isNewProduct ? (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-tertiary px-3 py-1 text-xs font-bold text-white shadow-lg">
          Mới
        </span>
      ) : null}
      <img
        className="h-full w-full object-cover"
        src={selectedImage || images[0] || "https://via.placeholder.com/720"}
        alt={productName}
      />
    </div>
  </div>
);

export default ProductImageGallery;
