
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
 //Read Function
  ngOnInit(): void {
    this.apiService.getEmp().subscribe((data: any[])=>{
      console.log(data);
      this.empList=data['data'];
      
    });  


  }
  //Delete function
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
 //Read function  
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
  //Edit function
  editEmp() {
    
   
    let newEmp = {
      id: this.selectedEmp.id,
      name: this.selectedEmp.employee_name,
      salary: this.selectedEmp.employee_salary,
      age: this.selectedEmp.employee_age,
      image: this.selectedEmp.profile_image,
      };
    if(((this.selectedEmp.employee_name!='')&&(this.selectedEmp.employee_name!=null))&&((this.selectedEmp.employee_salary!='')&&(this.selectedEmp.employee_salary!=null))&&((this.selectedEmp.employee_age!='')&&(this.selectedEmp.employee_age!=null))){
    if((parseInt(JSON.stringify(this.selectedEmp.employee_salary))>=0)&&(parseInt(JSON.stringify(this.selectedEmp.employee_age))>0)){
      this.apiService.updateEmp(newEmp)
        .subscribe(result => {
          console.log('original Emp to be updated:' + result);
          Swal.fire(
            result['message'],          
            result['status'],
            'success'
          );
        });
       this.employee_name ='';
       this.employee_salary='';
       this.employee_age='';
         
      this.toggleForm = !this.toggleForm;
      }
      else{
        Swal.fire(
          'Error',          
          'Please give valid numeric values!',
          'error'
        ).then((result) => {
        location.reload();
        });
      }
    }
      else{
        Swal.fire(
          'Error',          
          'Please fill all the fields!',
          'error'
        ).then((result) => {
          location.reload();
          });
      }

  }
  //Create function
  addEmp() {
    
    const newEmp = {
      id: "",
      name: this.employee_name,
      salary: this.employee_salary,
      age: this.employee_age,
      image: this.profile_image,
      };
    if((this.employee_name!=null)&&(this.employee_salary!=null)&&(this.employee_age!=null)){
      if((parseInt(JSON.stringify(this.employee_salary))>=0)&&(parseInt(JSON.stringify(this.employee_age))>0)){
      this.apiService.addEmp(newEmp)
        .subscribe(employee => {
        this.empList.push(employee['data']);
          
            console.log(employee['status']);
            console.log(employee['data']);
        // this.getEmps();
        Swal.fire(
          employee['message'],          
          employee['status'],
          'success'
        );
        });
      this.employee_name ='';
      this.employee_salary='';
      this.employee_age='';
        
      }
      else{
        Swal.fire(
          'Error',          
          'Please give valid numeric values!',
          'error'
        );
      }
    }
    else{
      Swal.fire(
        'Error',          
        'Please fill all the fields!',
        'error'
      );
    }
  }

}