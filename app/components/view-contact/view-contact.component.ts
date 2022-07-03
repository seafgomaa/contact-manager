import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IConatct } from 'src/app/models/IConatct';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IConatct = {} as IConatct;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;
  

  constructor(private activatedRoute: ActivatedRoute, private contactServiece: ContactService) {

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
        this.contactServiece.getGroup(data).subscribe((data : IGroup)=>{
          this.group = data;
        })
      },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    });
    }
    
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.group).length > 0;
  }


}
