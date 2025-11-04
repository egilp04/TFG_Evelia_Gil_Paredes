import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HorarioModel } from '../models/Horario';
@Injectable({
  providedIn: 'root',
})
export class Horario {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertHorario(newHorario: HorarioModel): Observable<void> {
    return from(this.clientSupaBase.from('horario').insert(newHorario)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  deleteHorario(id: number): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });
    return from(this.clientSupaBase.from('horario').delete().eq('id_horario', id)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  updateHorario(id: number, changes: Partial<HorarioModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });
    return from(this.clientSupaBase.from('horario').update(changes).eq('id_horario', id)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllHorario(): Observable<HorarioModel[]> {
    return from(this.clientSupaBase.from('horario').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return (data ?? []) as HorarioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
