package haircut.project.HaircutBooking.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="availability")
@Getter
@Setter
@AllArgsConstructor
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    LocalDate date;           // e.g. 2025-05-15
    LocalTime time;          // e.g. 16:00
    Boolean isBooked = false; // true once a booking is made

}
