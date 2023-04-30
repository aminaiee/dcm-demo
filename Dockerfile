# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/.env* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80
ENV PORT 80

CMD ["node", "server.js"]
