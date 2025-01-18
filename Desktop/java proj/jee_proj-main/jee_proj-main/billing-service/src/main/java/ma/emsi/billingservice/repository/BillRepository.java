package ma.emsi.billingservice.repository;

import ma.emsi.billingservice.entities.Bill;
import ma.emsi.billingservice.entities.BillProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
@RepositoryRestResource(excerptProjection = BillProjection.class)
public interface BillRepository extends JpaRepository<Bill, Long> {
    @RestResource(path = "byCustomerId", rel = "byCustomerId")
    List<Bill> findByCustomerId(@Param("customerid") Long customerId);
}
