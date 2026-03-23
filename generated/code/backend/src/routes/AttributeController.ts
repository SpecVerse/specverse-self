import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * AttributeController Routes
 * Generated from SpecVerse specification
 *
 * Model: Attribute
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function AttributeRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.AttributeController;

  // create Attribute
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const attribute = await handler.create(request.body as any);
        return reply.status(201).send(attribute);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create attribute',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Attribute
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const attribute = await handler.retrieve(id);
      
        if (!attribute) {
          return reply.status(404).send({ error: 'Attribute not found' });
        }
      
        return reply.send(attribute);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve attribute',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Attribute
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const attributes = await handler.retrieveAll();
        return reply.send(attributes);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list attributes',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Attribute
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const attribute = await handler.update(id, request.body as any);
        return reply.send(attribute);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update attribute',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Attribute
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete attribute',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Attribute
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
  
  // attachProfile Attribute
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
  
  // detachProfile Attribute
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
  
  // hasProfile Attribute
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
