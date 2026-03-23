import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * UIComponentController Routes
 * Generated from SpecVerse specification
 *
 * Model: UIComponent
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function UIComponentRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.UIComponentController;

  // create UIComponent
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const uicomponent = await handler.create(request.body as any);
        return reply.status(201).send(uicomponent);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create uicomponent',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve UIComponent
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const uicomponent = await handler.retrieve(id);
      
        if (!uicomponent) {
          return reply.status(404).send({ error: 'UIComponent not found' });
        }
      
        return reply.send(uicomponent);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve uicomponent',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list UIComponent
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const uicomponents = await handler.retrieveAll();
        return reply.send(uicomponents);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list uicomponents',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update UIComponent
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const uicomponent = await handler.update(id, request.body as any);
        return reply.send(uicomponent);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update uicomponent',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete UIComponent
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete uicomponent',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate UIComponent
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
  
  // attachProfile UIComponent
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
  
  // detachProfile UIComponent
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
  
  // hasProfile UIComponent
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
