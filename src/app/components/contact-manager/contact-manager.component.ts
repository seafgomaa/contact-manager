import { Component, OnInit } from '@angular/core';
import { IConatct } from 'src/app/models/IConatct';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading : boolean = false;
  public contacts : IConatct[] = [];
  public errorMessage : string | null = null;
  

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactFromServer();
  }
  public getAllContactFromServer(){
      this.loading = true;
      this.contactService.getAllContacts().subscribe((data: IConatct[])=>{
      this.contacts = data;
      this.loading = false;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    });
    }
  
  public clickDeleteContact(contactId: string | undefined){
    if (contactId){
      this.contactService.deleteContact(contactId).subscribe((data : {})=>{
        this.getAllContactFromServer();
      },(error)=>{
      this.errorMessage = error;
       })
  }


}

}
