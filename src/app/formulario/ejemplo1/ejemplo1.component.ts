import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styles: ``,
})
export default class Ejemplo1Component implements OnInit {
  formGroup!: FormGroup;

  mostrarDatos: boolean = false; 
  persona: Usuario = {
    nombre: '',
    edad: 0,
    email: '',
  };

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      edad: [''],
      email: [''],
    });
  }

  onSubmit(): void {
    const { nombre, edad, email } = this.formGroup.value;
    this.persona.nombre = nombre;
    this.persona.edad = edad;
    this.persona.email = email;
    let personaJSON = JSON.stringify(this.persona);
    localStorage.setItem('persona', personaJSON);
    
    this.formGroup.reset(); // Opcional: reiniciar el formulario después de enviar
  }

  subImprime(): void {
    const usuarioGuardado = localStorage.getItem('persona');
    console.log('Usuario guardado:', usuarioGuardado); // Verifica si hay datos guardados
    if (usuarioGuardado) {
      const usuarioRecuperado: Usuario = JSON.parse(usuarioGuardado);
      console.log('Usuario recuperado:', usuarioRecuperado); // Verifica los datos recuperados
      this.persona = usuarioRecuperado; // Actualiza la variable persona con los datos recuperados
      this.mostrarDatos = true; // Cambia la bandera para mostrar los datos
    } 
  }
  
  
}
