import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IConatct } from 'src/app/models/IConatct';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IConatct = {} as IConatct;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  

  constructor(private router : Router,private activatedRoute: ActivatedRoute, private contactServiece: ContactService) {

   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap)=>{
      this.contactId = param.get('contactId');
    });
    if (this.contactId){
      this.loading = true;
      this.contactServiece.getContact(this.contactId).subscribe((data: IConatct)=>{
        this.contact = data;
        this.loading = false;
        this.contactServiece.getAllGroups().subscribe((data : IGroup[])=>{
          this.groups = data;
        })
      },(error: string | null)=>{
      this.errorMessage = error;
      this.loading = false;
    });
    }
    
  }
  public submitUpdate(){
    if (this.contactId){
      this.contactServiece.updateContact(this.contact, this.contactId).subscribe((data:IConatct)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
    })
    }
  }


}
