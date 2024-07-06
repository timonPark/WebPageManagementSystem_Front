import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import {LOCATOR, Post} from "@/app/utils/axios";
import { Account } from "next-auth";

const createSocialRequestDto = (account: Account) => ({
  accesstoken: account.access_token
})

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "이메일 주소" },
        password: { label: "비밀번호", type: "password" },
      },
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
          token["accessToken"] = result.data;
        } catch(error) {
          token["errorMessage"] = error.response.data;
        }
        token["loginType"] = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      session["loginType"] = token["loginType"];
      session["errorMessage"] = token["errorMessage"];
      session["accessToken"] = token["accessToken"];
      return session;
    },
  },
  pages: {
    signIn: "/signin?value=aaaa",
  },
});
