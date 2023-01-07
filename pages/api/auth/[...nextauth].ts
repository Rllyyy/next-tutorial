import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { randomBytes, randomUUID } from "crypto";
import clientPromise from "lib/mongodb";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  /* callbacks: {
    async session({ session, user, token }) {
      if (user) {
        // Send properties to the client, like an access_token and user id from a provider.
        //session.accessToken = token.accessToken as string;
        session.user.id = token.uid as string;
      }
      return session;
    },
  }, */
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session?.user?.name?.split(" ").join("").toLocaleLowerCase();
      session.user.id = user.id;
      return session;
    },
  },
});
