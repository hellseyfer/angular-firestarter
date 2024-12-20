import { inject, Injectable } from "@angular/core";
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "@angular/fire/firestore";
import { BehaviorSubject, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerDataService {
  private firestore: Firestore = inject(Firestore);
  customerCollectionRef: CollectionReference;
  customers$ = new BehaviorSubject<any>([]);
  private unsubscribe: (() => void) | null = null;

  constructor() {
    this.customerCollectionRef = collection(this.firestore, "customers");
  }
  subscribeToCustomers() {
    // Clean up any existing subscriptions
    this.unsubscribeFromCustomers();

    // Set up a new subscription
    const customersQuery = query(this.customerCollectionRef);
    this.unsubscribe = onSnapshot(
      customersQuery,
      (querySnapshot: QuerySnapshot) => {
        const customers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.customers$.next(customers);
        console.log("Fetched customers:", customers);
      }
    );
  }
  getCustomer(id: string) {
    if (!this.customers$.getValue().length) {
      const cached = this.customers$.getValue().find((v) => v.id === id);
      console.log("use cached");
      return of(cached);
    } else {
      console.log("use db");
      const q = query(this.customerCollectionRef, where("id", "==", id));
      collectionData(q, { idField: "id" }).subscribe((customers) => {
        this.customers$.next(customers);
      });
      return this.customers$.asObservable();
    }
  }

  unsubscribeFromCustomers() {
    console.log("Unsubscribing from customers");
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
