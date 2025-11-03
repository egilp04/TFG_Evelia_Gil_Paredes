import { TestBed } from '@angular/core/testing';

import { ServicioHorario } from './servicio-horario';

describe('ServicioHorario', () => {
  let service: ServicioHorario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioHorario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
