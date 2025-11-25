import type { Metadata } from "next";
import PropertyView from "./PropertyView"; // 1. Import Client Component
import { getProperties as getAllPropertiesFromSheet } from "@/lib/google-sheets"; // <-- เปลี่ยนมาใช้ Path Alias

// ขยาย Interface ให้มีข้อมูลครบทุก field ที่ต้องการแสดง
interface Property {
  id: string;
  listingTitle: string;
  price: number; // แก้ไข: เปลี่ยนเป็น number ให้ตรงกับข้อมูลจริง
  propertyType: string;
  areaName: string;
  bedroom: string;
  bathroom: string;
  imageUrls: string[];
  description: string;
  districtName: string;
  regionName: string;
  floorArea: string;
  lineId: string;
  // เพิ่มฟิลด์ SEO
  slug: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

// สร้าง Interface ที่ยืดหยุ่นสำหรับข้อมูลดิบจาก Sheet
// เพื่อใช้ใน generateStaticParams โดยเฉพาะ
interface SheetProperty {
  slug?: string;
  path?: string;
}

// --- ฟังก์ชันสำหรับสร้าง Metadata แบบไดนามิก ---
// ฟังก์ชันนี้จะรันบน Server ก่อนที่หน้าเว็บจะถูกสร้าง
export async function generateMetadata({
  params,
}: {
  params: { group: string; slug: string };
}): Promise<Metadata> {
  const { slug } = params; // params เป็น object ธรรมดา ไม่ต้อง await
  try {
    // ดึงข้อมูลทั้งหมด แล้วค้นหาเฉพาะรายการที่ต้องการ
    const allProperties = (await getAllPropertiesFromSheet()) as Property[];
    const property = allProperties.find((p) => p.slug?.trim() === slug?.trim());
    if (!property)
      return {
        title: "ไม่พบข้อมูล",
        description: "ไม่พบข้อมูลสำหรับ property นี้",
      };

    return {
      title: property.seoTitle || property.listingTitle,
      description: property.seoDescription,
      keywords: property.seoKeywords,
    };
  } catch (error) {
    console.error(`Error fetching metadata for slug ${slug}:`, error);
    return { title: "เกิดข้อผิดพลาด", description: "ไม่สามารถโหลดข้อมูลได้" };
  }
}

export default async function Page({
  params,
}: {
  params: { group: string; slug: string };
}) {
  // เปลี่ยนจากการ fetch มาเป็นการหาข้อมูลจากที่ดึงมาแล้วโดยตรง
  const allProperties = (await getAllPropertiesFromSheet()) as Property[];
  // แก้ไข: ใช้ .trim() เพื่อตัดช่องว่างที่อาจแฝงมากับข้อมูลก่อนเปรียบเทียบ
  const property = allProperties.find(
    (p) => p.slug?.trim() === params.slug?.trim()
  );

  if (!property) {
    return <div>ไม่พบข้อมูลอสังหาริมทรัพย์</div>;
  }

  return <PropertyView property={property} />;
}
// Force update
