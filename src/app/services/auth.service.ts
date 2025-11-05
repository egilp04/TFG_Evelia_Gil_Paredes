import { Injectable, inject } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { AuthResponse } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService).getClient();

  //Registro
  signUp(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabase.auth.signUp({ email, password })).pipe(
      map((res) => {
        if (res.error) throw res.error;
        return res;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  //Inicio de sesión
  signIn(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabase.auth.signInWithPassword({ email, password })).pipe(
      map((res) => {
        if (res.error) throw res.error;
        return res;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  //Cerrar sesión
  signOut(): Observable<void> {
    return from(this.supabase.auth.signOut()).pipe(
      map(({ error }) => {
        if (error) throw error;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  //Obtener usuario actual
  getUser() {
    return from(this.supabase.auth.getUser()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data.user;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
