/**
 * MCPResourceController
 * Model-specific business logic for MCPResource
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * MCPResourceController class
 */
export class MCPResourceController {
  
  /**
   * Validate MCPResource data
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
   * Create a new MCPResource
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.serverId) {
      prismaData.server = { connect: { id: prismaData.serverId } };
      delete prismaData.serverId;
    }

    // Create record
    const mCPResource = await prisma.mCPResource.create({
      data: prismaData,
      include: {
        server: true
      }
    });

    

    return mCPResource;
  }

  
  /**
   * Retrieve MCPResource by ID
   */
  public async retrieve(id: string): Promise<any> {
    const mCPResource = await prisma.mCPResource.findUnique({
      where: { id: parseId(id) },
      include: {
        server: true
      }
    });

    if (!mCPResource) {
      throw new Error('MCPResource not found');
    }

    return mCPResource;
  }

  /**
   * Retrieve all MCPResources
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.mCPResource.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        server: true
      }
    });
  }

  
  /**
   * Update MCPResource
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
    if (updateData.serverId) {
      updateData.server = { connect: { id: updateData.serverId } };
      delete updateData.serverId;
    }

    // Update record
    const mCPResource = await prisma.mCPResource.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        server: true
      }
    });

    

    return mCPResource;
  }

  
  /**
   * Evolve MCPResource through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.mCPResource.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('MCPResource not found');
    }

    

    // Update record
    const mCPResource = await prisma.mCPResource.update({
      where: { id: parseId(id) },
      data,
      include: {
        server: true
      }
    });

    return mCPResource;
  }

  
  /**
   * Delete MCPResource
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.mCPResource.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const mCPResourceController = new MCPResourceController();
export default mCPResourceController;
