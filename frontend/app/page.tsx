"use client"; // 1. เปลี่ยนเป็น Client Component เพื่อใช้ state

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropertyList from "./PropertyList";
import SearchForm, { SearchCriteria } from "./SearchForm";

// กำหนด Type สำหรับข้อมูล Property เพื่อให้ TypeScript ช่วยตรวจสอบ
interface Property {
  id: string;
  listingTitle: string;
  price: number; // เปลี่ยนเป็น number เพื่อให้ format ง่าย
  propertyType: string;
  areaName: string;
  bedroom: string;
  bathroom: string;
  imageUrls: string[];
  path: string; // เพิ่ม path เข้าไปใน Interface
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 1. เพิ่ม state สำหรับ loading

  // ดึงข้อมูลทั้งหมดครั้งแรกเพื่อใช้กับตัวเลือกประเภทอสังหาฯ
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/properties`;
        const response = await fetch(apiUrl);
        const data: Property[] = await response.json();
        setProperties(data);
        setFilteredProperties(data); // เริ่มต้นให้แสดงทั้งหมด
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoading(false); // 2. เมื่อโหลดเสร็จ (ทั้งสำเร็จและล้มเหลว) ให้ปิด loading
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    const query = new URLSearchParams(criteria as any).toString();
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/properties?${query}`;
      const response = await fetch(apiUrl);
      const data: Property[] = await response.json();
      setFilteredProperties(data);
    } catch (error) {
      console.error("Failed to fetch filtered properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];

  return (
    <>
      {/* --- Header --- */}
      <header className="py-4 px-4 border-b border-gray-800 sticky top-0 bg-[#121212]/80 backdrop-blur-sm z-40">
        <nav className="container mx-auto max-w-6xl flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Website Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-white hidden sm:block">Amata Property</span>
          </Link>

        </nav>
      </header>

      <main className="container mx-auto max-w-6xl py-16 px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 color-goldGrad">
            รายการอสังหาริมทรัพย์
          </h1>
          <p className="text-lg text-gray-400">
            ค้นหาบ้านและที่ดินในฝันของคุณ
          </p>
        </div>

        {/* --- Search Form --- */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} propertyTypes={propertyTypes} />

        {/* เปลี่ยนเป็น Horizontal Scrolling Container */}
        <h2 className="text-3xl font-bold text-white mb-8">รายการล่าสุด</h2>
        <PropertyList properties={filteredProperties} isLoading={isLoading} />

      </main>

      {/* เพิ่มสไตล์สำหรับ Gold Gradient Text */}
      <style jsx global>{`
        .color-goldGrad {
          background: #FFF296;
          background: linear-gradient(to top, #FFF296 8%, #EDD573 29%, #FFF16D 37%, #BF932A 47%, #FFE571 78%, #E4CE57 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
}
