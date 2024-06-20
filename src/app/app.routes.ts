import { Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
// import { CalendarViewComponent } from './calendar-view/calendar-view.component';

export const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'events/new', component: EventFormComponent },
  { path: 'events/edit/:id', component: EventFormComponent },
  { path: 'events/:id', component: EventDetailsComponent },
//   { path: 'calendar', component: CalendarViewComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/events' } 
];
