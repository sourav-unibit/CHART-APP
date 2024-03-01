import React from "react";

export default function UserSearchBar() {
  return (
    <div className="pt-2">
      <input
        type="text"
        placeholder="search.."
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
    </div>
  );
}
