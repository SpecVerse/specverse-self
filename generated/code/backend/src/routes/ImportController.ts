import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ImportController Routes
 * Generated from SpecVerse specification
 *
 * Model: Import
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ImportRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ImportController;

  // create Import
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const importItem = await handler.create(request.body as any);
        return reply.status(201).send(importItem);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create importItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Import
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const importItem = await handler.retrieve(id);
      
        if (!importItem) {
          return reply.status(404).send({ error: 'Import not found' });
        }
      
        return reply.send(importItem);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve importItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Import
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const importItems = await handler.retrieveAll();
        return reply.send(importItems);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list importItems',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Import
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const importItem = await handler.update(id, request.body as any);
        return reply.send(importItem);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update importItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Import
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete importItem',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Import
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
  
  // attachProfile Import
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
  
  // detachProfile Import
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
  
  // hasProfile Import
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
