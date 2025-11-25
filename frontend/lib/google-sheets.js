import { google } from "googleapis";
import path from "path";

const SHEET_ID = "1faTmyqlLOBJ0AHdL_aO0t-lMN3s7ddh8NNHtd_e22jI";

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheets
export const getProperties = async () => {
  const auth = new google.auth.GoogleAuth({
    // แก้ไข path ให้ชี้ไปยัง root ของ project แล้วต่อไปยัง backend/credentials.json
    keyFile: path.resolve(process.cwd(), "..", "backend", "credentials.json"),
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
  });

  const sheets = google.sheets({ version: "v4", auth });

  // ฟังก์ชันสำหรับแปลง propertyTypeGroup เป็น slug
  const getGroupSlug = (group) => {
    switch (group) {
      case "L": return "landed-property";
      case "N": return "non-landed-property";
      case "C": return "commercial-property";
      case "I": return "investment-industrial";
      case "H": return "house";
      default: return "other";
    }
  };

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Properties!A2:AC",
  });

  const rows = response.data.values;
  if (rows && rows.length) {
    return rows.map((row) => {
      const propertyTypeGroup = row[17] || null;
      const slug = row[25] || row[0];
      const groupSlug = getGroupSlug(propertyTypeGroup);
      return {
        id: row[0] || null,
        area: row[1] || null,
        areaName: row[2] || null,
        bathroom: row[3] || null,
        bedroom: row[4] || null,
        district: row[5] || null,
        districtName: row[6] || null,
        floorArea: row[7] || null,
        intentType: row[8] || null,
        isNewProject: row[9] || null,
        isProjectListing: row[10] || null,
        isVerified: row[11] || null,
        listingId: row[12] || null,
        listingTitle: row[13] || null,
        // แก้ไข: แปลง price เป็น number อย่างปลอดภัย
        // โดยการลบตัวคั่นจุลภาคออกก่อน แล้วแปลงเป็นตัวเลข
        // หากแปลงไม่ได้ ให้มีค่าเป็น 0
        price: Number(String(row[14] || '0').replace(/,/g, '')) || 0,
        projectId: row[15] || null,
        propertyType: row[16] || null,
        propertyTypeGroup: propertyTypeGroup,
        region: row[18] || null,
        regionName: row[19] || null,
        description: row[20] || null,
        tenure: row[21] || null,
        imageUrls: row[23] ? row[23].split(",").map((url) => url.trim()) : [],
        lineId: row[24] || null,
        slug: slug,
        seoTitle: row[26] || null,
        seoDescription: row[27] || null,
        seoKeywords: row[28] || null,
        path: `/property/${groupSlug}/${slug}`,
      };
    });
  }
  return [];
};