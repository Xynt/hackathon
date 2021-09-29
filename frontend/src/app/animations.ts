import {animate, group, query, state, style, transition, trigger} from '@angular/animations';

export const slideIn = trigger('routeAnimations', [
  transition('* <=> *', [
    style({position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0
      })
    ], {optional: true}),
    query(':enter', [
      style({left: '100%'})
    ], {optional: true}),
    group([
      query(':enter', [
        animate('300ms ease-out', style({left: '0%'}))
      ], {optional: true}),
      query(':leave', [
        animate('300ms ease-out', style({left: '-100%'}))
      ], {optional: true})
    ])
  ])
]);

/*export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        opacity: 0,
        transform: 'scale(0) translateY(100%)',
      })
    ]),
    query(':enter', [
      animate('600ms ease',
        style({opacity: 1, transform: 'scale(1) translateY(0)'})
        )
    ])
  ])
]);*/

export const teamOverview = trigger('teamReveal', [
  state('hide', style({
    opacity: 0
  })),
  state('show', style({
    opacity: 1
  })),
  transition('hide => show', animate('600ms ease-in')),
])
