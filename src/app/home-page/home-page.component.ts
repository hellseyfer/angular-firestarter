import { Component } from "@angular/core";

const Windows = (window as any).chrome.webview.hostObjects.sync.Windows;

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  language: any;
  storeItems: [] = [];

  constructor() {
    //this.language = new Windows.Globalization.Language("en-US");
    //this.fetchCampaignId();
  }
  async fetchCampaignId() {
    try {
      debugger;
      const RuntimeComponent1 = (window as any).chrome.webview.hostObjects.sync
        .RuntimeComponent1;

      let StoreAPI = new RuntimeComponent1.StoreAPI();
      if (!StoreAPI) {
        throw new Error("StoreAPI not found");
      }
      console.log("store api:", Object.keys(StoreAPI));
      const campaignId = await StoreAPI.getCampaignIdAsync();

      console.log(
        "StoreAPI.CampaignId:",
        campaignId.getCampaignIdAsync.toString()
      );
    } catch (error) {
      console.error("Error fetching store items:", error);
    }
  }
}
