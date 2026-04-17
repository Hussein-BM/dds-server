FROM node:18

RUN apt-get update && apt-get install -y wget unzip libglu1-mesa

# تحميل texconv الصحيح
RUN wget https://github.com/microsoft/DirectXTex/releases/download/jul2023/texconv_linux_x64.zip \
    && unzip texconv_linux_x64.zip \
    && chmod +x texconv \
    && mv texconv /usr/local/bin/

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
