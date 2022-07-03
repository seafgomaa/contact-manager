import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConatct } from 'src/app/models/IConatct';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: IConatct = {} as IConatct;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  constructor(private contactServiece: ContactService, private router : Router) { }

  ngOnInit(): void {
    this.contactServiece.getAllGroups().subscribe((data : IGroup[])=>{
          this.groups = data;
        },(error: string | null)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public createSubmit(){
    this.contactServiece.creatContact(this.contact).subscribe((data:IConatct)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    })
  }

}
