import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vuelo,
  Ruta,
} from '../models';
import {VueloRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate("admin") // servicio web que si requiere token
export class VueloRutaController {
  constructor(
    @repository(VueloRepository)
    public vueloRepository: VueloRepository,
  ) { }

  @get('/vuelos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Ruta belonging to Vuelo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ruta)},
          },
        },
      },
    },
  })
  async getRuta(
    @param.path.string('id') id: typeof Vuelo.prototype.id,
  ): Promise<Ruta> {
    return this.vueloRepository.rutaFk(id);
  }
}
