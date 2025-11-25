"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 1. Import Swiper components และ CSS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
// Import ไอคอน
import { FaBed, FaBath, FaHome, FaMapMarkerAlt } from "react-icons/fa";

// ขยาย Interface ให้มีข้อมูลครบทุก field ที่ต้องการแสดง
interface Property {
  id: string;
  listingTitle: string;
  price: number; // แก้ไข: เปลี่ยนเป็น number ให้ตรงกับข้อมูลจริง
  areaName: string;
  bedroom: string;
  bathroom: string;
  imageUrls: string[];
  description: string;
  districtName: string;
  regionName: string;
  floorArea: string;
  lineId: string; // เพิ่ม lineId เข้าไปใน Interface
  // เพิ่มฟิลด์ SEO
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

// 2. แก้ไข Component ให้รับ props ที่ชื่อ property
export default function PropertyView({ property }: { property: Property }) {
  // 3. ไม่ต้องมี if (loading), if (error) อีกต่อไป เพราะ page.tsx จัดการให้แล้ว
  // และไม่ต้องมี if (!property) เพราะ page.tsx จะไม่ render component นี้ถ้าไม่มี property
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // แยก description ออกเป็นบรรทัด และกรองบรรทัดว่างออก
  const descriptionLines =
    property.description?.split(/\r?\n/).filter((line) => line.trim() !== "") ||
    [];
  const showReadMoreButton = descriptionLines.length > 3;

  // สร้างข้อความที่ถูกตัดให้เหลือ 3 บรรทัด
  const truncatedDescription = showReadMoreButton
    ? descriptionLines.slice(0, 3).join("\n")
    : property.description || "ไม่มีรายละเอียดเพิ่มเติม";

  const fullDescription = property.description || "ไม่มีรายละเอียดเพิ่มเติม";

  return (
    <div className="bg-[#121212] min-h-screen text-gray-200">
      {/* --- Header --- */}
      <header className="py-4 px-4 border-b border-gray-800">
        <nav className="container mx-auto max-w-6xl flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Website Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-white hidden sm:block">
              Amata Property
            </span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto max-w-6xl py-16 px-4">
        <Link
          href="/"
          className="text-[#cda946] hover:underline mb-8 inline-block"
        >
          &larr; กลับไปหน้ารายการ
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* --- คอลัมน์ซ้าย: สไลด์และรายละเอียด --- */}
          <div className="lg:col-span-3">
            {/* Slideshow */}
            <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-8 rounded-lg overflow-hidden h-[300px] md:h-[450px]">
              {/* Main Image */}
              <div
                className="col-span-2 row-span-2 md:col-span-1 md:row-span-2 relative cursor-pointer group"
                onClick={() => setIsGalleryModalOpen(true)}
              >
                <Image
                  src={property.imageUrls[0]}
                  alt="Main property image"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Small Images */}
              {property.imageUrls.slice(1, 5).map((url, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group hidden md:block"
                  onClick={() => setIsGalleryModalOpen(true)}
                >
                  <Image
                    src={url}
                    alt={`Property image ${index + 2}`}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay for the last image if more than 5 images exist */}
                  {index === 3 && property.imageUrls.length > 5 && (
                    <div className="absolute inset-0 bg-black/60">
                      <button
                        onClick={() => setIsGalleryModalOpen(true)}
                        className="absolute bottom-4 right-5 bg-[#cda946] text-black font-bold h-12 px-6 rounded-lg text-sm flex items-center justify-center cursor-pointer"
                      >
                        ดูทั้งหมด
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-gray-300">
              <h2 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2 mb-4">
                รายละเอียด
              </h2>
              {/* แสดงผล description ที่ตัดแล้ว และแปลง \n เป็น <br /> */}
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: truncatedDescription.replace(/\n/g, "<br />"),
                }}
              />

              {/* แสดงปุ่ม "ดูเพิ่มเติม" ถ้ามีบรรทัดเกิน 3 บรรทัด */}
              {showReadMoreButton && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 bg-[#cda946] text-black font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  ดูเพิ่มเติม
                </button>
              )}
            </div>
          </div>

          {/* --- คอลัมน์ขวา: ข้อมูลสรุป --- */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] p-8 rounded-lg sticky top-8">
              <h1 className="text-3xl font-bold mb-2 color-goldGrad">
                {property.listingTitle}
              </h1>
              <p className="text-3xl font-bold text-[#cda946] mb-6">
                ฿{new Intl.NumberFormat("th-TH").format(Number(property.price))}
              </p>

              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <FaHome className="text-[#cda946]" size={20} />
                  <p>{property.propertyType}</p>
                </div>
                <div className="flex items-center gap-4">
                  <FaBed className="text-[#cda946]" size={20} />
                  <p>{property.bedroom} ห้องนอน</p>
                </div>
                <div className="flex items-center gap-4">
                  <FaBath className="text-[#cda946]" size={20} />
                  <p>{property.bathroom} ห้องน้ำ</p>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-[#cda946]" size={20} />
                  <p>
                    {property.areaName.trim()}, {property.districtName},{" "}
                    {property.regionName}
                  </p>
                </div>
              </div>

              {/* --- ปุ่มติดต่อ LINE --- */}
              {/* แสดงปุ่มนี้ก็ต่อเมื่อมี lineId เท่านั้น */}
              {property.lineId && (
                <a
                  href={`https://line.me/ti/p/~${property.lineId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full bg-green-500 text-white font-bold py-3 rounded-lg text-lg text-center hover:bg-green-600 transition-all duration-300 hover:scale-105"
                >
                  ติดต่อผู้ขายผ่าน LINE
                </a>
              )}
            </div>
          </div>
        </div>

        {/* --- Modal สำหรับแสดงรายละเอียดทั้งหมด --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E1E] rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">
                  เกี่ยวกับโครงการนี้
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white text-3xl transition-transform duration-200 hover:scale-125"
                >
                  &times;
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <div
                  className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: fullDescription.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
              <div className="p-4 border-t border-gray-700 text-right">
                <button onClick={() => setIsModalOpen(false)} className="bg-[#cda946] text-black font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105">
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Modal สำหรับแสดง Gallery รูปภาพทั้งหมด --- */}
        {isGalleryModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setIsGalleryModalOpen(false)}
          >
            <button
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-4 right-4 text-white text-4xl z-50"
            >
              &times;
            </button>
            <div
              className="w-full h-full max-w-6xl max-h-[90vh] p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกที่รูป
            >
              {/* --- Main Swiper --- */}
              <Swiper
                modules={[Navigation, Pagination, Zoom]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                zoom={true}
                className="h-full w-full"
              >
                {property.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    {/* เพิ่ม swiper-zoom-container เพื่อให้ซูมได้ */}
                    <div className="swiper-zoom-container h-full flex items-center justify-center">
                      <img src={url} alt={`Gallery image ${index + 1}`} className="max-h-full max-w-full object-contain" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        {/* --- Custom Swiper Styles --- */}
        <style jsx global>{`
          /* --- Zoom Styles --- */
          .swiper-slide-zoomed .swiper-zoom-container > img {
            cursor: zoom-out;
          }

          /* --- Navigation Arrows for Gallery Modal --- */
          .swiper-button-next,
          .swiper-button-prev {
            background-color: rgba(0, 0, 0, 0.5);
            width: 44px !important;
            height: 44px !important;
            border-radius: 9999px;
            transition: background-color 0.2s ease;
            /* ลูกศรจะใช้สไตล์จาก PropertyList.tsx ที่เป็น SVG */
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: rgba(0, 0, 0, 0.75);
          }

          /* --- Pagination Bullets --- */
          .swiper-pagination-bullet {
            background-color: rgba(255, 255, 255, 0.5) !important;
            width: 10px !important;
            height: 10px !important;
          }
          .swiper-pagination-bullet-active {
            background-color: #cda946 !important; /* สีทอง Luxury */
          }

          /* --- Gold Gradient Text --- */
          .color-goldGrad {
            background: #FFF296;
            background: linear-gradient(to top, #FFF296 8%, #EDD573 29%, #FFF16D 37%, #BF932A 47%, #FFE571 78%, #E4CE57 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          /* --- Custom Scrollbar for Modal --- */
          .prose-invert::-webkit-scrollbar {
            width: 8px;
          }
          .prose-invert::-webkit-scrollbar-track {
            background: #1E1E1E; /* สีพื้นหลังของ track */
          }
          .prose-invert::-webkit-scrollbar-thumb {
            background-color: #4a4a4a; /* สีของ scrollbar thumb */
            border-radius: 10px;
          }
          .prose-invert::-webkit-scrollbar-thumb:hover {
            background-color: #cda946; /* สี scrollbar thumb ตอน hover */
          }
        `}</style>
      </main>
    </div>
  );
}
