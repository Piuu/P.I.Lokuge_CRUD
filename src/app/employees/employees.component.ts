
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


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

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteEmp(id).subscribe((data: any[]) => {
          Swal.fire(
            data['message'],          
            data['status']
          );
          //console.log(data);
       
      });


        
     
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'         
          
        );
      }
    })




    
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
        Swal.fire(
          result['message'],          
          result['status'],
          'success'
        );
      });
    this.toggleForm = !this.toggleForm;


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
     Swal.fire(
      employee['message'],          
      employee['status'],
      'success'
    );
    });
}

}