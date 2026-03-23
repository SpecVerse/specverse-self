import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * LayoutController Routes
 * Generated from SpecVerse specification
 *
 * Model: Layout
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function LayoutRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.LayoutController;

  // create Layout
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const layout = await handler.create(request.body as any);
        return reply.status(201).send(layout);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create layout',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Layout
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const layout = await handler.retrieve(id);
      
        if (!layout) {
          return reply.status(404).send({ error: 'Layout not found' });
        }
      
        return reply.send(layout);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve layout',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Layout
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const layouts = await handler.retrieveAll();
        return reply.send(layouts);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list layouts',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Layout
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const layout = await handler.update(id, request.body as any);
        return reply.send(layout);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update layout',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Layout
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete layout',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Layout
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
  
  // attachProfile Layout
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
  
  // detachProfile Layout
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
  
  // hasProfile Layout
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
