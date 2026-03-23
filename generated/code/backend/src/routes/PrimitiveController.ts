import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * PrimitiveController Routes
 * Generated from SpecVerse specification
 *
 * Model: Primitive
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function PrimitiveRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.PrimitiveController;

  // create Primitive
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const primitive = await handler.create(request.body as any);
        return reply.status(201).send(primitive);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create primitive',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Primitive
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const primitive = await handler.retrieve(id);
      
        if (!primitive) {
          return reply.status(404).send({ error: 'Primitive not found' });
        }
      
        return reply.send(primitive);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve primitive',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Primitive
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const primitives = await handler.retrieveAll();
        return reply.send(primitives);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list primitives',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Primitive
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const primitive = await handler.update(id, request.body as any);
        return reply.send(primitive);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update primitive',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Primitive
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete primitive',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Primitive
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
  
  // attachProfile Primitive
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
  
  // detachProfile Primitive
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
  
  // hasProfile Primitive
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
