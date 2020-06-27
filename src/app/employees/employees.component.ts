
import { NgForm } from '@angular/forms';



import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Employee} from "./employee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  empList: Employee[] = [];
  id: String;
  employee_name:String;
  employee_salary:String;
  employee_age:String;
  profile_image:String;
  columnHeaderList=["id", "Name", "Salary", "Age",  "Edit", "Delete"];
  selectedEmp:Employee;
  toggleForm: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getEmp().subscribe((data: any[])=>{
      console.log(data);
      this.empList=data['data'];
      
    });  


  }
  deleteEmp(id) {

    this.apiService.deleteEmp(id).subscribe((data: any[]) => {
      
          console.log(data);
       
      });
  }
//get all the employees
  getEmps(){
    this.apiService.getEmp().subscribe((data: any[])=>{
      console.log(data);
      this.empList=data['data'];
      
    }); 
  }
//get one employee
  getOneEmp(id){
    this.apiService.getOneEmp(id).subscribe((data: any[])=>{
      console.log(data);
      this.empList=data['data'];
      
    }); 
  }
//switch the forms
  showEditFrm(employee) {
    this.selectedEmp = employee;
    this.toggleForm = !this.toggleForm;
  }

editEmp() {
  
  // tslint:disable-next-line:prefer-const
  let newEmp = { //newEmp:Emp={}
    id: this.selectedEmp.id,
    name: this.selectedEmp.employee_name,
    salary: this.selectedEmp.employee_salary,
    age: this.selectedEmp.employee_age,
    image: this.selectedEmp.profile_image,
    };

  this.apiService.updateEmp(newEmp)
      .subscribe(result => {
        console.log('original Emp to be updated:' + result);
        //this.getEmps();
      });
    this.toggleForm =! this.toggleForm;


}

addEmp() {
  //this.setCode();
  //this.count = this.count + 1;
  
  const newEmp = {
    id: "25",
    name: this.employee_name,
    salary: this.employee_salary,
    age: this.employee_age,
    image: this.profile_image,
    };
  this.apiService.addEmp(newEmp)
    .subscribe(employee => {
     this.empList.push(employee['data']);
      //this.apiService.getEmp()
        //.subscribe(employee =>
        //  this.employee = employee);
        console.log(employee['status']);
        console.log(employee['data']);
     // this.getEmps();
    });
}

}