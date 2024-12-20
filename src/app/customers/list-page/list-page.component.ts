import { Component, OnDestroy, OnInit } from "@angular/core";
import { SeoService } from "src/app/services/seo.service";
import { CustomerDataService } from "../customer-data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-page",
  templateUrl: "./list-page.component.html",
  styleUrls: ["./list-page.component.scss"],
})
export class ListPageComponent implements OnInit, OnDestroy {
  customers;
  private customersSubscription: Subscription;
  constructor(
    private seo: SeoService,
    public customerService: CustomerDataService
  ) {}

  ngOnInit() {
    this.seo.generateTags({
      title: "Customer List",
      description: "A list filled with customers",
    });

    this.customerService.subscribeToCustomers();
    this.customersSubscription = this.customerService.customers$.subscribe(
      (customers) => {
        this.customers = customers;
        console.log("Updated customers:", this.customers);
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.customersSubscription) {
      this.customersSubscription.unsubscribe();
    }
    this.customerService.unsubscribeFromCustomers();
  }
}
