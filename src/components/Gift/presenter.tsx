import styles from './index.module.scss';
import { useRouter } from "next/router";
import { useState } from "react";
import { AmountModal } from './AmountModal';
import { FaMoneyBillAlt } from 'react-icons/fa'; 

export function Presenter() {
  const { push } = useRouter();
  const [price, setPrice] = useState<number | "">(""); // 初期値を0に設定
  const [comment, setComment] = useState<string>("");  // 初期値を0に設定
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAmountSelect = (amount: number) => {
    setPrice(amount);
  };

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>ご祝儀</h1>
        <div className="flex justify-center items-center">
          <button
            className="flex items-center px-4 py-1 tracking-wide bg-yellow-200 text-base rounded-md cursor-pointer hover:bg-yellow-300 text-yellow-600 hover:text-yellow-800"
            onClick={() => setIsModalOpen(true)}
          >
            <FaMoneyBillAlt className="mr-2" />
            金額を選択
          </button>
        </div>

        {price !== "" && (
          <div className="mt-4">
            <p className="text-lg font-semibold text-green-800">選択した金額: {price === "custom" ? "カスタム金額" : `${price}円`}</p>
          </div>
        )}
  <br />
        <div className="relative w-full mb-4">
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // 入力値を数値として状態に保存
            placeholder="素敵なメッセージを入力してください"
            className="block w-full h-32 px-3 py-2 text-sm text-green-800 bg-green-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          className="p-2 px-12 tracking-wide mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300"
          onClick={async () => {
            const response = await fetch("/api/checkout_api", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customer_id: "cus_Qko6M6vLPrYILI",
                price: price, // 入力された価格を使用
                comment: comment,
              }),
            }).then((data) => data.json());
            push(response.checkout_url);
          }}
        >
          ご祝儀を贈る
        </button>

        <AmountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleAmountSelect}
        />
      </div>
    </div>
  );
}
