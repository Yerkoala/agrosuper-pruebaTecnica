import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TareasService, Tarea } from '../tareas.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {
  tareas: Tarea[] = [];
  displayedColumns: string[] = ['index', 'titulo', 'descripcion', 'estado', 'acciones'];


  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.tareasService.tareas$.subscribe(t => {
      this.tareas = t;
    });
  }

  eliminarTarea(id: number) {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmado) {
      this.tareasService.eliminarTarea(id);
    }
  }

  editarTarea(tarea: Tarea) {
    const nuevoTitulo = prompt('Editar título:', tarea.titulo);
    const nuevaDescripcion = prompt('Editar descripción:', tarea.descripcion);

    if (nuevoTitulo !== null && nuevaDescripcion !== null) {
      this.tareasService.editarTarea(tarea.id, {
        titulo: nuevoTitulo,
        descripcion: nuevaDescripcion
      });
    }
  }


}
