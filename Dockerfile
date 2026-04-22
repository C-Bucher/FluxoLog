# Usa uma imagem do Node.js
FROM node:18

# Cria a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Expõe as portas do Front e do Back
EXPOSE 5173 3001

# Comando para rodar (usaremos o docker-compose para gerenciar isso melhor)
CMD ["npm", "run", "dev"]