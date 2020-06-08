import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AccountLayoutComponent} from './shared/components/account-layout/account-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {TransactionPageComponent} from './transaction-page/transaction-page.component';

@NgModule({
  declarations: [AccountLayoutComponent, LoginPageComponent, RegistrationPageComponent, DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AccountLayoutComponent, children: [
          {path: '', redirectTo: '/account/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'registration', component: RegistrationPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'transaction', component: TransactionPageComponent}
        ]
      }
      ]
    )
  ],
  exports: [RouterModule]
})
export class AccountModule {

}
