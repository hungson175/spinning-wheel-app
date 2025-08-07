# 📚 Hướng dẫn Deploy lên Render.com

## 📋 Chuẩn bị trước khi deploy

### 1. Tạo tài khoản Render.com
- Vào https://render.com và đăng ký tài khoản (free)
- Xác nhận email

### 2. Push code lên GitHub
```bash
# Tạo repository mới trên GitHub
# Sau đó push code local lên

git remote add origin https://github.com/YOUR_USERNAME/spinning-wheel-app.git
git branch -M main
git push -u origin main
```

## 🚀 Các bước Deploy

### Bước 1: Kết nối GitHub với Render
1. Đăng nhập vào Render.com
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect GitHub"** 
4. Authorize Render để truy cập GitHub repos của bạn
5. Chọn repository `spinning-wheel-app`

### Bước 2: Cấu hình Web Service

Điền các thông tin sau:

#### **Basic Settings:**
- **Name**: `trio-lucky-draw` (hoặc tên bạn muốn)
- **Region**: `Singapore (Southeast Asia)` (gần VN nhất)
- **Branch**: `main` (hoặc branch bạn muốn deploy)

#### **Build & Deploy Settings:**
- **Root Directory**: (để trống)
- **Runtime**: `Node`
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Start Command**:
  ```bash
  npm run start:prod
  ```

#### **Environment Variables:**
Không cần thiết lập gì thêm

#### **Plans:**
- Chọn **Free** (free instance sẽ sleep sau 15 phút không hoạt động)

### Bước 3: Deploy
1. Click **"Create Web Service"**
2. Đợi Render build và deploy (khoảng 5-10 phút lần đầu)
3. Xem logs để track tiến trình

## ✅ Sau khi Deploy thành công

### URL của app:
```
https://trio-lucky-draw.onrender.com
```
(trio-lucky-draw là tên service bạn đặt)

### Kiểm tra app:
1. Truy cập URL
2. Test các chức năng:
   - Upload file guest_numbers.txt
   - Quay số
   - Chuyển theme Fun/Corporate
   - Reset app

## 🔧 Troubleshooting

### Lỗi "Build failed"
```bash
# Kiểm tra package.json có script start:prod
"scripts": {
  ...
  "start:prod": "node server.js"
}

# Đảm bảo có file server.js trong root folder
```

### Lỗi "Application failed to respond"
```bash
# Kiểm tra server.js sử dụng PORT từ environment
const PORT = process.env.PORT || 3000;
```

### App chạy chậm sau 15 phút
- Đây là giới hạn của Free tier
- App sẽ "ngủ" sau 15 phút không hoạt động
- Lần truy cập đầu tiên sau khi ngủ sẽ mất 30-60s để "thức dậy"
- **Giải pháp**: Upgrade lên Starter plan ($7/tháng) để app chạy 24/7

## 📝 Update code mới

Khi có thay đổi code:

```bash
# 1. Commit và push lên GitHub
git add .
git commit -m "Update features"
git push origin main

# 2. Render sẽ tự động deploy lại (Auto-Deploy đã bật)
# 3. Hoặc manual deploy từ Render Dashboard
```

## 🎯 Custom Domain (Tùy chọn)

Nếu bạn có domain riêng:

1. Vào **Settings** → **Custom Domains**
2. Add domain: `lucky.yourdomain.com`
3. Cấu hình DNS:
   - Type: CNAME
   - Name: lucky
   - Value: `trio-lucky-draw.onrender.com`

## 💡 Tips

### 1. Tối ưu Performance
- Build production trước khi deploy đã được config sẵn
- Static files được serve qua Express

### 2. Monitor App
- Xem Logs: Dashboard → Logs
- Xem Metrics: Dashboard → Metrics
- Set up Health Check: Settings → Health Check Path: `/`

### 3. Backup Data
- Guest numbers được nhập mỗi session
- Không có database nên data không persist
- User cần re-upload file mỗi lần dùng

## 📞 Support

Nếu gặp vấn đề:
1. Check Render Status: https://status.render.com
2. Render Docs: https://render.com/docs
3. Community Forum: https://community.render.com

---

## 🎉 Chúc mừng! App của bạn đã online!

URL Production: **https://[your-service-name].onrender.com**

Chia sẻ link cho mọi người tham gia Lucky Draw! 🎰