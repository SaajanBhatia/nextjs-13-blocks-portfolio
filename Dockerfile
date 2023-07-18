# Using Node Alpine
FROM node:18-alpine3.16

WORKDIR /app

# Copy in Package 
COPY package*.json ./

# Install Dependencies
RUN npm install


# Copy into the app
COPY . .

# Install prisma dependencies
RUN npm i @prisma/client
RUN npm install prisma typescript ts-node @types/node --save-dev 

RUN npx prisma generate

# Deploy and apply migrations
RUN npx prisma migrate deploy

# Run production build
RUN npm run build

# On port 3000
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
