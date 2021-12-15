import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SseService {


  constructor(
    private readonly zone: NgZone
  ) { }

  public getSse<Q, R>(url: string, params?: Q): Observable<R> {
    return new Observable(observer => {
      const eventSource = this.getEventSource(url, {...params, authorization: `Bearer ${localStorage.getItem("token")}`});
      eventSource.onmessage = event => {
        this.zone.run(() => {
          if (typeof event.data === 'string' && event.data.startsWith('{'))
            observer.next(JSON.parse(event.data));
          else
            observer.next(event.data);
        });
      };
      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource<Q>(url: string, params?: Q): EventSource {
    url = url.startsWith('/') ? url.slice(1) : url;
    return new EventSource(`${environment.api}/${url}?${Object.entries(params || {}).reduce((prev, curr) => prev + curr[0] + '=' + curr[1] + '&', '')}`);
  }
}