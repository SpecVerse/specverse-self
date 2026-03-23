import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * CapabilityMappingController Routes
 * Generated from SpecVerse specification
 *
 * Model: CapabilityMapping
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function CapabilityMappingRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.CapabilityMappingController;

  // create CapabilityMapping
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const capabilitymapping = await handler.create(request.body as any);
        return reply.status(201).send(capabilitymapping);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create capabilitymapping',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve CapabilityMapping
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const capabilitymapping = await handler.retrieve(id);
      
        if (!capabilitymapping) {
          return reply.status(404).send({ error: 'CapabilityMapping not found' });
        }
      
        return reply.send(capabilitymapping);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve capabilitymapping',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list CapabilityMapping
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const capabilitymappings = await handler.retrieveAll();
        return reply.send(capabilitymappings);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list capabilitymappings',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update CapabilityMapping
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const capabilitymapping = await handler.update(id, request.body as any);
        return reply.send(capabilitymapping);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update capabilitymapping',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete CapabilityMapping
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete capabilitymapping',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate CapabilityMapping
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
  
  // attachProfile CapabilityMapping
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
  
  // detachProfile CapabilityMapping
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
  
  // hasProfile CapabilityMapping
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
