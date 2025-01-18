package ma.emsi.billingservice.services;

import ma.emsi.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping(path = "/customers/{id}")
     Customer findCustomerById(@PathVariable Long id);
    @GetMapping(path = "/customers")
    PagedModel<Customer> getAllCustomers();
}
