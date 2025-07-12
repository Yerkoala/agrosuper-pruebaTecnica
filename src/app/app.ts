import { Component, signal } from '@angular/core';
import { TareasListComponent } from './tareas/tareas-list/tareas-list.component';
import { TareaFormComponent } from './tareas/tarea-form/tarea-form.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TareasListComponent, TareaFormComponent, HttpClientModule ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  protected readonly title = signal('agrosuper');
}
