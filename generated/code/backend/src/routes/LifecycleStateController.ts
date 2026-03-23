import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * LifecycleStateController Routes
 * Generated from SpecVerse specification
 *
 * Model: LifecycleState
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function LifecycleStateRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.LifecycleStateController;

  // create LifecycleState
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const lifecyclestate = await handler.create(request.body as any);
        return reply.status(201).send(lifecyclestate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create lifecyclestate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve LifecycleState
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const lifecyclestate = await handler.retrieve(id);
      
        if (!lifecyclestate) {
          return reply.status(404).send({ error: 'LifecycleState not found' });
        }
      
        return reply.send(lifecyclestate);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve lifecyclestate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list LifecycleState
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const lifecyclestates = await handler.retrieveAll();
        return reply.send(lifecyclestates);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list lifecyclestates',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update LifecycleState
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const lifecyclestate = await handler.update(id, request.body as any);
        return reply.send(lifecyclestate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update lifecyclestate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete LifecycleState
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete lifecyclestate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate LifecycleState
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
  
  // attachProfile LifecycleState
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
  
  // detachProfile LifecycleState
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
  
  // hasProfile LifecycleState
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
