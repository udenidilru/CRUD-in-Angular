import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private service: EmployeeService,
              private firestore: AngularFirestore,
              private toastr: ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
   if(form != null){
   form.resetForm();
   }
   this.service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: '' ,
    };
  }

onSubmit(form: NgForm){
  const data = form.value;
  this.firestore.collection('employees').add(data);
  this.resetForm(form);
  this.toastr.success('Submitted successfully' , 'Employee Register');
}

}
