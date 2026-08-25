import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Itinerary from "@/app/models/Itinerary";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    let itinerary = await Itinerary.findById(id).lean();

    if (!itinerary) {
      itinerary = await Itinerary.findOne({ shareId: id }).lean();
    }

    if (!itinerary) {
      return NextResponse.json(
        { success: false, message: "Itinerary not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: itinerary });
  } catch (error) {
    console.error("Itinerary detail GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch itinerary." },
      { status: 500 }
    );
  }
}
