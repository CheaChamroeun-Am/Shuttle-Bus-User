import React from 'react';

const loading = () => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center h-[calc(100vh-100px)]'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='text-center'>
        <p>Please wait.</p>
        <p>It will just take a moment.</p>
      </div>
    </div>
  );
};

export default loading;
