import { NextRequest, NextResponse } from "next/server";

// Email HTML template
function generateEmailHTML(data: {
  serviceType: string;
  selectedCar: { name: string; price: string; period: string } | null;
  selectedExcursions: { name: string; price: string; duration: string }[];
  bookingDetails: {
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    pickupLocation: string;
    pickupZone: string;
    dropoffLocation: string;
    numberOfPeople: number;
    pickupDateFormatted: string;
    pickupTimeFormatted: string | null;
    returnDateFormatted: string | null;
    rentalDays: number;
    zoneName: string;
  };
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
    notes: string;
  };
  totalPrice: number;
}) {
  const { serviceType, selectedCar, selectedExcursions, bookingDetails, contactInfo, totalPrice } = data;

  const serviceTypeLabel = {
    car: "Location Voiture",
    moto: "Location Moto",
    excursion: "Excursion",
  }[serviceType || "car"] || "Réservation";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle Réservation H12</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0; opacity: 0.9; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
    .info-label { color: #6b7280; }
    .info-value { color: #111827; font-weight: 500; }
    .highlight-box { background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); border-radius: 12px; padding: 20px; margin: 24px 0; }
    .total-row { display: flex; justify-content: space-between; align-items: center; }
    .total-label { font-size: 18px; color: #374151; }
    .total-value { font-size: 28px; font-weight: 700; color: #1e3a8a; }
    .footer { background-color: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 14px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-blue { background-color: #dbeafe; color: #1e40af; }
    .badge-green { background-color: #d1fae5; color: #065f46; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>H12 - Nouvelle Réservation</h1>
      <p>${serviceTypeLabel}</p>
    </div>

    <div class="content">
      <!-- Client Info -->
      <div class="section">
        <div class="section-title">Informations Client</div>
        <div class="info-row">
          <span class="info-label">Nom</span>
          <span class="info-value">${contactInfo.fullName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value">${contactInfo.phone}</span>
        </div>
        ${contactInfo.email ? `
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${contactInfo.email}</span>
        </div>
        ` : ''}
      </div>

      <!-- Vehicle -->
      ${selectedCar ? `
      <div class="section">
        <div class="section-title">Véhicule</div>
        <div class="info-row">
          <span class="info-label">Modèle</span>
          <span class="info-value">${selectedCar.name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tarif</span>
          <span class="info-value">${selectedCar.price} DH / ${selectedCar.period}</span>
        </div>
        ${selectedCar.period !== 'trajet' ? `
        <div class="info-row">
          <span class="info-label">Durée</span>
          <span class="info-value">${bookingDetails.rentalDays} jour${bookingDetails.rentalDays > 1 ? 's' : ''}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Sous-total</span>
          <span class="info-value">${parseInt(selectedCar.price) * bookingDetails.rentalDays} DH</span>
        </div>
        ` : ''}
      </div>
      ` : ''}

      <!-- Excursions -->
      ${selectedExcursions.length > 0 ? `
      <div class="section">
        <div class="section-title">Excursions</div>
        ${selectedExcursions.map(exc => `
        <div class="info-row">
          <span class="info-label">${exc.name} (${exc.duration})</span>
          <span class="info-value">${exc.price} DH x ${bookingDetails.numberOfPeople} pers</span>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Booking Details -->
      <div class="section">
        <div class="section-title">Détails Réservation</div>
        <div class="info-row">
          <span class="info-label">Date</span>
          <span class="info-value">${bookingDetails.pickupDateFormatted}${bookingDetails.pickupTimeFormatted ? ` à ${bookingDetails.pickupTimeFormatted}` : ''}</span>
        </div>
        ${bookingDetails.returnDateFormatted ? `
        <div class="info-row">
          <span class="info-label">Retour</span>
          <span class="info-value">${bookingDetails.returnDateFormatted}</span>
        </div>
        ` : ''}
        ${selectedCar?.period === 'trajet' ? `
        <div class="info-row">
          <span class="info-label">Départ</span>
          <span class="info-value">${bookingDetails.pickupLocation}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Destination</span>
          <span class="info-value">${bookingDetails.dropoffLocation}</span>
        </div>
        ` : `
        <div class="info-row">
          <span class="info-label">Zone livraison</span>
          <span class="info-value">${bookingDetails.zoneName}</span>
        </div>
        `}
        <div class="info-row">
          <span class="info-label">Personnes</span>
          <span class="info-value">${bookingDetails.numberOfPeople}</span>
        </div>
      </div>

      <!-- Notes -->
      ${contactInfo.notes ? `
      <div class="section">
        <div class="section-title">Notes</div>
        <p style="color: #374151; margin: 0;">${contactInfo.notes}</p>
      </div>
      ` : ''}

      <!-- Total -->
      <div class="highlight-box">
        <div class="total-row">
          <span class="total-label">Total Estimé</span>
          <span class="total-value">${totalPrice} DH</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>H12 Location - Marrakech</p>
      <p>Ce message a été généré automatiquement</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.BOOKING_EMAIL || "contact@h12.ma";

    if (!resendApiKey) {
      // For development/testing: log the booking and return success
      console.log("=== NEW BOOKING RECEIVED ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("============================");

      // In production, you would want to return an error here
      // For now, we'll simulate success so the UI works
      return NextResponse.json({
        success: true,
        message: "Booking received (email not configured - check console)"
      });
    }

    // Send email via Resend
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const emailHtml = generateEmailHTML(data);

    const { error } = await resend.emails.send({
      from: "H12 Réservations <reservations@h12.ma>",
      to: [toEmail],
      subject: `Nouvelle réservation - ${data.contactInfo.fullName}`,
      html: emailHtml,
      replyTo: data.contactInfo.email || undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Booking email sent" });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
