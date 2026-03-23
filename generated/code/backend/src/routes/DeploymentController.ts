import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * DeploymentController Routes
 * Generated from SpecVerse specification
 *
 * Model: Deployment
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function DeploymentRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.DeploymentController;

  // create Deployment
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const deployment = await handler.create(request.body as any);
        return reply.status(201).send(deployment);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create deployment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Deployment
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const deployment = await handler.retrieve(id);
      
        if (!deployment) {
          return reply.status(404).send({ error: 'Deployment not found' });
        }
      
        return reply.send(deployment);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve deployment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Deployment
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const deployments = await handler.retrieveAll();
        return reply.send(deployments);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list deployments',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Deployment
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const deployment = await handler.update(id, request.body as any);
        return reply.send(deployment);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update deployment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Deployment
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete deployment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Deployment
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
  
  // attachProfile Deployment
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
  
  // detachProfile Deployment
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
  
  // hasProfile Deployment
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
