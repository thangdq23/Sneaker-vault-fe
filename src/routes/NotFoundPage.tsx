import { Link } from "react-router";

const NotFoundPage = () => (
  <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-margin-mobile py-24 text-center md:px-margin-desktop">
    <h1 className="section-title text-primary">Không tìm thấy trang</h1>
    <p className="section-desc mx-auto">
      Trang bạn truy cập không tồn tại hoặc đã được di chuyển.
    </p>
    <Link to="/" className="btn btn-primary btn-pill">
      Về trang chủ
    </Link>
  </main>
);

export default NotFoundPage;