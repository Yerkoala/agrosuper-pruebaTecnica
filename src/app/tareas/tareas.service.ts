import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareasSubject = new BehaviorSubject<Tarea[]>([]);
  tareas$ = this.tareasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarTareas();
  }

  private cargarTareas() {
    this.http.get<Tarea[]>('assets/tareas.json').subscribe({
      next: tareas => {
        console.log('Tareas cargadas desde JSON:', tareas);
        this.tareasSubject.next(tareas);
      },
      error: err => {
        console.error('Error al cargar tareas desde JSON:', err);
      }
    });
  }

  agregarTarea(tarea: Tarea) {
    const tareas = this.tareasSubject.value;
    const nuevaTarea = { ...tarea, id: tareas.length + 1 };
    this.tareasSubject.next([...tareas, nuevaTarea]);
  }

  eliminarTarea(id: number) {
    const tareas = this.tareasSubject.value.filter(t => t.id !== id);
    this.tareasSubject.next(tareas);
  }

  editarTarea(id: number, tareaEditada: Partial<Tarea>) {
    const tareas = this.tareasSubject.value.map(t =>
      t.id === id ? { ...t, ...tareaEditada } : t
    );
    this.tareasSubject.next(tareas);
  }



  marcarComoCompletada(id: number) {
    const tareas = this.tareasSubject.value.map(t =>
      t.id === id ? { ...t, completada: true } : t
    );
    this.tareasSubject.next(tareas);
  }
}
