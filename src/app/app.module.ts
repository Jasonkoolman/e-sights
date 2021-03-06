import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InsightsComponent } from './insights/insights.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowseService } from './browse/browse.service';

import { TrustedUrlPipe } from './pipes/trusted-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InsightsComponent,
    BrowseComponent,
    TrustedUrlPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BrowseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
