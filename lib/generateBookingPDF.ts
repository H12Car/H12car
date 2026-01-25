import { jsPDF } from "jspdf";

interface BookingPDFData {
  serviceType: "car" | "moto" | "excursion" | null;
  selectedCar: {
    name: string;
    price: string;
    period: string;
  } | null;
  selectedExcursions: {
    name: string;
    price: string;
    duration: string;
  }[];
  bookingDetails: {
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    pickupLocation: string;
    pickupZone: string;
    dropoffLocation: string;
    deliveryCity: string;
    wantsDriver: boolean;
    numberOfPeople: number;
    zoneName: string;
    rentalDays: number;
  };
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
    notes: string;
  };
  totalPrice: number;
}

// Format date to French
function formatDateFR(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateBookingPDF(data: BookingPDFData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const primaryBlue = "#2563EB";
  const darkGray = "#1F2937";
  const mediumGray = "#6B7280";
  const lightGray = "#F3F4F6";

  // Helper function to draw a rounded rectangle
  const drawRoundedRect = (
    x: number,
    yPos: number,
    w: number,
    h: number,
    r: number,
    fillColor: string
  ) => {
    doc.setFillColor(fillColor);
    doc.roundedRect(x, yPos, w, h, r, r, "F");
  };

  // ========== HEADER ==========
  // Blue header background
  drawRoundedRect(margin, y, contentWidth, 35, 4, primaryBlue);

  // Logo text (H12)
  doc.setTextColor("#FFFFFF");
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("H12", margin + 10, y + 15);

  // Subtitle
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Location de Voitures & Motos - Marrakech", margin + 10, y + 23);

  // Service type badge
  const serviceLabels: Record<string, string> = {
    car: "LOCATION VOITURE",
    moto: "LOCATION MOTO",
    excursion: "EXCURSION",
  };
  const serviceLabel = serviceLabels[data.serviceType || "car"] || "RESERVATION";

  doc.setFillColor("#FFFFFF");
  const badgeWidth = doc.getTextWidth(serviceLabel) + 16;
  doc.roundedRect(pageWidth - margin - badgeWidth - 10, y + 8, badgeWidth, 10, 2, 2, "F");
  doc.setTextColor(primaryBlue);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(serviceLabel, pageWidth - margin - badgeWidth - 10 + 8, y + 14.5);

  y += 45;

  // ========== TITLE ==========
  doc.setTextColor(darkGray);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Demande de Reservation", margin, y);
  y += 8;

  // Date of request
  doc.setFontSize(10);
  doc.setTextColor(mediumGray);
  doc.setFont("helvetica", "normal");
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Generee le ${today}`, margin, y);
  y += 15;

  // ========== CLIENT INFO SECTION ==========
  drawRoundedRect(margin, y, contentWidth, 32, 3, lightGray);

  doc.setTextColor(darkGray);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Informations Client", margin + 8, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(mediumGray);

  // Client details in two columns
  const col1X = margin + 8;
  const col2X = margin + contentWidth / 2;

  doc.text(`Nom: `, col1X, y + 16);
  doc.setTextColor(darkGray);
  doc.text(data.contactInfo.fullName, col1X + 15, y + 16);

  doc.setTextColor(mediumGray);
  doc.text(`Tel: `, col2X, y + 16);
  doc.setTextColor(darkGray);
  doc.text(data.contactInfo.phone, col2X + 12, y + 16);

  if (data.contactInfo.email) {
    doc.setTextColor(mediumGray);
    doc.text(`Email: `, col1X, y + 24);
    doc.setTextColor(darkGray);
    doc.text(data.contactInfo.email, col1X + 18, y + 24);
  }

  y += 42;

  // ========== VEHICLE SECTION (if applicable) ==========
  if (data.selectedCar) {
    drawRoundedRect(margin, y, contentWidth, 38, 3, "#EFF6FF");

    doc.setTextColor(primaryBlue);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(data.serviceType === "moto" ? "Moto Selectionnee" : "Vehicule Selectionne", margin + 8, y + 8);

    doc.setTextColor(darkGray);
    doc.setFontSize(14);
    doc.text(data.selectedCar.name, margin + 8, y + 18);

    doc.setFontSize(10);
    doc.setTextColor(mediumGray);

    if (data.selectedCar.period === "trajet") {
      doc.text(`${data.selectedCar.price} DH par trajet`, margin + 8, y + 26);
    } else {
      const days = data.bookingDetails.rentalDays;
      const subtotal = parseInt(data.selectedCar.price) * days;
      doc.text(
        `${data.selectedCar.price} DH/jour x ${days} jour${days > 1 ? "s" : ""} = `,
        margin + 8,
        y + 26
      );
      doc.setTextColor(primaryBlue);
      doc.setFont("helvetica", "bold");
      doc.text(`${subtotal} DH`, margin + 8 + doc.getTextWidth(`${data.selectedCar.price} DH/jour x ${days} jour${days > 1 ? "s" : ""} = `), y + 26);
    }

    y += 48;
  }

  // ========== EXCURSIONS SECTION (if applicable) ==========
  if (data.selectedExcursions.length > 0) {
    const excursionHeight = 12 + data.selectedExcursions.length * 12;
    drawRoundedRect(margin, y, contentWidth, excursionHeight, 3, "#FEF3C7");

    doc.setTextColor("#D97706");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Excursions Selectionnees", margin + 8, y + 8);

    let excY = y + 16;
    data.selectedExcursions.forEach((exc) => {
      const excTotal = parseInt(exc.price) * data.bookingDetails.numberOfPeople;
      doc.setTextColor(darkGray);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`• ${exc.name}`, margin + 8, excY);
      doc.setTextColor(mediumGray);
      doc.text(
        `${exc.price} DH x ${data.bookingDetails.numberOfPeople} pers = ${excTotal} DH`,
        margin + contentWidth - 60,
        excY
      );
      excY += 10;
    });

    y += excursionHeight + 10;
  }

  // ========== BOOKING DETAILS SECTION ==========
  drawRoundedRect(margin, y, contentWidth, 55, 3, lightGray);

  doc.setTextColor(darkGray);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Details de la Reservation", margin + 8, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const detailY = y + 18;
  const labelWidth = 45;

  // Date & Time
  doc.setTextColor(mediumGray);
  doc.text("Date:", margin + 8, detailY);
  doc.setTextColor(darkGray);
  let dateText = formatDateFR(data.bookingDetails.pickupDate);
  if (data.bookingDetails.pickupTime) {
    dateText += ` a ${data.bookingDetails.pickupTime}`;
  }
  doc.text(dateText, margin + 8 + labelWidth, detailY);

  // Return date (if applicable)
  if (data.bookingDetails.returnDate && data.selectedCar?.period !== "trajet") {
    doc.setTextColor(mediumGray);
    doc.text("Retour:", margin + 8, detailY + 8);
    doc.setTextColor(darkGray);
    doc.text(formatDateFR(data.bookingDetails.returnDate), margin + 8 + labelWidth, detailY + 8);

    doc.setTextColor(mediumGray);
    doc.text("Duree:", margin + 8, detailY + 16);
    doc.setTextColor(primaryBlue);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${data.bookingDetails.rentalDays} jour${data.bookingDetails.rentalDays > 1 ? "s" : ""}`,
      margin + 8 + labelWidth,
      detailY + 16
    );
    doc.setFont("helvetica", "normal");
  }

  // Location info
  let locationY = detailY + 24;
  if (data.selectedCar?.period === "trajet") {
    doc.setTextColor(mediumGray);
    doc.text("Depart:", margin + 8, locationY);
    doc.setTextColor(darkGray);
    doc.text(data.bookingDetails.pickupLocation || "-", margin + 8 + labelWidth, locationY);

    doc.setTextColor(mediumGray);
    doc.text("Destination:", margin + 8, locationY + 8);
    doc.setTextColor(darkGray);
    doc.text(data.bookingDetails.dropoffLocation || "-", margin + 8 + labelWidth, locationY + 8);
    locationY += 16;
  } else if (data.serviceType === "excursion" && !data.selectedCar) {
    // Excursion-only: show pickup location (Marrakech)
    doc.setTextColor(mediumGray);
    doc.text("Lieu:", margin + 8, locationY);
    doc.setTextColor(darkGray);
    doc.text(`${data.bookingDetails.pickupLocation} (Marrakech)`, margin + 8 + labelWidth, locationY);
    locationY += 8;
  } else {
    // Car/Moto rental: show delivery info
    doc.setTextColor(mediumGray);
    doc.text("Livraison:", margin + 8, locationY);
    doc.setTextColor(darkGray);
    const cityText = data.bookingDetails.deliveryCity === "marrakech"
      ? `${data.bookingDetails.zoneName || "Marrakech"} (Gratuit)`
      : `${data.bookingDetails.zoneName || data.bookingDetails.deliveryCity} (Frais supp.)`;
    doc.text(cityText, margin + 8 + labelWidth, locationY);
    locationY += 8;

    // Show address if specified
    if (data.bookingDetails.pickupLocation && (
      data.bookingDetails.pickupZone === "autre_marrakech" ||
      data.bookingDetails.pickupZone === "hors_marrakech"
    )) {
      doc.setTextColor(mediumGray);
      doc.text("Adresse:", margin + 8, locationY);
      doc.setTextColor(darkGray);
      doc.text(data.bookingDetails.pickupLocation.substring(0, 40), margin + 8 + labelWidth, locationY);
      locationY += 8;
    }

    // Show driver option if selected
    if (data.bookingDetails.wantsDriver) {
      doc.setTextColor(primaryBlue);
      doc.setFont("helvetica", "bold");
      doc.text("Chauffeur:", margin + 8, locationY);
      doc.text("Oui", margin + 8 + labelWidth, locationY);
      doc.setFont("helvetica", "normal");
      locationY += 8;
    }
  }

  // Number of people
  doc.setTextColor(mediumGray);
  doc.text("Personnes:", margin + 8, locationY);
  doc.setTextColor(darkGray);
  doc.text(String(data.bookingDetails.numberOfPeople), margin + 8 + labelWidth, locationY);

  y += 65;

  // ========== NOTES SECTION (if applicable) ==========
  if (data.contactInfo.notes) {
    const notesHeight = 20 + Math.ceil(data.contactInfo.notes.length / 60) * 5;
    drawRoundedRect(margin, y, contentWidth, notesHeight, 3, "#FEF2F2");

    doc.setTextColor("#DC2626");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Notes", margin + 8, y + 8);

    doc.setTextColor(darkGray);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(data.contactInfo.notes, contentWidth - 16);
    doc.text(splitNotes, margin + 8, y + 16);

    y += notesHeight + 10;
  }

  // ========== TOTAL SECTION ==========
  drawRoundedRect(margin, y, contentWidth, 25, 3, primaryBlue);

  doc.setTextColor("#FFFFFF");
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("TOTAL ESTIME", margin + 10, y + 10);

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.totalPrice} DH`, pageWidth - margin - 10 - doc.getTextWidth(`${data.totalPrice} DH`), y + 17);

  y += 35;

  // ========== FOOTER ==========
  doc.setTextColor(mediumGray);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Ce document est une demande de reservation et ne constitue pas une confirmation.", margin, y);
  doc.text("Notre equipe vous contactera pour finaliser votre reservation.", margin, y + 5);

  y += 15;

  // Contact info footer
  doc.setTextColor(darkGray);
  doc.setFontSize(9);
  doc.text("H12 Location - Marrakech", margin, y);
  doc.text("Tel: +212 614 968 594", margin, y + 5);
  doc.text("www.h12.ma", margin, y + 10);

  return doc;
}

// Share PDF via Web Share API (works on mobile)
export async function shareBookingPDF(data: BookingPDFData): Promise<boolean> {
  const doc = generateBookingPDF(data);
  const pdfBlob = doc.output("blob");
  const fileName = `H12_Reservation_${data.contactInfo.fullName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
  const file = new File([pdfBlob], fileName, { type: "application/pdf" });

  // Check if Web Share API with files is supported
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Reservation H12",
        text: `Demande de reservation H12 - ${data.contactInfo.fullName}`,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      console.log("Share cancelled or failed:", error);
      return false;
    }
  }

  return false;
}

// Download PDF (fallback for desktop)
export function downloadBookingPDF(data: BookingPDFData): void {
  const doc = generateBookingPDF(data);
  const fileName = `H12_Reservation_${data.contactInfo.fullName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}

// Check if sharing is supported
export function canShareFiles(): boolean {
  if (typeof navigator === "undefined") return false;
  if (!navigator.canShare) return false;

  // Create a test file to check
  const testFile = new File(["test"], "test.pdf", { type: "application/pdf" });
  return navigator.canShare({ files: [testFile] });
}
