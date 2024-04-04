'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginAsVkClubUser } from '@/services/api';
import { setCookie } from 'cookies-next';

export default function VkClubLogin() {
  const router = useRouter();
  const data = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    const handleLoginAsVkClub = async () => {
      const getEmail = data.get('email')?.trim().replace(/\s+/g, '+') || '';

      const res = await loginAsVkClubUser({ email: getEmail });

      console.log(res.status);
      if (res.status === 200) {
        const data = res.json().then((q) => {
          setCookie('token', q['data']['accessToken']);
          setCookie('id', q['data']['user_id']);
          router.replace('/booking');
        });
      } else if (res.status === 400) {
        router.replace('/auth/signIn');
      } else if (res.status === 500) {
        setErrorText('Internal Server Error');
      } else if (res.status === 404) {
        router.replace('/auth/signIn');
      } else {
        setErrorText('Email is required');
      }
      setIsLoading(false);
    };
    handleLoginAsVkClub();
  }, [data, router]);

  return isLoading ? (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'>
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
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <h4 className='text-primary'>{errorText}</h4>
    </div>
  );
}
