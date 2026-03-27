import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ExtensionCommandController Routes
 * Generated from SpecVerse specification
 *
 * Model: ExtensionCommand
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ExtensionCommandRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ExtensionCommandController;

  // create ExtensionCommand
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensioncommand = await handler.create(request.body as any);
        return reply.status(201).send(extensioncommand);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create extensioncommand',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve ExtensionCommand
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensioncommand = await handler.retrieve(id);
      
        if (!extensioncommand) {
          return reply.status(404).send({ error: 'ExtensionCommand not found' });
        }
      
        return reply.send(extensioncommand);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve extensioncommand',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list ExtensionCommand
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensioncommands = await handler.retrieveAll();
        return reply.send(extensioncommands);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list extensioncommands',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update ExtensionCommand
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensioncommand = await handler.update(id, request.body as any);
        return reply.send(extensioncommand);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update extensioncommand',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete ExtensionCommand
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete extensioncommand',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate ExtensionCommand
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
  
  // attachProfile ExtensionCommand
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
  
  // detachProfile ExtensionCommand
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
  
  // hasProfile ExtensionCommand
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
