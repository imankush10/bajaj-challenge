import React from "react";

export default function JsonInput({ value, onChange, error }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="json-input"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Enter JSON Input:
      </label>
      <textarea
        id="json-input"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        rows="5"
        value={value}
        onChange={onChange}
        placeholder='{"data": ["M","1","334","4","B"]}'
        required
      />
    </div>
  );
}
