export interface HorarioModel {
  id_horario?: number;
  dia_semana: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes';
  hora: string;
}
