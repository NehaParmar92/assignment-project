import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = Number(id);
      this.eventService.getEventById(this.eventId).subscribe(event => {
        if (event) {
          this.eventForm.patchValue(event);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;
      if (this.eventId) {
        event.id = this.eventId;
        this.eventService.updateEvent(event).subscribe(() => {
          this.router.navigate(['/events']);
        });
      } else {
        this.eventService.addEvent(event).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }
    }
  }

  onDelete(): void {
    if (this.eventId) {
      this.eventService.deleteEvent(this.eventId).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}
