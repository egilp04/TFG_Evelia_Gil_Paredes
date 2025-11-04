import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EmpresaModel } from '../models/Empresa';
@Injectable({
  providedIn: 'root',
})
export class Empresa {
  private supabaseService = inject(SupabaseService);
  private clientSupaBase = this.supabaseService.getClient();

  insertEmpresa(newEmpresa: EmpresaModel): Observable<void> {
    return from(this.clientSupaBase.from('empresa').insert(newEmpresa)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  deleteEmpresa(id: number): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id inválido, debe ser número'));
    return from(this.clientSupaBase.from('empresa').delete().eq('id_usuario', id)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  updateEmpresa(id: number, changes: Partial<EmpresaModel>): Observable<void> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id inválido, debe ser número'));
    return from(this.clientSupaBase.from('empresa').update(changes).eq('id_usuario', id)).pipe(
      map(({ error }) => {
        if (error) {
          throwError;
          return;
        }
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getAllEmpresa(): Observable<EmpresaModel[]> {
    return from(this.clientSupaBase.from('empresa').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as EmpresaModel[];
      }),
      catchError((err) => throwError(() => err))
    );
  }
  getEmpresaByID(id: number): Observable<EmpresaModel> {
    if (typeof id !== 'number' || Number.isNaN(id))
      throwError(() => new Error('Id inválido, debe ser número'));
    return from(this.clientSupaBase.from('empresa').select('*').eq('id_usuairo', id).single()).pipe(
      map(({ data, error }) => {
        if (error) throw Error;
        return data as EmpresaModel;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  // getEmpresaByTypeService(tipo:string): Observable<EmpresaModel[]> {
  //   return from().pipe(
  //     map(({ data, error }) => {
  //       if (error) throw Error;
  //       return (data ?? []) as EmpresaModel[];
  //     }),
  //     catchError((err) => throwError(() => err))
  //   );
  // }
}
