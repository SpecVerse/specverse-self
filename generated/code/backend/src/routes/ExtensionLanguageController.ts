import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ExtensionLanguageController Routes
 * Generated from SpecVerse specification
 *
 * Model: ExtensionLanguage
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ExtensionLanguageRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ExtensionLanguageController;

  // create ExtensionLanguage
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensionlanguage = await handler.create(request.body as any);
        return reply.status(201).send(extensionlanguage);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create extensionlanguage',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve ExtensionLanguage
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensionlanguage = await handler.retrieve(id);
      
        if (!extensionlanguage) {
          return reply.status(404).send({ error: 'ExtensionLanguage not found' });
        }
      
        return reply.send(extensionlanguage);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve extensionlanguage',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list ExtensionLanguage
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensionlanguages = await handler.retrieveAll();
        return reply.send(extensionlanguages);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list extensionlanguages',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update ExtensionLanguage
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensionlanguage = await handler.update(id, request.body as any);
        return reply.send(extensionlanguage);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update extensionlanguage',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete ExtensionLanguage
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete extensionlanguage',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate ExtensionLanguage
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
  
  // attachProfile ExtensionLanguage
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
  
  // detachProfile ExtensionLanguage
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
  
  // hasProfile ExtensionLanguage
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
