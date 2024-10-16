'use client';
import Layout from '@/app/components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/app/types';
import BasicInput from '@/app/components/BasicInput';

// 수정 화면

const Update = ({ params }: { params: { id: string } }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [prevRecipe, setPrevRecipe] = useState<Recipe | null>(null);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState('');
    const [ingrds, setIngrds] = useState<string[]>([]);
    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState<string[]>([]);
    const [modifiedtimes, setModifiedTimes] = useState<string[]>([]);

    useEffect(() => {
        if (session) {
            const userRecipes = JSON.parse(localStorage.getItem(session.user.name) ?? '[]');
            const foundRecipe = userRecipes.find((r: Recipe) => r.id == params.id);
            setPrevRecipe(foundRecipe); // 이전 레시피 상태 설정
            if (foundRecipe) {
                setRecipe(foundRecipe);
                setTitle(foundRecipe.title);
                setTags(foundRecipe.tags);
                setIngrds(foundRecipe.ingrds);
                setCourses(foundRecipe.courses);
                setModifiedTimes(foundRecipe.modifiedtimes);
            }
        }
    }, [session, params.id]);

    const addIngredient = () => {
        if (ingredient.trim()) {
            setIngrds((prevIngrds) => [...prevIngrds, ingredient]);
            setIngredient('');
        }
    };

    const addCourse = () => {
        if (course.trim()) {
            setCourses((prevCourses) => [...prevCourses, course]);
            setCourse('');
        }
    };

    const deleteIngredient = (index: number) => {
        setIngrds((prevIngrds) => prevIngrds.filter((_, i) => i !== index));
    };

    const deleteCourse = (index: number) => {
        setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (session && recipe) {
            const userRecipes = JSON.parse(localStorage.getItem(session.user.name) || '[]');

            const isChanged = title !== prevRecipe.title ||
                              JSON.stringify(tags) !== JSON.stringify(prevRecipe.tags) ||
                              JSON.stringify(ingrds) !== JSON.stringify(prevRecipe.ingrds) ||
                              JSON.stringify(courses) !== JSON.stringify(prevRecipe.courses);

            const updatedRecipes = userRecipes.map((r: Recipe) =>
                r.id == params.id ? { ...r, title, tags, ingrds, courses, 
                    modifiedtimes: isChanged ? [...r.modifiedtimes, new Date().toISOString()] : r.modifiedtimes} : r
            );
            localStorage.setItem(session.user.name, JSON.stringify(updatedRecipes));
            router.push(`/pages/details/${params.id}`);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="font-bold text-xl my-2">레시피 수정</div>
                <form onSubmit={(e) => {handleUpdate(e);}}>
                    <div className="flex flex-col gap-1 my-4">
                        <label>레시피 제목</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder={title} 
                            className='bg-white text-black rounded-sm h-8 p-2'
                        />
                    </div>
                    <div className="flex flex-col gap-1 my-4">
                        <label>재료 목록</label>  
                        <BasicInput compnt={ingredient} setFunc={setIngredient} addFunc={addIngredient}/> 
                        {ingrds.map((i, idx) => (
                            <div key={idx} className='flex flex-row justify-between my-1 p-1 bg-gradient-to-r from-gray-300 to-gray-600 rounded-md'>
                                <p className='text-gray-700 px-2'>{i}</p>
                                <button 
                                    className="bg-red-400 rounded-sm p-1 w-1/6 transform duration-200 hover:bg-red-500" 
                                    onClick={() => deleteIngredient(idx)}
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 my-4">
                        <label>조리 과정</label>
                        <BasicInput compnt={course} setFunc={setCourse} addFunc={addCourse}/>
                        {courses.map((c, idx) => (
                            <div key={idx} className={`flex flex-row justify-between my-1 p-1 bg-gradient-to-r from-orange-100 to-orange-400 rounded-md`}>
                                <p className='inline-block px-2 text-gray-500'>{`${idx + 1}. ${c}`}</p>
                                <button 
                                    className="bg-red-400 rounded-sm p-1 w-1/6 transform duration-200 hover:bg-red-500" 
                                    onClick={() => deleteCourse(idx)}
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md shadow-md h-8 w-full'
                    >
                        레시피 저장
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Update;
