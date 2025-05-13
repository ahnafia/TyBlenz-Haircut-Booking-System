package haircut.project.HaircutBooking.Service;


import haircut.project.HaircutBooking.Models.Services;
import haircut.project.HaircutBooking.Repos.ServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ServicesService {
    @Autowired
    private ServiceRepository serviceRepository;

    public Optional<Services> getService(Long id){
        return serviceRepository.findById(id);
    }

    public List<Services> getAllServices(){
        return serviceRepository.findAll();
    }

    public Services createService(Services service){
        serviceRepository.save(service);
        return service;
    }

    public Optional<Services> updateService(Long id, Services updatedService){
        return serviceRepository.findById(id)
                .map(existingService -> {
                    existingService.setName(updatedService.getName());
                    existingService.setPrice(updatedService.getPrice());
                    existingService.setDurationMinutes(updatedService.getDurationMinutes());
                    existingService.setDescription(updatedService.getDescription());
                    Services savedService = serviceRepository.save(existingService);
                    return savedService;
                });
    }

    public Optional<Services> deleteService(Long id){
        Optional<Services> service = serviceRepository.findById(id);
        serviceRepository.deleteById(id);
        return service;
    }
}
