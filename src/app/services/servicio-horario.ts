import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Servicio_HorarioModel } from '../models/Servicio_Horario';
@Injectable({
  providedIn: 'root',
})
export class ServicioHorario {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertServicioHorario(newServicioHorario: Servicio_HorarioModel): Observable<void> {
    return from(this.clientSupaBase.from('servicio_horario').insert(newServicioHorario)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  deleteServicioHorario(id: number): Observable<void> {
    return from(
      this.clientSupaBase.from('servicio_horario').delete().eq('id_servicio_horario', id)
    ).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateServicioHorario(id: number, changes: Partial<Servicio_HorarioModel>): Observable<void> {
    return from(
      this.clientSupaBase.from('servicio_horario').update(changes).eq('id_servicio_horario', id)
    ).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllServicioHorario(): Observable<Servicio_HorarioModel[]> {
    return from(this.clientSupaBase.from('servicio_horario').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return (data ?? []) as Servicio_HorarioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getServicioHorarioById(id: number): Observable<Servicio_HorarioModel> {
    return from(
      this.clientSupaBase
        .from('servicio_horario')
        .select('*')
        .eq('id_servicio_horario', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return data as Servicio_HorarioModel;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
