import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import {LOCATOR, Post} from "@/app/utils/axios";
import { Account } from "next-auth";

const createSocialRequestDto = (account: Account) => ({
  accessToken: account.access_token
})

const createLoginRequestDto = (credentials: { email: string; password: string; } | undefined) => ({
  email: credentials?.email,
  password: credentials?.password,
})


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "이메일 주소" },
        password: { label: "비밀번호", type: "password" },
      },// @ts-ignore
      async authorize(credentials, req) {
        const valueEmpty: string = '[object HTMLInputElement]'
        if (credentials?.email !== valueEmpty && credentials?.password !== valueEmpty) {
          console.log(`credentials?.email: ${credentials?.email}`);
          console.log(`credentials?.password: ${credentials?.password}`);
          const result = await Post(
            LOCATOR.backend + "/user/login",
            createLoginRequestDto(credentials)
          );
          console.log(`$$$$$$$$$$$$$$$$$$$$$$`)
          console.log(result.data.data.accessToken);
          console.log(`$$$$$$$$$$$$$$$$$$$$$$`)
          return (
            {
              provider: 'credentials',
              type: 'credentials',
              email: credentials?.email,
              accessToken: result.data.data.accessToken,
              tokenType: 'bearer',
            }

          )
        }
        return null;
      },

    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ? process.env.KAKAO_CLIENT_ID : "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET
        ? process.env.KAKAO_CLIENT_SECRET
        : "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ? process.env.NAVER_CLIENT_ID : "",
      clientSecret: process.env.NAVER_CLIENT_SECRET
        ? process.env.NAVER_CLIENT_SECRET
        : "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
        ? process.env.GOOGLE_CLIENT_SECRET
        : "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("****************************");
      console.log(`token: ${JSON.stringify(token)}`);
      console.log(`user: ${JSON.stringify(user)}`);
      console.log(`account: ${JSON.stringify(account)}`);
      console.log(`profile: ${JSON.stringify(profile)}`);
      console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
      console.log("****************************");
      if (account?.provider !== 'credentials' && account) {
        try {
          const result = await Post(
            LOCATOR.backend + "/user/social/" + account.provider,
            createSocialRequestDto(account)
          );
          token["accessToken"] = result.data.data.accessToken;
        } catch(error) {
          const errorObj: any = error;
          token["errorMessage"] = errorObj.response.data.message;
        }
        token["loginType"] = account.provider;
      }
      if (user) {
        const userObj: any = user
        token["loginType"] = account?.provider
        token['accessToken'] =  userObj['accessToken'];
      }

      return token;
    },
    async session({ session, token, user }) {
      const sessionObj: any = session;
      sessionObj["loginType"] = token["loginType"];
      sessionObj["errorMessage"] = token["errorMessage"];
      sessionObj["accessToken"] = token["accessToken"];
      return sessionObj;
    },
  },
  pages: {
    signIn: "/signIn",
  },
});

export { handler as GET, handler as POST };
