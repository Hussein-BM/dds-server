FROM node:18

# تثبيت الأدوات
RUN apt-get update && apt-get install -y wget unzip

# تحميل texconv
RUN wget https://github.com/microsoft/DirectXTex/releases/latest/download/texconv-linux.zip \
    && unzip texconv-linux.zip \
    && mv texconv /usr/local/bin/ \
    && chmod +x /usr/local/bin/texconv

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
