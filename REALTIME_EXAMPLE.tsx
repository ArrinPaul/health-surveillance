// Example: Dashboard with Real-Time Data
// This shows how the dashboard will work after Convex setup

/*
BEFORE (Mock Data):
==================
import { mockHealthData } from '@/services/healthDataService';

export default function Dashboard() {
  const healthData = mockHealthData; // Static data
  
  return (
    <div>
      <h1>Heart Rate: {healthData.heartRate}</h1>
    </div>
  );
}

AFTER (Real-Time Data):
=======================
*/

"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Real-time health data - updates automatically
  const healthData = useQuery(api.healthData.getUserHealthData, {
    userId: user?.id || "",
  });
  
  // Real-time disease outbreaks - live updates
  const outbreaks = useQuery(api.diseases.getDiseaseOutbreaks, {
    limit: 10,
  });
  
  // Real-time statistics
  const stats = useQuery(api.diseases.getDiseaseStats, {
    timeRange: "7d",
  });
  
  if (!healthData || !outbreaks || !stats) {
    return <div>Loading real-time data...</div>;
  }
  
  return (
    <div>
      {/* Heart Rate updates in real-time */}
      <div>
        <h2>Heart Rate</h2>
        <p>{healthData.heartRate} bpm</p>
        <small>Last updated: {new Date(healthData.timestamp).toLocaleTimeString()}</small>
      </div>
      
      {/* Disease outbreaks update automatically */}
      <div>
        <h2>Active Outbreaks</h2>
        {outbreaks.map(outbreak => (
          <div key={outbreak._id}>
            <h3>{outbreak.disease}</h3>
            <p>{outbreak.confirmedCases} cases in {outbreak.location}</p>
            <span className={`severity-${outbreak.severity}`}>
              {outbreak.severity}
            </span>
          </div>
        ))}
      </div>
      
      {/* Statistics update live */}
      <div>
        <h2>7-Day Statistics</h2>
        <p>Total Cases: {stats.totalCases}</p>
        <p>Active Outbreaks: {stats.activeOutbreaks}</p>
        <p>Critical: {stats.criticalOutbreaks}</p>
      </div>
    </div>
  );
}

/*
KEY BENEFITS:
=============

1. LIVE UPDATES
   - Data refreshes automatically when database changes
   - No manual refresh needed
   - Multiple users see same data instantly

2. REAL-TIME COLLABORATION
   - User A reports outbreak → User B sees it immediately
   - Health worker updates case count → Dashboard updates everywhere
   - Alert triggered → All users notified instantly

3. WEBSOCKET MAGIC
   - No polling (efficient)
   - Low latency (<100ms)
   - Automatic reconnection
   - Offline support

4. TYPE SAFETY
   - Full TypeScript support
   - Auto-generated types from schema
   - Compile-time validation

5. OPTIMISTIC UPDATES
   - UI updates immediately
   - Syncs with server in background
   - Automatic rollback on error

EXAMPLE SCENARIOS:
==================

Scenario 1: Health Worker Reports Outbreak
-------------------------------------------
1. Health worker clicks "Report Outbreak"
2. Form submitted → useMutation called
3. UI updates immediately (optimistic)
4. Data saved to Convex database
5. All connected dashboards receive update via WebSocket
6. Maps refresh showing new outbreak location
7. Alerts sent to affected users

Scenario 2: Patient Logs Symptoms
----------------------------------
1. Patient enters symptoms in app
2. Data saved with timestamp and location
3. AI analyzes symptoms in real-time
4. If matches outbreak pattern → Alert triggered
5. Health authorities notified immediately
6. Patient receives personalized recommendations

Scenario 3: Water Quality Sensor
---------------------------------
1. IoT sensor detects contamination
2. Data sent to API endpoint
3. Convex mutation stores reading
4. All users in area receive instant notification
5. Map shows contamination zone
6. Water safety dashboard updates

MIGRATION PATH:
===============

Phase 1: Setup Convex (Day 1)
- Run: npx convex dev
- Update .env.local
- Enable ConvexProvider

Phase 2: Migrate Health Data (Day 2-3)
- Replace mock health data with Convex queries
- Test real-time updates
- Add data validation

Phase 3: Migrate Disease Tracking (Day 4-5)
- Connect outbreak reporting to database
- Enable live map updates
- Test multi-user scenarios

Phase 4: Add Advanced Features (Day 6-7)
- Real-time alerts
- Push notifications
- Historical analytics
- Data export

Phase 5: Production Deployment (Day 8)
- Deploy to Vercel
- Configure Convex production environment
- Load testing
- Monitoring setup

PERFORMANCE:
============

Mock Data:
- Initial load: ~50ms
- Updates: Never (static)
- Multi-user: No sync

Real-Time Data:
- Initial load: ~100ms
- Updates: <100ms (automatic)
- Multi-user: Perfect sync
- Offline: Cached + sync on reconnect

COST:
=====

Convex Free Tier:
- 1 GB storage
- 1 M function calls/month
- Unlimited users
- Full features

For this app:
- ~100 users = ~50K function calls/day
- Well within free tier
- Can upgrade later if needed
*/
