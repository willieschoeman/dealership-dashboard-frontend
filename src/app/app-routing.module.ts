import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'add-stock', component: AddStockComponent, canActivate: [AuthGuard] },
  { path: 'edit-stock', component: EditStockComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'stock', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'stock', pathMatch: 'full', canActivate: [AuthGuard] }
];

const config: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}