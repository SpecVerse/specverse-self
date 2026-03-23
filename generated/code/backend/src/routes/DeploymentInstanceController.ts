import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * DeploymentInstanceController Routes
 * Generated from SpecVerse specification
 *
 * Model: DeploymentInstance
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function DeploymentInstanceRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.DeploymentInstanceController;

  // create DeploymentInstance
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const deploymentinstance = await handler.create(request.body as any);
        return reply.status(201).send(deploymentinstance);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create deploymentinstance',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve DeploymentInstance
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const deploymentinstance = await handler.retrieve(id);
      
        if (!deploymentinstance) {
          return reply.status(404).send({ error: 'DeploymentInstance not found' });
        }
      
        return reply.send(deploymentinstance);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve deploymentinstance',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list DeploymentInstance
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const deploymentinstances = await handler.retrieveAll();
        return reply.send(deploymentinstances);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list deploymentinstances',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update DeploymentInstance
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const deploymentinstance = await handler.update(id, request.body as any);
        return reply.send(deploymentinstance);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update deploymentinstance',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete DeploymentInstance
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete deploymentinstance',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate DeploymentInstance
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
  
  // attachProfile DeploymentInstance
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
  
  // detachProfile DeploymentInstance
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
  
  // hasProfile DeploymentInstance
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
