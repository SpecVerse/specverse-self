import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * EventVersionController Routes
 * Generated from SpecVerse specification
 *
 * Model: EventVersion
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function EventVersionRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.EventVersionController;

  // create EventVersion
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const eventversion = await handler.create(request.body as any);
        return reply.status(201).send(eventversion);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create eventversion',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve EventVersion
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const eventversion = await handler.retrieve(id);
      
        if (!eventversion) {
          return reply.status(404).send({ error: 'EventVersion not found' });
        }
      
        return reply.send(eventversion);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve eventversion',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list EventVersion
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const eventversions = await handler.retrieveAll();
        return reply.send(eventversions);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list eventversions',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update EventVersion
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const eventversion = await handler.update(id, request.body as any);
        return reply.send(eventversion);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update eventversion',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete EventVersion
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete eventversion',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate EventVersion
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
  
  // attachProfile EventVersion
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
  
  // detachProfile EventVersion
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
  
  // hasProfile EventVersion
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
