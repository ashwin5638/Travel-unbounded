import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Destination from "@/app/models/Destination";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    const destination = await Destination.findById(id).lean();
    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    console.error("Admin destination GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch destination." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const destination = await Destination.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    }).lean();

    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    console.error("Admin destination PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update destination." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await connectDB();

    const destination = await Destination.findByIdAndDelete(id).lean();
    if (!destination) {
      return NextResponse.json(
        { success: false, message: "Destination not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Destination deleted." });
  } catch (error) {
    console.error("Admin destination DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete destination." },
      { status: 500 }
    );
  }
}
