# Health Surveillance

**Project Summary:**  
A comprehensive web-based health surveillance system designed for monitoring water quality, disease outbreaks, and community health in India. The system supports 15 Indian languages and offers AI-powered features for health assistance and recommendations.

**Tech Stack:**  
- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS, Leaflet, Radix UI  
- **Backend:** Node.js, Express.js, Convex, JWT Authentication  
- **AI & ML Capabilities:** Outbreak Prediction, Risk Assessment, Symptom Analysis, Health Recommendations, Report Summarization, Sentiment Analysis  
- **APIs & Services:** Gemini AI, Open-Meteo API, OpenStreetMap, Nominatim  
- **DevOps:** npm, Git

---

## Features

### Core Features
- **Real-time Health Monitoring** - Track disease outbreaks and health incidents
- **Water Quality Analysis** - Monitor water sources with environmental data
- **AI-Powered Insights** - Gemini AI for health analysis and recommendations
- **Interactive Maps** - OpenStreetMap integration for geographic visualization
- **Weather Integration** - Open-Meteo API for climate impact analysis
- **Multi-user Access** - Role-based authentication for different user types

### AI & ML Capabilities
- **Outbreak Prediction** - Early warning systems for epidemic detection
- **Risk Assessment** - Dynamic health risk calculations
- **Symptom Analysis** - AI-powered symptom pattern recognition
- **Health Recommendations** - Personalized prevention advice
- **Report Summarization** - Automated health report generation
- **Sentiment Analysis** - Community feedback analysis

##  Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Leaflet** - Interactive maps
- **Radix UI** - Accessible components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Convex** - Real-time database
- **JWT** - Authentication

### APIs & Services
- **Gemini AI** - Google's AI for health analysis
- **Open-Meteo** - Free weather and air quality data
- **OpenStreetMap** - Free mapping and geocoding
- **Nominatim** - Address lookup and search

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/ArrinPaul/health-surveillance.git
cd health-surveillance
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd src/backend
npm install
cd ../..
```

### 3. Environment Setup
Update the `.env` file with your API keys:

```env
# Environment variables for Health Surveillance System

# Convex Database
CONVEX_DEPLOY_KEY=your_convex_deploy_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key

# Free APIs (No keys needed)
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
NOMINATIM_URL=https://nominatim.openstreetmap.org

# Other configurations
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Get API Keys

#### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Create new API key
4. Copy key to `.env` file

#### JWT Secret
Generate a secure JWT secret:
```bash
openssl rand -base64 32
```

##  Quick Start

```bash
# Start frontend (Next.js)
npm run dev

# Start backend (separate terminal)
cd src/backend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

##  API Documentation

### Health Data Endpoints
- `GET /api/water-quality/current` - Current water quality data
- `GET /api/water-quality/health-facilities` - Nearby health facilities
- `POST /api/reports` - Submit health report
- `GET /api/alerts` - Get health alerts

### AI-Powered Endpoints
- `POST /api/predict` - Disease outbreak prediction
- `POST /api/sentiment-analysis` - Analyze report sentiment
- `POST /api/risk-assessment` - Calculate health risks

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

##  License

This project is licensed under the MIT License.

---

**Your Health Surveillance System is now running!**


#if i am hosting this into vercel and if my api keys are not mentioned in github repo which i am deploying 
will all AI features work ??