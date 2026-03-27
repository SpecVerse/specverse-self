import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * VSCodeExtensionController Routes
 * Generated from SpecVerse specification
 *
 * Model: VSCodeExtension
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function VSCodeExtensionRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.VSCodeExtensionController;

  // create VSCodeExtension
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const vscodeextension = await handler.create(request.body as any);
        return reply.status(201).send(vscodeextension);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create vscodeextension',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve VSCodeExtension
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const vscodeextension = await handler.retrieve(id);
      
        if (!vscodeextension) {
          return reply.status(404).send({ error: 'VSCodeExtension not found' });
        }
      
        return reply.send(vscodeextension);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve vscodeextension',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list VSCodeExtension
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const vscodeextensions = await handler.retrieveAll();
        return reply.send(vscodeextensions);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list vscodeextensions',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update VSCodeExtension
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const vscodeextension = await handler.update(id, request.body as any);
        return reply.send(vscodeextension);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update vscodeextension',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete VSCodeExtension
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete vscodeextension',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate VSCodeExtension
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
  
  // attachProfile VSCodeExtension
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
  
  // detachProfile VSCodeExtension
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
  
  // hasProfile VSCodeExtension
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
