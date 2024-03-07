import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './tabs/tabs.component';
import { CryptoModalComponent } from './crypto-modal/crypto-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';
import { PortfolioService } from './services/portfolio.service';
import { CryptoDisplayComponent } from './crypto-display/crypto-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabsComponent,
    CryptoModalComponent,
    PortfolioDisplayComponent,
    CryptoDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
