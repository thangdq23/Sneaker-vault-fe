interface QuantitySelectorProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}

const QuantitySelector = ({
  value,
  min = 1,
  max,
  onChange,
}: QuantitySelectorProps): React.JSX.Element => {
  const decrease = () => {
    onChange(Math.max(min, value - 1));
  };

  const increase = () => {
    onChange(Math.min(max, value + 1));
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-on-surface-variant">
        Số lượng
      </span>
      <div className="inline-flex items-center rounded-full border border-outline-variant/40 bg-surface-container">
        <button
          type="button"
          onClick={decrease}
          disabled={atMin}
          aria-label="Giảm số lượng"
          className="flex h-10 w-10 items-center justify-center rounded-l-full text-on-surface-variant transition hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <span
          className="min-w-[2.5rem] px-2 text-center text-base font-bold text-on-surface"
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={increase}
          disabled={atMax}
          aria-label="Tăng số lượng"
          className="flex h-10 w-10 items-center justify-center rounded-r-full text-on-surface-variant transition hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>
      {max > 0 ? (
        <span className="text-xs text-on-surface-variant">
          Tối đa {max}
        </span>
      ) : null}
    </div>
  );
};

export default QuantitySelector;
