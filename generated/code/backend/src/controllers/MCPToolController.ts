/**
 * MCPToolController
 * Model-specific business logic for MCPTool
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * MCPToolController class
 */
export class MCPToolController {
  
  /**
   * Validate MCPTool data
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
   * Create a new MCPTool
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
    const mCPTool = await prisma.mCPTool.create({
      data: prismaData,
      include: {
        server: true
      }
    });

    

    return mCPTool;
  }

  
  /**
   * Retrieve MCPTool by ID
   */
  public async retrieve(id: string): Promise<any> {
    const mCPTool = await prisma.mCPTool.findUnique({
      where: { id: parseId(id) },
      include: {
        server: true
      }
    });

    if (!mCPTool) {
      throw new Error('MCPTool not found');
    }

    return mCPTool;
  }

  /**
   * Retrieve all MCPTools
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.mCPTool.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        server: true
      }
    });
  }

  
  /**
   * Update MCPTool
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
    const mCPTool = await prisma.mCPTool.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        server: true
      }
    });

    

    return mCPTool;
  }

  
  /**
   * Evolve MCPTool through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.mCPTool.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('MCPTool not found');
    }

    

    // Update record
    const mCPTool = await prisma.mCPTool.update({
      where: { id: parseId(id) },
      data,
      include: {
        server: true
      }
    });

    return mCPTool;
  }

  
  /**
   * Delete MCPTool
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.mCPTool.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const mCPToolController = new MCPToolController();
export default mCPToolController;
