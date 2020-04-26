import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Visitor } from './visitor';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  activities: any = [
    { title: 'Hiking', date: new Date('2019-06-28') },
    { title: 'Shopping', date: new Date('2019-06-10') },
    { title: 'Trekking', date: new Date('2019-06-22') }
  ]

  visitors: any[] = [];
  tempVisitorData: Visitor[];

  getVisitorInfo: string = 'https://gu1xhtijuk.execute-api.ap-south-1.amazonaws.com/ttt-visitor/visitors';
  getTttInfo(): Observable<any> {

    var sortedActivities = this.activities.sort((a, b) => b.date - a.date)


    return this.http.get<any>(this.getVisitorInfo).pipe(
      catchError(this.handleError)
    );


  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
