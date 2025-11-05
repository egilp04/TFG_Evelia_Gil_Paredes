export interface ContratoModel {
  id_contrato?: number;
  id_usuario: number;
  id_servicio_horario: number;
  estado: 'activo' | 'no activo';
  fecha_inicio: string;
  fecha_fin: string;
}
