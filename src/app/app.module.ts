import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TabsComponent } from './tabs/tabs.component';
import { CryptoModalComponent } from './crypto-modal/crypto-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';
import { PortfolioService } from './services/portfolio.service';
import { CryptoDisplayComponent } from './crypto-display/crypto-display.component';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DefaultTabComponent } from './tabs/default-tab/default-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TabsComponent,
    CryptoModalComponent,
    PortfolioDisplayComponent,
    CryptoDisplayComponent,
    ChartComponent,
    WelcomePageComponent,
    DefaultTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    LoadingComponent,
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
