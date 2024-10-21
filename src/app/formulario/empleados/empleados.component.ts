import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule,  CommonModule],
  templateUrl: './empleados.component.html',
  styles: ``
})
export default class EmpleadosComponent {
  empleado: Empleado = {
    matricula: '',
    nombre: '',
    correo: '',
    edad: 0,
    horasTrabajadas: 0,
  };

  empleados: Empleado[] = [];
  mostrarTabla: boolean = false; 

  constructor() {
    this.cargarEmpleados();
  }

  agregarEmpleado(event: Event) {
    event.preventDefault();
    
    const index = this.empleados.findIndex(emp => emp.matricula === this.empleado.matricula);
    if (index !== -1) {
      this.actualizarEmpleado();
      return;
    }
  
    this.empleados.push({ ...this.empleado });
    this.guardarEmpleados();
    this.limpiarFormulario();
  }
  

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados() {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
    }
  }

  modificarEmpleado(matricula: string) {
    const index = this.empleados.findIndex(emp => emp.matricula === matricula);
    if (index !== -1) {
      this.empleado = { ...this.empleados[index] };
    }
  }

  actualizarEmpleado() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.empleado.matricula);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleado };
      this.guardarEmpleados();
      this.limpiarFormulario();
    } else {
      alert('Empleado no encontrado.');
    }
  }
  

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    this.guardarEmpleados();
  }

  calcularMonto(horasTrabajadas: number): number {
    const tarifaRegular = 70; // Tarifa por hora normal
    const tarifaExtra = 140; // Tarifa por hora extra
    const horasRegulares = 40; // Límite de horas regulares

    let montoTotal: number;

    if (horasTrabajadas > horasRegulares) {
        const horasExtra = horasTrabajadas - horasRegulares;
        const montoHorasRegulares = horasRegulares * tarifaRegular;
        const montoHorasExtras = horasExtra * tarifaExtra;
        montoTotal = montoHorasRegulares + montoHorasExtras;
    } else {
        montoTotal = horasTrabajadas * tarifaRegular;
    }

    return montoTotal;
}

calcularTotalAPagar(): number {
  let totalAPagar = 0; // Inicializa el total a 0

  // Recorre la lista de empleados
  for (const empleado of this.empleados) {
      totalAPagar += this.calcularMonto(empleado.horasTrabajadas); // Suma el monto de cada empleado
  }

  return totalAPagar; // Devuelve el total a pagar
}

  imprimirEmpleados() {
    this.mostrarTabla = true;
    const total = this.calcularTotalAPagar(); 
    console.log(`Total a pagar por todos los empleados: $${total}`);
  }
  ocultarTabla() {
    this.mostrarTabla = false;
  }

  limpiarFormulario() {
    this.empleado = {
      matricula: '',
      nombre: '',
      correo: '',
      edad: 0,
      horasTrabajadas: 0,
    };
  }
}
