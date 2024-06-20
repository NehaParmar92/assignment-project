import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = [
    { id: 1, title: 'Angular Meetup 1', date: new Date('2023-06-01'), location: 'Online', description: 'Learn about Angular' },
    { id: 2, title: 'React Workshop', date: new Date('2023-07-15'), location: 'Virtual', description: 'Deep dive into React' },
    { id: 3, title: 'Vue.js Conference', date: new Date('2023-08-20'), location: 'Hybrid (Online & Offline)', description: 'Explore Vue.js ecosystem' },
    { id: 4, title: 'Node.js Hackathon', date: new Date('2023-09-10'), location: 'In-Person', description: 'Building scalable applications with Node.js' },
    { id: 5, title: 'Python Summit', date: new Date('2023-10-05'), location: 'Online', description: 'Discover the latest in Python development' },
    { id: 6, title: 'Java Conference', date: new Date('2023-11-12'), location: 'Virtual', description: 'Updates on Java technology' },
    { id: 7, title: 'AWS Workshop', date: new Date('2023-12-03'), location: 'In-Person', description: 'Hands-on experience with AWS services' },
    { id: 8, title: 'Docker Meetup', date: new Date('2024-01-15'), location: 'Online', description: 'Containerization with Docker' },
    { id: 9, title: 'Kubernetes Summit', date: new Date('2024-02-20'), location: 'Virtual', description: 'Scaling with Kubernetes' },
    { id: 10, title: 'Machine Learning Expo', date: new Date('2024-03-10'), location: 'Hybrid (Online & Offline)', description: 'Advancements in AI and ML' }
  
  ];

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getEventById(id: number): Observable<Event | undefined> {
    return of(this.events.find(event => event.id === id));
  }

  addEvent(event: Event): Observable<void> {
    this.events.push({ ...event, id: this.events.length + 1 });
    return of(void 0); 
  }

  updateEvent(updatedEvent: Event): Observable<void> {
    const index = this.events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
    return of(void 0); 
  }

  deleteEvent(id: number): Observable<void> {
    this.events = this.events.filter(event => event.id !== id);
    return of(void 0);
  }
}
