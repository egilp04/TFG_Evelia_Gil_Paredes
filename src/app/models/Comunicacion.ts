export interface ComunicacionModel {
  id_comunicacion?: number;
  id_emisor: number;
  id_receptor: number;
  fecha: string;
  tipo_comunicacion: 'mensaje' | 'notificacion';
  contenido: string;
}
