package ma.emsi.customerservice;

import ma.emsi.customerservice.config.CustomerConfigParams;
import ma.emsi.customerservice.entities.Customer;
import ma.emsi.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration restConfiguration){
        return args -> {
          restConfiguration.exposeIdsFor(Customer.class);
          customerRepository.saveAll(
                  List.of(
                          Customer.builder().name("imad").email("imad@emsi.ma").build(),
                          Customer.builder().name("mar").email("mar@emsi.ma").build(),
                          Customer.builder().name("la").email("la@emsi.ma").build()
                  )
          );
        };
    }
}

