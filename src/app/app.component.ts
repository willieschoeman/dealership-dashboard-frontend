import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isLoading: boolean

  ngOnInit() {
    this.isLoading = true

    setTimeout( () => { this.isLoading = false }, 1000 )
  }
  
}
