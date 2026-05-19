const AuthSocials = () => {
  return (
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
  );
};

export default AuthSocials;
