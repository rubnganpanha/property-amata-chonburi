import { NextRequest, NextResponse } from "next/server";
import { getProperties as getAllPropertiesFromSheet } from "@/lib/google-sheets";

export const dynamic = 'force-dynamic'; // บังคับให้ดึงข้อมูลใหม่ทุกครั้ง

export async function GET(request: NextRequest) {
  try {
    const allProperties = await getAllPropertiesFromSheet();

    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword')?.toLowerCase();
    const propertyType = searchParams.get('propertyType');

    let filteredProperties = allProperties;

    if (keyword) {
      filteredProperties = filteredProperties.filter(p => 
        p.listingTitle.toLowerCase().includes(keyword) ||
        p.areaName.toLowerCase().includes(keyword)
      );
    }

    if (propertyType) {
      filteredProperties = filteredProperties.filter(p => p.propertyType === propertyType);
    }

    return NextResponse.json(filteredProperties);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
