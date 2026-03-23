import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * AIWorkflowController Routes
 * Generated from SpecVerse specification
 *
 * Model: AIWorkflow
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function AIWorkflowRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.AIWorkflowController;

  // create AIWorkflow
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const aiworkflow = await handler.create(request.body as any);
        return reply.status(201).send(aiworkflow);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create aiworkflow',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve AIWorkflow
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const aiworkflow = await handler.retrieve(id);
      
        if (!aiworkflow) {
          return reply.status(404).send({ error: 'AIWorkflow not found' });
        }
      
        return reply.send(aiworkflow);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve aiworkflow',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list AIWorkflow
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const aiworkflows = await handler.retrieveAll();
        return reply.send(aiworkflows);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list aiworkflows',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update AIWorkflow
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const aiworkflow = await handler.update(id, request.body as any);
        return reply.send(aiworkflow);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update aiworkflow',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete AIWorkflow
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete aiworkflow',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate AIWorkflow
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
  
  // attachProfile AIWorkflow
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
  
  // detachProfile AIWorkflow
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
  
  // hasProfile AIWorkflow
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
