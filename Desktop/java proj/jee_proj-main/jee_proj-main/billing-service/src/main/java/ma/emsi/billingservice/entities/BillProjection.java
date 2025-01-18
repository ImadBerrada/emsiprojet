package ma.emsi.billingservice.entities;

import ma.emsi.billingservice.model.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "fullBill", types = Bill.class)
public interface BillProjection {
    Long getId();
    Date getBillDate();
    Long getCustomerId();
    Customer getCustomer(); // Include customer details
    List<ProductItem> getProductItems(); // Include product item details
}
