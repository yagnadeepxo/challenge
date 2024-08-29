'use client';

import React, { useState } from 'react';
import useOrder from '../hooks/useOrder';

interface OrdersProps {
  symbol: string;
}

const Orders: React.FC<OrdersProps> = ({ symbol }) => {
  const { buyMutation, sellMutation } = useOrder();
  const [amount, setAmount] = useState<number>(0);

  const handleBuy = () => {
    buyMutation.mutate({ symbol, amount });
  };

  const handleSell = () => {
    sellMutation.mutate({ symbol, amount });
  };

  return (
    <div>
      <h1>Pump Actions for {symbol}</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <button onClick={handleBuy} disabled={buyMutation.isPending}>
        Buy
      </button>
      <button onClick={handleSell} disabled={sellMutation.isPending}>
        Sell
      </button>

      {buyMutation.isError && <div>Error: {buyMutation.error?.message}</div>}
      {sellMutation.isError && <div>Error: {sellMutation.error?.message}</div>}

      {buyMutation.isSuccess && <div>Successfully bought tokens!</div>}
      {sellMutation.isSuccess && <div>Successfully sold tokens!</div>}
    </div>
  );
};

export default Orders;
