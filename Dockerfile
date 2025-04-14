FROM node:lts as dependencies
WORKDIR /faceit
COPY package.json package-lock.json ./
RUN nmp install

FROM node:lts as builder
WORKDIR /faceit
COPY . .
COPY --from=dependencies /faceit/node_modules ./node_modules
RUN npm build

FROM node:lts as runner
WORKDIR /faceit
ENV NODE_ENV production

COPY --from=builder /faceit/public ./public
COPY --from=builder /faceit/package.json ./package.json
COPY --from=builder /faceit/.next ./.next
COPY --from=builder /faceit/node_modules ./node_modules
COPY --from=builder /faceit/app ./app

EXPOSE 443
CMD ["npm", "start"]