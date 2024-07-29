// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { format } from 'date-fns';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const timeFrames = {
//   '1D': { days: '1' },
//   '7D': { days: '7' },
//   '30D': { days: '30' },
//   '365D': { days: '365' },
// };

// type TimeFrame = '1D' | '7D' | '30D' | '365D';

// const PriceChart: React.FC = () => {
//   // const [chartData, setChartData] = useState<any>(null);
//   // const [timeFrame, setTimeFrame] = useState<TimeFrame>('7D');

//   // useEffect(() => {
//   //   fetchChartData();
//   // }, [timeFrame]);

//   const fetchChartData = async () => {
//     const { days } = timeFrames[timeFrame];

//     try {
//       //const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&precision=2`);
//       const response = await axios.get(`/api/bitcoin-price?days=${days}`);
//       const priceData = response.data.prices;

//       const labels = priceData.map((item: number[]) => 
//         format(new Date(item[0]), getDateFormat(timeFrame))
//       );

//       const prices = priceData.map((item: number[]) => item[1]);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Price (USD)',
//             data: prices,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error('Error fetching chart data:', error);
//     }
//   };

//   const getDateFormat = (tf: TimeFrame) => {
//     switch(tf) {
//       case '1D':
//         return 'HH:mm';
//       case '7D':
//         return 'dd MMM HH:mm';
//       case '30D':
//         return 'dd MMM';
//       case '365D':
//         return 'MMM yyyy';
//       default:
//         return 'dd MMM yyyy';
//     }
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         ticks: {
//           maxTicksLimit: 8,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: '20px' }}>
//         {Object.keys(timeFrames).map((tf) => (
//           <button
//             key={tf}
//             onClick={() => setTimeFrame(tf as TimeFrame)}
//             style={{ 
//               fontWeight: timeFrame === tf ? 'bold' : 'normal',
//               margin: '0 10px',
//               padding: '5px 10px',
//             }}
//           >
//             {tf}
//           </button>
//         ))}
//       </div>
//       <div style={{ width: '600px', height: '400px' }}>
//         {chartData && <Line data={chartData} options={chartOptions} />}
//       </div>
//     </div>
//   );
// };

// export default PriceChart;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeFrames = {
  '1D': { days: '1' },
  '7D': { days: '7' },
  '30D': { days: '30' },
  '365D': { days: '365' },
};

type TimeFrame = '1D' | '7D' | '30D' | '365D';

// Separate function for fetching data
const fetchChartData = async (timeFrame: TimeFrame) => {
  const { days } = timeFrames[timeFrame];
  const response = await axios.get(`/api/bitcoin-price?days=${days}`);
  return response.data;
};

const PriceChart: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('7D');

  // Use React Query's useQuery hook
  const { data, isLoading, error } = useQuery({
    queryKey: ['bitcoinPrice', timeFrame],
    queryFn: () => fetchChartData(timeFrame),
    // onSuccess: (data: any) => {
    //   // Log API call to the database (you'll need to implement this)
    //   console.log(data);
    // },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getDateFormat = (tf: TimeFrame) => {
    switch(tf) {
      case '1D':
        return 'HH:mm';
      case '7D':
        return 'dd MMM HH:mm';
      case '30D':
        return 'dd MMM';
      case '365D':
        return 'MMM yyyy';
      default:
        return 'dd MMM yyyy';
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 8,
        },
      },
    },
  };

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error fetching data</div>;

  // Process the data for the chart
  const chartData = data ? {
    labels: data.prices.map((item: number[]) => 
      format(new Date(item[0]), getDateFormat(timeFrame))
    ),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.prices.map((item: number[]) => item[1]),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  } : null;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {Object.keys(timeFrames).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeFrame(tf as TimeFrame)}
            style={{ 
              fontWeight: timeFrame === tf ? 'bold' : 'normal',
              margin: '0 10px',
              padding: '5px 10px',
            }}
          >
            {tf}
          </button>
        ))}
      </div>
      <div style={{ width: '600px', height: '400px' }}>
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
};

// Function to log API calls (implement this to log to your database)
// const logApiCall = async (endpoint: string, data: any) => {
//   try {
//     await axios.post('/api/log', { endpoint, data });
//   } catch (error) {
//     console.error('Error logging API call:', error);
//   }
// };

export default PriceChart;