import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ManifestController Routes
 * Generated from SpecVerse specification
 *
 * Model: Manifest
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ManifestRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ManifestController;

  // create Manifest
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const manifest = await handler.create(request.body as any);
        return reply.status(201).send(manifest);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create manifest',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Manifest
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const manifest = await handler.retrieve(id);
      
        if (!manifest) {
          return reply.status(404).send({ error: 'Manifest not found' });
        }
      
        return reply.send(manifest);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve manifest',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Manifest
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const manifests = await handler.retrieveAll();
        return reply.send(manifests);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list manifests',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Manifest
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const manifest = await handler.update(id, request.body as any);
        return reply.send(manifest);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update manifest',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Manifest
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete manifest',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Manifest
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
  
  // attachProfile Manifest
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
  
  // detachProfile Manifest
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
  
  // hasProfile Manifest
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
