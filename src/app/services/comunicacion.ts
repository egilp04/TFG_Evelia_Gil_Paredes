import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ComunicacionModel } from '../models/Comunicacion';

@Injectable({
  providedIn: 'root',
})
export class Comunicacion {
  private readonly tiposValidos = ['mensaje', 'notificacion'] as const;

  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  // métodos CRUD
  insertComunicacion(comunicacion: ComunicacionModel): Observable<void> {
    if (!this.tiposValidos.includes(comunicacion.tipo_comunicacion)) {
      return throwError(
        () => new Error('tipo_comunicacion inválido. Debe ser "mensaje" o "notificacion".')
      );
    }
    return from(this.clientSupaBase.from('comunicacion').insert(comunicacion)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  deleteComunicacion(id: number): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id)) {
      return throwError(() => new Error('ID debe ser número.'));
    }
    return from(this.clientSupaBase.from('comunicacion').delete().eq('id', id)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  updateComunicacion(id: number, changes: Partial<ComunicacionModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      return throwError(() => new Error('ID debe ser número.'));

    if (changes.tipo_comunicacion && !this.tiposValidos.includes(changes.tipo_comunicacion))
      return throwError(() => new Error('tipo_comunicacion inválido.'));

    return from(this.clientSupaBase.from('comunicacion').update(changes).eq('id', id)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getComunicacionByUserAndType(
    id_usuario: string,
    tipo: 'mensaje' | 'notificacion'
  ): Observable<ComunicacionModel[]> {
    if (typeof id_usuario !== 'number' || Number.isNaN(id_usuario))
      return throwError(() => new Error('ID debe ser número.'));

    if (!this.tiposValidos.includes(tipo))
      return throwError(
        () => new Error('tipo_comunicacion inválido. Debe ser "mensaje" o "notificacion".')
      );

    return from(
      this.clientSupaBase
        .from('comunicacion')
        .select('*')
        .eq('id_usuario', id_usuario)
        .eq('tipo_comunicacion', tipo)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as ComunicacionModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getComunicacionByUser(id_usuario: string): Observable<ComunicacionModel[]> {
    if (typeof id_usuario !== 'number' || Number.isNaN(id_usuario))
      return throwError(() => new Error('ID debe ser número.'));

    return from(
      this.clientSupaBase
        .from('comunicacion')
        .select('*')
        .eq('id_usuario', id_usuario)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as ComunicacionModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getComunicacionByType(tipo: 'mensaje' | 'notificacion'): Observable<ComunicacionModel[]> {
    if (!this.tiposValidos.includes(tipo))
      return throwError(
        () => new Error('tipo_comunicacion inválido. Debe ser "mensaje" o "notificacion".')
      );

    return from(
      this.clientSupaBase
        .from('comunicacion')
        .select('*')
        .eq('tipo_comunicacion', tipo)
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as ComunicacionModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getAllComunicacion(): Observable<ComunicacionModel[]> {
    return from(
      this.clientSupaBase
        .from('comunicacion')
        .select('*')
        .order('fecha_creacion', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as ComunicacionModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
