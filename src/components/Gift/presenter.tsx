import { useState } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";

export function Presenter() {
  const { push } = useRouter();
  const [price, setPrice] = useState<number>(); // 初期値を0に設定
  const [comment, setComment] = useState<String>(); // 初期値を0に設定

  return (
    <>
      <div align="center" className={styles.backgroundWrapper}>
        <div>
          <h1>Stripe Test購入画面</h1>
          <div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))} // 入力値を数値として状態に保存
              placeholder="金額を入力してください"
            />
          </div>
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(String(e.target.value))} // 入力値を数値として状態に保存
              placeholder="メッセージを入力してください"
            />
          </div>
          <button
            align="center"
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
    </>
  );
}
