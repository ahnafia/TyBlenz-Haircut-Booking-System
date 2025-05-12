package haircut.project.HaircutBooking.Repos;

import haircut.project.HaircutBooking.Models.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Long> {
}
