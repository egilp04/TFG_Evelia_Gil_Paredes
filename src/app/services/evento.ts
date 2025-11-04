import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventoModel } from '../models/Evento';
@Injectable({
  providedIn: 'root',
})
export class Evento {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertEvento(newEvento: EventoModel): Observable<void> {
    return from(this.clientSupaBase.from('evento').insert(newEvento)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  deleteEvento(id: number): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id debe ser numérico'));
    return from(this.clientSupaBase.from('evento').delete().eq('id_evento', id)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateEvento(id: number, changes: Partial<EventoModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id debe ser numérico'));
    return from(this.clientSupaBase.from('evento').update(changes).eq('id_evento', id)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllEvento(): Observable<EventoModel[]> {
    return from(this.clientSupaBase.from('evento').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return (data ?? []) as EventoModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getEventoByUsuarioId(id: number): Observable<EventoModel[]> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id debe ser numérico'));
    return from(this.clientSupaBase.from('evento').select('*').eq('id_usuario', id)).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return (data ?? []) as EventoModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
