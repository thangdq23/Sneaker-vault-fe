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
import { getProductReviews, createReview } from "../../services/reviewApi";
import { getMyOrders } from "../../services/orderApi";

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
  const { token, user } = useAppSelector((state) => state.auth);
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

  const [reviews, setReviews] = useState<any[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [ratingForm, setRatingForm] = useState(5);
  const [commentForm, setCommentForm] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [nameForm, setNameForm] = useState("");

  useEffect(() => {
    if (user) {
      setNameForm(user.name || "");
    }
  }, [user]);

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
        const [data, productsRes, reviewsRes] = await Promise.all([
          getProductById(id),
          getProducts(),
          getProductReviews(id),
        ]);
        setProduct(data);
        setAllProducts(productsRes.products);
        setReviews(reviewsRes);
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

  useEffect(() => {
    const checkUserEligibility = async () => {
      if (!token || !user || !id) {
        setCanReview(false);
        return;
      }
      try {
        const alreadyReviewed = reviews.some(
          (r: any) => r.user?._id === user._id || r.user === user._id,
        );
        if (alreadyReviewed) {
          setCanReview(false);
          return;
        }

        const ordersRes = await getMyOrders({ limit: 100 });
        const orders = ordersRes.data || [];
        const hasDeliveredOrder = orders.some(
          (o: any) =>
            o.status === "delivered" &&
            o.items.some((item: any) =>
              typeof item.product === "string"
                ? item.product === id
                : item.product?._id === id,
            ),
        );
        setCanReview(hasDeliveredOrder);
      } catch (err) {
        console.error("Error checking review eligibility:", err);
      }
    };

    if (reviews.length >= 0) {
      void checkUserEligibility();
    }
  }, [token, user, id, reviews]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setIsSubmittingReview(true);
      const newReview = await createReview(id, ratingForm, commentForm);
      showToast("Đánh giá sản phẩm thành công!", "success");
      setReviews((prev) => [newReview, ...prev]);
      setCommentForm("");
      setRatingForm(5);
      setCanReview(false);
      setIsReviewModalOpen(false);

      const updatedProduct = await getProductById(id);
      setProduct(updatedProduct);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Không thể gửi đánh giá. Vui lòng thử lại.";
      showToast(message, "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

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
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                >
                  <ProductRating
                    rating={product.rating ?? 0}
                    reviewCount={product.numReviews ?? 0}
                  />
                </button>
                <span className="text-outline-variant/60 hidden sm:inline">
                  |
                </span>
                <div className="text-xs sm:text-sm text-on-surface-variant">
                  <span className="font-semibold text-on-surface">
                    Mã sản phẩm:
                  </span>{" "}
                  <span className="font-mono bg-surface-container-high px-1.5 py-0.5 rounded text-xs">
                    {product.sku}
                  </span>
                </div>
              </div>
            </div>

            {/* Stock status placed above price */}
            <div className="flex items-center">
              <span
                className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold ${product.stock > 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                ></span>
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

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-outline-variant/15 flex items-center justify-between bg-slate-50/50">
              <div className="text-left">
                <h3 className="font-display text-lg font-bold text-on-surface">
                  Đánh giá sản phẩm
                </h3>
                <p className="text-xs text-secondary font-medium mt-0.5">
                  {product.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-secondary hover:text-on-surface cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-left">
                  <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider border-b border-outline-variant/15 pb-2">
                    Nhận xét khách hàng ({reviews.length})
                  </h4>
                  {reviews.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center font-body">
                      <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-secondary mb-4">
                        <span className="material-symbols-outlined text-3xl">
                          forum
                        </span>
                      </div>
                      <p className="text-sm font-bold text-on-surface">
                        Chưa có đánh giá nào.
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Hãy là người đầu tiên chia sẻ cảm nhận về sản phẩm này!
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto pr-2 no-scrollbar space-y-3">
                      {reviews.map((rev: any) => (
                        <div key={rev._id} className="pt-3.5 first:pt-0">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-50 border border-outline-variant/30 flex items-center justify-center shrink-0">
                              {rev.user?.avatar ? (
                                <img
                                  src={rev.user.avatar}
                                  alt={rev.user.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="material-symbols-outlined text-outline text-base">
                                  person
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-on-surface truncate max-w-[120px]">
                                  {rev.user?.name || "Khách hàng"}
                                </h5>
                                <span className="text-[9px] text-outline font-mono">
                                  {new Date(rev.createdAt).toLocaleDateString(
                                    "vi-VN",
                                  )}
                                </span>
                              </div>
                              <ProductRating rating={rev.rating} />
                              <p className="text-xs text-on-surface-variant font-body leading-relaxed mt-1">
                                {rev.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 md:border-l md:border-outline-variant/15 md:pl-8 text-left">
                  {canReview ? (
                    <>
                      <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider pb-2 border-b border-outline-variant/15 md:border-b-0 md:pb-0">
                        Gửi đánh giá của bạn
                      </h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-on-surface-variant block">
                            Đánh giá sao{" "}
                            <span className="text-rose-600">*</span>
                          </label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingForm(star)}
                                className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                              >
                                <span
                                  className={`material-symbols-outlined text-2xl ${
                                    star <= ratingForm
                                      ? "text-amber-500"
                                      : "text-slate-300"
                                  }`}
                                  style={{
                                    fontVariationSettings:
                                      star <= ratingForm
                                        ? "'FILL' 1"
                                        : undefined,
                                  }}
                                >
                                  star
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-on-surface-variant block">
                            Họ và tên <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={nameForm}
                            onChange={(e) => setNameForm(e.target.value)}
                            placeholder="Nhập tên của bạn"
                            required
                            className="form-input w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs sm:text-sm font-body bg-slate-50/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-on-surface-variant block">
                            Nội dung đánh giá{" "}
                            <span className="text-rose-600">*</span>
                          </label>
                          <textarea
                            rows={3}
                            value={commentForm}
                            onChange={(e) => setCommentForm(e.target.value)}
                            placeholder="Nhập nội dung nhận xét..."
                            required
                            className="form-input w-full px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs sm:text-sm font-body resize-none bg-slate-50/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingReview}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer focus:outline-none"
                        >
                          {isSubmittingReview ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="rounded-2xl bg-amber-50/80 border border-amber-100 p-5 text-center font-body">
                      <span className="material-symbols-outlined text-amber-600 text-3xl mb-2 block animate-pulse">
                        verified
                      </span>
                      <p className="text-xs font-bold text-amber-900">
                        Tính năng đánh giá giới hạn
                      </p>
                      <p className="text-[11px] text-amber-700 mt-1.5 leading-relaxed">
                        Bạn chỉ có thể viết nhận xét cho sản phẩm này nếu bạn đã
                        mua và nhận hàng thành công.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;
