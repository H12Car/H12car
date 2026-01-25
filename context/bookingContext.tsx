"use client";

import { createContext, useContext, useState, useCallback } from "react";

// Types
export interface Car {
  id: number;
  name: string;
  price: string;
  period: string;
  image: string;
  category?: string;
}

export interface Excursion {
  id: number;
  name: string;
  price: string;
  period: string;
  duration: string;
  image: string;
}

export interface BookingDetails {
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  pickupLocation: string;
  pickupZone: string;
  dropoffLocation: string;
  deliveryCity: string; // "marrakech" or other city name
  wantsDriver: boolean; // If user wants a chauffeur
  numberOfPeople: number;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export type ServiceType = "car" | "excursion" | "moto" | null;
export type WizardStep = 1 | 2 | 3 | 4;

interface BookingContextType {
  // Wizard state
  isWizardOpen: boolean;
  currentStep: WizardStep;
  serviceType: ServiceType;

  // Selected items
  selectedCar: Car | null;
  selectedExcursions: Excursion[];

  // Booking details
  bookingDetails: BookingDetails;
  contactInfo: ContactInfo;

  // Actions
  openWizard: (type: ServiceType, item?: Car | Excursion) => void;
  closeWizard: () => void;
  resetWizard: () => void;

  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: WizardStep) => void;

  // Item selection
  selectCar: (car: Car) => void;
  addExcursion: (excursion: Excursion) => void;
  removeExcursion: (excursionId: number) => void;
  toggleExcursion: (excursion: Excursion) => void;

  // Details update
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;

  // Computed
  getTotalPrice: () => number;
  getRentalDays: () => number;
  isExcursionSelected: (excursionId: number) => boolean;
}

const defaultBookingDetails: BookingDetails = {
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  pickupLocation: "",
  pickupZone: "",
  dropoffLocation: "",
  deliveryCity: "marrakech",
  wantsDriver: false,
  numberOfPeople: 1,
};

const defaultContactInfo: ContactInfo = {
  fullName: "",
  phone: "",
  email: "",
  notes: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedExcursions, setSelectedExcursions] = useState<Excursion[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);

  // Reset all state
  const resetWizard = useCallback(() => {
    setCurrentStep(1);
    setServiceType(null);
    setSelectedCar(null);
    setSelectedExcursions([]);
    setBookingDetails(defaultBookingDetails);
    setContactInfo(defaultContactInfo);
  }, []);

  // Open wizard with initial item
  const openWizard = useCallback((type: ServiceType, item?: Car | Excursion) => {
    resetWizard();
    setServiceType(type);

    if ((type === "car" || type === "moto") && item) {
      setSelectedCar(item as Car);
    } else if (type === "excursion" && item) {
      setSelectedExcursions([item as Excursion]);
    }

    setIsWizardOpen(true);
  }, [resetWizard]);

  // Close wizard
  const closeWizard = useCallback(() => {
    setIsWizardOpen(false);
  }, []);

  // Navigation
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4) as WizardStep);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as WizardStep);
  }, []);

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  // Item selection
  const selectCar = useCallback((car: Car) => {
    setSelectedCar(car);
    // Only set serviceType if not already in a booking flow (cross-sell scenario)
    if (!serviceType) {
      setServiceType("car");
    }
  }, [serviceType]);

  const addExcursion = useCallback((excursion: Excursion) => {
    setSelectedExcursions((prev) => {
      if (prev.some((e) => e.id === excursion.id)) {
        return prev;
      }
      return [...prev, excursion];
    });
  }, []);

  const removeExcursion = useCallback((excursionId: number) => {
    setSelectedExcursions((prev) => prev.filter((e) => e.id !== excursionId));
  }, []);

  const toggleExcursion = useCallback((excursion: Excursion) => {
    setSelectedExcursions((prev) => {
      if (prev.some((e) => e.id === excursion.id)) {
        return prev.filter((e) => e.id !== excursion.id);
      }
      return [...prev, excursion];
    });
  }, []);

  const isExcursionSelected = useCallback((excursionId: number) => {
    return selectedExcursions.some((e) => e.id === excursionId);
  }, [selectedExcursions]);

  // Details update
  const updateBookingDetails = useCallback((details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  }, []);

  const updateContactInfo = useCallback((info: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...info }));
  }, []);

  // Helper to calculate number of rental days
  const calculateRentalDays = useCallback(() => {
    if (!bookingDetails.pickupDate || !bookingDetails.returnDate) {
      return 1; // Default to 1 day if dates not set
    }
    const pickup = new Date(bookingDetails.pickupDate);
    const returnD = new Date(bookingDetails.returnDate);
    const diffTime = returnD.getTime() - pickup.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1; // Minimum 1 day
  }, [bookingDetails.pickupDate, bookingDetails.returnDate]);

  // Computed values
  const getTotalPrice = useCallback(() => {
    let total = 0;

    if (selectedCar) {
      const dailyRate = parseInt(selectedCar.price) || 0;
      // For transport (per trip), don't multiply by days
      if (selectedCar.period === "trajet") {
        total += dailyRate;
      } else {
        // For cars/motos (per day), multiply by number of days
        const days = calculateRentalDays();
        total += dailyRate * days;
      }
    }

    // Excursions are per person
    selectedExcursions.forEach((excursion) => {
      total += (parseInt(excursion.price) || 0) * bookingDetails.numberOfPeople;
    });

    return total;
  }, [selectedCar, selectedExcursions, bookingDetails.numberOfPeople, calculateRentalDays]);

  return (
    <BookingContext.Provider
      value={{
        isWizardOpen,
        currentStep,
        serviceType,
        selectedCar,
        selectedExcursions,
        bookingDetails,
        contactInfo,
        openWizard,
        closeWizard,
        resetWizard,
        nextStep,
        prevStep,
        goToStep,
        selectCar,
        addExcursion,
        removeExcursion,
        toggleExcursion,
        updateBookingDetails,
        updateContactInfo,
        getTotalPrice,
        getRentalDays: calculateRentalDays,
        isExcursionSelected,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
