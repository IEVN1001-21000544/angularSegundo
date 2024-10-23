import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styles: ``
})
export class AddMessageComponent implements OnInit {
  formGorup!: FormGroup;

  constructor(private readonly fb: FormBuilder, public messageService: MessageserviceService) { }
  alumno:string="";

  ngOnInit(): void {
    this.formGorup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
    })
  }

  addAlumno(){
    let {nombre} = this.formGorup.value;
    this.messageService.add(nombre);
    this.formGorup.get('nombre')?.setValue('')
  }

  
}
