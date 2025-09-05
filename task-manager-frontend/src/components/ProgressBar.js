import React from 'react';

export default function ProgressBar({ percent }) {
  return (
    <div style={{ border: '1px solid #000', width: '100%', margin: '10px 0' }}>
      <div style={{ width: `${percent}%`, backgroundColor: 'green', height: '20px' }}></div>
    </div>
  );
}
