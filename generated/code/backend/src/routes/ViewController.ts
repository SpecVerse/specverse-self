import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ViewController Routes
 * Generated from SpecVerse specification
 *
 * Model: View
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ViewRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ViewController;

  // create View
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const view = await handler.create(request.body as any);
        return reply.status(201).send(view);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create view',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve View
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const view = await handler.retrieve(id);
      
        if (!view) {
          return reply.status(404).send({ error: 'View not found' });
        }
      
        return reply.send(view);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve view',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list View
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const views = await handler.retrieveAll();
        return reply.send(views);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list views',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update View
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const view = await handler.update(id, request.body as any);
        return reply.send(view);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update view',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete View
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete view',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate View
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
  
  // attachProfile View
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
  
  // detachProfile View
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
  
  // hasProfile View
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
