import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESERVATION_EMAIL_KEY
  ? new Resend(process.env.RESERVATION_EMAIL_KEY)
  : null;

// Escape HTML special characters to prevent injection in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      serviceType,
      selectedCar,
      selectedExcursions,
      bookingDetails,
      contactInfo,
      totalPrice,
    } = body;

    // Format date
    const formatDate = (dateStr: string) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    // Construire le HTML de l'email
    let emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .section-title { color: #667eea; font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .info-label { font-weight: bold; color: #666; }
            .info-value { color: #333; }
            .total { background: #667eea; color: white; padding: 20px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; margin-top: 20px; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .badge-success { background: #10b981; color: white; }
            .badge-warning { background: #f59e0b; color: white; }
            .badge-info { background: #3b82f6; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🚗 Nouvelle Réservation H12</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Demande reçue le ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div class="content">
    `;

    // Service Type
    if (serviceType === "moto") {
      emailHtml += `<div class="section"><div class="section-title">🏍️ LOCATION MOTO</div>`;
    } else if (serviceType === "car") {
      emailHtml += `<div class="section"><div class="section-title">🚘 LOCATION VÉHICULE</div>`;
    } else if (serviceType === "excursion") {
      emailHtml += `<div class="section"><div class="section-title">🏔️ RÉSERVATION EXCURSION</div>`;
    }

    // Véhicule sélectionné
    if (selectedCar) {
      const days = bookingDetails.rentalDays || 1;
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Véhicule</span>
          <span class="info-value"><strong>${selectedCar.name}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Tarif</span>
          <span class="info-value">${selectedCar.price} DH / ${selectedCar.period}</span>
        </div>
      `;
      if (selectedCar.period !== "trajet") {
        emailHtml += `
          <div class="info-row">
            <span class="info-label">Durée</span>
            <span class="info-value">${days} jour${days > 1 ? 's' : ''}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Sous-total véhicule</span>
            <span class="info-value"><strong>${parseInt(selectedCar.price) * days} DH</strong></span>
          </div>
        `;
      }
    }
    emailHtml += `</div>`;

    // Excursions
    if (selectedExcursions && selectedExcursions.length > 0) {
      emailHtml += `<div class="section"><div class="section-title">🎯 Excursions sélectionnées</div>`;
      selectedExcursions.forEach((exc: { name: string; price: string }) => {
        const excTotal = parseInt(exc.price) * (bookingDetails.numberOfPeople || 1);
        emailHtml += `
          <div class="info-row">
            <span class="info-label">${exc.name}</span>
            <span class="info-value">${exc.price} DH × ${bookingDetails.numberOfPeople} pers = <strong>${excTotal} DH</strong></span>
          </div>
        `;
      });
      emailHtml += `</div>`;
    }

    // Détails de la réservation
    emailHtml += `<div class="section"><div class="section-title">📅 Détails de la réservation</div>`;
    
    emailHtml += `
      <div class="info-row">
        <span class="info-label">Date</span>
        <span class="info-value">${formatDate(bookingDetails.pickupDate)}${bookingDetails.pickupTime ? ` à ${bookingDetails.pickupTime}` : ''}</span>
      </div>
    `;

    if (bookingDetails.returnDate && selectedCar?.period !== "trajet") {
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Date de retour</span>
          <span class="info-value">${formatDate(bookingDetails.returnDate)}</span>
        </div>
      `;
    }

    // Localisation
    if (selectedCar?.period === "trajet") {
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Départ</span>
          <span class="info-value">${escapeHtml(bookingDetails.pickupLocation || '-')}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Destination</span>
          <span class="info-value">${escapeHtml(bookingDetails.dropoffLocation || '-')}</span>
        </div>
      `;
    } else if (serviceType === "excursion" && !selectedCar) {
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Lieu de prise en charge</span>
          <span class="info-value">${escapeHtml(bookingDetails.pickupLocation || '')} <span class="badge badge-info">Marrakech</span></span>
        </div>
      `;
    } else {
      // Car/Moto rental
      if (bookingDetails.deliveryCity === "marrakech") {
        emailHtml += `
          <div class="info-row">
            <span class="info-label">Ville</span>
            <span class="info-value">Marrakech</span>
          </div>
          <div class="info-row">
            <span class="info-label">Zone</span>
            <span class="info-value">${escapeHtml(bookingDetails.zoneName || bookingDetails.pickupZone || '')} <span class="badge badge-success">Livraison gratuite</span></span>
          </div>
        `;
        if (bookingDetails.pickupLocation && bookingDetails.pickupZone === "autre_marrakech") {
          emailHtml += `
            <div class="info-row">
              <span class="info-label">Adresse</span>
              <span class="info-value">${escapeHtml(bookingDetails.pickupLocation)}</span>
            </div>
          `;
        }
      } else {
        const cityName = escapeHtml(bookingDetails.deliveryCity || '');
        emailHtml += `
          <div class="info-row">
            <span class="info-label">Ville</span>
            <span class="info-value">${cityName} <span class="badge badge-warning">Frais de livraison</span></span>
          </div>
        `;
        if (bookingDetails.pickupLocation) {
          emailHtml += `
            <div class="info-row">
              <span class="info-label">Adresse</span>
              <span class="info-value">${escapeHtml(bookingDetails.pickupLocation)}</span>
            </div>
          `;
        }
      }

      if (bookingDetails.wantsDriver) {
        emailHtml += `
          <div class="info-row">
            <span class="info-label">Option chauffeur</span>
            <span class="info-value"><span class="badge badge-info">Avec chauffeur</span></span>
          </div>
        `;
      }
    }

    emailHtml += `
      <div class="info-row">
        <span class="info-label">Nombre de personnes</span>
        <span class="info-value">${bookingDetails.numberOfPeople || 1}</span>
      </div>
    </div>`;

    // Coordonnées client (escape user inputs)
    const safeName = escapeHtml(contactInfo.fullName || '');
    const safePhone = escapeHtml(contactInfo.phone || '');
    const safeEmail = contactInfo.email ? escapeHtml(contactInfo.email) : '';
    const safeNotes = contactInfo.notes ? escapeHtml(contactInfo.notes) : '';

    emailHtml += `
      <div class="section">
        <div class="section-title">👤 Coordonnées client</div>
        <div class="info-row">
          <span class="info-label">Nom</span>
          <span class="info-value"><strong>${safeName}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value">${safePhone}</span>
        </div>
    `;

    if (safeEmail) {
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${safeEmail}</span>
        </div>
      `;
    }

    if (safeNotes) {
      emailHtml += `
        <div class="info-row">
          <span class="info-label">Notes</span>
          <span class="info-value">${safeNotes}</span>
        </div>
      `;
    }
    
    emailHtml += `</div>`;

    // Total
    emailHtml += `
      <div class="total">
        💰 TOTAL ESTIMÉ: ${totalPrice} DH
      </div>
    `;

    emailHtml += `
            </div>
          </div>
        </body>
      </html>
    `;

    if (!resend) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Envoyer l'email
    const { data, error } = await resend.emails.send({
      from: 'H12 Réservations <onboarding@resend.dev>', // Remplacez par votre domaine vérifié
      to: ['digitalmaroc@idravision.com'], // Remplacez par votre email
      subject: `Nouvelle réservation - ${safeName}`,
      html: emailHtml,
      replyTo: contactInfo.email || undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}