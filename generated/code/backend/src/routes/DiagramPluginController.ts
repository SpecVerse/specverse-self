import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * DiagramPluginController Routes
 * Generated from SpecVerse specification
 *
 * Model: DiagramPlugin
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function DiagramPluginRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.DiagramPluginController;

  // create DiagramPlugin
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const diagramplugin = await handler.create(request.body as any);
        return reply.status(201).send(diagramplugin);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create diagramplugin',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve DiagramPlugin
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const diagramplugin = await handler.retrieve(id);
      
        if (!diagramplugin) {
          return reply.status(404).send({ error: 'DiagramPlugin not found' });
        }
      
        return reply.send(diagramplugin);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve diagramplugin',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list DiagramPlugin
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const diagramplugins = await handler.retrieveAll();
        return reply.send(diagramplugins);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list diagramplugins',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update DiagramPlugin
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const diagramplugin = await handler.update(id, request.body as any);
        return reply.send(diagramplugin);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update diagramplugin',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete DiagramPlugin
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete diagramplugin',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate DiagramPlugin
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
  
  // attachProfile DiagramPlugin
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
  
  // detachProfile DiagramPlugin
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
  
  // hasProfile DiagramPlugin
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
