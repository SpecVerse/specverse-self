import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * SchemaFragmentController Routes
 * Generated from SpecVerse specification
 *
 * Model: SchemaFragment
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function SchemaFragmentRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.SchemaFragmentController;

  // create SchemaFragment
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const schemafragment = await handler.create(request.body as any);
        return reply.status(201).send(schemafragment);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create schemafragment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve SchemaFragment
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const schemafragment = await handler.retrieve(id);
      
        if (!schemafragment) {
          return reply.status(404).send({ error: 'SchemaFragment not found' });
        }
      
        return reply.send(schemafragment);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve schemafragment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list SchemaFragment
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const schemafragments = await handler.retrieveAll();
        return reply.send(schemafragments);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list schemafragments',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update SchemaFragment
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const schemafragment = await handler.update(id, request.body as any);
        return reply.send(schemafragment);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update schemafragment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete SchemaFragment
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete schemafragment',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate SchemaFragment
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
  
  // attachProfile SchemaFragment
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
  
  // detachProfile SchemaFragment
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
  
  // hasProfile SchemaFragment
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
