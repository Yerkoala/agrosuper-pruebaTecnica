import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TareasService, Tarea } from '../tareas.service';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent {
  nuevaTarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    completada: false
  };

  constructor(private tareasService: TareasService) { }

  agregarTarea() {
    if (!this.nuevaTarea.titulo.trim() || !this.nuevaTarea.descripcion.trim()) {
      alert('Por favor completa el título y la descripción.');
      return;
    }
    this.tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = {
      id: 0,
      titulo: '',
      descripcion: '',
      completada: false
    };
  }
}
