import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * MCPServerController Routes
 * Generated from SpecVerse specification
 *
 * Model: MCPServer
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function MCPServerRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.MCPServerController;

  // create MCPServer
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcpserver = await handler.create(request.body as any);
        return reply.status(201).send(mcpserver);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create mcpserver',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve MCPServer
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcpserver = await handler.retrieve(id);
      
        if (!mcpserver) {
          return reply.status(404).send({ error: 'MCPServer not found' });
        }
      
        return reply.send(mcpserver);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve mcpserver',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list MCPServer
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcpservers = await handler.retrieveAll();
        return reply.send(mcpservers);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list mcpservers',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update MCPServer
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcpserver = await handler.update(id, request.body as any);
        return reply.send(mcpserver);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update mcpserver',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete MCPServer
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete mcpserver',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate MCPServer
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
  
  // attachProfile MCPServer
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
  
  // detachProfile MCPServer
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
  
  // hasProfile MCPServer
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
