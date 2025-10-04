import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new health report
export const createReport = mutation({
  args: {
    userId: v.id("users"),
    type: v.union(v.literal("health_incident"), v.literal("water_quality"), v.literal("disease_outbreak")),
    title: v.string(),
    description: v.string(),
    symptoms: v.optional(v.array(v.string())),
    severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    location: v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
    }),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reports", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get reports by location (within radius)
export const getReportsByLocation = query({
  args: {
    lat: v.number(),
    lon: v.number(),
    radiusKm: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // For now, return all reports (in production, you'd implement geospatial queries)
    const reports = await ctx.db.query("reports").collect();
    
    // Simple distance filtering (in production, use proper geospatial indexing)
    const radius = args.radiusKm || 10;
    return reports.filter(report => {
      const distance = calculateDistance(
        args.lat, args.lon,
        report.location.lat, report.location.lon
      );
      return distance <= radius;
    });
  },
});

// Get reports by user
export const getReportsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reports")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Update report status
export const updateReportStatus = mutation({
  args: {
    id: v.id("reports"),
    status: v.union(v.literal("pending"), v.literal("investigating"), v.literal("resolved")),
    aiAnalysis: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}