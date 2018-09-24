import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let baseUrl = "api/1";

    let standingsRegex = new RegExp(`${baseUrl}\\/standings`);

    if (request.url.match(standingsRegex) !== null) {
      if (request.method.match(/get/i)) {
        return of(new HttpResponse({ status: 200, body: "Found it!"}));
      }
    }

    return of(new HttpResponse({ status: 404, body: "Not found!"}));
  }
}
