import Link from "next/link";
import React, { useEffect, useState } from 'react';

export function Loading() {
    const [randomHeights, setRandomHeights] = useState<number[]>([]);

    useEffect(() => {
        // クライアントサイドでランダムな高さを生成
        const heights = Array.from({ length: 12 }).map(() => Math.floor(Math.random() * 30) + 20);
        setRandomHeights(heights);
    }, []);

    return (
        <div className="relative flex flex-col justify-center items-center sm:gap-4 pt-24 p-4">
            <div className="gap-2 grid grid-cols-[repeat(1,_minmax(400px,_1fr))] sm:gap-4 xl:auto-rows-[1px] xl:grid xl:grid-cols-[repeat(3,_minmax(400px,_1fr))]">
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
            <Link
                href="/upload"
                className="fixed bottom-4 px-4 py-2.5 bg-green-800 text-sm text-center text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700"
            >
                写真をアップロードする
            </Link>
        </div>
    )

}
