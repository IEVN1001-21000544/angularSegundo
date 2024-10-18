import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

interface Resistencia {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
  valor: number;
  valorMaximo: number;
  valorMinimo: number;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './resistencias.component.html',
  styles: ``
})
export default class ResistenciasComponent {
  primeraBanda: string = '';
  segundaBanda: string = '';
  terceraBanda: string = '';
  tolerancia: string = '';
  resistencias: Resistencia[] = [];

  constructor() {
    this.cargarDatosDesdeLocalStorage(); 
  }

  cargarDatosDesdeLocalStorage(): void {
    const datosGuardados = localStorage.getItem('resistencias');
    if (datosGuardados) {
      this.resistencias = JSON.parse(datosGuardados);
    }
  }

  calcularResistencia(): Resistencia | undefined {
    const valores: { [key: string]: number } = {
        negro: 0,
        cafe: 1,
        rojo: 2,
        naranja: 3,
        amarillo: 4,
        verde: 5,
        azul: 6,
        violeta: 7,
        gris: 8,
        blanco: 9
    };
    const multiplicadores: { [key: string]: number } = {
        negro: 1,
        cafe: 10,
        rojo: 100,
        naranja: 1000,
        amarillo: 10000,
        verde: 100000,
        azul: 1000000,
        violeta: 10000000,
        gris: 100000000,
        blanco: 1000000000
    };
    const tolerancias: { [key: string]: number } = {
        oro: 5,
        plata: 10
    };

    if (!this.primeraBanda || !this.segundaBanda || !this.terceraBanda || !this.tolerancia) {
        console.error('Por favor, selecciona todas las bandas de color y la tolerancia');
        return; 
    }

    const valorBase = (valores[this.primeraBanda] * 10 + valores[this.segundaBanda]) * multiplicadores[this.terceraBanda];
    const toleranciaValor = tolerancias[this.tolerancia];
    const valorMaximo = valorBase * (1 + toleranciaValor / 100);
    const valorMinimo = valorBase * (1 - toleranciaValor / 100);

    return {
        color1: this.primeraBanda,
        color2: this.segundaBanda,
        color3: this.terceraBanda,
        tolerancia: this.tolerancia,
        valor: valorBase,
        valorMaximo,
        valorMinimo
    };
  }

  guardarResistencia(): void {
    const nuevaResistencia = this.calcularResistencia();
    if (!nuevaResistencia) {
        console.error('No se pudo guardar la resistencia. Asegúrate de que todas las bandas y la tolerancia estén seleccionadas.');
        return; 
    }
    
    // Guardar en localStorage
    const resistenciasGuardadas = JSON.parse(localStorage.getItem('resistencias') || '[]');
    resistenciasGuardadas.push(nuevaResistencia);
    localStorage.setItem('resistencias', JSON.stringify(resistenciasGuardadas));

    console.log('Resistencia guardada:', nuevaResistencia); 
    this.limpiarFormulario(); 
}

imprimirTabla(): void {
  const resistenciasGuardadas = JSON.parse(localStorage.getItem('resistencias') || '[]');
  if (resistenciasGuardadas.length > 0) {
      this.resistencias = resistenciasGuardadas; 
      console.table(this.resistencias); 
  } else {
      console.warn('No hay resistencias guardadas para mostrar.'); 
  }
}

limpiarTabla(): void {
  this.resistencias = []; 
  console.log('Tabla limpiada.'); 
}

  limpiarFormulario(): void {
    this.primeraBanda = '';
    this.segundaBanda = '';
    this.terceraBanda = '';
    this.tolerancia = '';
  }

  getColor(color: string): string {
    const colors: { [key: string]: string } = { 
      negro: '#000000',
      cafe: '#8B4513',
      rojo: '#FF0000',
      naranja: '#FFA500',
      amarillo: '#FFFF00',
      verde: '#008000',
      azul: '#0000FF',
      violeta: '#8A2BE2',
      gris: '#808080',
      blanco: '#FFFFFF',
    };
    return colors[color as keyof typeof colors] || '#FFFFFF'; 
  }
}
