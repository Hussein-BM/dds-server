FROM node:18

# تثبيت الأدوات
RUN apt-get update && apt-get install -y wget unzip

# تحميل texconv
RUN wget https://github.com/microsoft/DirectXTex/releases/latest/download/texconv_linux.zip \
    && unzip texconv_linux.zip \
    && chmod +x texconv \
    && mv texconv /usr/local/bin/

# إنشاء مجلد المشروع
WORKDIR /app

# نسخ الملفات
COPY package*.json ./
RUN npm install

COPY . .

# تشغيل السيرفر
CMD ["node", "index.js"]
