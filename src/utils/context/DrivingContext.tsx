"use client";
import React, { createContext, useMemo, useState } from "react";
import { createUseContext } from "./utils/createUseContext";
interface DrivingContextType {
  cguState: boolean | null;
  setCguChange: (condition: boolean | null) => void;
  newEvent: boolean | null;
  setNewEventChange: (condition: boolean | null) => void;
  locationState: boolean | null;
  setLocationState: (condition: boolean | null) => void;
  hasPermit: boolean | null;
  setHasPermit: (value: boolean | null) => void;
  supervisedDriving: boolean | null;
  setSupervisedDriving: (value: boolean | null) => void;
  isAccompanist: boolean | null;
  setIsAccompanist: (condition: boolean | null) => void;
}
const DrivingContext = createContext<DrivingContextType | undefined>(undefined);
const DrivingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locationState, setLocationState] = useState<boolean | null>(null);
  const [hasPermit, setHasPermit] = useState<boolean | null>(null);
  const [supervisedDriving, setSupervisedDriving] = useState<boolean | null>(
    null,
  );
  const [isAccompanist, setIsAccompanist] = useState<boolean | null>(null);
  const [cguState, setCguChange] = useState<boolean | null>(null);
  const [newEvent, setNewEventChange] = useState<boolean | null>(null);
  const contextValue: DrivingContextType = useMemo(
    () => ({
      cguState,
      setCguChange,
      newEvent,
      setNewEventChange,
      isAccompanist,
      setIsAccompanist,
      locationState,
      setLocationState,
      hasPermit,
      setHasPermit,
      supervisedDriving,
      setSupervisedDriving,
    }),
    [
      cguState,
      setCguChange,
      newEvent,
      setNewEventChange,
      isAccompanist,
      setIsAccompanist,
      hasPermit,
      supervisedDriving,
      setHasPermit,
      setSupervisedDriving,
      locationState,
      setLocationState,
    ],
  );
  return (
    <DrivingContext.Provider value={contextValue}>
      {children}
    </DrivingContext.Provider>
  );
};
export default DrivingProvider;
export const useDriving = createUseContext(DrivingContext, "useDriving");
