'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import Timer from "@/app/components/Timer"
import { format } from 'date-fns';

// 레시피 상세 화면

const RecipeDetails = ({ params }: { params: { id: string } }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [recipe, setRecipe] = useState<any>(null);

    const routetoupdate = (id: string) => { // 수정 화면으로
        router.push(`/pages/update/${id}`);
      }
    const routetolist = () => { // 다시 메인 화면으로
        router.push('/');
    }
    
    const deleteRecipe = () => { // 레시피 삭제
        if (session && recipe) {
            const userRecipes = JSON.parse(localStorage.getItem(session?.user?.name) || '[]');
            const updatedRecipes = userRecipes.filter((r: any) => r.id !== recipe.id); // 그 id에 해당하는 레시피 제거
            localStorage.setItem(session?.user?.name, JSON.stringify(updatedRecipes)); // 제거된 레시피 목록 반영하여 업데이트
            router.push('/'); // 삭제 후 홈으로 리다이렉트
        }
    };  

    useEffect(() => {   
        if (session) {
            // 로컬 스토리지에서 레시피를 가져옴
            const userRecipes = JSON.parse(localStorage.getItem(session?.user?.name) || '[]');
            const foundRecipe = userRecipes.find((r: any) => r.id == params.id); // ID로 레시피 찾기
            setRecipe(foundRecipe);
        }
    }, [session, params.id]);

    if (!recipe) {
        return <div>레시피를 찾을 수 없습니다.</div>; // 레시피가 없을 경우 처리
    }

    return (
        <Layout>
            <div className="p-6 h-full">
                <h2 className="font-bold text-xl my-2">{recipe.title}</h2>
                <div className="gap-2 my-4">
                    <p className="my-2">조리 과정</p>
                    {recipe.courses.map((c: string, idx: number) => (
                        <>
                        <p key={idx} className="my-2">{`Step ${idx + 1}: ${c}`}</p>
                        <Timer/> // 따로 만든 타이머 컴포넌트 사용
                        </>
                    ))}
                </div>
                <div className="my-4">
                    <p>재료</p>
                    <div className="bg-gray-400 rounded-md p-2 text-black my-2 shadow-md shadow-gray-700">
                        <ul>
                            {recipe.ingrds.map((i: string, idx: number) => (
                                <li key={idx}>{i}</li>
                            ))}
                        </ul>
                    </div>                    
                </div>
                <div className="my-2">
                    <p>수정 기록</p>
                    {recipe.modifiedtimes.map((time: string, idx: number) => (
                        <li key={idx}>
                            {idx === 0 ? ( // 처음 add 할 때 modifiedtimes에 시간이 추가됨 -> 최초 등록 시간
                                <>최초 등록 : {format(new Date(time), 'yyyy년 MM월 dd일 HH:mm:ss')}</>
                            ) : (
                                format(new Date(time), 'yyyy년 MM월 dd일 HH:mm:ss')
                            )}
                        </li>
                    ))}

                </div>
                <div className="flex flex-row justify-between">
                    <button className="btn btn-warning w-1/4" onClick={()=>routetoupdate(recipe.id)}>수정</button>
                    <button className="btn btn-error w-1/4" onClick={deleteRecipe}>삭제</button>
                    <button className="btn btn-neutral w-1/4" onClick={() => routetolist()}>목록으로</button>
                </div>
            </div>
        </Layout>
    );
};

export default RecipeDetails;
