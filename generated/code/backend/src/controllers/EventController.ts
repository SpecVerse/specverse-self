/**
 * EventController
 * Model-specific business logic for Event
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * EventController class
 */
export class EventController {
  
  /**
   * Validate Event data
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
   * Create a new Event
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

    // Create record
    const event = await prisma.event.create({
      data: prismaData,
      include: {
        component: true,
        attributes: true,
        previousVersions: true
      }
    });

    

    return event;
  }

  
  /**
   * Retrieve Event by ID
   */
  public async retrieve(id: string): Promise<any> {
    const event = await prisma.event.findUnique({
      where: { id: parseId(id) },
      include: {
        component: true,
        attributes: true,
        previousVersions: true
      }
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  /**
   * Retrieve all Events
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.event.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        component: true,
        attributes: true,
        previousVersions: true
      }
    });
  }

  
  /**
   * Update Event
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

    // Update record
    const event = await prisma.event.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        component: true,
        attributes: true,
        previousVersions: true
      }
    });

    

    return event;
  }

  
  /**
   * Evolve Event through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.event.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('Event not found');
    }

    

    // Update record
    const event = await prisma.event.update({
      where: { id: parseId(id) },
      data,
      include: {
        component: true,
        attributes: true,
        previousVersions: true
      }
    });

    return event;
  }

  
  /**
   * Delete Event
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.event.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const eventController = new EventController();
export default eventController;
