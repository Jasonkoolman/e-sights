import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService {

  private apiKey = 'AIzaSyAAtTTZhVAZeRvFwFee8YqFd4ejvYo0lX0';
  private endPoint = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed'; // URL=x&strategy=mobile&key=

  constructor(private http: Http) { }

  /**
   * Make the pagespeed API call.
   *
   * @param {string} url
   * @returns {Observable<Response>}
   */
  public fetch(url: string): Observable<Response> {
    const options = new RequestOptions(),
          params  = new URLSearchParams();

    params.set('url', url);
    params.set('key', this.apiKey);
    params.set('strategy', 'desktop');
    params.set('screenshot', 'true');

    options.params = params;

    return this.http.get(this.endPoint, options)
      .map(res => res.json());
  }

}
