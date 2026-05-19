const CartPage = () => {
  return (
    <main className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <header className="mb-12">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          YOUR SHOPPING BAG
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          2 Items in your cart
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* <!-- Cart Table Area --> */}
        <div className="lg:col-span-8 space-y-6">
          {/* <!-- Product Header (Desktop) --> */}
          <div className="hidden md:grid grid-cols-6 border-b border-outline-variant/30 pb-4 px-4 font-label-md text-label-md uppercase text-on-surface-variant tracking-wider">
            <div className="col-span-3">Product Details</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Price</div>
            <div className="text-right">Subtotal</div>
          </div>
          {/* <!-- Product Item 1 --> */}
          <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20 flex flex-col md:grid md:grid-cols-6 items-center gap-4 transition-all hover:shadow-md hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-6 col-span-3 w-full">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A professional, high-fashion studio shot of a sleek black and silver premium leather sneaker. The lighting is dramatic and high-key, highlighting the intricate textures of the leather and mesh. The sneaker is positioned at a dynamic angle against a minimalist, slightly blurred white architectural background. The overall mood is luxury, exclusive, and modern, fitting a high-end streetwear boutique."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLrL5s6TWsui86Bc8qVprdGAPDmx5SLQitquAy1fVRkGA1yUeGpm-4wUzK4fLRxsVlYt7071iUU3Hg8o0-V91xYYnC8dFsxiTXaRvJFRz0t9csH7LtJWVABGnOf-xme7mbFr4h5ZNUYzRTdrgeUMfxdnrNuvCTai1pSOxqpcJkp0E4yC39-yfzm94sYI-P0xO355FVE9EE5Ahr6p_xte2j4wNxUpAi9zTGNyC0gHi5U1aj1aNwXg4DA5CSUQKh5aqPwfJMS1x5yC2"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
                  NEBULA FLIGHT V1
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
                  Size: US 10.5 | Color: Onyx
                </p>
                <button className="mt-4 flex items-center gap-1 font-label-sm text-label-sm text-error hover:underline uppercase tracking-tighter">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="delete"
                  >
                    delete
                  </span>{" "}
                  Remove
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-surface-container rounded-full px-4 py-2 w-full md:w-auto">
              <button
                className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                data-icon="remove"
              >
                remove
              </button>
              <span className="font-headline-md text-headline-md w-6 text-center">
                1
              </span>
              <button
                className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                data-icon="add"
              >
                add
              </button>
            </div>
            <div className="text-right w-full md:w-auto">
              <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant uppercase block">
                Unit Price
              </span>
              <span className="font-body-lg text-body-lg text-on-surface">
                $245.00
              </span>
            </div>
            <div className="text-right w-full md:w-auto">
              <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant uppercase block">
                Subtotal
              </span>
              <span className="font-headline-md text-headline-md text-on-surface">
                $245.00
              </span>
            </div>
          </div>
          {/* <!-- Product Item 2 --> */}
          <div className="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-sm border border-outline-variant/20 flex flex-col md:grid md:grid-cols-6 items-center gap-4 transition-all hover:shadow-md hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-6 col-span-3 w-full">
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10">
                <img
                  className="w-full h-full object-cover"
                  data-alt="A vibrant, close-up photograph of a limited edition white and sunset orange streetwear sneaker. The shoe rests on a clean glass surface with a subtle reflection. The background is a soft, out-of-focus urban cityscape during the golden hour, creating a warm, energetic atmosphere. The shot emphasizes high-quality materials and bold color contrasts, reflecting a professional product photography style for a premium footwear brand."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkxa2nSQpcc9H-cC1Z5yLnQemeM_IM-IFVfShBtN5bJ6IfigZjfb9S9W4FzTdaTHGkI8lCRyGtUMGpYF_GvlhEWJUhD9s8fDePL1mK61vx9SFlp5w-0Y8vyhHJL7tDbpY7bi1ZZFw2F3a9KzyIwVMlRL3-5G4JVSxmm2TbtCwKUFNo1nnmLTWtDR3ItSzP-t18coh_QqY_Oa3kEGBRtBZAQ2v9q0M42N_bd00zzw0UHYrHi1KPLMcUSwY2xqfs7PnnhaclZxMoKqlF"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
                  SOLAR WAVE HI
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
                  Size: US 9.0 | Color: Ember
                </p>
                <button className="mt-4 flex items-center gap-1 font-label-sm text-label-sm text-error hover:underline uppercase tracking-tighter">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="delete"
                  >
                    delete
                  </span>{" "}
                  Remove
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-surface-container rounded-full px-4 py-2 w-full md:w-auto">
              <button
                className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                data-icon="remove"
              >
                remove
              </button>
              <span className="font-headline-md text-headline-md w-6 text-center">
                1
              </span>
              <button
                className="material-symbols-outlined text-on-surface-variant hover:text-on-surface"
                data-icon="add"
              >
                add
              </button>
            </div>
            <div className="text-right w-full md:w-auto">
              <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant uppercase block">
                Unit Price
              </span>
              <span className="font-body-lg text-body-lg text-on-surface">
                $185.00
              </span>
            </div>
            <div className="text-right w-full md:w-auto">
              <span className="md:hidden font-label-sm text-label-sm text-on-surface-variant uppercase block">
                Subtotal
              </span>
              <span className="font-headline-md text-headline-md text-on-surface">
                $185.00
              </span>
            </div>
          </div>
          {/* <!-- Empty State Hidden --> */}
          <div className="hidden flex flex-col items-center justify-center py-24 text-center">
            <span
              className="material-symbols-outlined text-[64px] text-outline-variant mb-4"
              data-icon="shopping_cart_off"
            >
              shopping_cart_off
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Your bag is empty
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button className="bg-on-surface text-surface py-4 px-12 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:bg-primary transition-all">
              Start Shopping
            </button>
          </div>
        </div>
        {/* <!-- Summary Sidebar --> */}
        <aside className="lg:col-span-4 sticky top-24">
          <div className="bg-surface-container rounded-xl p-8 shadow-sm border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
              ORDER SUMMARY
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Subtotal
                </span>
                <span className="font-body-lg text-body-lg text-on-surface">
                  $430.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Shipping
                </span>
                <span className="font-label-md text-label-md text-tertiary uppercase tracking-wider">
                  FREE
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Estimated Tax
                </span>
                <span className="font-body-lg text-body-lg text-on-surface">
                  $34.40
                </span>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="font-headline-md text-headline-md text-on-surface">
                  Total
                </span>
                <span className="font-headline-lg text-headline-lg text-on-surface">
                  $464.40
                </span>
              </div>
            </div>
            <div className="mb-8">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase block mb-2 tracking-tighter">
                Apply Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-grow bg-surface-container-lowest border-outline-variant rounded-lg px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="CODE20"
                  type="text"
                />
                <button className="bg-outline-variant text-on-surface px-6 rounded-lg font-label-md text-label-md uppercase hover:bg-outline transition-all">
                  Apply
                </button>
              </div>
            </div>
            <button className="w-full bg-on-surface text-surface py-5 rounded-lg font-label-md text-label-md uppercase tracking-widest shadow-lg hover:bg-primary transition-all active:scale-95 duration-200">
              Proceed to Checkout
            </button>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[20px]"
                  data-icon="lock"
                >
                  lock
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-tighter">
                  Secure Checkout Powered by Stripe
                </span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-[20px]"
                  data-icon="local_shipping"
                >
                  local_shipping
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-tighter">
                  Free standard shipping on all orders
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
