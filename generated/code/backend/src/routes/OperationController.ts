import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * OperationController Routes
 * Generated from SpecVerse specification
 *
 * Model: Operation
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function OperationRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.OperationController;

  // create Operation
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const operation = await handler.create(request.body as any);
        return reply.status(201).send(operation);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create operation',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Operation
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const operation = await handler.retrieve(id);
      
        if (!operation) {
          return reply.status(404).send({ error: 'Operation not found' });
        }
      
        return reply.send(operation);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve operation',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Operation
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const operations = await handler.retrieveAll();
        return reply.send(operations);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list operations',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Operation
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const operation = await handler.update(id, request.body as any);
        return reply.send(operation);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update operation',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Operation
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete operation',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Operation
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
  
  // attachProfile Operation
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
  
  // detachProfile Operation
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
  
  // hasProfile Operation
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
