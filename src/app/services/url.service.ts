import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
  public urls: {};
  constructor() {
    this.urls = {
      auth: '/authenticate',
      manager: "/dealer-management",
      upload: "/upload"
    };
  }
}