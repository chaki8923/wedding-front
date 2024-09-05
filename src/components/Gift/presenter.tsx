import styles from './index.module.scss';
import { useRouter } from "next/router";
import { useState } from "react";

export function Presenter() {
  const { push } = useRouter();
  const [price, setPrice] = useState<number>(); // 初期値を0に設定
  const [comment, setComment] = useState<string>(); // 初期値を0に設定

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>ご祝儀</h1>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))} // 入力値を数値として状態に保存
            placeholder="金額を入力してください"
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // 入力値を数値として状態に保存
            placeholder="素敵なメッセージを入力してください"
            className={styles.inputField}
          />
        </div>
        <button
          className="p-2 px-12 tracking-wide mt-4 border-gray-400 border-2 bg-white text-base rounded-md cursor-pointer hover:bg-gray-300"
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
      </div>
    </div>
  );
}
