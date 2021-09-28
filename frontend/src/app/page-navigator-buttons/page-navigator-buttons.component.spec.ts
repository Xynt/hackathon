import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigatorButtonsComponent } from './page-navigator-buttons.component';

describe('PageNavigatorButtonsComponent', () => {
  let component: PageNavigatorButtonsComponent;
  let fixture: ComponentFixture<PageNavigatorButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNavigatorButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavigatorButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
