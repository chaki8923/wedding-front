import React, { useEffect, useState } from 'react';

export function Loading() {
    const [randomHeights, setRandomHeights] = useState<number[]>([]);

    useEffect(() => {
        // クライアントサイドでランダムな高さを生成
        const heights = Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 30) + 20);
        setRandomHeights(heights);
    }, []);

    return (
        <div className="relative flex flex-col justify-center items-center pt-24 p-4">
            <div className="grid grid-cols-[repeat(2,_minmax(200px,_0.3fr))] gap-2 auto-rows-[1px] sm:grid-cols-[repeat(2,_minmax(200px,_1fr))] xl:grid-cols-[repeat(3,_minmax(400px,_1fr))]">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="relative"
                        style={{ gridRowEnd: `span ${randomHeights[i]}` }}
                    >
                        <div
                            className="h-full w-full object-cover rounded-lg bg-gray-200 animate-pulse"

                        />
                    </div>
                ))}
            </div>
        </div>
    )

}
