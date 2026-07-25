/**
 * Opens WhatsApp safely across mobile & desktop browsers.
 * Bypasses Vercel / modern browser popup blockers by falling back to
 * window.location.href if window.open is blocked or on mobile devices.
 */
export const openWhatsApp = (message: string, phone: string = '923421458721') => {
  const encodedMsg = encodeURIComponent(message);
  
  // Universal WhatsApp API link (works reliably on iOS, Android, and Desktop)
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;

  try {
    const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
    // If popup blocker blocked the window or on certain mobile webviews where new window returns null
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappURL;
    }
  } catch (err) {
    // Fallback direct redirection
    window.location.href = whatsappURL;
  }
};

export const getWhatsAppURL = (message: string, phone: string = '923421458721') => {
  const encodedMsg = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
};
