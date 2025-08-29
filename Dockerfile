# Multi-stage build for optimized production image
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code and build files
#COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb* ./

# Install only production dependencies
RUN bun install --production

# Expose port 3000
EXPOSE 3000

# Serve the built application using a static server
CMD ["bun", "run", "serve", "-s", "public", "-l", "3000"]

# Development stage
FROM oven/bun:1-alpine AS development

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install all dependencies including dev dependencies
RUN bun install

# Copy all source files
COPY . .

# Expose port 3000 for Vite dev server
EXPOSE 3000

# Run the development server
CMD ["bun", "run", "dev"]
