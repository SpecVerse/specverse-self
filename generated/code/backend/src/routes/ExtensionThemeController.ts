import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ExtensionThemeController Routes
 * Generated from SpecVerse specification
 *
 * Model: ExtensionTheme
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ExtensionThemeRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ExtensionThemeController;

  // create ExtensionTheme
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensiontheme = await handler.create(request.body as any);
        return reply.status(201).send(extensiontheme);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create extensiontheme',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve ExtensionTheme
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensiontheme = await handler.retrieve(id);
      
        if (!extensiontheme) {
          return reply.status(404).send({ error: 'ExtensionTheme not found' });
        }
      
        return reply.send(extensiontheme);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve extensiontheme',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list ExtensionTheme
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const extensionthemes = await handler.retrieveAll();
        return reply.send(extensionthemes);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list extensionthemes',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update ExtensionTheme
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const extensiontheme = await handler.update(id, request.body as any);
        return reply.send(extensiontheme);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update extensiontheme',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete ExtensionTheme
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete extensiontheme',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate ExtensionTheme
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
  
  // attachProfile ExtensionTheme
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
  
  // detachProfile ExtensionTheme
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
  
  // hasProfile ExtensionTheme
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
