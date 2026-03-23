import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * InstanceFactoryController Routes
 * Generated from SpecVerse specification
 *
 * Model: InstanceFactory
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function InstanceFactoryRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.InstanceFactoryController;

  // create InstanceFactory
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const instancefactory = await handler.create(request.body as any);
        return reply.status(201).send(instancefactory);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create instancefactory',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve InstanceFactory
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const instancefactory = await handler.retrieve(id);
      
        if (!instancefactory) {
          return reply.status(404).send({ error: 'InstanceFactory not found' });
        }
      
        return reply.send(instancefactory);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve instancefactory',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list InstanceFactory
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const instancefactorys = await handler.retrieveAll();
        return reply.send(instancefactorys);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list instancefactorys',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update InstanceFactory
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const instancefactory = await handler.update(id, request.body as any);
        return reply.send(instancefactory);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update instancefactory',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete InstanceFactory
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete instancefactory',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate InstanceFactory
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
  
  // attachProfile InstanceFactory
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
  
  // detachProfile InstanceFactory
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
  
  // hasProfile InstanceFactory
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
