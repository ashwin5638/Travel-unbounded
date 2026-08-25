import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Destination from "@/app/models/Destination";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const destinations = await Destination.find().sort({ order: 1, name: 1 }).lean();

    return NextResponse.json({ success: true, data: destinations });
  } catch (error) {
    console.error("Admin destinations GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch destinations." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, country, category, description, price, image, interests, highlights, isActive, order } = body;

    if (!name || !country || !category || !description || !price || !image) {
      return NextResponse.json(
        { success: false, message: "Name, country, category, description, price, and image are required." },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    await connectDB();

    const existing = await Destination.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A destination with this name already exists." },
        { status: 409 }
      );
    }

    const destination = await Destination.create({
      name: name.trim(),
      slug,
      country: country.trim(),
      category,
      description: description.trim(),
      price: price.trim(),
      image: image.trim(),
      interests: interests || [],
      highlights: highlights || [],
      isActive: isActive !== false,
      order: order || 0
    });

    return NextResponse.json(
      { success: true, data: destination },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin destinations POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create destination." },
      { status: 500 }
    );
  }
}
