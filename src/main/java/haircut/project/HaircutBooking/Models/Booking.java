package haircut.project.HaircutBooking.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name="booking")
@Getter
@Setter
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String email;
    String phone;
    Long serviceId;
    LocalDateTime dateTime;
    String paymentMethod; // "CARD" or "CASH"
    String paymentStatus; // "PAID", "UNPAID"
}
