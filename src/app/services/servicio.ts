import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ServicioModel } from '../models/Servicio';
@Injectable({
  providedIn: 'root',
})
export class Servicio {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();
  private readonly tiposValidos = ['limpieza', 'alimentacion', 'cuidados personales'] as const;

  insertServicio(newServicio: ServicioModel): Observable<void> {
    if (!this.tiposValidos.includes(newServicio.tipo_servicio)) {
      return throwError(
        () =>
          new Error(
            'tipo de servicio inválido. Debe ser "alimentacion" o "limpieza" o "cuidados personales".'
          )
      );
    }
    return from(this.clientSupaBase.from('servicio').insert(newServicio)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  deleteServicio(id: number): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });
    return from(this.clientSupaBase.from('servicio').delete().eq('id_servicio', id)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateServicio(id: number, changes: Partial<ServicioModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });
    if (changes.tipo_servicio && !this.tiposValidos.includes(changes.tipo_servicio))
      return throwError(() => new Error('tipo servicio inválido.'));

    return from(this.clientSupaBase.from('servicio').update(changes).eq('id_servicio', id)).pipe(
      map(({ error }) => {
        if (error) throwError;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllServicio(): Observable<ServicioModel[]> {
    return from(this.clientSupaBase.from('servicio').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return (data ?? []) as ServicioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getServicioById(id: number): Observable<ServicioModel> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });

    return from(
      this.clientSupaBase.from('servicio').select('*').eq('id_servicio', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return data as ServicioModel;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getServicioByIdEmpresa(id: number): Observable<ServicioModel> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => {
        new Error('ID debe ser numérico');
      });

    return from(
      this.clientSupaBase.from('servicio').select('*').eq('id_empresa', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throwError;
        return data as ServicioModel;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
