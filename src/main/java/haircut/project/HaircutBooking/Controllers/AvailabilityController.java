package haircut.project.HaircutBooking.Controllers;

import haircut.project.HaircutBooking.Service.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @GetMapping("/{date}")
    public ResponseEntity<List<LocalTime>> getAvailabilityForDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(availabilityService.getAvailabilityforDate(date));
    }

    @PostMapping("/{date}")
    public ResponseEntity<List<LocalTime>> addAvailabilityForDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        return ResponseEntity.ok(availabilityService.addAvailabilityforDate(date, time));
    }


    @DeleteMapping("/{date}")
    public ResponseEntity<List<LocalTime>> deleteAvailabilityForDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time) {
        return ResponseEntity.ok(availabilityService.deleteAvailabilityforDate(date, time));
    }
}