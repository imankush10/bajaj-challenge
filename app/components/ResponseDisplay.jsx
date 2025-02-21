export default function ResponseDisplay({ responseData, filters }) {
    if (!responseData) return null;
  
    // Check if no filters are selected
    const showAll = filters.length === 0;
  
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-md text-black">
        <h3 className="text-lg font-medium mb-2">Filtered Response:</h3>
        <div className="space-y-2">
          {(showAll || filters.includes("numbers")) && responseData.numbers && (
            <div>
              <strong>Numbers:</strong> {responseData.numbers.join(", ")}
            </div>
          )}
          {(showAll || filters.includes("alphabets")) && responseData.alphabets && (
            <div>
              <strong>Alphabets:</strong> {responseData.alphabets.join(", ")}
            </div>
          )}
          {(showAll || filters.includes("highest_alphabet")) &&
            responseData.highest_alphabet && (
              <div>
                <strong>Highest Alphabet:</strong>{" "}
                {responseData.highest_alphabet.join(", ")}
              </div>
            )}
          {showAll && (
            <>
              <div>
                <strong>User ID:</strong> {responseData.user_id}
              </div>
              <div>
                <strong>Email:</strong> {responseData.email}
              </div>
              <div>
                <strong>Roll Number:</strong> {responseData.roll_number}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  