// Convex schema definition
// Run: npx convex dev to generate the server code

// @ts-ignore - Generated after running: npx convex dev
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    role: v.optional(v.string()),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
    isActive: v.boolean(),
  }).index("by_email", ["email"]),

  healthData: defineTable({
    userId: v.id("users"),
    type: v.string(), // "symptom", "medication", "vitals", etc.
    data: v.any(),
    timestamp: v.number(),
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.optional(v.string())
    })),
    severity: v.optional(v.number()), // 1-10 scale
    notes: v.optional(v.string()),
  }).index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "type"])
    .index("by_timestamp", ["timestamp"]),

  communityReports: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    category: v.string(), // "outbreak", "environmental", "safety", etc.
    location: v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.optional(v.string())
    }),
    severity: v.number(), // 1-5 scale
    status: v.string(), // "open", "investigating", "resolved"
    upvotes: v.number(),
    downvotes: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_location", ["location.latitude", "location.longitude"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  diseaseOutbreaks: defineTable({
    disease: v.string(),
    cases: v.number(),
    location: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    symptoms: v.optional(v.array(v.string())),
    reportedBy: v.string(), // userId
    notes: v.optional(v.string()),
    timestamp: v.number(),
    status: v.string(), // "active", "contained", "resolved"
    confirmedCases: v.number(),
    suspectedCases: v.number(),
    deaths: v.number(),
    recovered: v.number(),
  }).index("by_location", ["location"])
    .index("by_status", ["status"])
    .index("by_severity", ["severity"])
    .index("by_timestamp", ["timestamp"]),

  waterQuality: defineTable({
    location: v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.optional(v.string())
    }),
    pH: v.optional(v.number()),
    turbidity: v.optional(v.number()),
    chlorine: v.optional(v.number()),
    bacteria: v.optional(v.number()),
    temperature: v.optional(v.number()),
    testDate: v.number(),
    testedBy: v.optional(v.id("users")),
    source: v.string(), // "user_report", "official_test", "sensor"
    quality: v.string(), // "excellent", "good", "fair", "poor"
  }).index("by_location", ["location.latitude", "location.longitude"])
    .index("by_test_date", ["testDate"])
    .index("by_quality", ["quality"]),

  alerts: defineTable({
    type: v.string(), // "health_alert", "weather_warning", "water_quality", etc.
    title: v.string(),
    message: v.string(),
    severity: v.string(), // "low", "medium", "high", "critical"
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
      radius: v.number(), // in kilometers
    })),
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
    source: v.string(), // "system", "admin", "ai_prediction"
  }).index("by_type", ["type"])
    .index("by_severity", ["severity"])
    .index("by_active", ["isActive"])
    .index("by_created", ["createdAt"]),

  chatMessages: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.string(),
    message: v.string(),
    response: v.optional(v.string()),
    timestamp: v.number(),
    context: v.optional(v.any()),
  }).index("by_session", ["sessionId"])
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),
});