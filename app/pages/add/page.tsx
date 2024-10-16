'use client';
import Layout from '@/app/components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Recipe } from '@/app/types';
import BasicInput from '@/app/components/BasicInput';

// 레시피 추가

const Add: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [ingredient, setIngredient] = useState('');
    const [ingrds, setIngrds] = useState<string[]>([]);
    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState<string[]>([]);

    const addTag = () => {
        if (tag.trim()) {
            setTags((prevTags) => [...prevTags, tag]);
            setTag('');
        }
    };

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

    const saveRecipe = () => {
        const userRecipes = JSON.parse(localStorage.getItem(`${session?.user?.name}`) || '[]');
        const newId = userRecipes.length > 0 ? Math.max(userRecipes.map(r => r.id)) + 1 : 1;

        const newRecipe: Recipe = {
            id: newId,
            title,
            tags,
            ingrds,
            courses,
            modifiedtimes: [new Date().toISOString()], // 현재 시간 추가
        };

        userRecipes.push(newRecipe);
        localStorage.setItem(session?.user?.name, JSON.stringify(userRecipes));
        setTitle('');
        setTags([]);
        setIngrds([]);
        setCourses([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveRecipe(); // 레시피 저장
        router.push('/'); // 홈으로 리다이렉트
    };

    return (
        <Layout>
            <div className="p-6 h-80">
                <div className="font-bold text-xl my-2">새 레시피 추가</div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 my-4">
                        <label>레시피 제목</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className='bg-white text-black rounded-sm h-8 p-2'
                        />
                    </div>
                    <div className="flex flex-col gap-1 my-4">
                        <label>태그</label>
                        <BasicInput compnt={tag} setFunc={setTag} addFunc={addTag} />
                        <ul>
                            {tags.map((t, idx) => (
                                <li key={idx}>{t}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 my-4">
                        <label>재료 목록</label>
                        <BasicInput compnt={ingredient} setFunc={setIngredient} addFunc={addIngredient} />
                        <ul>
                            {ingrds.map((i, idx) => (
                                <li key={idx}>{i}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 my-4">
                        <label>조리 과정</label>
                        <BasicInput compnt={course} setFunc={setCourse} addFunc={addCourse} />
                        <ul>
                            {courses.map((c, idx) => (
                                <li key={idx}>{c}</li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className='btn w-full btn-success'>레시피 저장</button>
                </form>
            </div>
        </Layout>
    );
};

export default Add;
