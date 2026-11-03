# Static build of the StackOps showcase, served by nginx on port 8080.
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN STATIC_BUILD=1 bun run build \
 && cp dist/client/_shell.html dist/client/index.html \
 && cp -r static-assets/. dist/client/

FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/client /usr/share/nginx/html
EXPOSE 8080
