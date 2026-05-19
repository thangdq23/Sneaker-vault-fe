import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <main className="pt-24 md:pt-0 min-h-screen flex flex-col md:flex-row">
      {/* <!-- Hero Visual Section (Split Layout) --> */}
      <section className="hidden md:block w-1/2 h-screen sticky top-0 bg-surface-container-highest overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>
        <img
          alt="Premium Sneaker Visual"
          className="w-full h-full object-cover grayscale-[20%]"
          data-alt="A high-fashion editorial photograph of a premium, limited-edition sneaker floating in a minimalist studio environment. The lighting is soft and high-key, highlighting the intricate textures of the leather and mesh. The color palette is composed of sophisticated grays and whites with sharp black accents, creating an atmosphere of exclusive luxury and modern streetwear culture. The composition is clean and airy, emphasizing the shoe's sleek silhouette against a blurred architectural background."
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
      {/* <!-- Form Section --> */}
      <section className="flex-1 flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-12 bg-background">
        <div className="w-full max-w-md">
          {/* <!-- Auth Toggle --> */}
          <div className="flex gap-8 mb-12 border-b border-outline-variant/30">
            <button
              onClick={handleLogin}
              className="font-label-md text-label-md uppercase tracking-widest text-on-surface pb-4 text-on-surface-variant"
            >
              Login
            </button>
            <button className="font-label-md text-label-md uppercase tracking-widest hover:text-on-surface pb-4 transition-all border-b-2 border-on-surface text-on-surface">
              Register
            </button>   
          </div>
          <div className="space-y-2 mb-8">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Create Your Vault
            </h1>
            <p className="text-on-surface-variant">
              Join our exclusive community of collectors.
            </p>
          </div>
          {/* <!-- Auth Form --> */}
          <form className="space-y-6">
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm uppercase text-on-surface-variant"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface transition-all py-3 px-0 font-body-md placeholder:text-outline-variant"
                id="fullname"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm uppercase text-on-surface-variant"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface transition-all py-3 px-0 font-body-md placeholder:text-outline-variant"
                id="email"
                placeholder="name@example.com"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm uppercase text-on-surface-variant"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface transition-all py-3 px-0 font-body-md placeholder:text-outline-variant"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div className="space-y-1">
              <label
                className="font-label-sm text-label-sm uppercase text-on-surface-variant"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:ring-0 focus:border-on-surface transition-all py-3 px-0 font-body-md placeholder:text-outline-variant"
                id="confirm-password"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <button
              className="w-full bg-on-surface text-surface-container-lowest font-label-md text-label-md uppercase tracking-widest py-4 rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
              type="submit"
            >
              CREATE ACCOUNT
            </button>
          </form>
          {/* <!-- Divider --> */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-label-sm uppercase">
              <span className="bg-background px-4 text-on-surface-variant">
                Or continue with
              </span>
            </div>
          </div>
          {/* <!-- Social Logins --> */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 border border-outline-variant/50 rounded-lg py-3 hover:bg-surface-container-low transition-all active:scale-95 duration-200">
              <img
                alt="Google"
                className="w-5 h-5 grayscale opacity-70"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7selwTXlrVMOOFHoQOTgTiYBBMOejcjfm375N6YIEblfbgDxaUbEVCmbUcACskKqhLnJv1CYBHg31GG_iQ3SIYlnO9ih54MxNCX5UwjNczoH5SxQ-A2wJAXgj4OfOBZ6WTKhgMI9anSuCUVNBRB5zoD1fBuR1YUp2a2Y1tSkXisiIHP8YfFcZeUQULLC7RKIJy0y1r7GH5gDSapyd5C0vzQV3XaRJMw8D36mZWhpYajs9GkXev7s3PQ1-OPhWIbiOvx4tTootcWjh"
              />
              <span className="font-label-md text-label-md">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 border border-outline-variant/50 rounded-lg py-3 hover:bg-surface-container-low transition-all active:scale-95 duration-200">
              <span
                className="material-symbols-outlined text-[20px]"
                data-icon="apple"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                ios
              </span>
              <span className="font-label-md text-label-md">Apple</span>
            </button>
          </div>
          {/* <!-- Help Link --> */}
          <p className="mt-12 text-center font-label-sm text-label-sm text-on-surface-variant">
            Already have an account?{" "}
            <a
              className="text-on-surface underline hover:text-primary transition-colors"
              href="#"
            >
              Login here
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
