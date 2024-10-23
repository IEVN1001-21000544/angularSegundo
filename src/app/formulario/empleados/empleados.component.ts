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
    imports: [FormsModule, CommonModule],
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
    empleadoSeleccionado: Empleado | null = null;

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

    actualizarEmpleado() {
    const index = this.empleados.findIndex(emp => emp.matricula === this.empleado.matricula);
    if (index !== -1) {
        this.empleados[index] = { ...this.empleado }; 
        this.guardarEmpleados();
        this.limpiarFormulario(); 
        this.empleadoSeleccionado = null; 
    } else {
        alert('Empleado no encontrado para actualizar.');
    }
}
seleccionarEmpleado(empleado: Empleado) {
    this.empleadoSeleccionado = empleado; 
    this.empleado = { ...empleado }; 
}

    cargarDatosEmpleado() {
    const empleadoEncontrado = this.empleados.find(emp => emp.matricula === this.empleado.matricula);
    if (empleadoEncontrado) {
        this.empleado = { ...empleadoEncontrado };
        this.empleadoSeleccionado = empleadoEncontrado; 
    } else {
        this.limpiarFormulario();
        this.empleadoSeleccionado = null; 
    }
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

    modificarEmpleado() {
    if (this.empleadoSeleccionado) {
        const index = this.empleados.findIndex(emp => emp.matricula === this.empleadoSeleccionado?.matricula);
        if (index !== -1) {
            this.empleados[index] = { ...this.empleado }; 
            this.guardarEmpleados();
            this.limpiarFormulario();
            this.empleadoSeleccionado = null; 
        } else {
            alert('Empleado no encontrado para modificar.');
        }
    } else {
        alert('Por favor, seleccione un empleado para modificar.');
    }
}

    eliminarEmpleado() {
    if (this.empleadoSeleccionado) {
        this.empleados = this.empleados.filter(emp => emp.matricula !== this.empleadoSeleccionado!.matricula);
        this.guardarEmpleados();
        this.limpiarFormulario();
        this.empleadoSeleccionado = null;
    } else {
        alert('Por favor, seleccione un empleado para eliminar.');
    }
}


    calcularMonto(horasTrabajadas: number): number {
        const tarifaRegular = 70;
        const tarifaExtra = 140; 
        const horasRegulares = 40; 

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
        let totalAPagar = 0;

        for (const empleado of this.empleados) {
            totalAPagar += this.calcularMonto(empleado.horasTrabajadas); 
        }

        return totalAPagar; 
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
        this.empleadoSeleccionado = null; 
    }
}
