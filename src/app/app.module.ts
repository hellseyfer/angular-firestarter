import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// App Modules
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { SharedModule } from "./shared/shared.module";
import { UserModule } from "./user/user.module";

// Firebase imports
import { FirestoreModule } from "@angular/fire/firestore";
import { AuthModule } from "@angular/fire/auth";
import { ServiceWorkerModule } from "@angular/service-worker";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { HttpClientModule } from "@angular/common/http";
import { StoreComponent } from "./store/store.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PrivacyPolicyComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    FirestoreModule,
    AuthModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
