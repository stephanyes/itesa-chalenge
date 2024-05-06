FROM node:20
# ENV PYTHONUNBUFFERED 1
WORKDIR /app

# Install dependencies.
# ADD requirements.txt /app
ADD . .
RUN npm install

# Add actual source code.
# ADD blockchain.py /app

EXPOSE 6000

CMD ["npm", "run", "dev"]
