import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * AIOrchestratorController Routes
 * Generated from SpecVerse specification
 *
 * Model: AIOrchestrator
 * Operations: create, retrieve, list, update, evolve, delete, validate, , , 
 */
export default async function AIOrchestratorRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.AIOrchestratorController;

  // create AIOrchestrator
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const aiorchestrator = await handler.create(request.body as any);
        return reply.status(201).send(aiorchestrator);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create aiorchestrator',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve AIOrchestrator
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const aiorchestrator = await handler.retrieve(id);
      
        if (!aiorchestrator) {
          return reply.status(404).send({ error: 'AIOrchestrator not found' });
        }
      
        return reply.send(aiorchestrator);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve aiorchestrator',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list AIOrchestrator
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const aiorchestrators = await handler.retrieveAll();
        return reply.send(aiorchestrators);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list aiorchestrators',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update AIOrchestrator
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const aiorchestrator = await handler.update(id, request.body as any);
        return reply.send(aiorchestrator);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update aiorchestrator',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // evolve AIOrchestrator
  fastify.patch('/:id/evolve', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const aiorchestrator = await handler.evolve(id, request.body as any);
        return reply.send(aiorchestrator);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to evolve aiorchestrator',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete AIOrchestrator
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete aiorchestrator',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate AIOrchestrator
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
  
  // attachProfile AIOrchestrator
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
  
  // detachProfile AIOrchestrator
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
  
  // hasProfile AIOrchestrator
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
