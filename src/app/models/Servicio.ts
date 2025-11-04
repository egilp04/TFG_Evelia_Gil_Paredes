export interface ServicioModel {
  id_servicio?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  id_empresa: number;
  tipo_servicio: 'alimentacion' | 'limpieza' | 'cuidados personales';
}
