import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpHeaderResponse, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, Subscriber, throwError } from 'rxjs';
import { tap, map, filter, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    get(api: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.get(url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    post(api: any, model: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.post(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    put(api: any, model: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.put(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    delete(api: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.delete(url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    patch(api: any, model: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.patch(url, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    postFormData(api: any, formData: FormData): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: new HttpHeaders() };
        return this.http.post(url, formData, httpOptions)
            .pipe(catchError(this.handleError));
    }

    getJson(api: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.get(url, httpOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    }

    postJson(api: any, model: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.post(url, model, httpOptions)
            .pipe(map(this.extractData), catchError(this.handleError));
    }

    getConfig(url: string): Observable<any> {
        return this.http.get(url)
            .pipe(catchError(this.handleError));
    }

    getCsv(url): Observable<any> {
        return this.http.get(url, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    async asyncGet(api: string): Promise<any> {
        let url: any = environment.baseUrl + api;
        try {
            let response = await this.http.get(url).toPromise();
            return response;
        } catch (error) {
            await this.handleError(error);
        }
    }

    getData(api: any, dataType: string): Observable<any> {
        let url: any = environment.baseUrl + api;
        //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        let headers: any;
        if (dataType.toLowerCase() == 'json')
            headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        else
            headers = new HttpHeaders().set('Content-Type', 'csv/plain; charset=utf-8');

        return this.http.get(url, { headers, responseType: 'text' }).pipe(catchError(this.handleError));
        //return this.http.get(url, { headers }).pipe(catchError(this.handleError));
    }

    getExcelData(api: any): Observable<any> {
        let headers: any;
        headers = new HttpHeaders().set('Content-Type', 'application/vnd.ms-excel');
        return this.http.get(api, { headers, responseType: 'blob' }).pipe(catchError(this.handleError));
    }

    postData(api: any, model: any): Observable<any> {
        let url: string = environment.baseUrl + api;
        return this.http.post(url, model, { headers: this.handleHeaders(), responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    getApi(api: any): Observable<any> {
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.get(api, httpOptions)
            .pipe(catchError(this.handleError));
    }

    postApi(api: any, model: any): Observable<any> {
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.post(api, model, httpOptions)
            .pipe(catchError(this.handleError));
    }

    deleteApi(api: any): Observable<any> {
        let httpOptions = { headers: this.handleHeaders() };
        return this.http.delete(api, httpOptions)
            .pipe(catchError(this.handleError));
    }

    WindowAuth(api: any): Observable<any> {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders,
            withCredentials: true
        };
        return this.http.get(api, options);
    }

    private handleHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    private handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`; // client-side error
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; // server-side error
        }
        return throwError(errorMessage);
    }
    
    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

}

