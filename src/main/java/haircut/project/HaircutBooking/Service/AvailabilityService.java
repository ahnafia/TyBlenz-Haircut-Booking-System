package haircut.project.HaircutBooking.Service;

import haircut.project.HaircutBooking.Models.Availability;
import haircut.project.HaircutBooking.Repos.AvailableSlotsRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AvailabilityService {
    @Autowired
    private AvailableSlotsRepo availableSlotsRepo;

    public List<LocalTime> getAvailabilityforDate(LocalDate localDate){
        return availableSlotsRepo.findByDate(localDate).get().getTimes();
    }

    public List<LocalTime> addAvailabilityforDate(LocalDate localDate, LocalTime localTime) {
        Optional<Availability> existingAvailability = availableSlotsRepo.findByDate(localDate);

        if (existingAvailability.isPresent()) {
            Availability availability = existingAvailability.get();
            List<LocalTime> times = availability.getTimes();

            if (!times.contains(localTime)) {
                times.add(localTime);
                availability.setTimes(times);
                availableSlotsRepo.save(availability);
            }

            return times;
        } else {
            List<LocalTime> times = List.of(localTime);
            Availability newAvailability = new Availability(null, localDate, times, false);
            availableSlotsRepo.save(newAvailability);
            return times;
        }
    }

    public List<LocalTime> deleteAvailabilityforDate(LocalDate localDate, LocalTime localTime) {
        Optional<Availability> existingAvailability = availableSlotsRepo.findByDate(localDate);

        // If availability exists for this date, remove the time from the list
        Availability availability = existingAvailability.get();
        List<LocalTime> times = availability.getTimes();

        // Remove the specific time
        boolean removed = times.remove(localTime);

        if (removed) {
            // If the time was found and removed, save the updated availability
            availability.setTimes(times);
            availableSlotsRepo.save(availability);
        }

        return times;
    }
}
