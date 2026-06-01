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
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err: any) {
      alert(err || "Lỗi khi thêm vào giỏ hàng.");
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
      alert("Vui lòng chọn size giày.");
      return;
    }
    try {
      setIsAdding(true);
      await dispatch(
        addCartItem({ productId: id!, size: selectedSize, quantity }),
      ).unwrap();
      navigate("/cart");
    } catch (err: any) {
      alert(err || "Lỗi khi mua sản phẩm.");
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
    return getRelatedProducts(product, allProducts, 4);
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
              <ProductRating rating={5} />
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

            <div className="rounded-3xl bg-surface-container p-5 sm:p-6">
              <p
                className={`mb-3 text-base font-semibold sm:text-lg ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              </p>
              <QuantitySelector
                value={quantity}
                max={maxQuantity}
                onChange={setQuantity}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                disabled={isOutOfStock || isAdding}
                onClick={handleAddToCart}
                className="btn btn-primary btn-pill w-full sm:w-auto sm:min-w-44 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAdding ? "Đang xử lý..." : "Thêm vào giỏ"}
              </button>
              <button
                type="button"
                disabled={isOutOfStock || isAdding}
                onClick={handleBuyNow}
                className="btn btn-secondary btn-pill w-full sm:w-auto sm:min-w-36 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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
