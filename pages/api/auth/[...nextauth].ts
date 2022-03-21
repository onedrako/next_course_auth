import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";

const options: NextAuthOptions = {
  theme: {
    colorScheme: "dark",
  },
  debug: true,
  session: {},
  jwt: {},
  secret: process.env.AUTH_PLATZI_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`,{
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-type": "application/json" }
        })

        const user = await res.json()

        if(res.ok && user){
          return user
        }

        return null
      }
    }),
  GitHubProvider({
    clientId: process.env.AUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
  })   
  ]
}

export default NextAuth(options);