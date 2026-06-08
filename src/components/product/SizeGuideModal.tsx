interface SizeChartRow {
  eu: number;
  us: number | string;
  cm: number;
}

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const maleSizeChart: SizeChartRow[] = [
  { eu: 38, us: 6, cm: 24 },
  { eu: 39, us: 6.5, cm: 24.5 },
  { eu: 40, us: 7, cm: 25 },
  { eu: 41, us: 8, cm: 26 },
  { eu: 42, us: 8.5, cm: 26.5 },
  { eu: 43, us: 9, cm: 27 },
  { eu: 44, us: 10, cm: 28 },
  { eu: 45, us: 11, cm: 29 },
];

const femaleSizeChart: SizeChartRow[] = [
  { eu: 35, us: 5, cm: 22 },
  { eu: 36, us: 5.5, cm: 22.5 },
  { eu: 37, us: 6, cm: 23 },
  { eu: 38, us: 6.5, cm: 24 },
  { eu: 39, us: 7, cm: 24.5 },
  { eu: 40, us: 8, cm: 25 },
  { eu: 41, us: 8.5, cm: 26 },
];

const SizeGuideModal = ({
  isOpen,
  onClose,
}: SizeGuideModalProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-surface-container p-4 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              Hướng dẫn chọn size
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Bảng quy đổi size giày nam và nữ theo EU, US và CM.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold hover:bg-surface-hover"
          >
            Đóng
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <h3 className="mb-3 text-base font-semibold text-on-surface">
              Bảng size giày nam
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-background">
              <table className="min-w-[320px] w-full text-left text-sm text-on-surface">
                <thead className="bg-surface text-xs uppercase text-on-surface-variant">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">EU</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">US Nam</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {maleSizeChart.map((row) => (
                    <tr
                      key={row.eu}
                      className="border-t border-outline-variant"
                    >
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium">
                        {row.eu}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row.us}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-base font-semibold text-on-surface">
              Bảng size giày nữ
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-background">
              <table className="min-w-[320px] w-full text-left text-sm text-on-surface">
                <thead className="bg-surface text-xs uppercase text-on-surface-variant">
                  <tr>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">EU</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">US Nữ</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {femaleSizeChart.map((row) => (
                    <tr
                      key={row.eu}
                      className="border-t border-outline-variant"
                    >
                      <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium">
                        {row.eu}
                      </td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row.us}</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
