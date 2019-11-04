import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { UrlService } from './url.service';

@Injectable()
export class StockService {

  constructor(private router: Router,
    private apiService: ApiService,
    private url: UrlService) { }

  // Get Stock
  getStock(params) {
    return this.apiService.get(this.url.urls['manager'], params);
  }

  // Delete Stock Item
  deleteStock(params) {
    return this.apiService.delete(this.url.urls['manager'], params);
  }

  // Add Stock Item
  addStock(params) {
    return this.apiService.post(this.url.urls['manager'], params);
  }

  // Update Stock Item
  updateStock(params, body) {
    return this.apiService.put(this.url.urls['manager'], params, body);
  }

  // Upload Image
  uploadImage(file: File, imageName: string) {
    return this.apiService.uploadImage(this.url.urls['upload'], file, imageName)
  }

}
