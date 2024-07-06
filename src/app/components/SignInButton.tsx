"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import ErrorMessageBox from "@/app/components/ErrorMessageBox";

function SignInButton() {
  const { data: session } = useSession();
  const result: any = session;
  const loginType = session ? result["loginType"] : "";

  const { push } = useRouter();
  if (session && session['errorMessage']) {
    return <ErrorMessageBox errorMessage={session['errorMessage']} signOut={signOut}></ErrorMessageBox>
  } else if (session && session?.user) {
    return (
      <button
        className="px-12 py-4 border rounded-xl bg-red-300"
        onClick={() => signOut()}
      >
        <div className="float-left">
          {loginType === "regular" ? (
            <></>
          ) : (
            <input
              className="mr-2"
              type="image"
              width={20}
              src={
                loginType === "naver"
                  ? "/icon/naver.png"
                  : loginType === "kakao"
                  ? "/icon/kakao.png"
                  : ""
              }
            ></input>
          )}
        </div>
        {session.user.name}님 Log Out
      </button>
    );
  } else {
    if (session !== undefined) {
      // 세션이 로딩 중일 때의 상태를 처리합니다
      signIn();
    }
    return (
      <div></div>
    );
  }

}

export default SignInButton;
