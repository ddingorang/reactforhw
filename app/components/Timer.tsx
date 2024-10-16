'use client';
import React, { useState, useEffect } from 'react';

// 타이머 컴포넌트

const Timer: React.FC = () => {
    const [inputTime, setInputTime] = useState<number>(60); // 입력 받을 기본 시간 (초)
    const [seconds, setSeconds] = useState<number>(inputTime); // 타이머 초기값 (60초)
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        }
        if(seconds === 0) {
            alert('타이머 종료!!');
        }

        return () => {
            if (interval) {
                clearInterval(interval); // 컴포넌트가 언마운트되거나 isActive가 false로 변경될 때 타이머 정지
            }
        };
    }, [isActive, seconds]);

    const startTimer = () => {
        setSeconds(inputTime);
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(30); // 초기값으로 리셋
    };

    return (
        <div>
            {isActive ? 
                <>
                <span className='px-2'>{seconds}초 남음</span>
                <button onClick={resetTimer} className="btn btn-error btn-sm mx-2">초기화</button>
                </>
                : 
                <>
                <input
                type="text"
                value={inputTime}
                onChange={(e) => setInputTime(Number(e.target.value))}
                placeholder="초 단위로 시간 입력"
                className="border rounded px-2 w-1/3 h-8"/>
                <button onClick={startTimer} className="btn btn-info btn-sm mx-2">시작</button>
                </>}
        </div>
    );
};

export default Timer;
