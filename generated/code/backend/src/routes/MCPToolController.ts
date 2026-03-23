import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * MCPToolController Routes
 * Generated from SpecVerse specification
 *
 * Model: MCPTool
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function MCPToolRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.MCPToolController;

  // create MCPTool
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcptool = await handler.create(request.body as any);
        return reply.status(201).send(mcptool);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create mcptool',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve MCPTool
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcptool = await handler.retrieve(id);
      
        if (!mcptool) {
          return reply.status(404).send({ error: 'MCPTool not found' });
        }
      
        return reply.send(mcptool);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve mcptool',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list MCPTool
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const mcptools = await handler.retrieveAll();
        return reply.send(mcptools);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list mcptools',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update MCPTool
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const mcptool = await handler.update(id, request.body as any);
        return reply.send(mcptool);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update mcptool',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete MCPTool
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete mcptool',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate MCPTool
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
  
  // attachProfile MCPTool
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
  
  // detachProfile MCPTool
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
  
  // hasProfile MCPTool
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
