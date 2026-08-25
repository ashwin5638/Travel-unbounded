import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Enquiry from "@/app/models/Enquiry";

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

    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Admin enquiry detail GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch enquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
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
    const { status, notes } = body;

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
    console.error("Admin enquiry PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update enquiry." },
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

    const enquiry = await Enquiry.findByIdAndDelete(id).lean();

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    console.error("Admin enquiry DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete enquiry." },
      { status: 500 }
    );
  }
}
