const AuthHero = () => {
  return (
    <section className="hidden md:block w-1/2 h-screen sticky top-0 bg-surface-container-highest overflow-hidden">
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/40 to-transparent" />
      <img
        alt="Premium Sneaker Visual"
        className="w-full h-full object-cover grayscale-20"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAGoCUmEwjLBfzA7TiZIV1LZTW0G_dY2KKvVS-Ym_bP2EGHXG3CdBo0AgqtVTkmCnttfWMXMEG_YkSCI9j13ebUgvNLJO0zhaP221W9m4uWiuXtHVtv9FYong-c0l6ez9hLG-U8p7g6lQZPsP4r7L_8iDNxkDoPO3rEBj5TUVGn6rCnf1vekt_1_Sr8F-bQP9p3yw8bL9L5QUfuIMNzX1BH5G72Bbfv7Xl4s5KoZchS0cOkpyclHrOMzREqSWrkdGdyZDuxB4XJI1x"
      />
      <div className="absolute bottom-12 left-margin-desktop z-20 text-surface-container-lowest max-w-lg">
        <h2 className="font-headline-lg text-headline-lg mb-4">
          THE ARCHIVE IS OPEN.
        </h2>
        <p className="font-body-lg text-body-lg opacity-90">
          Join our exclusive community of collectors and enthusiasts to access
          limited drops and curated streetwear essentials.
        </p>
      </div>
    </section>
  );
};

export default AuthHero;
