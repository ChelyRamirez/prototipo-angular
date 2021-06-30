import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPDFComponent } from './documento-pdf.component';

describe('DocumentoPDFComponent', () => {
  let component: DocumentoPDFComponent;
  let fixture: ComponentFixture<DocumentoPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
