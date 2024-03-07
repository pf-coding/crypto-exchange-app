// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';
import { TabsComponent } from './tabs/tabs.component';
import { CryptoDisplayComponent } from './crypto-display/crypto-display.component';

// app-routing.module.ts

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'portfolio-display', component: PortfolioDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
