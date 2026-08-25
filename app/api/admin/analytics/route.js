import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/app/lib/mongodb";
import Enquiry from "@/app/models/Enquiry";

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

    const [
      totalEnquiries,
      statusCounts,
      enquiriesOverTime,
      hotelCategoryCounts,
      monthlyTrend
    ] = await Promise.all([
      Enquiry.countDocuments(),

      Enquiry.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),

      Enquiry.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } },
        { $limit: 30 }
      ]),

      Enquiry.aggregate([
        { $group: { _id: "$hotelCategory", count: { $sum: 1 } } }
      ]),

      Enquiry.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 }
      ])
    ]);

    const statusMap = {};
    statusCounts.forEach((s) => {
      statusMap[s._id || "Unknown"] = s.count;
    });

    const hotelMap = {};
    hotelCategoryCounts.forEach((h) => {
      hotelMap[h._id || "Unknown"] = h.count;
    });

    return NextResponse.json({
      success: true,
      data: {
        totalEnquiries,
        statusBreakdown: {
          New: statusMap["New"] || 0,
          Contacted: statusMap["Contacted"] || 0,
          Converted: statusMap["Converted"] || 0,
          Closed: statusMap["Closed"] || 0
        },
        enquiriesOverTime: enquiriesOverTime.map((e) => ({
          date: e._id,
          count: e.count
        })),
        hotelCategoryBreakdown: hotelMap,
        monthlyTrend: monthlyTrend.map((m) => ({
          month: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
          count: m.count
        }))
      }
    });
  } catch (error) {
    console.error("Admin analytics GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics." },
      { status: 500 }
    );
  }
}
