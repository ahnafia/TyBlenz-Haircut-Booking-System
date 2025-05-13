package haircut.project.HaircutBooking.Controllers;

import haircut.project.HaircutBooking.Models.Services;
import haircut.project.HaircutBooking.Service.ServicesService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("service/")
@AllArgsConstructor
public class ServiceController {
    @Autowired
    private ServicesService servicesService;

    @GetMapping("/all")
    public ResponseEntity<List<Services>> getAllServices(){
        return ResponseEntity.ok(servicesService.getAllServices());
    }

    @PostMapping("/create")
    public ResponseEntity<Services> createService(@RequestBody Services service){
        return ResponseEntity.ok(servicesService.createService(service));
    }

    @PostMapping("/update_{id}")
    public ResponseEntity<Optional<Services>> updateService(@PathVariable Long id, @RequestBody Services service){
        return ResponseEntity.ok(servicesService.updateService(id, service));
    }

    @DeleteMapping("/delete_{id}")
    public ResponseEntity<Optional<Services>> deleteService(@PathVariable Long id){
        return ResponseEntity.ok(servicesService.deleteService(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Services>> getService(@PathVariable Long id){
        return ResponseEntity.ok(servicesService.getService(id));
    }
}
