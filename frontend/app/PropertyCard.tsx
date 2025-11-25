"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaImages, FaMapMarkerAlt } from "react-icons/fa";

// 1. Import Swiper components และ CSS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules'; // 1. เปลี่ยน Autoplay เป็น Navigation

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

export default function PropertyCard({ property }: { property: Property }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // ใช้ useEffect เพื่อตั้งค่า isClient เป็น true เมื่อคอมโพเนนต์ถูก mount บนฝั่ง client แล้วเท่านั้น
  useEffect(() => {
    setIsClient(true);
  }, []);


  const images = property.imageUrls.filter(url => url); // กรอง URL ที่ถูกต้อง

  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-2 flex flex-col">
      {/* 2. เพิ่ม class 'group' เพื่อใช้สำหรับ hover */}
      <div className="relative w-full h-48 group">
        {property.imageUrls && property.imageUrls.length > 0 ? (
          // Render Swiper ต่อเมื่อ isClient เป็น true เท่านั้น
          isClient ? (<Swiper
            // 3. อัปเดต modules และ props ของ Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            pagination={{
              clickable: true,
              // กลับมาใช้ dynamicBullets ซึ่งจัดการเรื่อง active state ได้ถูกต้อง
              dynamicBullets: true,
              dynamicMainBullets: 3, // แสดง bullet หลัก 3 อัน (รวมกับข้างๆ จะประมาณ 5 อัน)
            }}
            navigation={true} // เปิดใช้งานปุ่ม Next/Prev
            loop={true} // เพิ่ม prop นี้เพื่อให้สไลด์วนลูป
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // อัปเดต state เมื่อสไลด์เปลี่ยน
            className="h-full w-full property-card-swiper"
          >
            {/* แก้ไข: กรอง url ที่เป็น string ว่างๆ ออกไปก่อน map */}
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={url}
                  alt={property.listingTitle}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>) : (
            // ในระหว่างที่ยังไม่ mount หรืออยู่บน server ให้แสดงแค่รูปภาพแรกรูปเดียว
            <Image src={images[0]} alt={property.listingTitle} fill unoptimized className="object-cover" />
          )

        ) : (
          <div className="w-full h-full bg-gray-700"></div> // Placeholder
        )}
        {/* แสดงจำนวนรูปภาพ */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1.5">
            <span>{images.length}</span>
            <FaImages />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-amber-400 font-bold text-2xl">฿{new Intl.NumberFormat('th-TH').format(property.price)}</p>
        <h3 className="text-lg font-semibold text-white mt-1 truncate" title={property.listingTitle}>
          {property.listingTitle}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <FaMapMarkerAlt className="flex-shrink-0" />
          <p className="truncate">{property.areaName.trim()}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-start gap-6 text-gray-300 text-sm">
          <span className="flex items-center gap-2 font-semibold">
            <FaBed className="text-amber-400" /> {property.bedroom} <span className="font-light hidden sm:inline">ห้องนอน</span>
          </span>
          <span className="flex items-center gap-2 font-semibold">
            <FaBath className="text-amber-400" /> {property.bathroom} <span className="font-light hidden sm:inline">ห้องน้ำ</span>
          </span>
        </div>
      </div>
    </div>
  );
}