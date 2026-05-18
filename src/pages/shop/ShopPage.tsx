const ShopPage = () => {
  return (
    <main className="pt-28 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* <!-- Sidebar Filter --> */}
        <aside className="w-full md:w-72 shrink-0 space-y-10">
          {/* <!-- Search --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Search
            </h3>
            <div className="relative">
              <input
                className="w-full bg-surface-container border-none rounded-lg px-4 py-3 font-body-md focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Find a model..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
            </div>
          </section>
          {/* <!-- Gender --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Gender
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Men's Performance
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Women's Lifestyle
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Unisex
                </span>
              </label>
            </div>
          </section>
          {/* <!-- Brands --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Brands
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Nike Archive
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Adidas Originals
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  New Balance
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded-sm border-outline text-primary focus:ring-0"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">
                  Asics Tiger
                </span>
              </label>
            </div>
          </section>
          {/* <!-- Sizes Grid --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Size (UK)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                7
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md bg-on-surface text-surface">
                8
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                8.5
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                9
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                10
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                11
              </button>
              <button className="py-3 border border-outline-variant/30 rounded-lg font-label-md hover:bg-on-surface hover:text-surface transition-all">
                12
              </button>
            </div>
          </section>
          {/* <!-- Color Circles --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Color Palette
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="w-8 h-8 rounded-full bg-on-surface ring-2 ring-offset-2 ring-primary"></button>
              <button className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant"></button>
              <button className="w-8 h-8 rounded-full bg-[#1A4B84]"></button>
              <button className="w-8 h-8 rounded-full bg-[#D12D2D]"></button>
              <button className="w-8 h-8 rounded-full bg-[#E6B100]"></button>
              <button className="w-8 h-8 rounded-full bg-[#2D7A4D]"></button>
            </div>
          </section>
          {/* <!-- Price Range --> */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider mb-4">
              Price Range
            </h3>
            <input
              className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              type="range"
            />
            <div className="flex justify-between mt-4 text-label-sm font-label-sm text-on-surface-variant">
              <span>£50</span>
              <span>£500+</span>
            </div>
          </section>
        </aside>
        {/* <!-- Product Grid --> */}
        <div className="grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* <!-- Product Card 1 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A side view of a premium minimalist white sneaker featuring subtle gray suede accents and a sleek silhouette. The shoe is professionally lit in a high-contrast studio setting with soft shadows, emphasizing its clean lines and high-quality leather texture. The aesthetic is modern and exclusive, aligned with a luxury streetwear brand's visual identity."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ5NPhl_ma3fMCS2i9gy3JNdLDfBTHuEwSPJs_DivlRnbzLD1kDWpVo7K-ZYQaxB0fZCLKqwZdXvEGvjsFknINxDY2qEaSxPmMEYP1o9qfe7neelw_UiEYOUb721ggRkM4KaO8rNjic95C__YJ6JEaHVguWMj3vSaIJX_s8jPOTQb23xd9jAqovQt2uMN2CcupqzPZAUKZA_1s0ctfogVkKn3AZrpgc0canB-2H6vBggc9pTVV66TNb70YLKYadBHFQqnd4zsAxkQh"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-surface/90 backdrop-blur-md text-label-sm px-3 py-1 rounded-full border border-outline-variant/30 uppercase tracking-tighter">
                    New Arrival
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                  <span className="material-symbols-outlined text-on-surface">
                    favorite
                  </span>
                </button>
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  Nike Archive
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  Jordan 1 High 'Vast Gray'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (42)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £185.00
                </p>
              </div>
            </div>
            {/* <!-- Product Card 2 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A professional studio photograph of a classNameic black leather sneaker with white sole detailing, positioned on a clean gray background. The lighting is soft and diffused to highlight the premium grain of the leather. The composition follows high-end editorial standards for luxury footwear, using a minimal color palette of monochrome tones."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD35wz1JvvI63sE9_aBmrvfVjarJxsAeqqNkMaALQ67YiPe1gSdUyA6ziCjF2vH5q6uGgTSElO_qiwJ-TQUvDFjAZZZ5R4Kd56b-b3a3k4xIjjbZFwh7v7suiNbXmmkemoXovR-6A230FAOTphZR2BDsbQPh8zulFJFdJjTNMjdjpH8NP-sTirzxT2im8KUdZOQl4e3pFz3qxPofLLwPNJdQu3pUjBQomjH6SoTotw_yUROrr3hj3IyxXmIvrUjW5sXURcaEFj7m8bn"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary text-label-sm px-3 py-1 rounded-full uppercase tracking-tighter">
                    Limited Edition
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  Adidas Originals
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  Samba ClassNameic 'Onyx'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (128)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £110.00
                </p>
              </div>
            </div>
            {/* <!-- Product Card 3 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A vibrant, multi-colored chunky runner sneaker with mesh and synthetic overlays in neon green, electric blue, and orange. The shoe is presented in a dynamic three-quarter view against a clean, white minimalist studio backdrop. The lighting is sharp, creating crisp shadows that define the complex architecture of the footwear's high-tech sole unit."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3yamtqB7LDG-lMz2ED_wM-enQVPJE-_N5esz-l19ahjh2c6rgwkeu-lLP9j7m6XCW_u8Lf2brdoTC8krQhGGWMN_MxG_eDZOTfW2mRQRWK14qkt85dMGRG1oVL2XWqNAw0H9KJ4ogdRiDqHYjse0rXwOCcL4REQPM6jfuL7ZH1TKu1AUUUM8HyLHfGtJRmVdDObAA33XtnB4_2H2TDsa-Vc_slMPrB6uBEo7rkpAXzD6jBS0btVRND71gfydLrFlaML1cV2ncF0Lc"
                />
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  New Balance
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  9060 'Multicolor Pack'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (89)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £160.00
                </p>
              </div>
            </div>
            {/* <!-- Product Card 4 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A classNameic red low-top canvas sneaker with white laces and a white rubber toe cap, set against a pristine, high-key white studio background. The lighting is soft and uniform, eliminating harsh shadows to focus on the vibrant red fabric texture and iconic silhouette. The style is clean, energetic, and perfectly suited for a premium sportswear web shop."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH6mH9nPMDdfvDwnX-fvlue1l5rs0E1hOKVGVblFIXeVh4U0roNcY096QvW694tFeoKiFh_kGIsPA_FvU-crJHFQArfklVyemIVZzEJ85jjipMjYtn6wWw0OCtclMGXExg2ukmjbasu9Oboob6tVwnrHv8W0EJskPAq2B3Q5wfGNKqC_TRgMoGhbxYwLbzua6foBer38s5vsSJfqWMEZdLkQ-rWD0vsylzHWvv61sKALXxFwChbrui_si271ncScnKbbbjTNvIuglC"
                />
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  Nike Archive
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  Air Max 1 'Magma'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    star_half
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (15)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £145.00
                </p>
              </div>
            </div>
            {/* <!-- Product Card 5 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A lime green high-performance running shoe with complex mesh patterns and futuristic aerodynamic design elements. The sneaker is showcased in a crisp, minimalist studio setting with cool-toned lighting that emphasizes the vibrant neon color and sleek material finishes. The overall mood is high-energy, technologically advanced, and stylishly professional."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF_epadrmdiJaFaAT3kxKmZ8tVPTOQGKIj6pUL6CVakMgZcIvweq_e8zXhjCNFr8husxhChpc7XrWVd4ynEUAJQH288dcOhdeGAR5lpg1Uryj4OSTGSoFQyWm0S_SNiVCKx4l3W8fweV_zhSiCcVCQdZurjdFrjNdQxb0RAPWFYSVBrvZAiVdJRGKOBvG2MYs80MZHDgsxyw3WOCbKQunz6jRLYaEhTChN6iMUHiDGMz0UZZFOKDXz-_teNd6SrufkJ9t8P3z24ASR"
                />
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  Nike Archive
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  Zoom Freak 4 'Lime'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (67)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £135.00
                </p>
              </div>
            </div>
            {/* <!-- Product Card 6 --> */}
            <div className="group relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-slate-200/70 transform-gpu">
              <div className="aspect-4/5 bg-slate-50 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-out transform-gpu will-change-transform group-hover:scale-105"
                  data-alt="A pair of clean, white leather luxury sneakers with minimal black branding, shot from a dynamic low angle on a polished white surface. The reflection is subtle and soft, creating a sense of floating depth. The lighting is bright and high-key, reinforcing a premium, minimalist aesthetic consistent with high-fashion streetwear icons and exclusive sneaker culture."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV3rjx3X4JA1mOJcwAyXwFChs69Ddde5tD0TuWGaRXe40Tt4P2UUcK4BP-Ud__aE2ev_X1hfOz4YyckzmJlTTMGGDHA7Q0ACWRSWu9vBHMdYArrA_A2fN5X3_vbxv3XFiQ1ehNOeGTBuoyndC59jBbilR8lCmZ4_ByWwRPsGATQ9s5ugAj0UytncMQc62IuMfRNLWnH8N4OFWOSvQ6fDJkv2wVoBqqml2LPYre9G5Xr3tl-Hau3W6lAjrvU_zKdZC80FQV9yFXrW36"
                />
              </div>
              <div className="p-6">
                <span className="text-label-sm uppercase text-on-surface-variant tracking-widest">
                  Nike Archive
                </span>
                <h2 className="font-headline-md text-headline-md mt-1 mb-2">
                  Air Force 1 'Triple White'
                </h2>
                <div className="flex items-center gap-1 mb-4 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-label-sm text-on-surface-variant ml-2">
                    (2.1k)
                  </span>
                </div>
                <p className="font-headline-md text-headline-md font-bold">
                  £115.00
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Pagination --> */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <button className="px-12 py-4 bg-on-surface text-surface rounded-lg font-label-md uppercase tracking-widest hover:bg-primary transition-all duration-300">
              Load More
            </button>
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-on-surface"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
