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


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "이메일 주소" },
        password: { label: "비밀번호", type: "password" },
      },// @ts-ignore
      async authorize(credentials, req) {
        if (!credentials) {
          return;
        }
        console.log(`credentials: ${JSON.stringify(credentials)}`);
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
    async jwt({ token, account }) {
      // console.log("****************************");
      // console.log(`token: ${token}`);
      // console.log(token);
      // console.log(`account: ${account}`);
      // console.log(account);
      // console.log("****************************");
      if (account) {
        try {
          const result = await Post(
            LOCATOR.backend + "/user/social/" + account.provider,
            createSocialRequestDto(account)
          );
          token["accessToken"] = result.data.data.accessToken;
        } catch(error) {
          const errorObj: any = error;
          // console.log(`----------------`);
          // console.log(errorObj.response.data.message);
          // console.log(`----------------`);
          token["errorMessage"] = errorObj.response.data.message;
        }
        token["loginType"] = account.provider;
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
    signIn: "/signin?value=aaaa",
  },
});

export { handler as GET, handler as POST };
