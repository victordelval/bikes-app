import { useState } from "react";

import SearchBox from "../searchbox/searchbox";

type Item = {
  name: string;
  value: string;
};

type Props = {
  label: string;
  items: Item[];
  // eslint-disable-next-line no-unused-vars
  onSelection: (value: string) => void;
  selected?: string;
  search?: string;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (term: string) => void;
  // more options
  showArrow?: boolean;
  startIcon?: React.ReactNode;
};
export default function Selector({
  label,
  items,
  search,
  onSearch,
  onSelection,
  selected,
  showArrow = true,
  startIcon,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (item: Item) => {
    onSelection(item.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        role="button"
        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {startIcon && <span className="mr-4">{startIcon}</span>}

        {label}
        {showArrow && (
          <span>
            <svg
              className="ms-3 h-2.5 w-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-60 rounded-lg bg-white shadow dark:bg-gray-700">
          {onSearch && (
            <div className="p-3">
              <SearchBox
                value={search}
                placeholder="Search country"
                // @ts-ignore
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          <ul
            role="listbox"
            className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {items.map((item) => (
              <li
                key={item.value}
                role="listitem"
                aria-label="selector-with-searchbox-listbox-listitem"
                className="py-2"
              >
                <div
                  className={`${selected === item.value ? "bg-zinc-300" : ""} flex items-center rounded ps-2 hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  <span
                    className="ms-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    onClick={() => {
                      handleSelection(item);
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
