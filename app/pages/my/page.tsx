'use client';

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {redirect} from 'next/navigation'
import Layout from "@/app/components/Layout";

export default function My() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("로그인 성공:", session.user);
    }
  }, [session, status]);

  return (
    <Layout>
      <div className="mx-4 my-8 flex flex-col justify-center border-gray-400 bg-gray-400 rounded-md shadow-lg h-1/2">
        {session ? (
          <>
            {redirect('/')}
          </>
        ) : (
          <>
          <div className="p-4 font-bold"> 
            <span className="font-bold text-xl">로그인</span>
          </div>
          <div className="px-4">
            <label>이메일</label>
            <input type="email" className="p-2 my-2 bg-white border-black w-full h-8 rounded-md text-black focus:border-blue-500" placeholder="your-email@example.com"></input>
            <label>비밀번호</label>
            <input type="password" className="p-2 my-2 bg-white border-black w-full h-8 rounded-md text-black" placeholder="비밀번호를 입력하세요."></input>
          </div>
          <div className="flex flex-col flex-1 mx-4 my-2 shadow-sm gap-3 text-black">
            <button className="btn btn-sm btn-success ">로그인</button>
            <button className="btn btn-sm bg-white border-white h-10" onClick={() => signIn("google")}><img src="./images/google.png" className="width:20px"/>Sign in with Google</button>
            <button className="btn btn-sm bg-white border-white h-10" onClick={() => signIn("github")}><img src="./images/github.png" className="width:20px"/>Sign in with Github</button>
          </div>
          </>
        )}
      </div>
    </Layout>
  );
}
