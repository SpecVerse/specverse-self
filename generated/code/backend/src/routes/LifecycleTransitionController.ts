import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * LifecycleTransitionController Routes
 * Generated from SpecVerse specification
 *
 * Model: LifecycleTransition
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function LifecycleTransitionRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.LifecycleTransitionController;

  // create LifecycleTransition
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const lifecycletransition = await handler.create(request.body as any);
        return reply.status(201).send(lifecycletransition);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create lifecycletransition',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve LifecycleTransition
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const lifecycletransition = await handler.retrieve(id);
      
        if (!lifecycletransition) {
          return reply.status(404).send({ error: 'LifecycleTransition not found' });
        }
      
        return reply.send(lifecycletransition);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve lifecycletransition',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list LifecycleTransition
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const lifecycletransitions = await handler.retrieveAll();
        return reply.send(lifecycletransitions);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list lifecycletransitions',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update LifecycleTransition
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const lifecycletransition = await handler.update(id, request.body as any);
        return reply.send(lifecycletransition);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update lifecycletransition',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete LifecycleTransition
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete lifecycletransition',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate LifecycleTransition
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
  
  // attachProfile LifecycleTransition
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
  
  // detachProfile LifecycleTransition
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
  
  // hasProfile LifecycleTransition
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
