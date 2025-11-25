"use client";

import { useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ในระบบจริง ตรงนี้จะมีการเช็คว่า email มีในระบบหรือยัง
    // แต่สำหรับตอนนี้ เราจะไปที่หน้าสมัครสมาชิกเสมอ
    setStep(2);
  };

  const handleGoBack = () => {
    setStep(1);
  };

  const handleCloseModal = () => {
    onClose();
    // Reset state เมื่อปิด Modal
    setTimeout(() => {
      setStep(1);
      setEmail("");
      setAcceptPrivacy(false);
      setAcceptMarketing(false);
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleCloseModal}
    >
      <div
        className="bg-[#1E1E1E] rounded-lg max-w-md w-full max-h-[95vh] flex flex-col text-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Header --- */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button onClick={handleGoBack} className="text-gray-400 hover:text-white transition-colors">
                <FaArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold text-white">
              {step === 1 ? "ยินดีต้อนรับสู่ Amata Property" : "สร้างบัญชีสมาชิกใหม่"}
            </h2>
          </div>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-white text-3xl transition-transform duration-200 hover:scale-125"
          >
            &times;
          </button>
        </div>

        {/* --- Body --- */}
        <div className="p-6 overflow-y-auto">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <p className="mb-4">สมัครสมาชิกแค่ใช้ email พอ</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรอกอีเมลของคุณ"
                required
                className="w-full bg-[#121212] border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#cda946]"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-[#cda946] text-black font-bold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300"
              >
                ดำเนินการต่อ
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <p className="mb-4 text-sm">
                ดูเหมือนว่าอีเมลนี้ยังไม่เคยใช้สำหรับสมัครสมาชิก สมัครสมาชิกตอนนี้เพื่อรับสิทธิประโยชน์ดังต่อไปนี้
              </p>
              <ul className="space-y-3 text-sm mb-6">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>ดูย้อนหลังรายการอสังหาฯ ที่คุณเคยแสดงความสนใจไว้</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>เข้าดูรายการอสังหาฯ ที่คุณบันทึกค่าการค้นหาไว้ และดูรายการที่คุณเลือกไว้แล้วได้อย่างรวดเร็ว</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>เชื่อมต่อการตั้งค่าในการค้นหากับอุปกรณ์ทั้งหมดของคุณ</span>
                </li>
              </ul>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">อีเมล</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md px-4 py-3 text-gray-400 cursor-not-allowed"
                />
              </div>

              <button
                type="button"
                disabled={!acceptPrivacy} // ปุ่มจะกดไม่ได้ถ้ายังไม่ยอมรับนโยบาย
                className="w-full bg-[#cda946] text-black font-bold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                ยืนยันอีเมลของคุณ
              </button>

              <div className="space-y-4 mt-6 text-sm">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    className="mt-1 accent-[#cda946] w-4 h-4 flex-shrink-0" />
                  <span>ข้าพเจ้ายอมรับ<a href="#" className="text-[#cda946] hover:underline">นโยบายความเป็นส่วนตัว</a> และการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้า</span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-1 accent-[#cda946] w-4 h-4 flex-shrink-0" />
                  <span>อนุญาตให้ส่งข้อมูลการตลาดแบบตรงจาก Amata Property ตาม<a href="#" className="text-[#cda946] hover:underline">นโยบายความเป็นส่วนตัว</a></span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        {step === 2 && (
          <div className="p-6 border-t border-gray-700 text-xs text-gray-500">
            การดำเนินการต่อไปนี้ถือว่าคุณตกลงตาม<a href="#" className="text-gray-400 hover:underline">ข้อกำหนดการให้บริการ</a> และ <a href="#" className="text-gray-400 hover:underline">นโยบายความเป็นส่วนตัว</a>ของ AmataProperty รวมถึงการรวบรวม การใช้ และการเปิดเผยข้อมูลส่วนบุคคลของคุณ
          </div>
        )}
      </div>
    </div>
  );
}