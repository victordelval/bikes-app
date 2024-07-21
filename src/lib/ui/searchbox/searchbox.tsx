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
  );
}
