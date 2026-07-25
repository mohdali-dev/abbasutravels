/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FlightInquiry {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  message: string;
}

export interface CarRentalInquiry {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  duration: string;
  travelDate: string;
  message: string;
}

export interface GeneralInquiry {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  destination: string;
  travelDate: string;
  message: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  capacity: string;
  acType: string;
  baggage: string;
  priceEstimate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
