package haircut.project.HaircutBooking.Repos;

import haircut.project.HaircutBooking.Models.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AvailableSlotsRepo extends JpaRepository<Availability, Long> {
    Optional<Availability> findByDate(LocalDate date);
}
