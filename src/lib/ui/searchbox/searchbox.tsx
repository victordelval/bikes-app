"use client";

import React from "react";

type Props = {
  value?: string;
  role?: "searchbox" | "textbox" | string;
  placeholder?: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEventHandler<HTMLInputElement>) => void;
};

export default function SearchBox({
  value = "",
  role = "searchbox",
  placeholder = "Search...",
  label,
  onChange,
}: Props) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          role={role}
          type="text"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          defaultValue={value}
          // @ts-ignore
          onChange={onChange}
        />
      </div>
    </div>
  );
}
