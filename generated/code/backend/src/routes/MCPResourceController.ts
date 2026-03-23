import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * MCPResourceController Routes
 * Generated from SpecVerse specification
 *
 * Model: MCPResource
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function MCPResourceRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.MCPResourceController;

  // create MCPResource
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcpresource = await handler.create(request.body as any);
        return reply.status(201).send(mcpresource);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create mcpresource',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve MCPResource
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcpresource = await handler.retrieve(id);
      
        if (!mcpresource) {
          return reply.status(404).send({ error: 'MCPResource not found' });
        }
      
        return reply.send(mcpresource);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve mcpresource',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list MCPResource
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcpresources = await handler.retrieveAll();
        return reply.send(mcpresources);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list mcpresources',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update MCPResource
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcpresource = await handler.update(id, request.body as any);
        return reply.send(mcpresource);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update mcpresource',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete MCPResource
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete mcpresource',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate MCPResource
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
  
  // attachProfile MCPResource
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
  
  // detachProfile MCPResource
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
  
  // hasProfile MCPResource
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
