interface HomeProductsStatusProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyMessage: string;
  children: React.ReactNode;
}

const HomeProductsStatus = ({
  isLoading,
  error,
  isEmpty,
  emptyMessage,
  children,
}: HomeProductsStatusProps): React.JSX.Element => {
  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
        Đang tải sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700">
        {error}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center text-on-surface-variant">
        {emptyMessage}
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeProductsStatus;
