import Image from 'next/image'

export default function Home() {
    return (
        <div className="min-h-screen bg-green-soft">
            <div className="relative">
                <Image
                    src="/lp.jpg?height=1080&width=1920"
                    alt="Wedding background"
                    width={1920}
                    height={1080}
                    className="w-full h-screen object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Wedding Gate</h1>
                    <p className="text-xl mb-8">思い出を共有し、祝福を届ける結婚式招待サービス</p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">サービスの特徴</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="招待状作成機能"
                        description="結婚式に招待する人は来て欲しい人に招待を送ることができます。また出席管理をすることも可能です。"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                            </svg>
                        }
                    />

                    <FeatureCard
                        title="ご祝儀送信機能"
                        description="新郎新婦にご祝儀を送信することができます。金額は自由に設定できます。"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />

                    <FeatureCard
                        title="思い出写真共有機能"
                        description="結婚式場に招待された人が写真をアップロードして共有することができます。"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        }
                    />
                </div>

                <div className="mt-16 text-center">
                    <a href="#" className="bg-green-medium hover:bg-green-light text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                        今すぐ始める
                    </a>
                </div>
            </main>

            <footer className="bg-green-medium text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2023 ウェディングコネクト. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

function FeatureCard({ title, description, icon }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            {icon}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}