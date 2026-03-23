import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * RelationshipController Routes
 * Generated from SpecVerse specification
 *
 * Model: Relationship
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function RelationshipRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.RelationshipController;

  // create Relationship
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const relationship = await handler.create(request.body as any);
        return reply.status(201).send(relationship);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create relationship',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Relationship
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const relationship = await handler.retrieve(id);
      
        if (!relationship) {
          return reply.status(404).send({ error: 'Relationship not found' });
        }
      
        return reply.send(relationship);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve relationship',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Relationship
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const relationships = await handler.retrieveAll();
        return reply.send(relationships);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list relationships',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Relationship
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const relationship = await handler.update(id, request.body as any);
        return reply.send(relationship);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update relationship',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Relationship
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete relationship',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Relationship
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
  
  // attachProfile Relationship
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
  
  // detachProfile Relationship
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
  
  // hasProfile Relationship
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
