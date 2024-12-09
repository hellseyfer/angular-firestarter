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
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { ServiceWorkerModule } from "@angular/service-worker";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";

@NgModule({
  declarations: [AppComponent, HomePageComponent, PrivacyPolicyComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "angular-kanban-9875c",
        appId: "1:651342070437:web:490cfb190d817b8ac1034c",
        databaseURL: "https://angular-kanban-9875c-default-rtdb.firebaseio.com",
        storageBucket: "angular-kanban-9875c.firebasestorage.app",
        apiKey: "AIzaSyCUxatwZD7xKvDohCEK25raP9K45zTiAVo",
        authDomain: "angular-kanban-9875c.firebaseapp.com",
        messagingSenderId: "651342070437",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
