import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCreatePump } from '../hooks/useCreatePump';

const TokenFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, onSubmit, errors, isPending, isError } = useCreatePump();

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Token</button>
      <Modal
        isOpen={isOpen}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} placeholder="Name" />
          {errors.name && <p>{errors.name.message as string}</p>}

          <input {...register('symbol')} placeholder="Symbol" />
          {errors.symbol && <p>{errors.symbol.message as string}</p>}

          <button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Token'}
          </button>
          {isError && <p>Error creating token</p>}
        </form>
      </Modal>
    </div>
  );
};

export default TokenFormModal;
