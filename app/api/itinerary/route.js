import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Itinerary from "@/app/models/Itinerary";

export async function POST(request) {
  try {
    const body = await request.json();
    const { sessionId, title, preferences, itinerary } = body;

    if (!sessionId || !title || !itinerary || !Array.isArray(itinerary)) {
      return NextResponse.json(
        { success: false, message: "sessionId, title, and itinerary are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const doc = await Itinerary.create({
      sessionId,
      title,
      preferences: preferences || {},
      itinerary
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: doc._id,
          shareId: doc.shareId
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Itinerary POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save itinerary." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    await connectDB();

    const filter = sessionId ? { sessionId } : {};
    const itineraries = await Itinerary.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ success: true, data: itineraries });
  } catch (error) {
    console.error("Itinerary GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch itineraries." },
      { status: 500 }
    );
  }
}
