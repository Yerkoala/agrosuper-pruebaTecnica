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
    this.http.get<Tarea[]>('assets/tareas.json').subscribe(tareas => {
      this.tareasSubject.next(tareas);
    });
  }

  agregarTarea(tarea: Tarea) {
    const tareas = this.tareasSubject.value;
    const nuevaTarea = { ...tarea, id: tareas.length + 1 };
    this.tareasSubject.next([...tareas, nuevaTarea]);
  }

  marcarComoCompletada(id: number) {
    const tareas = this.tareasSubject.value.map(t =>
      t.id === id ? { ...t, completada: true } : t
    );
    this.tareasSubject.next(tareas);
  }
}
