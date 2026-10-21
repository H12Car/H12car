import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_CONTACT_KEY
  ? new Resend(process.env.RESEND_CONTACT_KEY)
  : null;

// Type pour les données du formulaire
interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Escape HTML special characters to prevent injection in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Fonction pour formater le sujet en français
function formatSubject(subject: string): string {
  const subjects: { [key: string]: string } = {
    car: 'Location de voiture',
    moto: 'Location de moto',
    excursion: 'Excursion',
    devis: 'Demande de devis',
    other: 'Autre'
  };
  return subjects[subject] || subject;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validation des champs requis
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    // Escape user inputs for safe HTML embedding
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : '';
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    // Envoyer l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: 'H12 Car Contact <onboarding@resend.dev>',
      to: ['K0664676267@gmail.com'],
      replyTo: email,
      subject: `[H12 Contact] ${formatSubject(subject)} - ${fullName}`,
      html: `
         <!DOCTYPE html>
         <html>
           <head>
             <meta charset="utf-8">
             <style>
               body {
                 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                 line-height: 1.6;
                 color: #333;
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
               }
               .header {
                 background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                 color: white;
                 padding: 30px;
                 border-radius: 10px 10px 0 0;
                 text-align: center;
               }
               .header h1 {
                 margin: 0;
                 font-size: 24px;
               }
               .content {
                 background: #f9fafb;
                 padding: 30px;
                 border: 1px solid #e5e7eb;
                 border-top: none;
               }
               .info-row {
                 margin-bottom: 20px;
                 padding-bottom: 20px;
                 border-bottom: 1px solid #e5e7eb;
               }
               .info-row:last-child {
                 border-bottom: none;
                 margin-bottom: 0;
                 padding-bottom: 0;
               }
               .label {
                 font-weight: 600;
                 color: #3b82f6;
                 margin-bottom: 5px;
                 font-size: 14px;
                 text-transform: uppercase;
                 letter-spacing: 0.5px;
               }
               .value {
                 color: #1f2937;
                 font-size: 16px;
               }
               .message-box {
                 background: white;
                 padding: 20px;
                 border-radius: 8px;
                 border-left: 4px solid #3b82f6;
                 margin-top: 10px;
               }
               .footer {
                 text-align: center;
                 margin-top: 30px;
                 padding-top: 20px;
                 border-top: 1px solid #e5e7eb;
                 color: #6b7280;
                 font-size: 12px;
               }
             </style>
           </head>
           <body>
             <div class="header">
               <h1>📩 Nouveau Message de Contact</h1>
             </div>
             <div class="content">
               <div class="info-row">
                 <div class="label">👤 Nom Complet</div>
                 <div class="value">${safeFullName}</div>
               </div>
              
               <div class="info-row">
                 <div class="label">📧 Email</div>
                 <div class="value"><a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a></div>
               </div>
              
               ${safePhone ? `
               <div class="info-row">
                 <div class="label">📱 Téléphone</div>
                 <div class="value"><a href="tel:${safePhone}" style="color: #3b82f6; text-decoration: none;">${safePhone}</a></div>
               </div>
               ` : ''}
              
               <div class="info-row">
                 <div class="label">🏷️ Sujet</div>
                 <div class="value">${formatSubject(subject)}</div>
               </div>
              
               <div class="info-row">
                 <div class="label">💬 Message</div>
                 <div class="message-box">${safeMessage}</div>
               </div>
             </div>
             <div class="footer">
               <p>Ce message a été envoyé via le formulaire de contact H12 Car</p>
               <p>Reçu le ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </body>
        </html>
      `,
    });

    // Vérifier s'il y a une erreur
    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}