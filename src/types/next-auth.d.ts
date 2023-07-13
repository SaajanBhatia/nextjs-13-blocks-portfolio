import NextAuth from "next-auth";
/** Next Auth Session Object Configuration
 * Add User ID to Session Object
 */

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}