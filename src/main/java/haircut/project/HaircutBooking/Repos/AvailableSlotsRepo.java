package haircut.project.HaircutBooking.Repos;

import haircut.project.HaircutBooking.Models.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableSlotsRepo extends JpaRepository<Availability, Long> {
}
