import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ModelController Routes
 * Generated from SpecVerse specification
 *
 * Model: Model
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ModelRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ModelController;

  // create Model
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const model = await handler.create(request.body as any);
        return reply.status(201).send(model);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create model',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Model
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const model = await handler.retrieve(id);
      
        if (!model) {
          return reply.status(404).send({ error: 'Model not found' });
        }
      
        return reply.send(model);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve model',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Model
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const models = await handler.retrieveAll();
        return reply.send(models);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list models',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Model
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const model = await handler.update(id, request.body as any);
        return reply.send(model);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update model',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Model
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete model',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Model
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
  
  // attachProfile Model
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
  
  // detachProfile Model
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
  
  // hasProfile Model
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
