import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * EntityModuleController Routes
 * Generated from SpecVerse specification
 *
 * Model: EntityModule
 * Operations: create, retrieve, list, update, evolve, delete, validate, , , 
 */
export default async function EntityModuleRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.EntityModuleController;

  // create EntityModule
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const entitymodule = await handler.create(request.body as any);
        return reply.status(201).send(entitymodule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create entitymodule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve EntityModule
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const entitymodule = await handler.retrieve(id);
      
        if (!entitymodule) {
          return reply.status(404).send({ error: 'EntityModule not found' });
        }
      
        return reply.send(entitymodule);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve entitymodule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list EntityModule
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const entitymodules = await handler.retrieveAll();
        return reply.send(entitymodules);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list entitymodules',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update EntityModule
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const entitymodule = await handler.update(id, request.body as any);
        return reply.send(entitymodule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update entitymodule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // evolve EntityModule
  fastify.patch('/:id/evolve', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const entitymodule = await handler.evolve(id, request.body as any);
        return reply.send(entitymodule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to evolve entitymodule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete EntityModule
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete entitymodule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate EntityModule
  fastify.post('/validate', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { data, operation: op } = request.body as { data: any; operation: string };
        const result = handler.validate(data, { operation: op });
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Validation failed',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // attachProfile EntityModule
  fastify.get('/attach-profile', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await handler.attachProfile(request.body as any);
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to execute attachProfile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // detachProfile EntityModule
  fastify.get('/detach-profile', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await handler.detachProfile(request.body as any);
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to execute detachProfile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // hasProfile EntityModule
  fastify.get('/has-profile', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await handler.hasProfile(request.body as any);
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to execute hasProfile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
}
