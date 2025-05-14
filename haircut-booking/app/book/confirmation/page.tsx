"use client"

import Link from "next/link"
import { CheckCircle, Calendar, Home } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Your haircut appointment has been successfully booked. We've sent a confirmation email with all the details.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
          <p className="text-sm text-gray-500 mb-1">What's next?</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-gray-900 mr-2">•</span>
              <span>Arrive 5-10 minutes before your appointment</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-900 mr-2">•</span>
              <span>Bring your preferred payment method</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-900 mr-2">•</span>
              <span>If you need to cancel, please do so at least 24 hours in advance</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Another
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
