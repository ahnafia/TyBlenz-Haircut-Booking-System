package haircut.project.HaircutBooking.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name="availability")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    LocalDate date;           // e.g. 2025-05-15
    List<LocalTime> times;          // e.g. 16:00
    Boolean isBooked = false; // true once a booking is made

}
