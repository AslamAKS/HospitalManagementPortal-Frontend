"use client"

import React, { createContext, useState } from "react";

export const CreateBookingContext = createContext();

function NewBookingContextProvider({ children }) {
  const [bookingpage, setBookingPage] = useState(false);

  return (
    <CreateBookingContext.Provider value={{ bookingpage, setBookingPage }}>
      {children}
    </CreateBookingContext.Provider>
  );
}

export default NewBookingContextProvider;
