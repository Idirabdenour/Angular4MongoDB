import { Component, OnInit, Input, Pipe } from '@angular/core';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

import { CustomersListComponent } from '../customers-list/customers-list.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Input() customer: Customer;
  customers: Observable<Customer[]>;

  constructor(private customerService: CustomerService, private listComponent: CustomersListComponent) { }

  ngOnInit() {
    this.reloadData()
    console.log(this.customers)
  }


  updateActive(isActive: boolean) {
    this.customerService.updateCustomer(this.customer.id,
      { name: this.customer.name, age: this.customer.age, active: isActive })
      .subscribe(
      data => {
        console.log(data);
        this.customer = data as Customer;
      },
      error => console.log(error));
  }
  reloadData() {
    this.customers = this.customerService.getCustomersList();
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customer.id)
      .subscribe(
      data => {
        console.log(data);
        this.listComponent.reloadData();
      },
      error => console.log(error));
  }

}
