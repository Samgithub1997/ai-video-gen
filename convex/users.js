import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        photoURL: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();


        if(user.length > 0) {
            return user[0];
        }
        const userRecord = {
            name: args.name,
            email: args?.email,
            photoURL: args?.photoURL,
            credits: 3,
        }
        const result = await ctx.db.insert("users", userRecord);

        return userRecord;

    }
})