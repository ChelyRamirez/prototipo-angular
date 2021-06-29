import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExcelComponent } from './reporte-excel.component';

describe('ReporteExcelComponent', () => {
  let component: ReporteExcelComponent;
  let fixture: ComponentFixture<ReporteExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
