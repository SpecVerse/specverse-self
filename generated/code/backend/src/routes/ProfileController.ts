import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ProfileController Routes
 * Generated from SpecVerse specification
 *
 * Model: Profile
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ProfileRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ProfileController;

  // create Profile
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const profile = await handler.create(request.body as any);
        return reply.status(201).send(profile);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create profile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve Profile
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const profile = await handler.retrieve(id);
      
        if (!profile) {
          return reply.status(404).send({ error: 'Profile not found' });
        }
      
        return reply.send(profile);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve profile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list Profile
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const profiles = await handler.retrieveAll();
        return reply.send(profiles);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list profiles',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update Profile
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const profile = await handler.update(id, request.body as any);
        return reply.send(profile);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update profile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete Profile
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete profile',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate Profile
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
  
  // attachProfile Profile
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
  
  // detachProfile Profile
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
  
  // hasProfile Profile
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
