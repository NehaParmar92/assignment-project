import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  pageSize = 5;
  pageIndex = 0;
  displayedColumns: string[] = ['title', 'date', 'location', 'description', 'actions'];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  get paginatedEvents(): Event[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEvents.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  applyFilter(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();

    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(filterValue) ||
      event.location.toLowerCase().includes(filterValue)
    );
  }

  viewEvent(id: number): void {
    this.router.navigate(['/events', id]);
  }

  editEvent(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id);
    this.loadEvents(); 
  }
}
