import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ComponentController Routes
 * Generated from SpecVerse specification
 *
 * Model: Component
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ComponentRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ComponentController;

  // create Component
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const component = await handler.create(request.body as any);
        return reply.status(201).send(component);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create component',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Component
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const component = await handler.retrieve(id);
      
        if (!component) {
          return reply.status(404).send({ error: 'Component not found' });
        }
      
        return reply.send(component);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve component',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Component
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const components = await handler.retrieveAll();
        return reply.send(components);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list components',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Component
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const component = await handler.update(id, request.body as any);
        return reply.send(component);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update component',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Component
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete component',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Component
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
  
  // attachProfile Component
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
  
  // detachProfile Component
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
  
  // hasProfile Component
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
