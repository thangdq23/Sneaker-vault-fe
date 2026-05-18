
const HomePage = () => {
  return (
    <main>
{/* <!-- Hero Section --> */}
<section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-background">
{/* <!-- Faded Typography Background --> */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
<span className="font-display font-black text-[30vw] leading-none text-faded-bg uppercase tracking-tighter opacity-60 transform translate-y-12">VAULT</span>
</div>
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10 py-12">
<div className="order-2 lg:order-1 animate-fade-in-up">
<div className="flex items-center gap-3 mb-6">
<span className="w-8 h-px bg-tertiary"></span>
<span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.4em]">Premium Streetwear Collection</span>
</div>
<h1 className="font-display text-7xl md:text-[7rem] font-bold text-primary mb-8 leading-[0.85] tracking-tighter">
                    ELEVATE<br/>THE STEP
                </h1>
<p className="text-secondary text-lg mb-12 max-w-sm font-light leading-relaxed">
                    Limited Edition Drops. Experience the fusion of high-fashion aesthetics and technical performance.
                </p>
<div className="flex flex-col sm:flex-row gap-5">
<button className="bg-primary text-on-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition glow-hover border border-primary rounded-sm shadow-xl">
                        Shop Now
                    </button>
<button className="bg-transparent text-primary px-12 py-5 font-bold text-[10px] uppercase tracking-[0.25em] smooth-transition border border-black/10 hover:bg-black/5 rounded-sm">
                        Explore Archive
                    </button>
</div>
</div>
<div className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
<div className="relative group perspective-1000">
<div className="absolute -inset-10 bg-gradient-to-tr from-tertiary/10 to-transparent rounded-full blur-[100px] opacity-40 group-hover:opacity-70 smooth-transition"></div>
<img alt="Premium Sneaker" className="w-full max-w-xl relative z-10 floating-shadow smooth-transition group-hover:-translate-y-6 group-hover:rotate-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_Do6tMPHvRMra5nYhv6l2eHUTo66nZ1k2wt4h7VmrWeMSWO8ikV1LNagsdPzRdxxVtGA1V2X2wlxE7-IqEFnVoTqSSXUbVBB8VRR4_HXg_FcIdqOr-rGsea5lUDALhys46thrIlhtXP81MqA-47LEfTGJ7qHU49H6JU99_Qoygz7-nkIEmic-oYXhleHdc5ArYKKrLkXRby7lv7Dojyq1xmNSbtgx6-Vg_SzmhHhnHgama0QjzTS7J8ya9vVabnzaPAyAsPPgIW_"/>
</div>
</div>
</div>
</section>
{/* <!-- Trending Section --> */}
<section className="py-32 bg-surface-alt">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-20 gap-12">
<div className="text-center lg:text-left">
<span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Curated selection</span>
<h2 className="font-display text-5xl md:text-6xl font-bold text-primary tracking-tight">TRENDING NOW</h2>
</div>
<div className="flex gap-8 border-b border-black/10 overflow-x-auto pb-1 max-w-full">
<button className="pb-5 px-4 text-[11px] font-bold tracking-[0.2em] uppercase border-b-2 border-primary whitespace-nowrap">Trending</button>
<button className="pb-5 px-4 text-[11px] font-medium tracking-[0.2em] uppercase text-secondary hover:text-primary smooth-transition whitespace-nowrap">New Arrivals</button>
<button className="pb-5 px-4 text-[11px] font-medium tracking-[0.2em] uppercase text-secondary hover:text-primary smooth-transition whitespace-nowrap">Best Seller</button>
<button className="pb-5 px-4 text-[11px] font-medium tracking-[0.2em] uppercase text-secondary hover:text-primary smooth-transition whitespace-nowrap">Limited</button>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
{/* <!-- Product Card 1 --> */}
<div className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition">
<div className="aspect-[4/5] overflow-hidden bg-[#f0f0f0] relative">
<img alt="Sneaker 1" className="w-full h-full object-cover smooth-transition group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWCtB-43CVyHePc8WJJOBzM1nqILFYYHlVxRgAsXSKKMOK-nAE2yYliFyYbq86zx7w7oerzUc9HpBFfDvR1IkaSer94vALUshGy9Q-exJ7-lXv4Dh0j2eANvlvrCYlyb07SAASmjXJSJVEQxxVpRIlrovZWzK8AkXSnGd3gbrosPMJf7IyRv5of4Ng8u7B7xIxiVI-If7ylqRj7MKSPZHsOoeTcrZj2WnRZIecqCKwBi5dTM0QVyWYtPnLGYBI9pcNNG2UZTT7huYu"/>
<div className="absolute top-5 left-5 flex flex-col gap-2">
<span className="bg-primary text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm">Limited</span>
</div>
<div className="absolute top-5 right-5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 smooth-transition">
<button className="bg-white/95 backdrop-blur text-primary p-2.5 rounded-full hover:bg-primary hover:text-white smooth-transition shadow-lg">
<span className="material-symbols-outlined text-base">favorite</span>
</button>
</div>
<div className="absolute inset-x-5 bottom-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
<button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 shadow-xl hover:bg-tertiary">
<span className="material-symbols-outlined text-sm">shopping_bag</span> Add to Bag
                            </button>
</div>
</div>
<div className="p-6">
<h3 className="font-display font-bold text-lg mb-1.5 text-primary">Air Jordan 1 Retro</h3>
<p className="text-tertiary font-bold text-sm">$190.00</p>
</div>
</div>
{/* <!-- Product Card 2 --> */}
<div className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition">
<div className="aspect-[4/5] overflow-hidden bg-[#f0f0f0] relative">
<img alt="Sneaker 2" className="w-full h-full object-cover smooth-transition group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALRuCzVScNqCVfPwDW2zcmrF2CkCZzuKCrEpIFoscb6oDDlKa8NzxyaW9hgt_MZDWj1HSECiAUobaMW-7Ty7OYpUJ0fIoA0nICErJsA54MNhtOmqFrBn9UawB1WfC1vt3yzzDyPoRa9hF2Nagr-0H44-JxDZcJ7W8Gypkm8BFn5Nl2U9K5ubUKLPACuvE1OxEAi53AEx2VrtsxrsCSiS35iJ-VfG2VrOqi-iKBgCQmyoythHw3qqv4tVZcViJ9Q-R6oCqI2-dIikAO"/>
<div className="absolute top-5 left-5 flex flex-col gap-2">
<span className="bg-tertiary text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm">New Arrival</span>
</div>
<div className="absolute top-5 right-5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 smooth-transition">
<button className="bg-white/95 backdrop-blur text-primary p-2.5 rounded-full hover:bg-primary hover:text-white smooth-transition shadow-lg">
<span className="material-symbols-outlined text-base">favorite</span>
</button>
</div>
<div className="absolute inset-x-5 bottom-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
<button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 shadow-xl">
<span className="material-symbols-outlined text-sm">shopping_bag</span> Add to Bag
                            </button>
</div>
</div>
<div className="p-6">
<h3 className="font-display font-bold text-lg mb-1.5 text-primary">Nike Dunk High SE</h3>
<p className="text-tertiary font-bold text-sm">$160.00</p>
</div>
</div>
{/* <!-- Product Card 3 --> */}
<div className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition">
<div className="aspect-[4/5] overflow-hidden bg-[#f0f0f0] relative">
<img alt="Sneaker 3" className="w-full h-full object-cover smooth-transition group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAil9vIeOYaE2K5eYWB211L2T-eQZmXoMN2S00Hsd14sNCLNuhDbRLN6MYcCsV31ImLdAZfBzC-4bd8EoBgKlvu7UH9JKMJbG5Q6aAfhpJUkNbpVrp9eqM4eggd4ukRjjVeDZ1Qf63n-Lmt6xSKQvWkxgMxfEHMAdvWaD-QBVyIIQJCZuL0V-uBqtsiYxwttrCN-UrFWK1DLm9Zbb4ykJDBkh3wD3tMckR-ghAuxNs1o8n9Kb5ITblwzVS14mmA2PhLjE2NyKTIwAz2"/>
<div className="absolute top-5 right-5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 smooth-transition">
<button className="bg-white/95 backdrop-blur text-primary p-2.5 rounded-full hover:bg-primary hover:text-white smooth-transition shadow-lg">
<span className="material-symbols-outlined text-base">favorite</span>
</button>
</div>
<div className="absolute inset-x-5 bottom-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
<button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 shadow-xl">
<span className="material-symbols-outlined text-sm">shopping_bag</span> Add to Bag
                            </button>
</div>
</div>
<div className="p-6">
<h3 className="font-display font-bold text-lg mb-1.5 text-primary">Adidas Yeezy Boost</h3>
<p className="text-tertiary font-bold text-sm">$220.00</p>
</div>
</div>
{/* <!-- Product Card 4 --> */}
<div className="group relative bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 smooth-transition">
<div className="aspect-[4/5] overflow-hidden bg-[#f0f0f0] relative">
<img alt="Sneaker 4" className="w-full h-full object-cover smooth-transition group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yh-elP3DdFg6PM8JbUy531zBpKwqzUKCxq789PHMZVRj728fPRNGD6_Gq-F9ecmb87U_yh6eUHImkAjMKEx4LKgj1BBKGwgIy38GQvNcmJMN1fIY8O_Qm4QCdrl9vDXwvI1ec7cBtwFFakrtVnHtogD9kAoN6Yx9Papd3SXRibaktuv6cS9KMNqkQ7xR_MEtig9g41XigtgpvxQTxKCpfFqFQVRlRhGftlfzF0CvhO1ZUVkH9phP8nHUm25mr-oJ9XArGp3sfXw3"/>
<div className="absolute top-5 left-5 flex flex-col gap-2">
<span className="bg-[#22c55e] text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm">In Stock</span>
</div>
<div className="absolute top-5 right-5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 smooth-transition">
<button className="bg-white/95 backdrop-blur text-primary p-2.5 rounded-full hover:bg-primary hover:text-white smooth-transition shadow-lg">
<span className="material-symbols-outlined text-base">favorite</span>
</button>
</div>
<div className="absolute inset-x-5 bottom-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
<button className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 shadow-xl">
<span className="material-symbols-outlined text-sm">shopping_bag</span> Add to Bag
                            </button>
</div>
</div>
<div className="p-6">
<h3 className="font-display font-bold text-lg mb-1.5 text-primary">Nike ZoomX Vaporfly</h3>
<p className="text-tertiary font-bold text-sm">$250.00</p>
</div>
</div>
</div>
</div>
</section>
{/* <!-- Category Banners (Magazine Style) --> */}
<section className="py-24 bg-white">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto lg:h-[750px]">
<div className="md:col-span-8 group relative overflow-hidden rounded-2xl">
<img alt="Running" className="w-full h-full object-cover smooth-transition group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4-92KHRBDb8DcNV4YylArhrj8cvxaWA_KvM5tiKet_TwuFyKO1kZwUGKaojm04ArxfHAkrmDJBcIpPgU175fKLBs3cvOqF3J3irnFlFR9bWDmhJYI4-gVZPNuK__5-m32RMTX-Pjj2o86iVc1z8Ub5NmyWuGIQtgsKzjUKymqQ7vpTVktmDGQfSapfQi1ItIGB4tnpwdO9IvNBnxKoa8-XoNA7bAUGTsP5NJGA25bjKO7oxsbqNi0MeMtF0BAIoTJrwUvoqyQWnrg"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
<div className="absolute bottom-16 left-16 max-w-lg">
<span className="text-white/70 text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block">Performance Elite</span>
<h3 className="font-display text-7xl text-white font-bold mb-10 tracking-tighter leading-none">RUNNING<br/>SERIES</h3>
<button className="group/btn relative px-10 py-5 bg-white text-primary text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm overflow-hidden smooth-transition">
<span className="relative z-10 group-hover/btn:text-white">View Collection</span>
<div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 smooth-transition"></div>
</button>
</div>
</div>
<div className="md:col-span-4 flex flex-col gap-8">
<div className="h-1/2 group relative overflow-hidden rounded-2xl">
<img alt="Basketball" className="w-full h-full object-cover smooth-transition group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTmbCOQbV_Jh0BVZULPB055py5GUJWVmKpHuPchWjeLcVcDWrVMQliT8FNNilA3nlP4kQUoMD7OxxICvx4_jRVUCSSjinUVx64rsV6fPsaGV6Y14OqZpyo8wTLRIsvu9bMk4ThnW78SREEBDrUlHNkMGGsEPONuv2w3VJg7P1k_eRIcvAIB60sk9uf64b9ZgETgB9okEQI9PCOu8aRf6IqlxPt9NtBx2D_Xg-ZHyWtvZlg-gLLZ9E091T7ohvO52NHCnKWvV7voZU"/>
<div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent opacity-70 group-hover:opacity-90 smooth-transition"></div>
<div className="absolute bottom-10 left-10">
<h3 className="font-display text-4xl text-white font-bold mb-5 tracking-tight">BASKETBALL</h3>
<a className="group/link text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2" href="#">
<span>Explore</span>
<span className="material-symbols-outlined text-sm group-hover/link:translate-x-2 smooth-transition">arrow_forward</span>
</a>
</div>
</div>
<div className="h-1/2 group relative overflow-hidden rounded-2xl">
<img alt="Lifestyle" className="w-full h-full object-cover smooth-transition group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxc9M0UnTylmykfUaMQFBBLxvoyv1D7fVEYKYB44I1IAiYF4paqyOH_N6rct9v8KDC7Fc5UXnKh_F9vGiyNwURExo3h4AEqDPuNJ4Hbafde7QnzgvNKUfJLgA9byUv1SNUPXEEsgAMYgehFEm1vdu6LQWbbYFmPbFvAPbJfu1gMS7nma5OjDYOMpJYPb6TL4GSzec7r7IeLEmgrxMInQ2CpRPX20TdYFugz2gQdCSs-Z5nsj7I-7jMjEKtugaaRBTHjo2LTM3AfT4D"/>
<div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent opacity-70 group-hover:opacity-90 smooth-transition"></div>
<div className="absolute bottom-10 left-10">
<h3 className="font-display text-4xl text-white font-bold mb-5 tracking-tight">LIFESTYLE</h3>
<a className="group/link text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2" href="#">
<span>Explore</span>
<span className="material-symbols-outlined text-sm group-hover/link:translate-x-2 smooth-transition">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>
{/* <!-- Sale Banner (Redesigned) --> */}
<section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
{/* <!-- Abstract Background --> */}
<div className="absolute inset-0">
<img alt="Sale BG" className="w-full h-full object-cover opacity-20 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yh-elP3DdFg6PM8JbUy531zBpKwqzUKCxq789PHMZVRj728fPRNGD6_Gq-F9ecmb87U_yh6eUHImkAjMKEx4LKgj1BBKGwgIy38GQvNcmJMN1fIY8O_Qm4QCdrl9vDXwvI1ec7cBtwFFakrtVnHtogD9kAoN6Yx9Papd3SXRibaktuv6cS9KMNqkQ7xR_MEtig9g41XigtgpvxQTxKCpfFqFQVRlRhGftlfzF0CvhO1ZUVkH9phP8nHUm25mr-oJ9XArGp3sfXw3"/>
<div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"></div>
</div>
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
<div className="text-center lg:text-left max-w-2xl">
<span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Flash Sale Event</span>
<h2 className="font-display text-6xl md:text-[6.5rem] text-white font-bold mb-10 tracking-tighter leading-[0.85]">UP TO 50% OFF<br/><span className="text-white/30">ARCHIVE DROP</span></h2>
<button className="bg-white text-primary px-14 py-6 font-bold text-[10px] uppercase tracking-[0.4em] smooth-transition hover:bg-tertiary hover:text-white rounded-sm">
                    Shop The Sale
                </button>
</div>
<div className="w-full lg:w-auto">
<div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-3xl flex flex-col items-center">
<span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.5em] mb-10">Offer Ends In</span>
<div className="flex gap-6 md:gap-10 items-start text-white">
<div className="flex flex-col items-center">
<span className="font-display text-6xl md:text-7xl font-bold block mb-2">23</span>
<span className="text-[9px] uppercase tracking-[0.3em] opacity-40">Hours</span>
</div>
<span className="text-5xl md:text-6xl font-light opacity-20 pt-1">:</span>
<div className="flex flex-col items-center">
<span className="font-display text-6xl md:text-7xl font-bold block mb-2">45</span>
<span className="text-[9px] uppercase tracking-[0.3em] opacity-40">Minutes</span>
</div>
<span className="text-5xl md:text-6xl font-light opacity-20 pt-1">:</span>
<div className="flex flex-col items-center">
<span className="font-display text-6xl md:text-7xl font-bold block mb-2">12</span>
<span className="text-[9px] uppercase tracking-[0.3em] opacity-40">Seconds</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* <!-- Testimonials (Glassmorphism) --> */}
<section className="py-36 bg-background overflow-hidden relative">
<div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
<div className="max-w-4xl mx-auto">
<div className="glass border border-black/5 p-16 md:p-24 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
<span className="material-symbols-outlined text-8xl text-primary/10 absolute top-12 left-12 select-none">format_quote</span>
<div className="flex justify-center gap-1 text-tertiary mb-12">
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
<span className="material-symbols-outlined fill-1">star</span>
</div>
<blockquote className="font-display text-3xl md:text-4xl text-primary font-medium mb-16 leading-tight max-w-2xl mx-auto">
                        "The curated selection is unmatched. I found a pair of limited edition Dunks I'd been searching for for months. Fast shipping &amp; premium packaging."
                    </blockquote>
