'use client'

import {ChangeEvent, FormEvent, useState} from 'react'
import {useRouter} from "next/navigation";
import {Get, LOCATOR, Post} from "@/app/utils/axios";
import ErrorMessageBox, {ErrorMessageBoxProps} from "@/app/components/ErrorMessageBox";
import {SignUpReqDto} from "@/dto/user/sign.up.req.dto";

interface SignUpStatus {
  name: string;
  email: string;
  password: string;
  isEmailValid: boolean;
  isAlertBox: boolean;
  errorMessage: string;
}

const SignUp: React.FC = () => {
  const [signUpStatus, setSignUpStatus] = useState<SignUpStatus>({
    name: '',
    email: '',
    password: '',
    isEmailValid: false,
    isAlertBox: false,
    errorMessage: ''
  })

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpStatus({
      ...signUpStatus,
      [e.target.name]: e.target.value,
    });
  };

  const errorMessageReset = () => {
    setSignUpStatus({
      ...signUpStatus,
      isAlertBox: false,
      errorMessage: '',
    })
  }

  const validateEmail = async () => {
    try {
      const result = await Get(
        "/api/user/checkEmail/" + signUpStatus.email,
      );
      setSignUpStatus({
        ...signUpStatus,
        isEmailValid: true
      });
    } catch (error) {
      const errorObj: any = error;
      setSignUpStatus({
        ...signUpStatus,
        isAlertBox: true,
        errorMessage: errorObj.response.data.message,
      });
    }
  }

  const goToSignInPage = () => {
    router.push('/signIn')
  }

  const signUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await Post(
        "/api/user/signUp",
        new SignUpReqDto(signUpStatus.name, signUpStatus.email, signUpStatus.password),
      );
      setSignUpStatus({
        name: '',
        email: '',
        password: '',
        isEmailValid: false,
        isAlertBox: false,
        errorMessage: ''
      });
      goToSignInPage();
    } catch (error) {
      const errorObj: any = error;
      setSignUpStatus({
        ...signUpStatus,
        isAlertBox: true,
        errorMessage: errorObj.response.data.message,
      });
    }


  }
  const [agreed, setAgreed] = useState(false)
  return (

    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <ErrorMessageBox errorMessage={signUpStatus.errorMessage} inputfuc={errorMessageReset} isError={signUpStatus.isAlertBox}></ErrorMessageBox>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">회원가입</h2>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
              이름
            </label>
            <div className="mt-5">
              <input
                id="name"
                name="name"
                type="text"
                value={signUpStatus.name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              이메일
            </label>
          </div>
          <div className="sm:col-span-2">
            <input
              id="email"
              name="email"
              type="email"
              value={signUpStatus.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="sm:col-span-1">
            <button
              type="button"
              disabled={signUpStatus.isEmailValid}
              className={signUpStatus.isEmailValid ? "block w-full rounded-md bg-indigo-100 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm " : "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
              onClick={validateEmail}
            >
              이메일 중복
            </button>

          </div>

          <div className="sm:col-span-3">
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              비밀번호
            </label>
            <div className="mt-5">
              <input
                id="password"
                name="password"
                type="password"
                value={signUpStatus.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={!signUpStatus.isEmailValid}
            className={!signUpStatus.isEmailValid ? "block w-full rounded-md bg-indigo-100 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm " : "block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
            onClick={signUpSubmit}
          >
            회원가입
          </button>
        </div>
        <div className="mt-10">
          <button
            type="button"
            onClick={goToSignInPage}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            로그인 화면
          </button>
        </div>
      </form>

    </div>
  )
}

export default SignUp;