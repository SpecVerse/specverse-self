import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * InvariantController Routes
 * Generated from SpecVerse specification
 *
 * Model: Invariant
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function InvariantRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.InvariantController;

  // create Invariant
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const invariant = await handler.create(request.body as any);
        return reply.status(201).send(invariant);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create invariant',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Invariant
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const invariant = await handler.retrieve(id);
      
        if (!invariant) {
          return reply.status(404).send({ error: 'Invariant not found' });
        }
      
        return reply.send(invariant);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve invariant',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Invariant
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const invariants = await handler.retrieveAll();
        return reply.send(invariants);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list invariants',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Invariant
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const invariant = await handler.update(id, request.body as any);
        return reply.send(invariant);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update invariant',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Invariant
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete invariant',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Invariant
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
  
  // attachProfile Invariant
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
  
  // detachProfile Invariant
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
  
  // hasProfile Invariant
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
