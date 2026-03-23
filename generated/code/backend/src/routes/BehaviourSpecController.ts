import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * BehaviourSpecController Routes
 * Generated from SpecVerse specification
 *
 * Model: BehaviourSpec
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function BehaviourSpecRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.BehaviourSpecController;

  // create BehaviourSpec
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const behaviourspec = await handler.create(request.body as any);
        return reply.status(201).send(behaviourspec);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create behaviourspec',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve BehaviourSpec
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const behaviourspec = await handler.retrieve(id);
      
        if (!behaviourspec) {
          return reply.status(404).send({ error: 'BehaviourSpec not found' });
        }
      
        return reply.send(behaviourspec);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve behaviourspec',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list BehaviourSpec
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const behaviourspecs = await handler.retrieveAll();
        return reply.send(behaviourspecs);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list behaviourspecs',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update BehaviourSpec
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const behaviourspec = await handler.update(id, request.body as any);
        return reply.send(behaviourspec);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update behaviourspec',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete BehaviourSpec
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete behaviourspec',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate BehaviourSpec
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
  
  // attachProfile BehaviourSpec
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
  
  // detachProfile BehaviourSpec
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
  
  // hasProfile BehaviourSpec
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
