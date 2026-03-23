import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * InferenceRuleController Routes
 * Generated from SpecVerse specification
 *
 * Model: InferenceRule
 * Operations: create, retrieve, list, update, evolve, delete, validate, , , 
 */
export default async function InferenceRuleRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.InferenceRuleController;

  // create InferenceRule
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const inferencerule = await handler.create(request.body as any);
        return reply.status(201).send(inferencerule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create inferencerule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve InferenceRule
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const inferencerule = await handler.retrieve(id);
      
        if (!inferencerule) {
          return reply.status(404).send({ error: 'InferenceRule not found' });
        }
      
        return reply.send(inferencerule);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve inferencerule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list InferenceRule
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const inferencerules = await handler.retrieveAll();
        return reply.send(inferencerules);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list inferencerules',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update InferenceRule
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const inferencerule = await handler.update(id, request.body as any);
        return reply.send(inferencerule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update inferencerule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // evolve InferenceRule
  fastify.patch('/:id/evolve', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const inferencerule = await handler.evolve(id, request.body as any);
        return reply.send(inferencerule);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to evolve inferencerule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete InferenceRule
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete inferencerule',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate InferenceRule
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
  
  // attachProfile InferenceRule
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
  
  // detachProfile InferenceRule
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
  
  // hasProfile InferenceRule
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
