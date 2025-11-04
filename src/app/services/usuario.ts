import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioModel } from '../models/Usuario';
@Injectable({
  providedIn: 'root',
})
export class Usuario {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertUsuario(newUsuario: UsuarioModel): Observable<void> {
    return from(this.clientSupaBase.from('usuario').insert(newUsuario)).pipe(
      map(({ error }) => {
        if (error) throw error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  deleteUsuario(id: number) {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('El id debe ser numérico'));
    return from(this.clientSupaBase.from('usuario').delete().eq('id_usuario', id)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as UsuarioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateUsuario(id: number, changes: Partial<UsuarioModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('El id debe ser numérico'));
    return from(this.clientSupaBase.from('usuario').update(changes).eq('id_usuario', id)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getAllUsuario(): Observable<UsuarioModel[]> {
    return from(this.clientSupaBase.from('usuario').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as UsuarioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }

  getUsuarioById(id: number) {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('El id debe ser numérico'));
    return from(this.clientSupaBase.from('usuario').select('*').eq('id_usuario', id)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as UsuarioModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
