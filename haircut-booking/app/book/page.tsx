"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Scissors, DollarSign } from "lucide-react"
import CalendarPicker from "@/components/calendar-picker"
import LoadingSpinner from "@/components/loading-spinner"
import Toast, { useToast } from "@/components/toast"
import { getServices, getAvailability, createBooking, type Service, type TimeSlot } from "@/lib/api"

export default function BookingPage() {
  const router = useRouter()
  const { toast, showToast, hideToast } = useToast()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "CASH" as "CASH" | "CARD",
  })

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error("Error fetching services:", error)
        showToast("Failed to load services. Please try again.", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Fetch available times when date is selected
  useEffect(() => {
    if (selectedDate) {
      const fetchAvailability = async () => {
        try {
          setLoading(true)
          const formattedDate = formatDate(selectedDate)
          const data = await getAvailability(formattedDate)
          setAvailableTimes(data)
        } catch (error) {
          console.error("Error fetching availability:", error)
          showToast("Failed to load available times. Please try again.", "error")
        } finally {
          setLoading(false)
        }
      }

      fetchAvailability()
    }
  }, [selectedDate])

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const formatTime = (time: string): string => {
    // Convert "HH:MM" to "HH:MM AM/PM"
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setStep(3)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(4)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedService || !selectedDate || !selectedTime) {
      showToast("Please complete all booking details", "error")
      return
    }

    try {
      setLoading(true)

      const dateTimeString = `${formatDate(selectedDate)}T${selectedTime}`

      const bookingData = {
        ...formData,
        serviceId: selectedService.id,
        dateTime: dateTimeString,
        paymentStatus: "UNPAID",
      }

      await createBooking(bookingData)
      showToast("Booking created successfully!", "success")

      // Navigate to confirmation or reset form
      router.push("/book/confirmation")
    } catch (error) {
      console.error("Error creating booking:", error)
      showToast("Failed to create booking. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-1 text-gray-500">
                  {stepNumber === 1 && "Service"}
                  {stepNumber === 2 && "Date"}
                  {stepNumber === 3 && "Time"}
                  {stepNumber === 4 && "Details"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 w-full bg-gray-200">
            <div
              className="h-1 bg-gray-900 transition-all duration-300"
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Service</h2>

            {loading ? (
              <div className="py-12 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <div className="flex items-center mb-2">
                      <Scissors className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-medium text-lg">{service.name}</h3>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>${service.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration} min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 2 && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep(1)} className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Choose a Date</h2>
            </div>

            <div className="flex justify-center">
              <CalendarPicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {step === 3 && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep(2)} className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Choose a Time</h2>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : availableTimes.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {availableTimes.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`py-2 px-3 rounded-md text-center ${
                      selectedTime === slot.time
                        ? "bg-gray-900 text-white"
                        : slot.available
                          ? "bg-white border border-gray-300 hover:bg-gray-50"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No available times for this date. Please select another date.</p>
                <button
                  onClick={() => setStep(2)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Choose Another Date
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Customer Details */}
        {step === 4 && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep(3)} className="mr-4 p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Your Details</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Booking Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">Service:</div>
                    <div className="font-medium">{selectedService?.name}</div>

                    <div className="text-gray-500">Date:</div>
                    <div className="font-medium">
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <div className="text-gray-500">Time:</div>
                    <div className="font-medium">{selectedTime && formatTime(selectedTime)}</div>

                    <div className="text-gray-500">Price:</div>
                    <div className="font-medium">${selectedService?.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option value="CASH">Cash (Pay at salon)</option>
                    <option value="CARD">Card (Pay at salon)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  {loading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}
