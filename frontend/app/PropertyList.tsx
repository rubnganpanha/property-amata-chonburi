"use client";

import Link from "next/link";
import PropertyCard from "./PropertyCard";
import Skeleton from "react-loading-skeleton";

// กำหนด Type สำหรับข้อมูล Property
interface Property {
  id: string;
  listingTitle: string;
  price: number;
  propertyType: string;
  areaName: string;
  bedroom: string;
  bathroom: string;
  imageUrls: string[];
  path: string;
}

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
}

const PropertyCardSkeleton = () => (
  <div className="bg-[#1E1E1E] rounded-lg overflow-hidden h-full flex flex-col">
    <Skeleton height={192} baseColor="#2a2a2a" highlightColor="#4a4a4a" />
    <div className="p-4 flex flex-col flex-grow">
      <Skeleton width="60%" height={28} baseColor="#2a2a2a" highlightColor="#4a4a4a" />
      <Skeleton width="90%" height={24} className="mt-1" baseColor="#2a2a2a" highlightColor="#4a4a4a" />
      <Skeleton width="70%" height={20} className="mt-2" baseColor="#2a2a2a" highlightColor="#4a4a4a" />
      <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-6">
        <Skeleton width={100} height={20} baseColor="#2a2a2a" highlightColor="#4a4a4a" />
        <Skeleton width={100} height={20} baseColor="#2a2a2a" highlightColor="#4a4a4a" />
      </div>
    </div>
  </div>
);

export default function PropertyList({ properties, isLoading }: PropertyListProps) {
  return (
    // 1. เปลี่ยนจาก flex เป็น grid และลบ overflow, custom-scrollbar
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-8">
      <style jsx global>{`
        /* --- Skeleton Styles --- */
        .react-loading-skeleton {
          line-height: 1 !important; /* Fix skeleton vertical alignment */
        }
        /* 2. ลบ CSS ของ scrollbar ที่ไม่ใช้แล้วออก */

        /* --- CSS สำหรับปุ่ม Swiper Navigation --- */
        .property-card-swiper .swiper-button-next,
        .property-card-swiper .swiper-button-prev {
          color: #fff;
          opacity: 0; /* ซ่อนปุ่มเป็นค่าเริ่มต้น */
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          width: 32px; /* ปรับขนาดปุ่ม */
          height: 32px;
          transition: opacity 0.2s ease-in-out, background-color 0.2s ease, color 0.2s ease;
        }

        /* ปรับขนาดลูกศรด้านใน */
        /* --- ใช้กับ Swiper ทุกตัว --- */
        .swiper-button-next::after,
        .swiper-button-prev::after {
          /* ลบไอคอนเดิมของ Swiper ออก */
          content: '' !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          /* วาดลูกศรขึ้นมาใหม่ด้วย SVG และกำหนดขนาด */
          background-repeat: no-repeat;
          background-position: center;
          background-size: 60%; /* กำหนดขนาดลูกศรเป็น 60% ของวงกลม */
        }
        .swiper-button-prev { background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E"); }
        .swiper-button-next { background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E"); }

        /* --- สไตล์สำหรับ Property Card Swiper เท่านั้น --- */
        .property-card-swiper:hover .swiper-button-next,
        .property-card-swiper:hover .swiper-button-prev {
          opacity: 1; /* แสดงปุ่มเมื่อ hover ที่ Swiper container */
        }
        .property-card-swiper .swiper-button-next:hover,
        .property-card-swiper .swiper-button-prev:hover {
          /* เปลี่ยนเป็นสีทองอำพันเมื่อ hover */
          background-color: #cda946;
        }
        .swiper-button-prev:hover { background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2C44'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23121212'%2F%3E%3C%2Fsvg%3E"); }
        .swiper-button-next:hover { background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2C44'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23121212'%2F%3E%3C%2Fsvg%3E"); }
        .swiper-button-disabled { display: none !important; } /* ซ่อนปุ่มเมื่อถูก disabled (สไลด์แรก/สุดท้าย) */
        
        /* --- CSS สำหรับพื้นหลังของ Pagination Container --- */
        /* ลบพื้นหลังออก และจัดตำแหน่ง bullet ให้อยู่ด้านล่าง */
        .property-card-swiper .swiper-pagination {
          bottom: 6px !important;
        }

        /* --- CSS สำหรับ Pagination Bullets --- */
        .property-card-swiper .swiper-pagination-bullet {
          /* ทำให้ bullet ลอยเด่นขึ้นมา */
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%; /* ทำให้เป็นวงกลมแน่นอน */
          opacity: 1;
          box-shadow: 0 0 2px rgba(0,0,0,0.5); /* เพิ่มเงาให้เห็นชัดขึ้น */
          /* เพิ่ม: กำหนดขนาดและความสูงให้คงที่ ป้องกันการทับซ้อนของ dynamicBullets */
          width: 8px !important;
          height: 8px !important;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .property-card-swiper .swiper-pagination-bullet-active { 
          background-color: #cda946 !important;
          border-color: #cda946 !important;
        }
        /* ทำให้ bullet ที่ไม่ได้ใช้งานจางลงเล็กน้อย */
        .property-card-swiper .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) { opacity: 0.5; }
      `}</style>
      {/* 3. แสดงรายการโดยตรง และจำกัดให้แสดงแค่ 4 รายการแรก */}
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        : properties.slice(0, 4).map((prop) => (
            <div key={prop.id}>
              <Link href={prop.path || `/property/other/${prop.id}`} className="group block h-full">
                <PropertyCard property={prop} />
              </Link>
            </div>
          ))
      }
    </div>
  );
}