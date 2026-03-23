import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * EntityRegistryController Routes
 * Generated from SpecVerse specification
 *
 * Model: EntityRegistry
 * Operations: create, retrieve, list, update, delete, validate, , , , , 
 */
export default async function EntityRegistryRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.EntityRegistryController;

  // create EntityRegistry
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const entityregistry = await handler.create(request.body as any);
        return reply.status(201).send(entityregistry);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create entityregistry',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve EntityRegistry
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const entityregistry = await handler.retrieve(id);
      
        if (!entityregistry) {
          return reply.status(404).send({ error: 'EntityRegistry not found' });
        }
      
        return reply.send(entityregistry);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve entityregistry',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list EntityRegistry
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const entityregistrys = await handler.retrieveAll();
        return reply.send(entityregistrys);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list entityregistrys',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update EntityRegistry
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const entityregistry = await handler.update(id, request.body as any);
        return reply.send(entityregistry);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update entityregistry',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete EntityRegistry
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete entityregistry',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate EntityRegistry
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
  
  // bootstrap EntityRegistry
  fastify.get('/bootstrap', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await handler.bootstrap(request.body as any);
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to execute bootstrap',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // getConventionProcessors EntityRegistry
  fastify.get('/get-convention-processors', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const result = await handler.getConventionProcessors(request.body as any);
        return reply.send(result);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to execute getConventionProcessors',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // attachProfile EntityRegistry
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
  
  // detachProfile EntityRegistry
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
  
  // hasProfile EntityRegistry
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
