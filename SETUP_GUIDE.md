# CampusOS - Complete Configuration & Deployment Guide

## 🔧 Environment Variables Setup

### Backend (.env)

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/campusos

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_REFRESH_SECRET=your_super_secret_refresh_token_min_32_characters

# Email Configuration (Choose ONE)
# Option 1: Gmail (easiest for development)
EMAIL_PROVIDER=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@yourapp.com

# Option 2: SendGrid
# EMAIL_PROVIDER=sendgrid
# SENDGRID_API_KEY=SG.your_sendgrid_api_key
# EMAIL_FROM=noreply@yourapp.com

# Option 3: SMTP (custom mail server)
# EMAIL_PROVIDER=smtp
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your_password
# EMAIL_FROM=noreply@yourapp.com

# Email Settings
REQUIRE_EMAIL_VERIFICATION=false  # Set to true to require email verification on login

# External APIs
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
GEMINI_API_KEY=your_google_gemini_api_key  # Optional for AI features
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🐳 Docker Deployment

### Backend Dockerfile (already configured)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile (already configured)

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose (complete stack)

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: campusos-db
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db
    networks:
      - campusos

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: campusos-backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI=mongodb://admin:password@mongodb:27017/campusos?authSource=admin
      NODE_ENV=production
      JWT_SECRET=${JWT_SECRET}
      JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      # ... other env vars
    depends_on:
      - mongodb
    networks:
      - campusos
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: campusos-frontend
    ports:
      - "3000:80"
    environment:
      VITE_API_URL=http://backend:5000/api
      VITE_SOCKET_URL=http://backend:5000
    depends_on:
      - backend
    networks:
      - campusos
    restart: unless-stopped

volumes:
  mongodb_data:

networks:
  campusos:
```

## 📋 Email Configuration Setup

### Gmail Setup (Recommended for Development)

1. Enable 2-Factor Authentication on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer" (or your device)
4. Generate a new app password (16 characters)
5. Use this password in `GMAIL_APP_PASSWORD` environment variable

**Note:** Do NOT use your main Google password. The app password is generated specifically for this app and can be revoked anytime.

### SendGrid Setup (Production Recommended)

1. Sign up at https://sendgrid.com
2. Go to Settings → API Keys
3. Create a new API key
4. Use the API key in `SENDGRID_API_KEY` environment variable

### Verification URLs

Configure these in your frontend (already set up in email templates):
- Password Reset: `{CLIENT_URL}/reset-password?token={token}`
- Email Verification: `{CLIENT_URL}/verify-email?token={token}`

## 🚀 Running the Application

### Local Development

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Terminal 3 - MongoDB (if using local)
mongod
```

### With Docker

```bash
# Create .env file in root with all variables
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - MongoDB: localhost:27017
```

### Production Deployment

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Deploy using:
# - Vercel for frontend
# - Railway/Render/Heroku for backend
# - MongoDB Atlas for database
# - SendGrid for email
# - Cloudinary for file storage
```

## ✅ Verification Checklist

Before deploying:

- [ ] All environment variables are set
- [ ] Email provider is configured and working
- [ ] Database connection string is correct
- [ ] JWT secrets are strong (use `openssl rand -base64 32` to generate)
- [ ] Stripe/Cloudinary keys are valid (if using)
- [ ] CORS is properly configured
- [ ] HTTPS is enabled in production
- [ ] Email verification is tested
- [ ] Password reset is tested
- [ ] File uploads work
- [ ] Socket.IO connections work
- [ ] All API endpoints respond

## 🔐 Security Checklist for Production

- [ ] Remove console.logs from code
- [ ] Enable HTTPS only
- [ ] Set `NODE_ENV=production`
- [ ] Use strong passwords for database
- [ ] Rotate API keys regularly
- [ ] Enable rate limiting on all endpoints
- [ ] Set up CSRF protection
- [ ] Enable security headers (Helmet)
- [ ] Monitor error logs
- [ ] Set up backups for database
- [ ] Use environment-specific secrets
- [ ] Disable debug mode in production

## 📊 Expected Test Results

### Registration
✅ User can register with email
✅ Verification email is sent
✅ Email verification link works
✅ User can only login after verification (if required)

### Password Reset
✅ Forgot password endpoint works
✅ Reset email is sent
✅ Reset link expires after 10 minutes
✅ New password works on login
✅ Old password no longer works

### CRUD Operations
✅ All create operations work
✅ All read operations return data
✅ All update operations persist changes
✅ All delete operations remove data
✅ Proper 404 errors for missing items

### Authentication & RBAC
✅ Unauthorized users get 401
✅ Insufficient permission users get 403
✅ Tokens refresh properly
✅ Logout clears session

## 🐛 Troubleshooting

### Email Not Sending

1. Check email provider credentials in `.env`
2. Verify firewall/network allows SMTP connections
3. Check email provider's sending limits
4. Review error logs: `npm run dev` shows email errors

### Verification Tokens Expire Too Fast

- Adjust token expiration in `auth.controller.ts`:
  - Email verification: currently 24 hours
  - Password reset: currently 10 minutes

### Database Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible on configured port
- Check firewall rules

### CORS Errors

- Update `CLIENT_URL` in backend `.env`
- Update `VITE_API_URL` in frontend `.env`
- Ensure both are accessible from each other

### Socket.IO Connection Issues

- Check `VITE_SOCKET_URL` matches backend URL
- Ensure WebSocket is not blocked by firewall
- Check browser console for actual errors

## 📞 Support Resources

- Backend Docs: `DEVELOPMENT_GUIDE.md`
- Completion Status: `COMPLETION_REPORT.md`
- API Documentation: Check routes in `backend/src/routes/`
- Email Templates: Check `backend/src/services/email.service.ts`

---

**Version:** 1.0  
**Last Updated:** 2026-06-21  
**Status:** Production Ready ✅
