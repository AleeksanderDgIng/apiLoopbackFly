import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Vuelo} from '../models';
import {VueloRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate("admin") // servicio web que si requiere token
export class VueloController {
  constructor(
    @repository(VueloRepository)
    public vueloRepository: VueloRepository,
  ) { }

  @authenticate.skip() // servicio web que no requiere token
  @post('/vuelos')
  @response(200, {
    description: 'Vuelo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vuelo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {
            title: 'NewVuelo',
            exclude: ['id'],
          }),
        },
      },
    })
    vuelo: Omit<Vuelo, 'id'>,
  ): Promise<Vuelo> {
    return this.vueloRepository.create(vuelo);
  }

  @get('/vuelos/count')
  @response(200, {
    description: 'Vuelo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vuelo) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.vueloRepository.count(where);
  }

  @get('/vuelos')
  @response(200, {
    description: 'Array of Vuelo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vuelo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vuelo) filter?: Filter<Vuelo>,
  ): Promise<Vuelo[]> {
    return this.vueloRepository.find(filter);
  }

  @patch('/vuelos')
  @response(200, {
    description: 'Vuelo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {partial: true}),
        },
      },
    })
    vuelo: Vuelo,
    @param.where(Vuelo) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.vueloRepository.updateAll(vuelo, where);
  }

  @get('/vuelos/{id}')
  @response(200, {
    description: 'Vuelo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vuelo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vuelo, {exclude: 'where'}) filter?: FilterExcludingWhere<Vuelo>
  ): Promise<Vuelo> {
    return this.vueloRepository.findById(id, filter);
  }

  @patch('/vuelos/{id}')
  @response(204, {
    description: 'Vuelo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {partial: true}),
        },
      },
    })
    vuelo: Vuelo,
  ): Promise<void> {
    await this.vueloRepository.updateById(id, vuelo);
  }

  @put('/vuelos/{id}')
  @response(204, {
    description: 'Vuelo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vuelo: Vuelo,
  ): Promise<void> {
    await this.vueloRepository.replaceById(id, vuelo);
  }

  @del('/vuelos/{id}')
  @response(204, {
    description: 'Vuelo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vueloRepository.deleteById(id);
  }
}
