// Código de país + número, sin "+", espacios ni guiones
export const WHATSAPP_NUMBER = "525652137101";

function buildWhatsappUrl(mensaje) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export const WHATSAPP_URL = buildWhatsappUrl("Hola, quiero más información sobre Moga");

export const WHATSAPP_URL_CONTRATAR = buildWhatsappUrl("Hola, quiero contratar sus servicios");
