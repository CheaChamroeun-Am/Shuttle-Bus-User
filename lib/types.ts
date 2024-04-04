export interface userInfoProps {
  id: string | null;
  token: string | null;
}
export type userDataType = {
  id: string;
  email: string;
  phone: string | null;
  role: string;
  username: string;
  studentInfo: {
    id: string;
    batch: {
      batchNum: number;
      department: string;
      id: string;
    };
  };
  ticket: {
    id: string;
    remainTicket: number;
    ticketLimitInhand: number;
    updatedAt: string;
  };
};

export type ticket = {
  id: string;
  schedule: {
    bus: {
      driverName: string;
      modal: string;
      numOfSeat: number;
      driverContact: string;
      plateNumber: string;
    };
    date: string;
    departure: {
      departureTime: string;
      destination: {
        id: string;
        mainLocationName: string;
      };
      dropLocation: {
        id: string;
        subLocationName: string;
      };
      from: {
        id: string;
        mainLocationName: string;
      };
      pickupLocation: {
        id: string;
        subLocationName: string;
      };
    };
  };
};

export type LocationProps = {
  from: string;
  to: string;
};
export interface LoginAsVkClubProps {
  email: string;
}
export interface availableBus {
  token: string | null;
  date: string | null;
}

export interface bookingProps {
  scheduleId: string | undefined | null;
  userId: string | null;
  payStatus: boolean;
  token: string;
}
