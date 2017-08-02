import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_KEY, API_URL } from '../app-constants';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService {

  constructor(private http: Http) { }

  /**
   * Make the PageSpeed API call.
   *
   * @param   {string} url
   * @returns {Observable<Response>}
   */
  public fetch(url: string): Observable<Response> {
    const options = new RequestOptions(),
          params = new URLSearchParams();

    params.set('url', url);
    params.set('key', API_KEY);
    params.set('strategy', 'desktop');
    params.set('screenshot', 'true');

    options.params = params;

    return this.http
      .get(API_URL, options)
      .map(res => res.json());
  }

}
