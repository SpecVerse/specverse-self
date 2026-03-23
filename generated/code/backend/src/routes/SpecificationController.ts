import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * SpecificationController Routes
 * Generated from SpecVerse specification
 *
 * Model: Specification
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function SpecificationRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.SpecificationController;

  // create Specification
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const specification = await handler.create(request.body as any);
        return reply.status(201).send(specification);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create specification',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Specification
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const specification = await handler.retrieve(id);
      
        if (!specification) {
          return reply.status(404).send({ error: 'Specification not found' });
        }
      
        return reply.send(specification);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve specification',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Specification
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const specifications = await handler.retrieveAll();
        return reply.send(specifications);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list specifications',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Specification
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const specification = await handler.update(id, request.body as any);
        return reply.send(specification);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update specification',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Specification
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete specification',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Specification
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
  
  // attachProfile Specification
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
  
  // detachProfile Specification
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
  
  // hasProfile Specification
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
