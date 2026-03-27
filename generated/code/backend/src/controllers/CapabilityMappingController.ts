/**
 * CapabilityMappingController
 * Model-specific business logic for CapabilityMapping
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * CapabilityMappingController class
 */
export class CapabilityMappingController {
  
  /**
   * Validate CapabilityMapping data
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
   * Create a new CapabilityMapping
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.manifestId) {
      prismaData.manifest = { connect: { id: prismaData.manifestId } };
      delete prismaData.manifestId;
    }
    if (prismaData.instanceFactoryId) {
      prismaData.instanceFactory = { connect: { id: prismaData.instanceFactoryId } };
      delete prismaData.instanceFactoryId;
    }

    // Create record
    const capabilityMapping = await prisma.capabilityMapping.create({
      data: prismaData,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    

    return capabilityMapping;
  }

  
  /**
   * Retrieve CapabilityMapping by ID
   */
  public async retrieve(id: string): Promise<any> {
    const capabilityMapping = await prisma.capabilityMapping.findUnique({
      where: { id: parseId(id) },
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    if (!capabilityMapping) {
      throw new Error('CapabilityMapping not found');
    }

    return capabilityMapping;
  }

  /**
   * Retrieve all CapabilityMappings
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.capabilityMapping.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });
  }

  
  /**
   * Update CapabilityMapping
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
    if (updateData.manifestId) {
      updateData.manifest = { connect: { id: updateData.manifestId } };
      delete updateData.manifestId;
    }
    if (updateData.instanceFactoryId) {
      updateData.instanceFactory = { connect: { id: updateData.instanceFactoryId } };
      delete updateData.instanceFactoryId;
    }

    // Update record
    const capabilityMapping = await prisma.capabilityMapping.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    

    return capabilityMapping;
  }

  
  /**
   * Evolve CapabilityMapping through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.capabilityMapping.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('CapabilityMapping not found');
    }

    

    // Update record
    const capabilityMapping = await prisma.capabilityMapping.update({
      where: { id: parseId(id) },
      data,
      include: {
        manifest: true,
        instanceFactory: true
      }
    });

    return capabilityMapping;
  }

  
  /**
   * Delete CapabilityMapping
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.capabilityMapping.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const capabilityMappingController = new CapabilityMappingController();
export default capabilityMappingController;
