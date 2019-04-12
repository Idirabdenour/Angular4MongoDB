import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  age: number;
  customers: Customer[];

  constructor(private dateService: CustomerService) { }

  ngOnInit() {
    this.age = 0;
  }

  private searchCutomers() {
    this.dateService.getCustomersByAge(this.age)
      .subscribe(customers => {
        this.customers = customers
        console.log(customers)
      })

  }

  onSubmit() {
    this.searchCutomers();
  }
}
