// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';
import { TabsComponent } from './tabs/tabs.component';
import { CryptoDisplayComponent } from './crypto-display/crypto-display.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DefaultTabComponent } from './tabs/default-tab/default-tab.component';

// app-routing.module.ts

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'portfolio-display', component: PortfolioDisplayComponent },
  { path: 'tabs/:content', component: CryptoDisplayComponent },
  { path: 'description', component: DefaultTabComponent }, // Updated route for the default tab
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect invalid routes to the home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
