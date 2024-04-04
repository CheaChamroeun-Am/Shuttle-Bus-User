import { revalidatePath } from 'next/cache';
import {
  ForgetPasswordProps,
  LoginRequestProps,
  cancelTicketProps,
  userInfoProps
} from './api.types';
import { LoginAsVkClubProps, availableBus, bookingProps } from '@/lib/types';
import { getCookie } from 'cookies-next';

export const login = async (props: LoginRequestProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/user/login/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  });
  return res;
};

export const forgetPassword = async (props: ForgetPasswordProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/user/request/reset-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  );
  return res;
};

export const bookingTicket = async (props: userInfoProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/booking/user/filter?userId=` + props.id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      next: {
        revalidate: 0
      }
    }
  );
  const data = await res.json();
  return data;
};

export const waitingTicket = async (props: userInfoProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/waiting/user/filter?userId=` + props.id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      next: {
        revalidate: 0
      }
    }
  );
  const data = await res.json();
  return data;
};

export const cancelTicket = async (props: cancelTicketProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/booking/cancel/` + props.ticketId,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.userToken
      }
    }
  );

  return res;
};

export const historyTicket = async (props: userInfoProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/booking/history/user/filter?userId=` +
      props.id,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      next: {
        revalidate: 1
      }
    }
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};

export const userInfo = async (props: userInfoProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/user/` + props.id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token
    },
    next: {
      revalidate: 0
    }
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};

export const loginAsVkClubUser = async (props: LoginAsVkClubProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/user/login/vkclub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  });
  return res;
};

export const schedule = async (props: userInfoProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/schedule/enableStatus/filter?enable=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      next: {
        revalidate: 0
      }
    }
  );
  const data = await res.json();

  return data;
};

export const getScheduleByDate = async (props: availableBus) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/schedule/date/filter?date=` + props.date,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      next: {
        revalidate: 0
      }
    }
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();

  return data;
};

export const booking = async (props: bookingProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token
    },
    body: JSON.stringify({
      scheduleId: props.scheduleId,
      userId: props.userId,
      payStatus: props.payStatus
    })
  });
  return res;
};
