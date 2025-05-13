package haircut.project.HaircutBooking.Service;

import haircut.project.HaircutBooking.Models.Booking;
import haircut.project.HaircutBooking.Repos.BookingRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(Booking booking) {
        // Check if the time slot is already booked
        if (isTimeSlotBooked(booking.getDateTime())) {
            throw new IllegalArgumentException("This time slot is already booked. Please select another time.");
        }

        return bookingRepository.save(booking);
    }

    private boolean isTimeSlotBooked(LocalDateTime dateTime) {
        // Find bookings at the exact same date and time
        Optional<Booking> existingBookings = bookingRepository.findByDateTime(dateTime);
        return !existingBookings.isEmpty();
    }

    public Optional<Booking> updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    // If the datetime is being changed, check if the new slot is available
                    if (!existingBooking.getDateTime().equals(updatedBooking.getDateTime())) {
                        if (isTimeSlotBooked(updatedBooking.getDateTime())) {
                            throw new IllegalArgumentException("This time slot is already booked. Please select another time.");
                        }
                    }

                    existingBooking.setName(updatedBooking.getName());
                    existingBooking.setEmail(updatedBooking.getEmail());
                    existingBooking.setPhone(updatedBooking.getPhone());
                    existingBooking.setServiceId(updatedBooking.getServiceId());
                    existingBooking.setDateTime(updatedBooking.getDateTime());
                    existingBooking.setPaymentMethod(updatedBooking.getPaymentMethod());
                    existingBooking.setPaymentStatus(updatedBooking.getPaymentStatus());
                    return bookingRepository.save(existingBooking);
                });
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}