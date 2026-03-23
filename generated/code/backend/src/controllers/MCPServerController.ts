/**
 * MCPServerController
 * Model-specific business logic for MCPServer
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/**
 * MCPServerController class
 */
export class MCPServerController {
  
  /**
   * Validate MCPServer data
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
   * Create a new MCPServer
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Create record
    const mCPServer = await prisma.mCPServer.create({
      data,
      include: {
        resources: true,
        tools: true
      }
    });

    

    return mCPServer;
  }

  
  /**
   * Retrieve MCPServer by ID
   */
  public async retrieve(id: string): Promise<any> {
    const mCPServer = await prisma.mCPServer.findUnique({
      where: { id },
      include: {
        resources: true,
        tools: true
      }
    });

    if (!mCPServer) {
      throw new Error('MCPServer not found');
    }

    return mCPServer;
  }

  /**
   * Retrieve all MCPServers
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.mCPServer.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        resources: true,
        tools: true
      }
    });
  }

  
  /**
   * Update MCPServer
   */
  public async update(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'update' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Update record
    const mCPServer = await prisma.mCPServer.update({
      where: { id },
      data,
      include: {
        resources: true,
        tools: true
      }
    });

    

    return mCPServer;
  }

  
  /**
   * Evolve MCPServer through lifecycle
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    

    // Update record
    const mCPServer = await prisma.mCPServer.update({
      where: { id },
      data,
      include: {
        resources: true,
        tools: true
      }
    });

    return mCPServer;
  }

  
  /**
   * Delete MCPServer
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.mCPServer.delete({
      where: { id }
    });

    
  }

  
}

// Export singleton instance
export const mCPServerController = new MCPServerController();
export default mCPServerController;
