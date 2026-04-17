FROM node:18

RUN apt-get update && apt-get install -y wget unzip

# تحميل texconv الصحيح
RUN wget https://github.com/microsoft/DirectXTex/releases/latest/download/texconv_linux_x64.zip \
    -O texconv.zip \
    && unzip texconv.zip \
    && chmod +x texconv \
    && mv texconv /usr/local/bin/

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
