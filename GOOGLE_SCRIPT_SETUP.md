# Hướng dẫn cấu hình Google Sheet cho form đăng ký Webinar

Hướng dẫn này giúp bạn tạo Google Sheet mới và kết nối với form đăng ký trên website.

## Các trường dữ liệu form

| Cột trên Sheet | Trường trên form |
|---|---|
| Timestamp | Thời gian gửi (tự động) |
| Họ và tên | Họ và tên (phụ huynh/người đăng ký) |
| Số điện thoại | Số điện thoại |
| Email | Email |
| Họ tên học sinh | Họ tên học sinh |
| Năm sinh | Năm sinh học sinh |
| Trường | Trường học sinh đang theo học |
| Câu hỏi dành cho chương trình | Câu hỏi dành cho chương trình |
| Bạn biết tới chương trình qua | Bạn biết tới chương trình qua |

---

## Bước 1: Tạo Google Sheet mới

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo **Bảng tính mới** (Blank spreadsheet)
3. Đặt tên, ví dụ: **"Webinar AI57 - Đăng ký"**
4. Ở **dòng 1**, nhập các tiêu đề cột theo đúng thứ tự sau:

```
Timestamp | Họ và tên | Số điện thoại | Email | Họ tên học sinh | Năm sinh | Trường | Câu hỏi dành cho chương trình | Bạn biết tới chương trình qua
```

> **Lưu ý:** Giữ nguyên thứ tự cột như trên để dữ liệu ghi đúng vị trí.

---

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet vừa tạo, vào **Tiện ích mở rộng** (Extensions) → **Apps Script**
2. Xóa toàn bộ code mặc định
3. Dán code sau vào:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.studentName || '',
      data.birthYear || '',
      data.school || '',
      data.question || '',
      data.source || ''
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data saved successfully' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ message: 'Webhook is active' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

4. Nhấn **Lưu** (Ctrl+S), đặt tên project, ví dụ: `Webinar Form Webhook`

---

## Bước 3: Triển khai (Deploy) Web App

1. Nhấn **Triển khai** (Deploy) → **Triển khai mới** (New deployment)
2. Nhấn biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" → chọn **Ứng dụng web** (Web app)
3. Cấu hình:
   - **Mô tả:** `Webinar Form Webhook`
   - **Chạy với tư cách:** Tôi (Me)
   - **Ai có quyền truy cập:** Bất kỳ ai (Anyone)
4. Nhấn **Triển khai** (Deploy)
5. **Cấp quyền** khi được hỏi (chọn tài khoản Google → Cho phép)
6. **Sao chép URL Web app** — dạng:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

> **Quan trọng:** Mỗi lần sửa code Apps Script, bạn cần **Triển khai lại** (Deploy → Manage deployments → Edit → New version → Deploy).

---

## Bước 4: Cấu hình biến môi trường trên website

1. Mở file `.env.local` ở thư mục gốc project (tạo mới nếu chưa có)
2. Thêm hoặc cập nhật dòng sau:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Thay `YOUR_SCRIPT_ID` bằng URL Web app bạn vừa copy ở Bước 3
4. **Khởi động lại** server dev:

```bash
npm run dev
```

---

## Bước 5: Kiểm tra hoạt động

### Cách 1: Test trực tiếp trên website

1. Mở website (ví dụ: `http://localhost:3000`)
2. Điền form đăng ký và gửi
3. Kiểm tra Google Sheet — phải xuất hiện dòng mới với đầy đủ thông tin

### Cách 2: Test bằng hàm trong Apps Script

Thêm hàm sau vào Apps Script và chạy thử:

```javascript
function testDataTransfer() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const testData = {
    timestamp: new Date().toISOString(),
    name: "Nguyễn Văn Test",
    phone: "0912345678",
    email: "test@example.com",
    studentName: "Nguyễn Văn A",
    birthYear: "2012",
    school: "THCS Nguyễn Du",
    question: "Chương trình AI57 dành cho học sinh lớp mấy?",
    source: "facebook"
  };

  const row = [
    testData.timestamp,
    testData.name,
    testData.phone,
    testData.email,
    testData.studentName,
    testData.birthYear,
    testData.school,
    testData.question,
    testData.source
  ];

  sheet.appendRow(row);
  Logger.log('Test data added successfully!');
}
```

Chạy: chọn `testDataTransfer` → nhấn **Run** → kiểm tra Sheet.

### Cách 3: Test qua Console trình duyệt

Mở Console (F12) trên trình duyệt và chạy:

```javascript
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

fetch(scriptUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Nguyễn Văn Test",
    phone: "0912345678",
    email: "test@example.com",
    studentName: "Nguyễn Văn A",
    birthYear: "2012",
    school: "THCS Nguyễn Du",
    question: "Câu hỏi test",
    source: "zalo",
    timestamp: new Date().toISOString()
  })
})
  .then(r => r.text())
  .then(data => console.log('Kết quả:', data));
```

---

## Xử lý sự cố

| Lỗi | Cách khắc phục |
|---|---|
| "Script function not found" | Đảm bảo hàm tên đúng `doPost`, triển khai lại Web App |
| "Access denied" | Đặt quyền truy cập là **Anyone** khi deploy |
| Dữ liệu không xuất hiện | Kiểm tra tiêu đề cột dòng 1, xem log: **View → Execution log** |
| "Cấu hình server chưa đúng" | Kiểm tra `GOOGLE_SCRIPT_URL` trong `.env.local`, restart server |
| Dữ liệu lệch cột | Đảm bảo thứ tự cột Sheet khớp với code Apps Script |

---

## Giá trị "Bạn biết tới chương trình qua"

Trên form, người dùng chọn một trong các giá trị sau (lưu vào cột `source`):

| Giá trị lưu | Hiển thị trên form |
|---|---|
| `facebook` | Facebook |
| `zalo` | Zalo |
| `tiktok` | TikTok |
| `ban-be-gioi-thieu` | Bạn bè/đồng nghiệp giới thiệu |
| `website` | Website |
| `email` | Email |
| `khac` | Khác |

Nếu muốn thêm/bớt lựa chọn, sửa trong file `components/webinar/hero.tsx` (phần `SelectItem` của trường `source`).

---

## Checklist hoàn tất

- [ ] Tạo Google Sheet mới với 9 cột tiêu đề đúng thứ tự
- [ ] Dán code Apps Script và lưu
- [ ] Deploy Web App với quyền **Anyone**
- [ ] Copy URL Web App
- [ ] Cập nhật `GOOGLE_SCRIPT_URL` trong `.env.local`
- [ ] Restart server (`npm run dev`)
- [ ] Gửi thử form và kiểm tra dữ liệu trên Sheet
