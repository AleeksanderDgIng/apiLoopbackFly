import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ruta,
  Aeropuerto,
} from '../models';
import {RutaRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate("admin") // servicio web que si requiere token
export class RutaAeropuertoController {
  constructor(
    @repository(RutaRepository)
    public rutaRepository: RutaRepository,
  ) { }

  @get('/rutas/{id}/aeropuerto', {
    responses: {
      '200': {
        description: 'Aeropuerto belonging to Ruta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aeropuerto)},
          },
        },
      },
    },
  })
  async getAeropuerto(
    @param.path.string('id') id: typeof Ruta.prototype.id,
  ): Promise<Aeropuerto> {
    return this.rutaRepository.destinoFk(id);
  }
}
