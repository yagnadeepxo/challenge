import React, { useState } from 'react';
import  Modal  from 'react-modal';
import { useCreateToken } from '../hooks/useCreateToken';
//import { Button } from "@/components/ui/button"
const TokenFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, onSubmit, errors, isPending, isError } = useCreateToken();
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Token</button>
      <Modal isOpen={isOpen} 
      onRequestClose={() => setIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        },
      }}
      >
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <input {...register('name')} placeholder="Name" />
          <input {...register('imageURL')} placeholder="Image URL" />
          <input {...register('address')} placeholder="Address" />
          <input {...register('decimals', { valueAsNumber: true })} placeholder="Decimals" type="number" />
          <input {...register('ticker')} placeholder="Ticker" />
          <button type="submit" disabled={isPending} >
            {isPending ? 'Creating...' : 'Create Token'}
          </button>
          {errors.name && <p>{errors.name.message as any}</p>}
          {errors.imageURL && <p>{errors.imageURL.message as any}</p>}
          {errors.address && <p>{errors.address.message as any}</p>}
          {errors.decimals && <p>{errors.decimals.message as any}</p>}
          {errors.ticker && <p>{errors.ticker.message as any}</p>}
          {isError && <p>Error creating token</p>}
        </form>
      </Modal>
    </div>
  );
};

export default TokenFormModal;