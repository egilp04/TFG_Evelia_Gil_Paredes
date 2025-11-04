import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ClienteModel } from '../models/Cliente';
@Injectable({
  providedIn: 'root',
})
export class Cliente {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertCliente(newCliente: ClienteModel): Observable<void> {
    return from(this.clientSupaBase.from('cliente').insert(newCliente)).pipe(
      map(({ error }) => {
        if (error) throw Error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  deleteCliente(id_delete: number): Observable<void> {
    if (typeof id_delete !== 'number' || Number.isNaN(id_delete)) {
      return throwError(() => new Error('ID debe ser número.'));
    }
    return from(this.clientSupaBase.from('cliente').delete().eq('id_usuario', id_delete)).pipe(
      map(({ error }) => {
        if (error) throw Error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateCliente(id: number, changes: Partial<ClienteModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      return throwError(() => new Error('Id debe ser número'));
    return from(this.clientSupaBase.from('cliente').update(changes).eq('id_usuario', id)).pipe(
      map(({ error }) => {
        if (error) throw Error;
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllCliente(): Observable<ClienteModel[]> {
    return from(this.clientSupaBase.from('cliente').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw Error;
        return (data ?? []) as ClienteModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getClienteByID(id: number): Observable<ClienteModel> {
    if (typeof id !== 'number' || Number.isNaN(id))
      return throwError(() => new Error('Id debe ser numérico'));
    return from(this.clientSupaBase.from('cliente').select('*').eq('id_usuario', id).single()).pipe(
      map(({ data, error }) => {
        if (error) throw Error;
        return data as ClienteModel;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
