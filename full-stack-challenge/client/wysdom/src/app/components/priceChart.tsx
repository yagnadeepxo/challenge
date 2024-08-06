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

interface PriceChartProps {
  cryptoId: string; // Add a prop for the cryptocurrency ID
}

const fetchChartData = async (cryptoId: string, timeFrame: TimeFrame) => {
  const { days } = timeFrames[timeFrame];
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}&precision=2`)
  return response.data;
};

const PriceChart: React.FC<PriceChartProps> = ({ cryptoId }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('7D');

  const { data, isLoading, error } = useQuery({
    queryKey: ['cryptoPrice', cryptoId, timeFrame],
    queryFn: () => fetchChartData(cryptoId, timeFrame),
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

export default PriceChart;