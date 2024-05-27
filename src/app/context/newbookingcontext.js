"use client"

import React, { createContext, useState } from "react";

export const CreateBookingContext = createContext();

function NewBookingContextProvider({ children }) {
  const [bookingpage, setBookingPage] = useState(false);
  const [refreshBooking, setRefreshBooking] = useState(false);

  return (
    <CreateBookingContext.Provider value={{ bookingpage, setBookingPage,refreshBooking, setRefreshBooking }}>
      {children}
    </CreateBookingContext.Provider>
  );
}

export default NewBookingContextProvider;
