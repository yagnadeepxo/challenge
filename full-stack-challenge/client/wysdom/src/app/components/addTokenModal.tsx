// import { useState } from 'react';
// import * as z from 'zod';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useCreateToken } from '../hooks/useCreateToken';

// const tokenSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   symbol: z.string().min(1, 'Symbol is required'),
//   imageURL: z.string().url('Invalid URL'),
//   address: z.string().min(1, 'Address is required'),
//   decimals: z.number().int().min(0),
//   ticker: z.string().min(1, 'Ticker is required'),
// });

// type TokenFormData = z.infer<typeof tokenSchema>;

// interface AddTokenModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const AddTokenModal = ({ isOpen, onClose }: AddTokenModalProps) => {
//   const { mutate: createToken } = useCreateToken();
//   const [formData, setFormData] = useState<Partial<TokenFormData>>({});
//   const [errors, setErrors] = useState<Partial<Record<keyof TokenFormData, string>>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: name === 'decimals' ? Number(value) : value }));
//     setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const validData = tokenSchema.parse(formData);
//       createToken(validData, {
//         onSuccess: () => {
//           onClose();
//           setFormData({});
//           setErrors({});
//         },
//       });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<Record<keyof TokenFormData, string>> = {};
//         error.errors.forEach(err => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as keyof TokenFormData] = err.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add New Token</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={onSubmit} className="space-y-4">
//           {(Object.keys(tokenSchema.shape) as Array<keyof TokenFormData>).map((field) => (
//             <div key={field}>
//               <label htmlFor={field} className="block text-sm font-medium text-gray-700">
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <Input
//                 id={field}
//                 name={field}
//                 type={field === 'decimals' ? 'number' : 'text'}
//                 value={formData[field] || ''}
//                 onChange={handleChange}
//                 className={errors[field] ? 'border-red-500' : ''}
//               />
//               {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
//             </div>
//           ))}
//           <Button type="submit">
//             {'Create Token'}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
import React, { useState } from 'react';
import  Modal  from 'react-modal';
import { useCreateToken } from '../hooks/useCreateToken';

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
          <button type="submit" disabled={isPending}>
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