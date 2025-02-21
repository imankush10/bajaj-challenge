"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import JsonInput from "@/app/components/JsonInput";
import FilterCheckbox from "@/app/components/FilterCheckbox";
import ResponseDisplay from "@/app/components/ResponseDisplay";

export default function Home() {
  const [inputJson, setInputJson] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputJson(e.target.value);
    setError(null);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResponseData(null);

    try {
      let parsedJson;
      try {
        parsedJson = JSON.parse(inputJson);
      } catch (parseError) {
        throw new Error("Invalid JSON format");
      }

      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        throw new Error("Input must contain a 'data' array");
      }

      const response = await fetch("api/v1/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: inputJson, // Use inputJson directly here
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setResponseData(data);
      if (selectedFilters.length === 0)
        setSelectedFilters(["alphabets", "numbers", "highest_alphabet"]);
    } catch (err) {
      setError(err.message || "Invalid request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>22BCS15691</title>
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Bajaj Finserv Health Dev Challenge
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <JsonInput
            value={inputJson}
            onChange={handleInputChange}
            error={error}
          />
          {error && (
            <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Data"}
          </button>
        </div>

        {responseData && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
            <FilterCheckbox
              filters={selectedFilters}
              onChange={(filters) => setSelectedFilters(filters)}
            />
            <ResponseDisplay
              responseData={responseData}
              filters={selectedFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}
