package haircut.project.HaircutBooking.Repos;

import haircut.project.HaircutBooking.Models.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Long> {
}
