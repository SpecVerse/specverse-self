import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ControllerController Routes
 * Generated from SpecVerse specification
 *
 * Model: Controller
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ControllerRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ControllerController;

  // create Controller
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const controller = await handler.create(request.body as any);
        return reply.status(201).send(controller);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create controller',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Controller
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const controller = await handler.retrieve(id);
      
        if (!controller) {
          return reply.status(404).send({ error: 'Controller not found' });
        }
      
        return reply.send(controller);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve controller',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Controller
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const controllers = await handler.retrieveAll();
        return reply.send(controllers);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list controllers',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Controller
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const controller = await handler.update(id, request.body as any);
        return reply.send(controller);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update controller',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Controller
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete controller',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Controller
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
  
  // attachProfile Controller
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
  
  // detachProfile Controller
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
  
  // hasProfile Controller
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
