import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IConatct } from '../models/IConatct';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl: string = 'http://localhost:9000';
  constructor(private HttpClient: HttpClient) { }
  
  // Get all Contact
  public getAllContacts ():Observable<IConatct[]>{
    let dataUrl : string = `${this.serverUrl}/contacts`;
    return this.HttpClient.get<IConatct[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get single Contact
  public getContact( contactId : string):Observable<IConatct>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.get<IConatct>(dataUrl).pipe(catchError(this.handleError));
  }

  // Create contact
  public creatContact(contact: IConatct):Observable<IConatct>{
    let dataUrl : string = `${this.serverUrl}/contacts`;
    return this.HttpClient.post<IConatct>(dataUrl, contact).pipe(catchError(this.handleError));
  } 

  // Update contact
  public updateContact(contact: IConatct,  contactId : string):Observable<IConatct>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.put<IConatct>(dataUrl, contact).pipe(catchError(this.handleError));
  } 

  // Delete contact
  public deleteContact(contactId : string):Observable<{}>{
    let dataUrl : string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  } 

  // Get all Groups
  public getAllGroups ():Observable<IGroup[]>{
    let dataUrl : string = `${this.serverUrl}/groups`;
    return this.HttpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get single Group
  public getGroup(contact: IConatct):Observable<IGroup>{
    let dataUrl : string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.HttpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  // Error handling 
  public handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
}
