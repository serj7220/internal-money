import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';

import {AccountLayoutComponent} from './shared/components/account-layout/account-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {TransactionPageComponent} from './transaction-page/transaction-page.component';
import { SharedModule } from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {SignupService} from './shared/services/signup.service';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import {SearchNamePipe} from './shared/pipes/search-name.pipe';
import {SearchDatePipe} from './shared/pipes/search-date.pipe';
import {SearchAmountPipe} from './shared/pipes/search-amount.pipe';
import {CorrespondentNamePipe} from './shared/pipes/correspondent-name.pipe';

@NgModule({
  declarations: [
    AccountLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    DashboardPageComponent,
    TransactionsPageComponent,
    TransactionPageComponent,
    SearchNamePipe,
    SearchDatePipe,
    SearchAmountPipe,
    CorrespondentNamePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TextMaskModule,
    RouterModule.forChild([
      {
        path: '', component: AccountLayoutComponent, children: [
          {path: '', redirectTo: '/account/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'registration', component: RegistrationPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'transaction', component: TransactionPageComponent, canActivate: [AuthGuard]},
          {path: 'transactions', component: TransactionsPageComponent, canActivate: [AuthGuard]}
        ]
      }
      ]
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuard, SignupService]
})
export class AccountModule {

}
