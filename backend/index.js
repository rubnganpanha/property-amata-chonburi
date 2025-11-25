// backend/index.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001; // ใช้ Port 3001 เพื่อไม่ให้ชนกับ Next.js (3000)

// Middlewares
app.use(cors()); // อนุญาตให้ Frontend เรียก API ได้
app.use(express.json()); // ทำให้ Express อ่าน JSON จาก request body ได้

// Import ฟังก์ชันดึงข้อมูลจากไฟล์ที่แชร์ร่วมกัน
import { getProperties } from '../frontend/lib/google-sheets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api/properties', async (req, res) => {
  const properties = await getProperties();
  res.json(properties);
});

// API Endpoint ใหม่สำหรับดึงข้อมูลบ้านหลังเดียวตาม ID
app.get('/api/properties/:id', async (req, res) => {
  const { id } = req.params; // ดึง id หรือ slug จาก URL
  const properties = await getProperties(); // ดึงข้อมูลทั้งหมดมาเหมือนเดิม
  // ค้นหาด้วย id หรือ slug
  const property = properties.find(p => String(p.id) === String(id) || p.slug === id);

  if (property) {
    res.json(property); // ถ้าเจอ ให้ส่งข้อมูลบ้านหลังนั้นกลับไป
  } else {
    res.status(404).json({ message: 'Property not found' }); // ถ้าไม่เจอ ส่ง 404 Not Found
  }
});

// เริ่มรันเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`🚀 Backend server กำลังทำงานที่ http://localhost:${PORT}`);
});
