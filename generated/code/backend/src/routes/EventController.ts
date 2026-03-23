import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * EventController Routes
 * Generated from SpecVerse specification
 *
 * Model: Event
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function EventRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.EventController;

  // create Event
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const event = await handler.create(request.body as any);
        return reply.status(201).send(event);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create event',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Event
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const event = await handler.retrieve(id);
      
        if (!event) {
          return reply.status(404).send({ error: 'Event not found' });
        }
      
        return reply.send(event);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve event',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Event
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const events = await handler.retrieveAll();
        return reply.send(events);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list events',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Event
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const event = await handler.update(id, request.body as any);
        return reply.send(event);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update event',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Event
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete event',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Event
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
  
  // attachProfile Event
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
  
  // detachProfile Event
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
  
  // hasProfile Event
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
