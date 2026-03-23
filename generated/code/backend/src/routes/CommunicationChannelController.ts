import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * CommunicationChannelController Routes
 * Generated from SpecVerse specification
 *
 * Model: CommunicationChannel
 * Operations: create, retrieve, list, update, delete, validate, , , 
 */
export default async function CommunicationChannelRoutes(
  fastify: FastifyInstance,
  options: any
) {
  const handler = options.controllers.CommunicationChannelController;

  // create CommunicationChannel
  fastify.post('/', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const communicationchannel = await handler.create(request.body as any);
        return reply.status(201).send(communicationchannel);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to create communicationchannel',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // retrieve CommunicationChannel
  fastify.get('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const communicationchannel = await handler.retrieve(id);
      
        if (!communicationchannel) {
          return reply.status(404).send({ error: 'CommunicationChannel not found' });
        }
      
        return reply.send(communicationchannel);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to retrieve communicationchannel',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // list CommunicationChannel
  fastify.get('/', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const communicationchannels = await handler.retrieveAll();
        return reply.send(communicationchannels);
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to list communicationchannels',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // update CommunicationChannel
  fastify.put('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        const communicationchannel = await handler.update(id, request.body as any);
        return reply.send(communicationchannel);
      } catch (error) {
        return reply.status(400).send({
          error: 'Failed to update communicationchannel',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // delete CommunicationChannel
  fastify.delete('/:id', {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };
        await handler.delete(id);
        return reply.status(204).send();
      } catch (error) {
        return reply.status(500).send({
          error: 'Failed to delete communicationchannel',
          message: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });
  
  // validate CommunicationChannel
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
  
  // attachProfile CommunicationChannel
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
  
  // detachProfile CommunicationChannel
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
  
  // hasProfile CommunicationChannel
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
