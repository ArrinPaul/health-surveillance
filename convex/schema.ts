import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(),
    role: v.union(v.literal("admin"), v.literal("health_worker"), v.literal("community_member")),
    name: v.string(),
    phone: v.optional(v.string()),
    location: v.optional(v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  reports: defineTable({
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
    status: v.union(v.literal("pending"), v.literal("investigating"), v.literal("resolved")),
    aiAnalysis: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_location", ["location.lat", "location.lon"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  alerts: defineTable({
    title: v.string(),
    message: v.string(),
    type: v.union(v.literal("outbreak"), v.literal("water_contamination"), v.literal("weather_warning")),
    severity: v.union(v.literal("info"), v.literal("warning"), v.literal("danger"), v.literal("critical")),
    location: v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
      radius: v.number(), // in meters
    }),
    isActive: v.boolean(),
    expiresAt: v.optional(v.number()),
    createdBy: v.id("users"),
    aiGenerated: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_location", ["location.lat", "location.lon"])
    .index("by_active", ["isActive"])
    .index("by_type", ["type"]),

  waterQuality: defineTable({
    location: v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
    }),
    measurements: v.object({
      ph: v.number(),
      turbidity: v.number(),
      chlorine: v.number(),
      bacteria: v.number(),
      temperature: v.number(),
      dissolvedOxygen: v.number(),
      conductivity: v.number(),
    }),
    qualityIndex: v.number(), // 0-100 scale
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    weatherData: v.optional(v.object({
      temperature: v.number(),
      humidity: v.number(),
      precipitation: v.number(),
      windSpeed: v.number(),
    })),
    reportedBy: v.optional(v.id("users")),
    source: v.union(v.literal("sensor"), v.literal("manual"), v.literal("ai_prediction")),
    createdAt: v.number(),
  }).index("by_location", ["location.lat", "location.lon"])
    .index("by_risk", ["riskLevel"])
    .index("by_quality", ["qualityIndex"]),

  healthFacilities: defineTable({
    name: v.string(),
    type: v.union(v.literal("hospital"), v.literal("clinic"), v.literal("pharmacy"), v.literal("laboratory")),
    location: v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
    }),
    contact: v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      website: v.optional(v.string()),
    }),
    services: v.array(v.string()),
    capacity: v.optional(v.number()),
    isOperational: v.boolean(),
    operatingHours: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_location", ["location.lat", "location.lon"])
    .index("by_type", ["type"])
    .index("by_operational", ["isOperational"]),

  predictions: defineTable({
    type: v.union(v.literal("outbreak"), v.literal("water_contamination"), v.literal("health_risk")),
    location: v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
      radius: v.number(),
    }),
    prediction: v.object({
      probability: v.number(), // 0-1 scale
      confidence: v.number(), // 0-1 scale
      timeframe: v.string(), // e.g., "next_7_days"
      factors: v.array(v.string()),
    }),
    inputData: v.object({
      reports: v.array(v.id("reports")),
      waterQuality: v.array(v.id("waterQuality")),
      weatherPattern: v.optional(v.any()),
    }),
    model: v.string(),
    aiAnalysis: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("expired"), v.literal("resolved")),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index("by_location", ["location.lat", "location.lon"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),
});