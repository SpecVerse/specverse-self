/**
 * DeploymentInstanceController
 * Model-specific business logic for DeploymentInstance
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * DeploymentInstanceController class
 */
export class DeploymentInstanceController {
  
  /**
   * Validate DeploymentInstance data
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
   * Create a new DeploymentInstance
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.deploymentId) {
      prismaData.deployment = { connect: { id: prismaData.deploymentId } };
      delete prismaData.deploymentId;
    }

    // Create record
    const deploymentInstance = await prisma.deploymentInstance.create({
      data: prismaData,
      include: {
        deployment: true
      }
    });

    

    return deploymentInstance;
  }

  
  /**
   * Retrieve DeploymentInstance by ID
   */
  public async retrieve(id: string): Promise<any> {
    const deploymentInstance = await prisma.deploymentInstance.findUnique({
      where: { id: parseId(id) },
      include: {
        deployment: true
      }
    });

    if (!deploymentInstance) {
      throw new Error('DeploymentInstance not found');
    }

    return deploymentInstance;
  }

  /**
   * Retrieve all DeploymentInstances
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.deploymentInstance.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        deployment: true
      }
    });
  }

  
  /**
   * Update DeploymentInstance
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
    if (updateData.deploymentId) {
      updateData.deployment = { connect: { id: updateData.deploymentId } };
      delete updateData.deploymentId;
    }

    // Update record
    const deploymentInstance = await prisma.deploymentInstance.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        deployment: true
      }
    });

    

    return deploymentInstance;
  }

  
  /**
   * Evolve DeploymentInstance through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.deploymentInstance.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('DeploymentInstance not found');
    }

    

    // Update record
    const deploymentInstance = await prisma.deploymentInstance.update({
      where: { id: parseId(id) },
      data,
      include: {
        deployment: true
      }
    });

    return deploymentInstance;
  }

  
  /**
   * Delete DeploymentInstance
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.deploymentInstance.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const deploymentInstanceController = new DeploymentInstanceController();
export default deploymentInstanceController;
