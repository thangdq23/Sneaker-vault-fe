const CheckoutPage = () => {
  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-16 pt-28 md:px-margin-desktop md:pt-32">
      <header className="mb-10">
        <h1 className="section-title text-on-surface">Thanh toán</h1>
        <p className="section-desc">
          Hoàn tất thông tin giao hàng và thanh toán để đặt hàng.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-on-surface text-sm font-bold text-surface">
                1
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="form-label">Họ và tên</label>
                <input
                  className="form-input"
                  placeholder="Nguyễn Văn A"
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Địa chỉ</label>
                <input
                  className="form-input"
                  placeholder="123 Đường ABC, Quận 1"
                  type="text"
                />
              </div>
              <div>
                <label className="form-label">Thành phố</label>
                <input className="form-input" placeholder="Hà Nội" type="text" />
              </div>
              <div>
                <label className="form-label">Mã bưu điện</label>
                <input className="form-input" placeholder="100000" type="text" />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Số điện thoại</label>
                <input
                  className="form-input"
                  placeholder="0901 234 567"
                  type="tel"
                />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                2
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Phương thức giao hàng
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="relative flex cursor-pointer items-center gap-3 rounded-xl border-2 border-transparent bg-surface-container p-5 transition-all hover:border-outline-variant">
                <input
                  checked
                  className="sr-only"
                  name="delivery"
                  type="radio"
                />
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-on-surface">
                    Giao hàng tiêu chuẩn
                  </span>
                  <span className="block text-sm leading-relaxed text-on-surface-variant">
                    3–5 ngày làm việc
                  </span>
                </div>
                <span className="shrink-0 text-sm font-bold text-on-surface">
                  Miễn phí
                </span>
              </label>
              <label className="relative flex cursor-pointer items-center gap-3 rounded-xl border-2 border-transparent bg-surface-container p-5 transition-all hover:border-outline-variant">
                <input className="sr-only" name="delivery" type="radio" />
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-on-surface">
                    Giao hàng nhanh
                  </span>
                  <span className="block text-sm leading-relaxed text-on-surface-variant">
                    Giao ngày hôm sau
                  </span>
                </div>
                <span className="price-vnd shrink-0 text-sm font-bold text-on-surface">
                  600.000 ₫
                </span>
              </label>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                3
              </span>
              <h2 className="text-lg font-bold leading-snug text-on-surface sm:text-xl">
                Phương thức thanh toán
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-on-surface bg-on-surface p-5 text-surface"
                >
                  <span className="material-symbols-outlined">credit_card</span>
                  <span className="text-xs font-semibold sm:text-sm">
                    Thẻ tín dụng
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-surface-container p-5 text-on-surface-variant hover:border-outline-variant"
                >
                  <span className="material-symbols-outlined">payments</span>
                  <span className="text-xs font-semibold sm:text-sm">PayPal</span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-surface-container p-5 text-on-surface-variant hover:border-outline-variant"
                >
                  <span className="material-symbols-outlined">contactless</span>
                  <span className="text-xs font-semibold sm:text-sm">
                    Apple Pay
                  </span>
                </button>
              </div>
              <div className="space-y-4 rounded-xl bg-surface-container-low p-5 sm:p-6">
                <div>
                  <label className="form-label">Số thẻ</label>
                  <div className="relative">
                    <input
                      className="form-input pr-10"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      credit_card
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="form-label">Ngày hết hạn</label>
                    <input
                      className="form-input"
                      placeholder="MM/YY"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="form-label">CVV</label>
                    <input className="form-input" placeholder="123" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-lg sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-on-surface sm:text-xl">
              Tóm tắt đơn hàng
            </h2>
            <div className="mb-6 space-y-5">
              {[
                {
                  name: "Air Max Zenith",
                  variant: "Size: US 10.5 | Màu: Ghost White",
                  price: "5.040.000 ₫",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeb0kFH9f8YXaSEiTKXsMHUC5zpxMrllSewrq-cuB9Qctm7ZHYqzT0SYWf3WoF-5wP2kq7urlY96J0MmnTUznX8x_P8uTA8kZfHK1V856RaFMgYPVeR_wYec9TdwiC4MC9EXtSvDGPuy9pBY2iGokkvdWAhe2SPYjA89fMBLf9Ofr32lZjyQZblXhD6Um4NqluU0vyEtqC6XDP0_-3-QV1HDYf6uKNQkoBYMdpBsBenQN29Rnu4FHHptxtROfhfkIKza0tkPwAHS2U",
                },
                {
                  name: "Court Legacy Pro",
                  variant: "Size: US 11.0 | Màu: Onyx",
                  price: "4.440.000 ₫",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqFCwd_TdQKW91SktdIgOEkxEQioRlJdp8OCsJGXv8oQyR-rveEQBwYVmOtLTVndNLf0z1l7dFPMrIZ5bZnreX6q-o-lG8xFI1ef9KU7qHBGj87bPoo2UValeuTk33MXmJwVFRDUU5Q7-7dq17FrnfHwKxRWuASlydkSOlb0h6F6RQSGC0MT9aYEl85RIxWsBhhIGiupSpqmHbeo20d6awzNgyEiIt0g91MLwuoARvep8wLj0S_JCKgswzb0KEoeCLCI3LeSePAoR6",
                },
              ].map((item) => (
                <div key={item.name} className="flex gap-3 sm:gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-container-highest sm:h-24 sm:w-24">
                    <img
                      className="h-full w-full object-cover"
                      alt={item.name}
                      src={item.img}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-on-surface">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-on-surface-variant sm:text-sm">
                      {item.variant}
                    </p>
                    <span className="price-vnd mt-1 block text-sm font-bold text-on-surface">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-y border-outline-variant/30 py-5 text-sm sm:text-base">
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Tạm tính</span>
                <span className="price-vnd text-on-surface">9.480.000 ₫</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Phí vận chuyển</span>
                <span className="text-on-surface">Miễn phí</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-surface-variant">Thuế</span>
                <span className="price-vnd text-on-surface">780.000 ₫</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 py-5">
              <span className="text-lg font-bold text-on-surface">Tổng cộng</span>
              <span className="price-vnd text-lg font-bold text-on-surface sm:text-xl">
                10.260.000 ₫
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary flex w-full items-center justify-center gap-2"
            >
              Hoàn tất thanh toán
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="mt-5 text-center text-xs leading-relaxed text-on-surface-variant sm:text-sm">
              Bằng việc nhấn hoàn tất thanh toán, bạn đồng ý với{" "}
              <a className="underline hover:text-primary" href="#">
                Điều khoản dịch vụ
              </a>
              .
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
