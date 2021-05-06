FROM node:latest as install-client-deps
COPY client/package*.json ./
RUN npm install --production

FROM node:latest as build-client
COPY client .
COPY --from=install-client-deps node_modules node_modules
ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT ${REACT_APP_API_ENDPOINT}
RUN REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT} npm run build

FROM node:latest as install-server-deps
COPY package*.json ./
RUN npm install --production

FROM node:latest
WORKDIR /usr/src/app
COPY server.js ./
COPY --from=build-client build ./client/build
COPY --from=install-server-deps node_modules node_modules
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "server.js" ]
