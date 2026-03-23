import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * RuleTemplateController Routes
 * Generated from SpecVerse specification
 *
 * Model: RuleTemplate
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function RuleTemplateRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.RuleTemplateController;

  // create RuleTemplate
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const ruletemplate = await handler.create(request.body as any);
        return reply.status(201).send(ruletemplate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create ruletemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve RuleTemplate
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const ruletemplate = await handler.retrieve(id);
      
        if (!ruletemplate) {
          return reply.status(404).send({ error: 'RuleTemplate not found' });
        }
      
        return reply.send(ruletemplate);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve ruletemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list RuleTemplate
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const ruletemplates = await handler.retrieveAll();
        return reply.send(ruletemplates);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list ruletemplates',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update RuleTemplate
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const ruletemplate = await handler.update(id, request.body as any);
        return reply.send(ruletemplate);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update ruletemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete RuleTemplate
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete ruletemplate',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate RuleTemplate
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
  
  // attachProfile RuleTemplate
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
  
  // detachProfile RuleTemplate
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
  
  // hasProfile RuleTemplate
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
