/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Mail, MapPin, Send, AlertCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  destination: string;
  travelDate: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceRequired?: string;
  destination?: string;
  travelDate?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: 'Flight Booking',
    destination: '',
    travelDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.serviceRequired) newErrors.serviceRequired = 'Please select a service';
    if (!form.destination.trim()) newErrors.destination = 'Destination is required';
    if (!form.travelDate) newErrors.travelDate = 'Travel Date is required';
    if (!form.message.trim()) newErrors.message = 'Please provide some details about your trip';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      
      // Format WhatsApp message with emojis and clean linebreaks
      const formattedMessage = `Hello ABBASU TRAVELS & TOURS! 👋

I would like to submit a travel inquiry with the following details:

👤 *Full Name:* ${form.fullName}
📞 *Phone Number:* ${form.phone}
✉️ *Email:* ${form.email}
🛠️ *Service Required:* ${form.serviceRequired}
📍 *Destination:* ${form.destination}
📅 *Travel Date:* ${form.travelDate}
💬 *Message:* ${form.message}

Please review my inquiry and provide a quote. Thank you!`;

      openWhatsApp(formattedMessage);

      // Reset form status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+923421458721';
  };

  const handleWhatsAppChat = () => {
    openWhatsApp("Hello! I want to chat with an agent about travel planning in Pakistan.");
  };

  return (
    <section id="why-us-contact" className="py-24 bg-slate-50 relative">
      <div id="contact" className="absolute top-0 left-0 w-full h-1" /> {/* Scroll anchor */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Plan Your Next Adventure
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Reach Out to Our Travel Experts
            </h2>
            <p className="mt-4 font-sans text-base text-slate-500 leading-relaxed">
              Have specific travel requirements? Send us a message or contact us directly. Our team will handle all flight booking and transport logistics for your trip.
            </p>
            <div className="mt-3 h-1 w-16 bg-brand-orange rounded-full mb-12" />

            {/* Support info items */}
            <div className="space-y-6">
              
              {/* Call Us */}
              <div
                id="contact-item-phone"
                onClick={handleCall}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-blue/20 hover:bg-brand-blue/5 shadow-sm transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Call Us Now
                  </span>
                  <span className="block font-display text-base font-black text-brand-dark mt-0.5">
                    +92 342 145 8721
                  </span>
                </div>
              </div>

              {/* Message WhatsApp */}
              <div
                id="contact-item-whatsapp"
                onClick={handleWhatsAppChat}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-500/20 hover:bg-emerald-50 shadow-sm transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    WhatsApp Agent
                  </span>
                  <span className="block font-display text-base font-black text-brand-dark mt-0.5">
                    Message Our Live Agent
                  </span>
                </div>
              </div>

              {/* Email Us */}
              <a
                id="contact-item-email"
                href="mailto:abbasutravelsandtours@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-orange/20 hover:bg-brand-orange/5 shadow-sm transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Support
                  </span>
                  <span className="block font-display text-xs sm:text-sm md:text-base font-black text-brand-dark mt-0.5 break-all">
                    abbasutravelsandtours@gmail.com
                  </span>
                </div>
              </a>

              {/* Office Location */}
              <div
                id="contact-item-location"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 shadow-sm transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Office Address
                  </span>
                  <span className="block font-display text-base font-black text-brand-dark mt-0.5">
                    Gilgit-Baltistan, Pakistan
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7">
            <motion.div
              id="lead-form-container"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100"
            >
              <h3 className="font-display text-xl font-bold text-brand-dark mb-6 border-b border-slate-100 pb-4">
                Inquiry Form (Sends to WhatsApp)
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+92 342 1458721"
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email & Service Required Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 ${
                        errors.email
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Service Needed */}
                  <div className="flex flex-col">
                    <label htmlFor="serviceRequired" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Service Required *
                    </label>
                    <select
                      id="serviceRequired"
                      name="serviceRequired"
                      value={form.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 font-sans text-sm outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10 transition-all duration-300"
                    >
                      <option value="Flight Booking">Flight Booking</option>
                      <option value="Car Rental">Car Rental</option>
                      <option value="Tour Package">Tour Package</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Destination & Travel Date Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Destination */}
                  <div className="flex flex-col">
                    <label htmlFor="destination" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Destination *
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="e.g. Hunza, Skardu, Islamabad"
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 ${
                        errors.destination
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                      }`}
                    />
                    {errors.destination && (
                      <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.destination}
                      </span>
                    )}
                  </div>

                  {/* Travel Date */}
                  <div className="flex flex-col">
                    <label htmlFor="travelDate" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={form.travelDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 ${
                        errors.travelDate
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                      }`}
                    />
                    {errors.travelDate && (
                      <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.travelDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="font-sans text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                    Message / Special Requirements *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your trip details, passenger count, luggage size, specific car preference, etc..."
                    className={`w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-200 bg-slate-50/50 focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/10'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs font-semibold text-red-500 mt-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="lead-form-submit-btn"
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-sans text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isSubmitted
                      ? 'bg-emerald-500 text-white cursor-default'
                      : 'bg-brand-blue hover:bg-brand-blue-hover text-white hover:shadow-lg hover:shadow-brand-blue/20 cursor-pointer transform hover:scale-[1.01]'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {isSubmitted ? 'Opening WhatsApp...' : 'Send Inquiry via WhatsApp'}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
