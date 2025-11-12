export interface ContratoModel {
  id_contrato?: number;
  id_usuarioCliente: number;
  id_usuarioEmpresa: number;
  id_servicio_horario: number;
  estado: 'activo' | 'no activo';
  fecha_inicio: string;
  fecha_fin: string;
  dia_semana_copia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes';
  hora_copia: string;
}
