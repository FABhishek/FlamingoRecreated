import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreCardsComponent } from './Components/explore-cards/explore-cards.component';
import { TruncateLocationPipe } from './Pipes/truncate-location.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BillingcardComponent } from './Components/billingcard/billingcard.component';

@NgModule({
  declarations: [
    AppComponent,
    ExploreCardsComponent,
    TruncateLocationPipe,
    CarouselComponent,
    NavigationBarComponent,
    BillingcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
