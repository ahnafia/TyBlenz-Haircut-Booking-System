import axios from "axios"

const API_URL = "http://localhost:8080"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Service {
  id: number
  name: string
  price: number
  duration: number
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface FullTimeSlot {
  date: string
  time: string
  id?: number
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  serviceId: number
  dateTime: string
  paymentMethod: "CARD" | "CASH"
  paymentStatus: "UNPAID" | "PAID"
}

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get("/service/all")
  return response.data
}

export const getAvailability = async (date: string): Promise<TimeSlot[]> => {
  const response = await api.get(`/availability/${date}`)
  return response.data.map((time: string) => ({
    time,
    available: true
  }))
}

export const getFullAvailability = async (date: string): Promise<FullTimeSlot[]> => {
  const response = await api.get(`/availability/full/${date}`)
  return response.data
}

export const createBooking = async (bookingData: BookingFormData) => {
  const response = await api.post("/bookings/create", bookingData)
  return response.data
}

export const addAvailability = async (date: string, time: string) => {
  const response = await api.post("/availability/add", { date, time })
  return response.data
}

export const deleteAvailability = async (date: string, time: string) => {
  const response = await api.delete("/availability/delete", {
    data: { date, time },
  })
  return response.data
}

export const deleteAvailabilityDay = async (date: string) => {
  const response = await api.delete(`/availability/delete-day/${date}`)
  return response.data
}
