/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const handleClick = () => {
    openWhatsApp(
      "Hello ABBASU TRAVELS & TOURS! I am visiting your website and have some questions about flight bookings and car rentals in Gilgit-Baltistan. Please guide me."
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Pulse effect rings around the button */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping -z-10" style={{ transform: 'scale(1.5)' }} />

      <motion.button
        id="floating-whatsapp-btn"
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#128C7E] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 cursor-pointer group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Official Original WhatsApp Vector Icon */}
        <svg
          className="w-8 h-8 fill-white group-hover:scale-105 transition-transform duration-300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </motion.button>
    </div>
  );
}
