import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ICotizacionDetalle } from "./iCotizacionDetalle"
import { map, tap, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CotizacionDetalleService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  cotizacionsUrl = "http://localhost:8080/cotizaciones-detalle";
  itemsUrl = "http://localhost:8080/item-solicitud";
  cotizaciones$: any;

  constructor(private http: HttpClient) { }

  public getCotizacioDetalle(id:number)
    {
        this.cotizacionsUrl = "http://localhost:8080/cotizaciones-detalle"+`?id=`+id;
        this.http.get<ICotizacionDetalle[]>(this.cotizacionsUrl).subscribe((pozos) => this.cotizaciones$.next(pozos));
        return this.cotizaciones$;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      /** POST: add a new Solicitud to the server */
  public agregacotizacion(Solicitud: ICotizacionDetalle): Observable<ICotizacionDetalle>  {
    return this.http.post<ICotizacionDetalle>(this.itemsUrl, Solicitud, this.httpOptions).pipe(
      tap((newSolicitud: ICotizacionDetalle) => console.log(`added Solicitud w/ id=${newSolicitud.id}`)),
      catchError(this.handleError<ICotizacionDetalle>('addSolicitud'))
    );
  }
}
