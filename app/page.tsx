'use client';
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from './components/Layout';
import { useRouter } from "next/navigation";

// 메인 화면

export default function Home() {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userRecipes = JSON.parse(localStorage.getItem(session?.user?.name) || '[]');
    setRecipes(userRecipes);
  }, [session]);

  const loggedout = () => { // 로그인하지 않은 상태
    return (
      <div className="h-80 p-8 text-center">
        <p className="text-xl m-4">나만의 레시피를 저장해보세요!</p>
        <p>로그인이 필요합니다.</p>
      </div>
    )
  }

  const loggedin = (recipes: any[]) => { // 로그인한 상태

    const wheretoroute = (id: string) => {
      router.push(`/pages/details/${id}`);
    }

    const handleReset = () => { // 레시피 목록 초기화
      localStorage.removeItem(session?.user?.name);
      setRecipes([]); // 상태도 초기화
    }

    return (
      <div>
          <p className="p-2 text-center bg-gray-600 rounded-b-md">{session?.user?.name}님, 환영합니다!</p>
          {recipes.length > 0 ? ( // 등록된 레시피가 1개 이상이면
              <>
                  {recipes.map((recipe) => (
                      <div key={recipe.id} className="bg-white rounded-md shadow-md shadow-gray-400 text-black m-3 p-3">
                          <div className="font-bold mb-2">{recipe.title}</div>
                          {recipe.tags.map((t, idx) => (
                              <span key={idx} className="bg-gray-500 rounded-md p-2 mr-2 text-gray-300">#{t}</span>
                          ))}
                          <div className="mt-4">
                              <button 
                                  className="btn btn-primary btn-sm w-full" 
                                  onClick={() => wheretoroute(recipe.id)} 
                                  aria-label={`${recipe.title} 자세히 보기`}
                              >
                                  자세히 보기
                              </button>
                          </div>
                      </div>
                  ))}
                  <div className="m-3">
                      <button 
                          className="btn btn-error btn-sm w-full" 
                          onClick={handleReset} 
                          aria-label="레시피 초기화"
                      >
                          초기화
                      </button>
                  </div>
              </>
          ) : ( // 등록된 레시피가 한 개도 없다면
              <div className="px-4 py-6 text-center">
                <p className="text-white">레시피가 없습니다!</p>
                <br/>
                <p className="text-white">'레시피 추가'를 눌러 새로운 레시피를 추가해 보세요.</p>
              </div>
              
          )}
      </div>
    );
  
  }

  return ( // 세션 여부에 따라 로그인, 비로그인 체크
    <Layout>
      <div>{session ? loggedin(recipes) : loggedout()}</div> 
    </Layout>
  );
}
