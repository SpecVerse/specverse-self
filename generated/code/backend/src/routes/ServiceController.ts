import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ServiceController Routes
 * Generated from SpecVerse specification
 *
 * Model: Service
 * Operations: create, retrieve, list, update, evolve, delete, validate, , , 
 */
export default async function ServiceRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ServiceController;

  // create Service
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const service = await handler.create(request.body as any);
        return reply.status(201).send(service);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create service',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Service
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const service = await handler.retrieve(id);
      
        if (!service) {
          return reply.status(404).send({ error: 'Service not found' });
        }
      
        return reply.send(service);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve service',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Service
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const services = await handler.retrieveAll();
        return reply.send(services);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list services',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Service
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const service = await handler.update(id, request.body as any);
        return reply.send(service);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update service',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // evolve Service
  fastify.patch('/:id/evolve', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const service = await handler.evolve(id, request.body as any);
        return reply.send(service);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to evolve service',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Service
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete service',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Service
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
  
  // attachProfile Service
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
  
  // detachProfile Service
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
  
  // hasProfile Service
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
