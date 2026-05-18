const ProductDetailPage = () => {
  return (
    <main className="pt-24 pb-16">
      {/* <!-- Product Section --> */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-16">
        {/* <!-- Image Gallery Shell --> */}
        <div className="md:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* <!-- Thumbnails --> */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container border border-primary rounded-lg overflow-hidden cursor-pointer shrink-0 transition-transform hover:scale-105 shadow-sm">
              <img
                className="w-full h-full object-cover"
                data-alt="A detailed, professional studio shot of the Nike Air Jordan 1 Retro High sneaker from a profile view. The lighting is high-key and crisp, highlighting the premium leather texture against a minimalist white background. The color palette consists of classNameic red, black, and white tones, emphasizing a luxury streetwear aesthetic. The atmosphere is clean and high-end."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgegdRVFQ4CVgowKz5HiAisyUwIYIqsz8tPH_irzOI4zquWimsNvLPBKEW14nbJ5_2ojvPNkReDXv5oIX06Dqx2SA9bRMUQ2GAUusu0fqueoDi68zgvpB74QNgby_yQHjjqS_qQap4tRWkn3uGJYQRWDQkj5e1uxgY7S-02WWSny_pmILCCNc61BgWMgTEGfflvyfRCdDY5z99-nntcVsjpjQoAGiSpJ6vMRnu1qmr3un91-ZS7hhC3l8fJxAUJSFcfVph0BmzcfAN"
              />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container rounded-lg overflow-hidden cursor-pointer shrink-0 opacity-60 hover:opacity-100 transition-all hover:scale-105 shadow-sm">
              <img
                className="w-full h-full object-cover"
                data-alt="A close-up view focusing on the heel and collar of the Nike Air Jordan 1 Retro High sneaker, showcasing the iconic 'Wings' logo. The image features soft, ambient lighting that creates a sophisticated mood within a bright light-mode gallery setting. Premium materials and meticulous stitching are visible, adhering to a high-fashion minimalism aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdvB6UQgkmD51sLUlKDw2WW0-nNwYMq7Eky1VG742FT5czQD6zC2crvO5m3MPCBI-W1vV71OSoKo3Wo6D8cDkLpL3SUaY1uRuDe1i9BJC2djCwSVNMqJWCzSu0CX7vKgs-aPBvVRUjXjfoF6rGjHcCKEgvb_PZbpy_sgeag1wKzpUQp10PsMc1XQkdubqslSAnX8D9_6soE8QC8M7bX8KOvwGltuTYtITVdY70OFr0dHNWVt-t-EKaPhxvgKvTLXe6XDXbnY3y70pm"
              />
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container rounded-lg overflow-hidden cursor-pointer shrink-0 opacity-60 hover:opacity-100 transition-all hover:scale-105 shadow-sm">
              <img
                className="w-full h-full object-cover"
                data-alt="A dynamic top-down perspective of the Nike Air Jordan 1 Retro High, revealing the detailed lacing system and tongue design. The lighting is bright and even, reinforcing a minimalist and professional commercial photography style. The colors are vibrant yet grounded, highlighting the sharp contrast between the black and white panels."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgGnh9JuHbFI_ocaUFsQyw3UhYoo5naXs_8Y44roIbGMhP6xvYbDZuOMX8r-PrZtaa4SAXfqOT7prnEO9txju4ubtbwp-1AjE-kNQopvSEm4CA1UEaEw4Tp7c_ldOHm5E1P4gc_hJefWC3DZQmGfK0UE3TXSGwxgwTg7m3xyDahhJvPrBJSYF_cuWy_nMmu12DhFbERQrE32ZxxBlTyf79VSXcegFLTbTwN0rOFaZikz2YQQ3l6o8jLjeNZuHFnSfIKcBW2iasgMh-"
              />
            </div>
          </div>
          {/* <!-- Main Image --> */}
          <div className="flex-grow aspect-square bg-surface-container rounded-xl overflow-hidden shadow-lg border border-outline-variant/10 relative">
            <img
              className="w-full h-full object-cover"
              data-alt="A large, central hero image of the Nike Air Jordan 1 Retro High floating in a minimalist white void. Soft ambient shadows beneath the shoe give it a sense of weightlessness and premium quality. The photography is sharp and cinematic, capturing the classNameic streetwear essence with high-fashion lighting and vast whitespace for a breathable UI feel."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3QBdtquoA0QJDw70DfTkSOLPGeMYCEIGVHRJtDem3WNT2TGJl_OXzlznbNVJqn1b-COGF6lpYOWP0daygweUsZQifJEce0oDTgzao7rvT_KOPswaSrNBpM7euvOugdvDCdBpgtZ0ozx7JIbcfktOD5Ilx8U7RoluzwxHnjihD2ELoRzGhjKd1okeExOzqUGMVPJNYal7wqT25l3Jlc7hm0tmW4OvwyQheosG76VZLzxpf_XvSqXFidLoB17sEZ5rWPT-T5rVAgi4d"
            />
            <div className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-tertiary border border-tertiary/20 uppercase tracking-widest">
              Limited Edition
            </div>
          </div>
        </div>
        {/* <!-- Product Info Section --> */}
        <div className="md:col-span-5 flex flex-col space-y-8">
          <div className="space-y-2">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
              Nike Air Jordan 1 Retro High
            </h1>
            <div className="flex items-center gap-4">
              <p className="font-headline-md text-headline-md text-on-surface">
                $180.00
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-tertiary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  4.9
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  (124 reviews)
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Color Swatches --> */}
          <div className="space-y-4">
            <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Select Color
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full border-2 border-on-surface p-0.5 transition-transform hover:scale-110">
                <span className="block w-full h-full rounded-full bg-[#CC0000]"></span>
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-outline-variant p-0.5 transition-transform hover:scale-110">
                <span className="block w-full h-full rounded-full bg-[#1A1A1A]"></span>
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-outline-variant p-0.5 transition-transform hover:scale-110">
                <span className="block w-full h-full rounded-full bg-primary-fixed-dim"></span>
              </button>
            </div>
          </div>
          {/* <!-- Size Selector --> */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Select Size (US)
              </p>
              <a
                className="font-label-md text-label-md text-primary underline underline-offset-4 hover:text-on-surface transition-colors"
                href="#"
              >
                Size Guide
              </a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md hover:border-on-surface transition-all">
                7
              </button>
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md hover:border-on-surface transition-all">
                8
              </button>
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md hover:border-on-surface transition-all">
                9
              </button>
              <button className="py-3 border border-on-surface bg-on-surface text-on-primary rounded-lg font-label-md text-label-md transition-all">
                10
              </button>
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md hover:border-on-surface transition-all">
                11
              </button>
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md hover:border-on-surface transition-all">
                12
              </button>
              <button className="py-3 border border-outline-variant rounded-lg font-label-md text-label-md opacity-30 cursor-not-allowed">
                13
              </button>
            </div>
          </div>
          {/* <!-- CTAs --> */}
          <div className="flex flex-col gap-4 pt-4">
            <button className="w-full bg-on-surface text-on-primary py-5 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:bg-primary transition-all duration-300 active:scale-95 shadow-lg">
              Add to Cart
            </button>
            <button className="w-full border border-outline-variant py-5 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:bg-surface-container transition-all duration-300 active:scale-95">
              Buy Now
            </button>
          </div>
          {/* <!-- Tabs --> */}
          <div className="pt-8 border-t border-outline-variant/20">
            <div className="flex gap-8 mb-6 overflow-x-auto no-scrollbar">
              <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface border-b-2 border-on-surface pb-2 shrink-0">
                Description
              </button>
              <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface pb-2 shrink-0">
                Materials
              </button>
              <button className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface pb-2 shrink-0">
                Shipping
              </button>
            </div>
            <div className="font-body-md text-on-surface-variant leading-relaxed">
              The Air Jordan 1 Retro High OG is a reissue of the original 1985
              sneaker that changed the game. Crafted with premium full-grain
              leather and featuring the iconic high-top profile, it delivers
              timeless style and heritage performance. The encapsulated Air-Sole
              unit provides lightweight cushioning for all-day comfort.
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Reviews Section --> */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-24">
        <div className="flex items-end justify-between mb-12 border-b border-outline-variant/20 pb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Customer Reviews
          </h2>
          <button className="font-label-md text-label-md text-primary hover:underline">
            Write a review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* <!-- Review 1 --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A portrait of a stylish young man in high-end streetwear. The photography is clean and editorial with professional softbox lighting. The setting is a minimalist studio with neutral tones, keeping the focus on the subject's modern and trendy appearance, consistent with a luxury sneaker boutique vibe."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt5_oaB88jU735OWUhCsAObBAqjX4QB_Nj_OJ5K86FAbBgc3dqAJzVzUAlX-uTtFQXP1ai2FF8A00GFh7wnRsp1kBm0MKZPPy5pRPhMDFnLW5Sn0ddKs-Bu-eZFFzi67a1sHMcsgpZd4Kyep5ByoxyBIAZWMEkjnfLxoWnvrmNe7Mcrrs66MhcoEw21z8bbXv9ML9I6sWgvSHcUy1GrZaSWu-VCrVqa-xdRbdGeeUixq_j57yC56Higibf69vytG5hrf5CDBygsqT5"
                  />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">
                    Marcus Chen
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Verified Buyer
                  </p>
                </div>
              </div>
              <div className="flex text-tertiary">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
            </div>
            <p className="font-body-md text-on-surface-variant">
              "ClassNameic silhouette. The leather quality on this retro release
              is actually better than previous years. Fits true to size and
              looks amazing with everything."
            </p>
          </div>
          {/* <!-- Review 2 --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover"
                    data-alt="A profile headshot of a fashionable woman with a modern aesthetic, shot in a high-key studio environment. The image is bright and airy with soft shadows, reflecting a professional and exclusive brand identity. The style is minimalist and clean, emphasizing a sophisticated lifestyle."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPRQyTYcNn51mbnP4lQkBWKhJOlEcYf1zqWGfYDI76eMW_Zkq90Eu1fc3rKjT-2dMKyuxoATv-kne1B5Rfw15EZ6ncOiEhWcxXNp2BFHryNG7dIy9-VCMl6RPD9tW0PLXrh1iSHUpuykvwkKpnfFW0JeR-yCnfx8dZf1OU_UaawzW90ZKCfpj7m-sf1H69W5MDsPh1d4IoNcpOgN7YYfFvAMQhvVytkvV2-6TbczMDjDJhilAjXih0G9b9RThMB8WRIGEtYUI_LV6"
                  />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">
                    Sarah Jenkins
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Verified Buyer
                  </p>
                </div>
              </div>
              <div className="flex text-tertiary">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  star
                </span>
              </div>
            </div>
            <p className="font-body-md text-on-surface-variant">
              "Shipping was incredibly fast. The packaging was pristine. These
              are definitely authentic. Five stars for the service from Sneaker
              Vault."
            </p>
          </div>
        </div>
      </section>
      {/* <!-- Related Products Section --> */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            You May Also Like
          </h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:bg-on-surface hover:text-on-primary transition-all group">
              <span
                className="material-symbols-outlined group-hover:scale-110 transition-transform"
                data-icon="chevron_left"
              >
                chevron_left
              </span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:bg-on-surface hover:text-on-primary transition-all group">
              <span
                className="material-symbols-outlined group-hover:scale-110 transition-transform"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {/* <!-- Product 1 --> */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden mb-4 relative shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="A professional product shot of a high-top Nike sneaker in a contrasting colorway, positioned at a dynamic angle on a crisp white background. The lighting is diffused and modern, highlighting the sleek design and premium texture. The image perfectly aligns with a high-end streetwear retail aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfkGc76lYH-9ozJBHRWs6yhxw8RCZuPca3KvRzECkSAJYP_GpE1vqzEGpHAM-fnX1MoMXb3aLiwMtwHax0WSf_MPZhd1V0BEW8HYRE9FkkZAFw20umT0wVWnG_ibyBDNvOj2mUamRmJCIk7kJun02opuPEEUeAtVLf-OYwIVrclAsZRmY2-7ECEFouFsNFX_9M0bSQGoRvNEFxy5HvMYh3opakbYF5fkhznr7mapkNki7i31NBxN158XBqgTxXMHayN2Ukuehlu07U"
              />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="material-symbols-outlined text-on-surface text-lg"
                  data-icon="shopping_bag"
                >
                  shopping_bag
                </span>
              </button>
            </div>
            <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1">
              Jordan 4 Retro
            </p>
            <p className="font-body-md font-bold text-on-surface">$210.00</p>
          </div>
          {/* <!-- Product 2 --> */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden mb-4 relative shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="An editorial image of a minimalist designer sneaker presented in a bright, clean environment. The lighting emphasizes the silhouette and material quality against a pure white background. The composition is elegant and focused, reflecting the exclusive and professional nature of the Sneaker Vault brand."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzjc0rq0BlmWI2DIGbp02vQL98Qbpm7Qh7GMIiKQYJxZYewaWSV7gzDh7HEeQ-TsmmqVYXaatsPTgPwSBSbu9aDR5c1X0-RX2Kj7_V0-KHOFLtb6cxzoZlBuVzl_U1z4Q8RiTDDn3wt89wVmv5Ner6snvsVZ4JAZJEtvNKs_G0mrWpSJG1N1Sv1rTazd8hpOkY7KP8jr5iO-aSfbsA2b3JeIQdYumLXEBAIK4jFfYfiRmSHkjvrIpJqJV0bvW39l_yjYWaAA1aQ8GN"
              />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="material-symbols-outlined text-on-surface text-lg"
                  data-icon="shopping_bag"
                >
                  shopping_bag
                </span>
              </button>
            </div>
            <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1">
              Dunk Low 'Panda'
            </p>
            <p className="font-body-md font-bold text-on-surface">$110.00</p>
          </div>
          {/* <!-- Product 3 --> */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden mb-4 relative shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="A clean, studio-lit photograph of a classNameic Nike Jordan sneaker in a blue and white colorway. The setting is a bright, high-key minimalist space that highlights the premium footwear's details. The lighting is soft yet descriptive, capturing the essence of luxury streetwear photography."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm-upyWoDWrPb81H5oGH7IRciG13-0bLApeHTK790JUEzpZ_np9eoA_cYayUe0gX34AP7k14GoriZLkwIbDXlk_5Vh2MbYezClYVQkcNnBI71Vhhj5dz0lfIqn0rH6ycwndHQ5HzIUzhVFngCXK3tI6MI0szkMxIXprrWxLvLnhwTkRUvVUXHklekKp5C7NdPvt_BaJXoQcL7kb-66jPZXoQ1MlIPMG7-EWDKVveHWD82w_thBLqPIw5xJ1acIScOvSB3VMBxhSqr0"
              />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="material-symbols-outlined text-on-surface text-lg"
                  data-icon="shopping_bag"
                >
                  shopping_bag
                </span>
              </button>
            </div>
            <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1">
              Air Jordan 1 'University'
            </p>
            <p className="font-body-md font-bold text-on-surface">$170.00</p>
          </div>
          {/* <!-- Product 4 --> */}
          <div className="group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden mb-4 relative shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-alt="A professional commerce photo of a sleek sneaker model on a minimalist gray surface. The light is diffused, creating soft shadows and highlighting the premium textures of the leather and mesh. The mood is modern and high-velocity, matching the energetic pulse of the sneaker culture ecosystem."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmmB1oWO7Fpv4eDh3oDxc94rKDgWDbdltR616O7b2f27XmVvYVUUcYcu9uSjBq4ssCbHnLwQL9SU53SWzoUxChl-Hc6zNHUQBCsKZPPwUXjCIMUNXOjhyOL0RtMHj0kPZetUZ_OS1OD5VRgHv2XEAwYXo5xdITclMajgvZwA8FDOefxHs4R4nLg-Y6u1RofKGmT81vWZBobwKudx_z4wjRCfPoxUwItu7mNGe2H_i-M61v22fYyvzq39e4D_fxYtjoXv-NI76Us62t"
              />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-surface-container-lowest/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span
                  className="material-symbols-outlined text-on-surface text-lg"
                  data-icon="shopping_bag"
                >
                  shopping_bag
                </span>
              </button>
            </div>
            <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1">
              Jordan 3 'White Cement'
            </p>
            <p className="font-body-md font-bold text-on-surface">$210.00</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
