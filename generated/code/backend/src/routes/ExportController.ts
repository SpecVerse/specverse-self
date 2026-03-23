import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ExportController Routes
 * Generated from SpecVerse specification
 *
 * Model: Export
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ExportRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ExportController;

  // create Export
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const exportItem = await handler.create(request.body as any);
        return reply.status(201).send(exportItem);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create exportItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Export
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const exportItem = await handler.retrieve(id);
      
        if (!exportItem) {
          return reply.status(404).send({ error: 'Export not found' });
        }
      
        return reply.send(exportItem);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve exportItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Export
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const exportItems = await handler.retrieveAll();
        return reply.send(exportItems);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list exportItems',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Export
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const exportItem = await handler.update(id, request.body as any);
        return reply.send(exportItem);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update exportItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Export
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete exportItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Export
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
  
  // attachProfile Export
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
  
  // detachProfile Export
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
  
  // hasProfile Export
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
