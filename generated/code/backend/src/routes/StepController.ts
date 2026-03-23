import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * StepController Routes
 * Generated from SpecVerse specification
 *
 * Model: Step
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function StepRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.StepController;

  // create Step
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const step = await handler.create(request.body as any);
        return reply.status(201).send(step);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create step',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Step
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const step = await handler.retrieve(id);
      
        if (!step) {
          return reply.status(404).send({ error: 'Step not found' });
        }
      
        return reply.send(step);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve step',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Step
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const steps = await handler.retrieveAll();
        return reply.send(steps);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list steps',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Step
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const step = await handler.update(id, request.body as any);
        return reply.send(step);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update step',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Step
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete step',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Step
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
  
  // attachProfile Step
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
  
  // detachProfile Step
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
  
  // hasProfile Step
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
