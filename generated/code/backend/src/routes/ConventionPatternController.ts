import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ConventionPatternController Routes
 * Generated from SpecVerse specification
 *
 * Model: ConventionPattern
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ConventionPatternRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ConventionPatternController;

  // create ConventionPattern
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const conventionpattern = await handler.create(request.body as any);
        return reply.status(201).send(conventionpattern);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create conventionpattern',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve ConventionPattern
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const conventionpattern = await handler.retrieve(id);
      
        if (!conventionpattern) {
          return reply.status(404).send({ error: 'ConventionPattern not found' });
        }
      
        return reply.send(conventionpattern);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve conventionpattern',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list ConventionPattern
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const conventionpatterns = await handler.retrieveAll();
        return reply.send(conventionpatterns);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list conventionpatterns',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update ConventionPattern
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const conventionpattern = await handler.update(id, request.body as any);
        return reply.send(conventionpattern);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update conventionpattern',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete ConventionPattern
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete conventionpattern',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate ConventionPattern
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
  
  // attachProfile ConventionPattern
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
  
  // detachProfile ConventionPattern
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
  
  // hasProfile ConventionPattern
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
