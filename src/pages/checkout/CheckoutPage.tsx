const CheckoutPage = () => {
  return (
    <main className="pt-32 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* <!-- Left Column: Multi-step Form --> */}
        <div className="lg:col-span-7 space-y-12">
          {/* <!-- Section 1: Shipping Info --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-on-surface text-surface font-bold text-label-md">
                1
              </span>
              <h2 className="font-headline-md text-headline-md">
                Shipping Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                  Address
                </label>
                <input
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                  placeholder="123 Street Name"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                  City
                </label>
                <input
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                  placeholder="New York"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                  Zip Code
                </label>
                <input
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                  placeholder="10001"
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                  Phone Number
                </label>
                <input
                  className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
            </div>
          </section>
          {/* <!-- Section 2: Delivery Method --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant font-bold text-label-md">
                2
              </span>
              <h2 className="font-headline-md text-headline-md">
                Delivery Method
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="relative flex items-center p-6 bg-surface-container rounded-xl cursor-pointer border-2 border-transparent hover:border-outline-variant transition-all group">
                <input
                  checked
                  className="sr-only"
                  name="delivery"
                  type="radio"
                />
                <div className="flex-1">
                  <span className="block font-label-md text-label-md uppercase">
                    Standard Shipping
                  </span>
                  <span className="block font-body-md text-body-md text-on-surface-variant">
                    3-5 Business Days
                  </span>
                </div>
                <span className="font-bold text-on-surface">FREE</span>
              </label>
              <label className="relative flex items-center p-6 bg-surface-container rounded-xl cursor-pointer border-2 border-transparent hover:border-outline-variant transition-all group">
                <input className="sr-only" name="delivery" type="radio" />
                <div className="flex-1">
                  <span className="block font-label-md text-label-md uppercase">
                    Express Delivery
                  </span>
                  <span className="block font-body-md text-body-md text-on-surface-variant">
                    Next Day
                  </span>
                </div>
                <span className="font-bold text-on-surface">$25.00</span>
              </label>
            </div>
          </section>
          {/* <!-- Section 3: Payment Method --> */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant font-bold text-label-md">
                3
              </span>
              <h2 className="font-headline-md text-headline-md">
                Payment Method
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 flex flex-col items-center justify-center p-6 bg-on-surface text-surface rounded-xl border-2 border-on-surface transition-all">
                  <span
                    className="material-symbols-outlined mb-2"
                    data-icon="credit_card"
                  >
                    credit_card
                  </span>
                  <span className="font-label-md text-label-md uppercase">
                    Credit Card
                  </span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-6 bg-surface-container text-on-surface-variant rounded-xl border-2 border-transparent hover:border-outline-variant transition-all">
                  <span
                    className="material-symbols-outlined mb-2"
                    data-icon="payments"
                  >
                    payments
                  </span>
                  <span className="font-label-md text-label-md uppercase">
                    PayPal
                  </span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-6 bg-surface-container text-on-surface-variant rounded-xl border-2 border-transparent hover:border-outline-variant transition-all">
                  <span
                    className="material-symbols-outlined mb-2"
                    data-icon="contactless"
                  >
                    contactless
                  </span>
                  <span className="font-label-md text-label-md uppercase">
                    Apple Pay
                  </span>
                </button>
              </div>
              {/* <!-- Credit Card Details Form --> */}
              <div className="p-6 bg-surface-container-low rounded-xl space-y-4">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                      placeholder="0000 0000 0000 0000"
                      type="text"
                    />
                    <span
                      className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
                      data-icon="credit_card"
                    >
                      credit_card
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                      Expiry Date
                    </label>
                    <input
                      className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                      placeholder="MM/YY"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm uppercase mb-2 text-on-surface-variant">
                      CVV
                    </label>
                    <input
                      className="w-full bg-surface-container border-none focus:ring-1 focus:ring-primary rounded-lg p-4 font-body-md text-body-md"
                      placeholder="123"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- Right Column: Order Summary --> */}
        <aside className="lg:col-span-5 sticky top-32">
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 shadow-lg">
            <h2 className="font-headline-md text-headline-md mb-8">
              Order Summary
            </h2>
            <div className="space-y-6 mb-8">
              {/* <!-- Product 1 --> */}
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-surface-container-highest rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A detailed, professional studio shot of a limited edition Nike sneaker with vibrant red accents and sleek white mesh paneling. The lighting is crisp and cinematic, highlighting the intricate textures of the sole and fabric. The overall mood is high-end, modern streetwear photography set against a minimalist light gray backdrop with soft ambient shadows."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeb0kFH9f8YXaSEiTKXsMHUC5zpxMrllSewrq-cuB9Qctm7ZHYqzT0SYWf3WoF-5wP2kq7urlY96J0MmnTUznX8x_P8uTA8kZfHK1V856RaFMgYPVeR_wYec9TdwiC4MC9EXtSvDGPuy9pBY2iGokkvdWAhe2SPYjA89fMBLf9Ofr32lZjyQZblXhD6Um4NqluU0vyEtqC6XDP0_-3-QV1HDYf6uKNQkoBYMdpBsBenQN29Rnu4FHHptxtROfhfkIKza0tkPwAHS2U"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-label-md text-label-md uppercase text-on-surface">
                    Air Max Zenith
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Size: US 10.5 | Color: Ghost White
                  </p>
                  <span className="font-bold text-on-surface mt-1">
                    $210.00
                  </span>
                </div>
              </div>
              {/* <!-- Product 2 --> */}
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-surface-container-highest rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A premium fashion photography shot featuring a pair of high-top designer sneakers with a unique blend of charcoal and light gray leather textures. The image is captured in a minimalist urban setting with diffused sunlight creating a sophisticated and exclusive aesthetic. The colors are muted and professional, emphasizing the luxurious materials and clean lines."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqFCwd_TdQKW91SktdIgOEkxEQioRlJdp8OCsJGXv8oQyR-rveEQBwYVmOtLTVndNLf0z1l7dFPMrIZ5bZnreX6q-o-lG8xFI1ef9KU7qHBGj87bPoo2UValeuTk33MXmJwVFRDUU5Q7-7dq17FrnfHwKxRWuASlydkSOlb0h6F6RQSGC0MT9aYEl85RIxWsBhhIGiupSpqmHbeo20d6awzNgyEiIt0g91MLwuoARvep8wLj0S_JCKgswzb0KEoeCLCI3LeSePAoR6"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-label-md text-label-md uppercase text-on-surface">
                    Court Legacy Pro
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Size: US 11.0 | Color: Onyx
                  </p>
                  <span className="font-bold text-on-surface mt-1">
                    $185.00
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 py-6 border-y border-outline-variant/30">
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-body-md text-body-md">
                  Subtotal
                </span>
                <span className="text-on-surface font-body-md text-body-md">
                  $395.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-body-md text-body-md">
                  Shipping
                </span>
                <span className="text-on-surface font-body-md text-body-md">
                  FREE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-body-md text-body-md">
                  Tax
                </span>
                <span className="text-on-surface font-body-md text-body-md">
                  $32.50
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-6">
              <span className="font-headline-md text-headline-md">Total</span>
              <span className="font-headline-md text-headline-md">$427.50</span>
            </div>
            <button className="w-full bg-on-surface text-surface py-5 rounded-xl font-label-md text-label-md uppercase tracking-widest hover:bg-primary transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
              Complete Purchase
              <span
                className="material-symbols-outlined"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
            <p className="mt-6 text-center text-on-surface-variant font-label-sm text-label-sm">
              By clicking complete purchase, you agree to our{" "}
              <a className="underline" href="#">
                Terms of Service
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
