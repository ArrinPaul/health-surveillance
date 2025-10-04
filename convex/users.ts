import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Create a new user
export const createUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("health_worker"), v.literal("community_member")),
    phone: v.optional(v.string()),
    location: v.optional(v.object({
      lat: v.number(),
      lon: v.number(),
      address: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get user by ID
export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});