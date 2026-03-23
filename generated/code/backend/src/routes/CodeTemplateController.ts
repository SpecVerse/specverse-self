import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * CodeTemplateController Routes
 * Generated from SpecVerse specification
 *
 * Model: CodeTemplate
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function CodeTemplateRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.CodeTemplateController;

  // create CodeTemplate
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const codetemplate = await handler.create(request.body as any);
        return reply.status(201).send(codetemplate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create codetemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve CodeTemplate
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const codetemplate = await handler.retrieve(id);
      
        if (!codetemplate) {
          return reply.status(404).send({ error: 'CodeTemplate not found' });
        }
      
        return reply.send(codetemplate);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve codetemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list CodeTemplate
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const codetemplates = await handler.retrieveAll();
        return reply.send(codetemplates);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list codetemplates',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update CodeTemplate
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const codetemplate = await handler.update(id, request.body as any);
        return reply.send(codetemplate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update codetemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete CodeTemplate
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete codetemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate CodeTemplate
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
  
  // attachProfile CodeTemplate
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
  
  // detachProfile CodeTemplate
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
  
  // hasProfile CodeTemplate
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
