import Link from "next/link"
import { Scissors, Calendar, User } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Scissors className="h-8 w-8 text-gray-900" />
              <span className="ml-2 text-xl font-bold text-gray-900">BarberBook</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="/book" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                Book Appointment
              </Link>
              <Link
                href="/admin/availability"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Book Your Next Haircut
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Professional haircuts and styling services. Book your appointment in just a few clicks.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900 mb-4">
                  <Scissors className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">1. Choose a Service</h3>
                <p className="mt-2 text-base text-gray-500">Select from our range of professional haircut services.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900 mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">2. Pick a Time</h3>
                <p className="mt-2 text-base text-gray-500">
                  Choose from available time slots that work for your schedule.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-gray-900 mb-4">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">3. Confirm Details</h3>
                <p className="mt-2 text-base text-gray-500">Enter your information and confirm your booking.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} BarberBook. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
