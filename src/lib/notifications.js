import { Resend } from "resend";

const templates = {
  es: {
    subject: (code) => `NODIEX — Actualizacion de su despacho ${code}`,
    body: (code, status, destination) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">NODIEX DEL PERU S.A.C.</h2>
        <p>Su despacho <strong>${code}</strong> ha sido actualizado.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Codigo:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${code}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Nuevo estado:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${status}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Destino:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${destination}</td></tr>
        </table>
        <p>Puede consultar el seguimiento completo en nuestra plataforma.</p>
        <p style="color: #718096; font-size: 0.875rem;">Este es un mensaje automatico, por favor no responda a este correo.</p>
      </div>
    `
  },
  en: {
    subject: (code) => `NODIEX — Shipment update ${code}`,
    body: (code, status, destination) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">NODIEX DEL PERU S.A.C.</h2>
        <p>Your shipment <strong>${code}</strong> has been updated.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Code:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${code}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>New status:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${status}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Destination:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${destination}</td></tr>
        </table>
        <p>You can check the full tracking information on our platform.</p>
        <p style="color: #718096; font-size: 0.875rem;">This is an automated message, please do not reply.</p>
      </div>
    `
  },
  pt: {
    subject: (code) => `NODIEX — Atualizacao do seu envio ${code}`,
    body: (code, status, destination) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a365d;">NODIEX DEL PERU S.A.C.</h2>
        <p>Seu envio <strong>${code}</strong> foi atualizado.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Codigo:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${code}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Novo estado:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${status}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>Destino:</strong></td><td style="padding: 8px; border: 1px solid #e2e8f0;">${destination}</td></tr>
        </table>
        <p>Voce pode consultar o rastreamento completo em nossa plataforma.</p>
        <p style="color: #718096; font-size: 0.875rem;">Esta e uma mensagem automatica, por favor nao responda.</p>
      </div>
    `
  }
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendTrackingUpdate(email, codigo, nuevoEstado, destino, idioma = "es") {
  const resend = getResendClient();
  if (!email || !resend) return null;

  const lang = templates[idioma] ? idioma : "es";
  const template = templates[lang];

  try {
    const result = await resend.emails.send({
      from: "NODIEX <noreply@nodiexdelperu.com>",
      to: [email],
      subject: template.subject(codigo),
      html: template.body(codigo, nuevoEstado, destino)
    });
    return { ok: true, id: result.data?.id };
  } catch (error) {
    console.error("Resend send error:", error);
    return { ok: false, error: error.message };
  }
}
