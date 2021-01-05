import { Component, OnInit } from '@angular/core';
import { SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  Employeelist:any = [];

  ModalTitle:string = "";
  ActivateAddEditEmpComp:boolean = false;
  emp:any;

  EmployeeIdFilter:string = "";
  EmployeeNameFilter:string = "";
  EmployeeDepartmentFilter:string = "";
  EmployeeDateOfJoiningFilter:string="";
  EmployeeListWithoutFilter:any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick():void {
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    };
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any){
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick():void {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  deleteClick(item:any):void {
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      });
    }
    else{
      alert('Operation Failed')
    }
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data => {
      this.Employeelist = data;
      this.EmployeeListWithoutFilter = data;
    });
  }

  FilterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var EmployeeDepartmentFilter = this.EmployeeDepartmentFilter;
    var EmployeeDateOfJoiningFilter = this.EmployeeDateOfJoiningFilter;

    this.Employeelist = this.EmployeeListWithoutFilter.filter(function(e1:any){
      return e1.EmployeeId.toString().toLowerCase().includes(
       EmployeeIdFilter.toString().trim().toLowerCase()
      )&&
      e1.EmployeeName.toString().toLowerCase().includes(
      EmployeeNameFilter.toString().trim().toLowerCase()
      )&&
      e1.Department.toString().toLowerCase().includes(
      EmployeeDepartmentFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:any){
    this.Employeelist = this.EmployeeListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }


}
