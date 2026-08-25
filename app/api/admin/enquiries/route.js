import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Enquiry from "@/app/models/Enquiry";

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
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    await connectDB();

    const filter = {};
    if (status && status !== "All") {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Admin enquiries GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiries." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Enquiry ID is required." },
        { status: 400 }
      );
    }

    const validStatuses = ["New", "Contacted", "Converted", "Closed"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value." },
        { status: 400 }
      );
    }

    await connectDB();

    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;

    const enquiry = await Enquiry.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    }).lean();

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Admin enquiries PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry." },
      { status: 500 }
    );
  }
}
