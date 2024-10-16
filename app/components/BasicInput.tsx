
// input, 그리고 추가 버튼이 하나로 묶인 컴포넌트 따로 정의하여 재사용

const BasicInput = ({compnt, setFunc, addFunc}) => {
    return (
        <div className='flex flex-row gap-2'>
            <input
                type="text"
                value={compnt}
                onChange={(e) => setFunc(e.target.value)}
                className='bg-white text-black rounded-sm h-8 p-2 w-5/6 focus:border-blue-700 focus:border-10' // onChange 핸들러 추가
            />
            <button type="button" className='w-1/6 rounded-sm bg-gray-500 transition duration-200 hover:bg-gray-700' onClick={addFunc}>추가</button> {/* type="button" 추가 */} 
        </div>        
    )
}

export default BasicInput;