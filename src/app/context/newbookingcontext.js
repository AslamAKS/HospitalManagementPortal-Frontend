"use client";

import React, { createContext, useState } from "react";

export const CreateBookingContext = createContext();

function NewBookingContextProvider({ children }) {
  const [bookingpage, setBookingPage] = useState(false);
  const [addMedicine, setAddMedicine] = useState(false);
  const [prescriptionPage, setPrescriptionPage] = useState(false);
  const [refreshBooking, setRefreshBooking] = useState(false);
  const [refreshMedicine, setRefreshMedicine] = useState(false);

  return (
    <CreateBookingContext.Provider
      value={{
        bookingpage,
        setBookingPage,
        refreshBooking,
        setRefreshBooking,
        prescriptionPage,
        setPrescriptionPage,
        addMedicine,
        setAddMedicine,
        refreshMedicine,
        setRefreshMedicine,
      }}
    >
      {children}
    </CreateBookingContext.Provider>
  );
}

export default NewBookingContextProvider;
