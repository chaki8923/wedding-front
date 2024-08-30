import { useState } from "react";
import { useRouter } from "next/router";
import styles from './index.module.scss';

export function Presenter() {
  const { push } = useRouter();
  const [price, setPrice] = useState(""); // priceの状態を管理

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePurchase = async () => {
    const response = await fetch("/api/checkout_api", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: "cus_Qko6M6vLPrYILI", // 顧客ID
        payment_method_types: ["card"],
        mode: "payment",
        price: price
      }),
    });

    const result = await response.json();
    push(result.checkout_url);
  };

  return (
    <div className={styles.backgroundWrapper}>
      <h1>Stripe Test購入画面</h1>
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="金額を入力してください"
      />
      <button align="center" onClick={handlePurchase}>
        ご祝儀を送る！
      </button>
    </div>
  );
}
