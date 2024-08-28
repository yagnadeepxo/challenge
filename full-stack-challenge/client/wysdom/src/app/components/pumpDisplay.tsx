// import React from 'react';
// import { useFetchPump } from '../hooks/useFetchPump';

// const PumpPage = () => {
//   const { data, isLoading, isError } = useFetchPump();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching data</div>;

//   return (
//     <div>
//       {data && data.map((token, index) => (
//         <div key={index} className="card">
//           <h2>{token.name}</h2>
//           <p>Symbol: {token.symbol}</p>
//           <p>Price: {token.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PumpPage;

import React from 'react';
import { useFetchPump } from '../hooks/useFetchPump';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const PumpPage = () => {
  const { data, isLoading, isError } = useFetchPump();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <BrowserRouter>
    <div>
      {data && data.map((token, index) => (
        <Link key={index} to={`/token/${token.symbol.toLowerCase()}`}>
          <div className="card">
            <h2>{token.name}</h2>
            <p>Symbol: {token.symbol}</p>
            <p>Price: {token.price}</p>
          </div>
        </Link>
      ))}
    </div>
    </BrowserRouter>
  );
};

export default PumpPage;