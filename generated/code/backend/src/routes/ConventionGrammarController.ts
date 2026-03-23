import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * ConventionGrammarController Routes
 * Generated from SpecVerse specification
 *
 * Model: ConventionGrammar
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function ConventionGrammarRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.ConventionGrammarController;

  // create ConventionGrammar
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const conventiongrammar = await handler.create(request.body as any);
        return reply.status(201).send(conventiongrammar);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create conventiongrammar',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve ConventionGrammar
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const conventiongrammar = await handler.retrieve(id);
      
        if (!conventiongrammar) {
          return reply.status(404).send({ error: 'ConventionGrammar not found' });
        }
      
        return reply.send(conventiongrammar);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve conventiongrammar',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list ConventionGrammar
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const conventiongrammars = await handler.retrieveAll();
        return reply.send(conventiongrammars);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list conventiongrammars',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update ConventionGrammar
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const conventiongrammar = await handler.update(id, request.body as any);
        return reply.send(conventiongrammar);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update conventiongrammar',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete ConventionGrammar
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete conventiongrammar',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate ConventionGrammar
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
  
  // attachProfile ConventionGrammar
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
  
  // detachProfile ConventionGrammar
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
  
  // hasProfile ConventionGrammar
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
