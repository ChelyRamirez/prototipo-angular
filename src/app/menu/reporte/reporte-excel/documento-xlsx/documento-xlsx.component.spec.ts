import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoXLSXComponent } from './documento-xlsx.component';

describe('DocumentoXLSXComponent', () => {
  let component: DocumentoXLSXComponent;
  let fixture: ComponentFixture<DocumentoXLSXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoXLSXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoXLSXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
