import { useRouter } from 'next/router';

const TokenPage = () => {
  const router = useRouter();
  const tokenSymbol = router.query.tokenSymbol;

  return (
    <div>
      <h1>{tokenSymbol}</h1>
    </div>
  );
};

export default TokenPage;