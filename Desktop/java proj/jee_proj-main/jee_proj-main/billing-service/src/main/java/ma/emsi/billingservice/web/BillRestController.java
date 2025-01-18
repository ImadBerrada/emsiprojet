package ma.emsi.billingservice.web;

import ma.emsi.billingservice.entities.Bill;
import ma.emsi.billingservice.repository.BillRepository;
import ma.emsi.billingservice.repository.ProductItemRepository;
import ma.emsi.billingservice.services.CustomerRestClient;
import ma.emsi.billingservice.services.ProductRestClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bill")
public class BillRestController {
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;
    private CustomerRestClient customerRestClient;
    private ProductRestClient productRestClient;

    public BillRestController(BillRepository billRepository, ProductItemRepository productItemRepository, CustomerRestClient customerRestClient, ProductRestClient productRestClient) {
        this.billRepository = billRepository;
        this.productItemRepository = productItemRepository;
        this.customerRestClient = customerRestClient;
        this.productRestClient = productRestClient;
    }

    @GetMapping("/all")
    public List<Bill> bills(){
        List<Bill> bills= billRepository.findAll();
        bills.forEach(bill -> {
        bill.setCustomer(customerRestClient.findCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(pi ->{
            pi.setProduct(productRestClient.findProductById(pi.getProductId()));
        });
        });
        return bills;
    }
    @GetMapping("/{id}")
    public Bill bill(@PathVariable Long id){
       Bill bill=  billRepository.findById(id).get();
       bill.setCustomer(customerRestClient.findCustomerById(bill.getCustomerId()));
       bill.getProductItems().forEach(pi ->{
           pi.setProduct(productRestClient.findProductById(pi.getProductId()));
       });
        return bill;
    }
    @GetMapping("/byCustomerId/{id}")
    public List<Bill> getBillsByCustomerId(@PathVariable Long id) {
        List<Bill> bills = billRepository.findByCustomerId(id);
        bills.forEach(bill -> {
            bill.setCustomer(customerRestClient.findCustomerById(bill.getCustomerId()));
            bill.getProductItems().forEach(p -> p.setProduct(productRestClient.findProductById(p.getProductId())));
        });
        return bills;
    }
}
