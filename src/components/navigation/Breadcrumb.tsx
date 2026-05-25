import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps): React.JSX.Element => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm leading-relaxed text-on-surface-variant">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span
                  className="material-symbols-outlined text-[16px] text-outline-variant"
                  aria-hidden
                >
                  chevron_right
                </span>
              ) : null}
              {isLast || !item.to ? (
                <span
                  className={`max-w-[12rem] truncate sm:max-w-md ${
                    isLast
                      ? "font-semibold text-on-surface"
                      : "text-on-surface-variant"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="whitespace-nowrap hover:text-primary smooth-transition"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
