import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Enquiry from "@/app/models/Enquiry";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^\d{7,15}$/;

const COUNTRY_CODE_REGEX = /^\+\d{1,4}$/;

const HOTEL_CATEGORIES = [
  "Standard",
  "Deluxe",
  "Luxury"
];

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      contactNumber,
      countryCode,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren = 0
    } = body;

    // -----------------------------
    // Server-side validation
    // -----------------------------

    if (
      typeof fullName !== "string" ||
      fullName.trim().length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid full name is required."
        },
        { status: 400 }
      );
    }

    if (
      typeof contactNumber !== "string" ||
      !PHONE_REGEX.test(contactNumber.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid contact number."
        },
        { status: 400 }
      );
    }

    if (
      typeof countryCode !== "string" ||
      !COUNTRY_CODE_REGEX.test(countryCode.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid country code."
        },
        { status: 400 }
      );
    }

    if (
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address."
        },
        { status: 400 }
      );
    }

    if (!dateOfTravel) {
      return NextResponse.json(
        {
          success: false,
          message: "Date of travel is required."
        },
        { status: 400 }
      );
    }

    const travelDate = new Date(
      `${dateOfTravel}T00:00:00`
    );

    if (Number.isNaN(travelDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid travel date."
        },
        { status: 400 }
      );
    }

    if (travelDate <= new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Travel date must be in the future."
        },
        { status: 400 }
      );
    }

    const people = Number(numberOfPeople);
    const children = Number(numberOfChildren);

    if (!Number.isInteger(people) || people < 1) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of people must be at least 1."
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(children) || children < 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Number of children must be 0 or greater."
        },
        { status: 400 }
      );
    }

    if (!HOTEL_CATEGORIES.includes(hotelCategory)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid hotel category."
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Database
    // -----------------------------

    await connectDB();

    await Enquiry.create({
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      countryCode: countryCode.trim(),
      email: email.trim().toLowerCase(),
      dateOfTravel: travelDate,
      numberOfPeople: people,
      hotelCategory,
      numberOfChildren: children
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Enquiry submitted successfully."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your enquiry right now."
      },
      { status: 500 }
    );
  }
}

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

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: enquiries,
      count: enquiries.length
    });
  } catch (error) {
    console.error("Enquiry GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enquiries."
      },
      { status: 500 }
    );
  }
}