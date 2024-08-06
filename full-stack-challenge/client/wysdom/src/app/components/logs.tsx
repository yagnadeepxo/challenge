import React from 'react';
import { useFetchLog } from '../hooks/useFetchLog';

const Logs = () => {
  const { data, isLoading, isError } = useFetchLog();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching logs</div>;
  }

  return (
    <div>
      <h2>Logs</h2>
      <ul>
        {data?.map((log) => (
          <li key={log.id}>
            <p>Method: {log.method}</p>
            <p>Endpoint: {log.endpoint}</p>
            <p>Data: {JSON.stringify(log.data)}</p>
            <p>Created At: {log.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;