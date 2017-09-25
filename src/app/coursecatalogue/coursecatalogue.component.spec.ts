import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecatalogueComponent } from './coursecatalogue.component';

describe('CoursecatalogueComponent', () => {
  let component: CoursecatalogueComponent;
  let fixture: ComponentFixture<CoursecatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursecatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
