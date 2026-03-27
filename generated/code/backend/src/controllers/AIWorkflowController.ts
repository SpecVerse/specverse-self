/**
 * AIWorkflowController
 * Model-specific business logic for AIWorkflow
 * 
 */

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

/** Parse ID from string to the correct type for this model */
function parseId(id: string): string {
  return id;
}

/**
 * AIWorkflowController class
 */
export class AIWorkflowController {
  
  /**
   * Validate AIWorkflow data
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
   * Create a new AIWorkflow
   */
  public async create(data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'create' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Transform FK fields to Prisma connect format
    const prismaData = { ...data };
    if (prismaData.orchestratorId) {
      prismaData.orchestrator = { connect: { id: prismaData.orchestratorId } };
      delete prismaData.orchestratorId;
    }

    // Create record
    const aIWorkflow = await prisma.aIWorkflow.create({
      data: prismaData,
      include: {
        orchestrator: true
      }
    });

    

    return aIWorkflow;
  }

  
  /**
   * Retrieve AIWorkflow by ID
   */
  public async retrieve(id: string): Promise<any> {
    const aIWorkflow = await prisma.aIWorkflow.findUnique({
      where: { id: parseId(id) },
      include: {
        orchestrator: true
      }
    });

    if (!aIWorkflow) {
      throw new Error('AIWorkflow not found');
    }

    return aIWorkflow;
  }

  /**
   * Retrieve all AIWorkflows
   */
  public async retrieveAll(options: { skip?: number; take?: number } = {}): Promise<any[]> {
    return await prisma.aIWorkflow.findMany({
      skip: options.skip,
      take: options.take,
      include: {
        orchestrator: true
      }
    });
  }

  
  /**
   * Update AIWorkflow
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
    if (updateData.orchestratorId) {
      updateData.orchestrator = { connect: { id: updateData.orchestratorId } };
      delete updateData.orchestratorId;
    }

    // Update record
    const aIWorkflow = await prisma.aIWorkflow.update({
      where: { id: parseId(id) },
      data: updateData,
      include: {
        orchestrator: true
      }
    });

    

    return aIWorkflow;
  }

  
  /**
   * Evolve AIWorkflow through lifecycle
   * States: 
   */
  public async evolve(id: string, data: any): Promise<any> {
    // Validate input
    const validationResult = this.validate(data, { operation: 'evolve' });
    if (!validationResult.valid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Get current record to check lifecycle state
    const current = await prisma.aIWorkflow.findUnique({ where: { id: parseId(id) } });
    if (!current) {
      throw new Error('AIWorkflow not found');
    }

    

    // Update record
    const aIWorkflow = await prisma.aIWorkflow.update({
      where: { id: parseId(id) },
      data,
      include: {
        orchestrator: true
      }
    });

    return aIWorkflow;
  }

  
  /**
   * Delete AIWorkflow
   */
  public async delete(id: string): Promise<void> {
    

    await prisma.aIWorkflow.delete({
      where: { id: parseId(id) }
    });

    
  }

  
}

// Export singleton instance
export const aIWorkflowController = new AIWorkflowController();
export default aIWorkflowController;
