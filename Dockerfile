# Imagen Base
FROM node

# Create The directory where the app will live
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install node modules
RUN npm install

# Copy files from the local to the conatiner
COPY  . .

# Compile applicasion
RUN npm run build

# COMAND de inicio de container
CMD ["node", "dist/src/index.js"]

