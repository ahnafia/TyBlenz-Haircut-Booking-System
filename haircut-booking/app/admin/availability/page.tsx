"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Trash } from "lucide-react"
import CalendarPicker from "@/components/calendar-picker"
import LoadingSpinner from "@/components/loading-spinner"
import Toast, { useToast } from "@/components/toast"
import {
  getFullAvailability,
  addAvailability,
  deleteAvailability,
  deleteAvailabilityDay,
  type FullTimeSlot,
} from "@/lib/api"

export default function AdminAvailabilityPage() {
  const { toast, showToast, hideToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableTimes, setAvailableTimes] = useState<FullTimeSlot[]>([])
  const [newTime, setNewTime] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch available times when date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchAvailability()
    }
  }, [selectedDate])

  const fetchAvailability = async () => {
    if (!selectedDate) return

    try {
      setLoading(true)
      const formattedDate = formatDate(selectedDate)
      const data = await getFullAvailability(formattedDate)
      setAvailableTimes(data)
    } catch (error) {
      console.error("Error fetching availability:", error)
      showToast("Failed to load available times. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

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

  const handleAddTime = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !newTime) {
      showToast("Please select a date and time", "error")
      return
    }

    try {
      setLoading(true)
      const formattedDate = formatDate(selectedDate)
      await addAvailability(formattedDate, newTime)
      showToast("Time slot added successfully", "success")
      setNewTime("")
      fetchAvailability()
    } catch (error) {
      console.error("Error adding time slot:", error)
      showToast("Failed to add time slot. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTime = async (time: string) => {
    if (!selectedDate) return

    try {
      setIsDeleting(true)
      const formattedDate = formatDate(selectedDate)
      await deleteAvailability(formattedDate, time)
      showToast("Time slot deleted successfully", "success")
      fetchAvailability()
    } catch (error) {
      console.error("Error deleting time slot:", error)
      showToast("Failed to delete time slot. Please try again.", "error")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteDay = async () => {
    if (!selectedDate) return

    if (!confirm("Are you sure you want to delete all time slots for this day?")) {
      return
    }

    try {
      setLoading(true)
      const formattedDate = formatDate(selectedDate)
      await deleteAvailabilityDay(formattedDate)
      showToast("All time slots for this day deleted successfully", "success")
      setAvailableTimes([])
    } catch (error) {
      console.error("Error deleting day:", error)
      showToast("Failed to delete day. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Manage Availability</h1>
            <p className="text-gray-600 mt-1">Add or remove available time slots for appointments</p>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">1. Select a Date</h2>
            <div className="flex justify-center mb-8">
              <CalendarPicker selectedDate={selectedDate} onDateSelect={setSelectedDate} minDate={new Date()} />
            </div>

            {selectedDate && (
              <>
                <div className="border-t pt-6 mt-6">
                  <h2 className="text-lg font-medium mb-4">
                    2. Manage Time Slots for{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h2>

                  <div className="mb-6">
                    <form onSubmit={handleAddTime} className="flex gap-2">
                      <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        required
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        {loading ? <LoadingSpinner size="small" /> : <Plus className="h-4 w-4 mr-1" />}
                        Add Time
                      </button>
                    </form>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Available Time Slots</h3>
                      {availableTimes.length > 0 && (
                        <button
                          onClick={handleDeleteDay}
                          disabled={loading}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete All
                        </button>
                      )}
                    </div>

                    {loading ? (
                      <div className="py-8 flex justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : availableTimes.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {availableTimes.map((slot, index) => (
                          <li key={index} className="py-3 flex justify-between items-center">
                            <span>{formatTime(slot.time)}</span>
                            <button
                              onClick={() => handleDeleteTime(slot.time)}
                              disabled={isDeleting}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>No time slots available for this date.</p>
                        <p className="text-sm mt-1">Add time slots using the form above.</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}
