import {animate, state, style, transition, trigger} from '@angular/animations';

export const teamOverview = trigger('teamReveal', [
  state('hide', style({
    opacity: 0
  })),
  state('show', style({
    opacity: 1
  })),
  transition('hide => show', animate('600ms ease-in')),
])
