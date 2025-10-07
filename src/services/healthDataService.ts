// Real-time health data service using Convex
// This replaces the mock data with actual database queries

// Uncomment after running: npx convex dev
// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../convex/_generated/api";

// Mock data for development (remove after Convex setup)
export const mockHealthData = {
  heartRate: 72,
  bloodPressure: { systolic: 120, diastolic: 80 },
  temperature: 36.6,
  oxygenLevel: 98,
  steps: 8543,
  waterIntake: 1800,
  sleep: 7.5,
  lastUpdated: new Date().toISOString(),
};

export const mockDiseaseData = [
  { disease: "Dengue", cases: 145, location: "Northern Province", severity: "high" },
  { disease: "Malaria", cases: 89, location: "Eastern Province", severity: "medium" },
  { disease: "Typhoid", cases: 34, location: "Central Province", severity: "low" },
  { disease: "Cholera", cases: 12, location: "Western Province", severity: "high" },
];

export const mockAlerts = [
  {
    id: 1,
    type: "outbreak",
    message: "Dengue outbreak reported in Northern Province",
    severity: "high",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    type: "water",
    message: "Water quality alert in Western Province",
    severity: "medium",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
];

// Real-time data hooks (enable after Convex setup)
/*
export function useHealthData(userId: string) {
  const data = useQuery(api.healthData.getUserHealthData, { userId });
  return data || mockHealthData;
}

export function useDiseaseData(region?: string) {
  const data = useQuery(api.healthData.getDiseaseOutbreaks, { region });
  return data || mockDiseaseData;
}

export function useAlerts(userId: string) {
  const data = useQuery(api.healthData.getUserAlerts, { userId });
  return data || mockAlerts;
}

export function useAddHealthData() {
  return useMutation(api.healthData.addHealthData);
}

export function useReportDisease() {
  return useMutation(api.healthData.reportDisease);
}
*/

// Development exports (remove after Convex setup)
export const useHealthData = (userId: string) => mockHealthData;
export const useDiseaseData = (region?: string) => mockDiseaseData;
export const useAlerts = (userId: string) => mockAlerts;
export const useAddHealthData = () => async (data: any) => {
  console.log("Mock: Adding health data", data);
  return { success: true, id: Math.random().toString(36) };
};
export const useReportDisease = () => async (data: any) => {
  console.log("Mock: Reporting disease", data);
  return { success: true, id: Math.random().toString(36) };
};
