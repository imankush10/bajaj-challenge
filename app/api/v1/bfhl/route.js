import { NextResponse } from 'next/server';

export async function OPTIONS() {
    return NextResponse.json({}, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // ✅ Allows all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  }

export async function GET() {
  return NextResponse.json({ operation_code: 1 }, { status: 200 });
}

export async function POST(req) {
    try {
      const body = await req.json();
      console.log("Received Data:", body); // Log incoming request data
  
      const { data } = body;
  
      if (!data || !Array.isArray(data)) {
        console.log("Invalid input:", body); // Log invalid input case
        return NextResponse.json(
          { is_success: false, error: "Invalid input: 'data' must be an array" },
          { status: 400 }
        );
      }
  
      const numbers = data.filter(item => !isNaN(item) && String(item).trim() !== '');
      const alphabets = data.filter(item => 
        typeof item === 'string' && 
        item.length === 1 && 
        item.match(/[a-zA-Z]/)
      );
  
      let highestAlphabet = [];
      if (alphabets.length > 0) {
        const sortedAlphabets = [...alphabets].sort((a, b) => 
          a.toLowerCase().localeCompare(b.toLowerCase())
        );
        highestAlphabet = [sortedAlphabets[sortedAlphabets.length - 1]];
      }
  
      const response = {
        is_success: true,
        user_id: "Ankush_Kumar_10102002",
        email: "imankush1010@gmail.com",
        roll_number: "22BCS15691",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
      };
  
      console.log("Response Data:", response); // Log response before sending
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.json(
        { is_success: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
