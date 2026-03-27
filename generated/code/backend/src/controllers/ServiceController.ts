/**
 * ServiceController
 * Model-specific business logic for Service
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * ServiceController class
 */
export class ServiceController {
  
  /**
   * Validate Service data
   * Unified validation method for all operations
   */
  public validate(
    _data: any,
    _context: { operation: 'create' | 'update' | 'evolve' }
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // No validation rules defined

    return {
      valid: errors.length === 0,
      errors
    };
  }

  
  /**
   * Create a new Service
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.componentId) {
      prismaData.component = { connect: { id: prismaData.componentId } };
      delete prismaData.componentId;
    }
    if (prismaData.modelId) {
      prismaData.model = { connect: { id: prismaData.modelId } };
      delete prismaData.modelId;
    }

    // Create record
    const service = await prisma.service.create({
      data: prismaData,
      include: {
        component: true,
        model: true,
        operations: true,
        subscriptions: true
      }
    });

    

    return service;
  }

  
  /**
   * Retrieve Service by ID
   */
  public async retrieve(id: string): Promise<any> {
    const service = await prisma.service.findUnique({
      where: { id: parseId(id) },
      include: {
        component: true,
        model: true,
        operations: true,
        subscriptions: true
      }
    });

    if (!service) {
      throw new Error('Service not found');
    }

    return service;
  }

  /**
   * Retrieve all Services
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.service.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        component: true,
        model: true,
        operations: true,
        subscriptions: true
      }
    });
  }

  
  /**
   * Update Service
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Strip nested relations and id — only send scalar fields to Prisma
    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') continue;
      if (Array.isArray(value)) continue;
      if (value !== null && typeof value === 'object' && !(value instanceof Date)) continue;
      updateData[key] = value;
    }

    // Transform FK fields to Prisma connect format
    if (updateData.componentId) {
      updateData.component = { connect: { id: updateData.componentId } };
      delete updateData.componentId;
    }
    if (updateData.modelId) {
      updateData.model = { connect: { id: updateData.modelId } };
      delete updateData.modelId;
    }

    // Update record
    const service = await prisma.service.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        component: true,
        model: true,
        operations: true,
        subscriptions: true
      }
    });

    

    return service;
  }

  
  /**
   * Evolve Service through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.service.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Service not found');
    }

    

    // Update record
    const service = await prisma.service.update({
      where: { id: parseId(id) },
      data,
      include: {
        component: true,
        model: true,
        operations: true,
        subscriptions: true
      }
    });

    return service;
  }

  
  /**
   * Delete Service
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.service.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const serviceController = new ServiceController();
export default serviceController;
