import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';

@Injectable()
export class ApiService {

  private endpoint = 'http://localhost:3000'
  private urlPath = ''

  constructor(private http: HttpClient) { }

  // Function to get the full URL needed for call
  private getFullURL(url) {
    const finalURL = this.endpoint + url;
    return finalURL;
  }

  // Function to do GET requests
  get(url, data) {

    if (data) {
      this.urlPath = this.getFullURL(url) + data
    } else {
      this.urlPath = this.getFullURL(url)
    }

    return this.http.get<any>(this.urlPath)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(new AppError(err))
      });
  }

  // Function to do POST requests
  post(url, postData) {

    this.urlPath = this.getFullURL(url)

    return this.http.post<any>(this.urlPath, postData)
      .catch((err: HttpErrorResponse) => {

        return Observable.throw(new AppError(err))
      });
  }

  // Function to do PUT requests
  put(url, params, body) {

      this.urlPath = this.getFullURL(url) + params
  
      return this.http.put<any>(this.urlPath, body)
        .catch((err: HttpErrorResponse) => {
  
          return Observable.throw(new AppError(err))
        });
  }

  // Function to upload image
  uploadImage(url, file: File, imageName: string) {

    this.urlPath = this.getFullURL(url)

    let formData = new FormData();
    formData.append('image', file, imageName)

    return this.http.post<any>(this.urlPath, formData)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(new AppError(err))
      });
  }

  // Function to do DELETE request
  delete(url, data) {

    this.urlPath = this.getFullURL(url) + data

    return this.http.delete<any>(this.urlPath)
      .catch((err: HttpErrorResponse) => {

        return Observable.throw(new AppError(err))
      });

  }

  // Function to handle service errors
  private handleError(error: Response) {

    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()))
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError())
    }
    return Observable.throw(new AppError(error))
  }
}
