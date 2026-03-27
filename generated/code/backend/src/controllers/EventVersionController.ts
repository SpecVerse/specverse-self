/**
 * EventVersionController
 * Model-specific business logic for EventVersion
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * EventVersionController class
 */
export class EventVersionController {
  
  /**
   * Validate EventVersion data
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
   * Create a new EventVersion
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.eventId) {
      prismaData.event = { connect: { id: prismaData.eventId } };
      delete prismaData.eventId;
    }

    // Create record
    const eventVersion = await prisma.eventVersion.create({
      data: prismaData,
      include: {
        event: true
      }
    });

    

    return eventVersion;
  }

  
  /**
   * Retrieve EventVersion by ID
   */
  public async retrieve(id: string): Promise<any> {
    const eventVersion = await prisma.eventVersion.findUnique({
      where: { id: parseId(id) },
      include: {
        event: true
      }
    });

    if (!eventVersion) {
      throw new Error('EventVersion not found');
    }

    return eventVersion;
  }

  /**
   * Retrieve all EventVersions
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.eventVersion.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        event: true
      }
    });
  }

  
  /**
   * Update EventVersion
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
    if (updateData.eventId) {
      updateData.event = { connect: { id: updateData.eventId } };
      delete updateData.eventId;
    }

    // Update record
    const eventVersion = await prisma.eventVersion.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        event: true
      }
    });

    

    return eventVersion;
  }

  
  /**
   * Evolve EventVersion through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.eventVersion.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('EventVersion not found');
    }

    

    // Update record
    const eventVersion = await prisma.eventVersion.update({
      where: { id: parseId(id) },
      data,
      include: {
        event: true
      }
    });

    return eventVersion;
  }

  
  /**
   * Delete EventVersion
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.eventVersion.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const eventVersionController = new EventVersionController();
export default eventVersionController;
