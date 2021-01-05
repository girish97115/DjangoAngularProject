import { DepartmentComponent } from './../department.component';
import { Component, OnInit } from '@angular/core';
import { SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  Departmentlist:any = [];

  ModalTitle:string = "";
  ActivateAddEditDepComp:boolean = false;
  dep:any;

  DepartmentIdFilter:string = "";
  DepartmentNameFilter:string = "";
  DepartmentListWithoutFilter:any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick():void {
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    };
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item: any){
    this.dep = item;
    this.ModalTitle = "EditDpeartment";
    this.ActivateAddEditDepComp = true;
  }

  closeClick():void {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  deleteClick(item:any):void {
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      });
    }
    else{
      alert('Operation Failed')
    }
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data => {
      this.Departmentlist = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.Departmentlist = this.DepartmentListWithoutFilter.filter(function(e1:any){
      return e1.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      e1.DepartmentName.toString().toLowerCase().includes(
      DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:any){
    this.Departmentlist = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
