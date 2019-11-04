import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { LoadingComponent } from './loading/loading.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginService } from './services/login.service';
import { ApiService } from './services/api.service';
import { UrlService } from './services/url.service';
import { StockService } from './services/stock.service';
import { SearchingPipe } from './search/searching.pipe';
import { AddStockComponent } from './add-stock/add-stock.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockComponent,
    LoadingComponent,
    SearchingPipe,
    AddStockComponent,
    EditStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LoginService,
    ApiService,
    UrlService,
    StockService,
    SearchingPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
