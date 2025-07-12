import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TareasService, Tarea } from '../tareas.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {
  tareas: Tarea[] = [];
  displayedColumns: string[] = ['index', 'titulo', 'descripcion', 'estado'];

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.tareas$.subscribe(t => {
      this.tareas = t;
    });
  }
}
