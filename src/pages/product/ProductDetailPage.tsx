import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/navigation/Breadcrumb";
import ProductCard from "../../components/product/ProductCard";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductRating from "../../components/product/ProductRating";
import ProductSizeSelector from "../../components/product/ProductSizeSelector";
import QuantitySelector from "../../components/product/QuantitySelector";
import SizeGuideModal from "../../components/product/SizeGuideModal";
import { getProductById, getProducts } from "../../services/productApi";
import type { Product } from "../../types/product.type";
import { formatVnd } from "../../utils/formatCurrency";
import { getRelatedProducts } from "../../utils/getRelatedProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addCartItem } from "../../store/cartSlice";
import { useToast } from "../../contexts/ToastContext";

const getDiscountPercent = (product: Product): number | null => {
  if (!product.isSale) return null;

  if (product.discountPercent != null && product.discountPercent > 0) {
    return Math.round(product.discountPercent);
  }

  if (
    product.salePrice != null &&
    product.price > 0 &&
    product.salePrice < product.price
  ) {
    return Math.round((1 - product.salePrice / product.price) * 100);
  }

  return null;
};

const ProductDetailPage = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Thiếu mã sản phẩm.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [data, productsRes] = await Promise.all([
          getProductById(id),
          getProducts(),
        ]);
        setProduct(data);
        setAllProducts(productsRes.products);
        setSelectedImage(data.images?.[0] ?? "");
        const firstInStock = data.sizes?.find((s) => s.stock > 0);
        setSelectedSize(
          firstInStock ? firstInStock.size : (data.sizes?.[0]?.size ?? null),
        );
        setQuantity(1);
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Không thể tải chi tiết sản phẩm.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [id, dispatch]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate(`/login?redirect=/products/${id}`);
      return;
    }
    if (selectedSize === null) {
      alert("Vui lòng chọn size giày.");
      return;
    }
    try {
      setIsAdding(true);
      await dispatch(
        addCartItem({ productId: id!, size: selectedSize, quantity }),
      ).unwrap();
      showToast("Đã thêm sản phẩm vào giỏ hàng!", "success");
    } catch (err: any) {
      showToast(err || "Lỗi khi thêm vào giỏ hàng.", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!token) {
      navigate(`/login?redirect=/products/${id}`);
      return;
    }
    if (selectedSize === null) {
      showToast("Vui lòng chọn size giày.", "error");
      return;
    }
    try {
      setIsAdding(true);
      await dispatch(
        addCartItem({ productId: id!, size: selectedSize, quantity }),
      ).unwrap();
      showToast("Đã thêm sản phẩm vào giỏ hàng!", "success");
      navigate("/cart");
    } catch (err: any) {
      showToast(err || "Lỗi khi mua sản phẩm.", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const maxQuantity = useMemo(() => {
    if (!product) return 1;
    if (selectedSize !== null) {
      const sizeInfo = product.sizes?.find((s) => s.size === selectedSize);
      if (sizeInfo) {
        return Math.max(1, sizeInfo.stock);
      }
    }
    return Math.max(1, product.stock);
  }, [product, selectedSize]);

  useEffect(() => {
    setQuantity((prev) => Math.min(prev, maxQuantity));
  }, [maxQuantity]);

  const priceLabel = useMemo(() => {
    if (!product) return "";
    return formatVnd(product.price);
  }, [product]);

  const saleLabel = useMemo(() => {
    if (!product || !product.isSale || product.salePrice == null) return null;
    return formatVnd(product.salePrice);
  }, [product]);

  const discountPercent = useMemo(
    () => (product ? getDiscountPercent(product) : null),
    [product],
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product, allProducts, 5);
  }, [product, allProducts]);

  if (isLoading) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max px-margin-mobile py-20 text-center text-on-surface-variant md:px-margin-desktop">
          Đang tải chi tiết sản phẩm...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max rounded-3xl bg-rose-50 px-margin-mobile py-20 text-center text-rose-700 md:px-margin-desktop">
          {error}
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-container-max px-margin-mobile py-20 text-center text-on-surface-variant md:px-margin-desktop">
          Không tìm thấy sản phẩm.
        </div>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <Breadcrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Cửa hàng", to: "/shop" },
            { label: product.name },
          ]}
        />

        <section className="grid grid-cols-1 gap-gutter md:grid-cols-12 lg:gap-16">
          <ProductImageGallery
            images={product.images}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            isNewProduct={product.isNewProduct}
            productName={product.name}
          />

          <div className="flex flex-col gap-5 md:col-span-5 lg:gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-on-surface-variant">
                {product.brand}
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-balance text-on-surface sm:text-8xl md:text-[2.2rem]">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <ProductRating rating={5} />
                <span className="text-outline-variant/60 hidden sm:inline">|</span>
                <div className="text-xs sm:text-sm text-on-surface-variant">
                  <span className="font-semibold text-on-surface">Mã sản phẩm:</span>{" "}
                  <span className="font-mono bg-surface-container-high px-1.5 py-0.5 rounded text-xs">{product.sku}</span>
                </div>
              </div>
            </div>

            {/* Stock status placed above price */}
            <div className="flex items-center">
              <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              {saleLabel ? (
                <>
                  <span className="price-vnd text-2xl font-bold text-red-600 sm:text-3xl">
                    {saleLabel}
                  </span>
                  <span className="price-vnd text-base text-gray-400 line-through sm:text-lg">
                    {priceLabel}
                  </span>
                </>
              ) : (
                <span className="price-vnd text-2xl font-bold text-red-600 sm:text-3xl">
                  {priceLabel}
                </span>
              )}
              {discountPercent != null ? (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">
                  -{discountPercent}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2"></div>

            <ProductSizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />

            <div className="rounded-2xl bg-surface-container/60 p-4">
              <QuantitySelector
                value={quantity}
                max={maxQuantity}
                onChange={setQuantity}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row mt-2">
              <button
                type="button"
                disabled={isOutOfStock || isAdding}
                onClick={handleAddToCart}
                className="btn w-full sm:flex-1 min-h-[3.25rem] px-8 py-3.5 text-base font-bold rounded-full border-2 border-red-600 bg-white text-red-600 hover:bg-red-50 active:scale-98 transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isAdding ? "Đang xử lý..." : "Thêm vào giỏ"}
              </button>
              <button
                type="button"
                disabled={isOutOfStock || isAdding}
                onClick={handleBuyNow}
                className="btn w-full sm:flex-1 min-h-[3.25rem] px-8 py-3.5 text-base font-bold rounded-full border-2 border-red-600 bg-red-600 text-white hover:bg-red-700 active:scale-98 transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isAdding ? "Đang xử lý..." : "Mua ngay"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-surface-container p-5 sm:mt-12 sm:p-6 lg:mt-14">
          <h2 className="mb-3 text-sm font-bold text-on-surface sm:text-base">
            Mô tả sản phẩm
          </h2>
          <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
            {product.description}
          </p>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="mt-12 sm:mt-14 lg:mt-16">
            <h2 className="section-title text-primary">Sản phẩm liên quan</h2>
            <p className="section-desc mb-6">
              Các mẫu cùng thương hiệu hoặc danh mục bạn có thể thích.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related._id ?? related.id ?? related.name}
                  product={related}
                />
              ))}
            </div>
          </section>
        ) : null}

        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      </div>
    </main>
  );
};

export default ProductDetailPage;
