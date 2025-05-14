package haircut.project.HaircutBooking.Controllers;

import haircut.project.HaircutBooking.Models.AvailabilityRequest;
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


    @PostMapping("/add")
    public ResponseEntity<List<LocalTime>> addAvailabilityForDate(@RequestBody AvailabilityRequest request) {
        return ResponseEntity.ok(availabilityService.addAvailabilityforDate(request.getDate(), request.getTime()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<List<LocalTime>> deleteAvailabilityForDate(@RequestBody AvailabilityRequest request) {
        return ResponseEntity.ok(availabilityService.deleteAvailabilityforDate(request.getDate(), request.getTime()));
    }
}