<div className="flex flex-col items-center">
<div className="relative mb-6">
<div className="absolute -inset-1 bg-gradient-to-tr from-tertiary to-primary rounded-full blur-sm opacity-20"></div>
<img alt="Marcus V." className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover relative" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNdlUS5hwjHMoZMOt-v7t_lJF6wiJgg1JbSmIVFvbcMSdhlZ94HjObtSfMfuYoHBfjjGk3qnHTsoq71Rd0L0RvAjC3VBtR4iFP89KTl3bm5m9NBZWVoDcr1AjIatDBhwvy-0gCFzv4hxfImpMb78n__VeqBNdW0-n2bINZRZC9YdBRPZU6mAewJIAq95cYI5V983OUcBCncr0FD6H9H-pw3zh5MUJ4Ob4kBmyArxFfj-hp1Ew-OdgscqiljPuY45y8XoRVxefbyWFm"/>
</div>
<cite className="font-display font-bold text-xl not-italic mb-1">Marcus V.</cite>
<span className="text-secondary text-[10px] uppercase tracking-[0.3em] font-medium">Verified Collector</span>
</div>
</div>
</div>
</div>
</section>
{/* <!-- Newsletter (Premium) --> */}
<section className="py-24">
<div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
<div className="bg-primary rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-3xl">
{/* <!-- Abstract shapes --> */}
<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full -mr-64 -mt-64 blur-[100px]"></div>
<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/[0.05] rounded-full -ml-48 -mb-48 blur-[80px]"></div>
<div className="relative z-10 max-w-3xl mx-auto">
<span className="text-tertiary font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Stay Connected</span>
<h2 className="font-display text-5xl md:text-7xl text-white font-bold mb-8 tracking-tight">JOIN THE VAULT</h2>
<p className="text-white/50 text-lg mb-16 font-light leading-relaxed">Sign up to receive early access to drops, exclusive offers, and latest news in sneaker culture.</p>
<form className="flex flex-col sm:flex-row gap-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 group focus-within:border-white/30 smooth-transition">
<input className="flex-grow bg-white/[0.08] border-none px-10 py-7 text-white placeholder-white/30 focus:ring-0 focus:bg-white/[0.12] smooth-transition font-medium text-sm tracking-widest" placeholder="ENTER YOUR EMAIL" type="email"/>
<button className="bg-white text-primary px-12 py-7 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-tertiary hover:text-white smooth-transition">
                            Subscribe
                        </button>
</form>
<p className="mt-8 text-white/20 text-[9px] uppercase tracking-[0.2em]">By subscribing, you agree to our Privacy Policy</p>
</div>
</div>
</div>
</section>
</main>
  )
}

export default HomePage
