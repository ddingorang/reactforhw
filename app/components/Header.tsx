'use client';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

// 헤더 구조 정의

export default function Header() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loginClick = () => { // 로그인 화면
        router.push('/pages/my');
    };
    const homeClick = () => { // '나만의 레시피' 클릭 시 홈으로
        router.push('/');
    };
    const newRecipe = () => { // 레시피 추가
        router.push('/pages/add');
    };

    return (
        <header className="px-5 py-2 h-16 flex flex-row justify-between items-center shadow-sm bg-gray-700">
            <div className="w-1/3 flex">
                <p className="text-bold" onClick={homeClick}>나만의 레시피</p>
            </div>
            <div className="w-1/2 p-2">
                {session ? ( // 로그인 여부에 따라
                        <>
                        <button className="btn btn-sm btn-primary mx-2" onClick={newRecipe}>레시피 추가</button>
                        <button className="btn btn-sm btn-secondary h-2/3" onClick={() => signOut()}>로그아웃</button>
                        </>
                    ) : ( // 로그인하지 않았으면 레시피 추가 버튼 비활성화
                        <> 
                        <button className="btn btn-sm btn-primary mx-2" disabled onClick={newRecipe}>레시피 추가</button>
                        <button className="btn btn-sm btn-secondary h-2/3" onClick={loginClick}>로그인</button>
                        </>
                    )}                
            </div>
        </header>
    )
}