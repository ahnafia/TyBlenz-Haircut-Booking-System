package haircut.project.HaircutBooking.Models;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class AvailabilityRequest {
    private LocalDate date;
    private LocalTime time;
}
