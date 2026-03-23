import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import SpecificationRoutes from './routes/SpecificationController.js';
import ComponentRoutes from './routes/ComponentController.js';
import ImportRoutes from './routes/ImportController.js';
import ExportRoutes from './routes/ExportController.js';
import ModelRoutes from './routes/ModelController.js';
import AttributeRoutes from './routes/AttributeController.js';
import RelationshipRoutes from './routes/RelationshipController.js';
import LifecycleRoutes from './routes/LifecycleController.js';
import LifecycleStateRoutes from './routes/LifecycleStateController.js';
import LifecycleTransitionRoutes from './routes/LifecycleTransitionController.js';
import ProfileRoutes from './routes/ProfileController.js';
import PrimitiveRoutes from './routes/PrimitiveController.js';
import OperationRoutes from './routes/OperationController.js';
import StepRoutes from './routes/StepController.js';
import ControllerRoutes from './routes/ControllerController.js';
import ServiceRoutes from './routes/ServiceController.js';
import EventRoutes from './routes/EventController.js';
import EventVersionRoutes from './routes/EventVersionController.js';
import ViewRoutes from './routes/ViewController.js';
import LayoutRoutes from './routes/LayoutController.js';
import UIComponentRoutes from './routes/UIComponentController.js';
import DeploymentRoutes from './routes/DeploymentController.js';
import DeploymentInstanceRoutes from './routes/DeploymentInstanceController.js';
import CommunicationChannelRoutes from './routes/CommunicationChannelController.js';
import ManifestRoutes from './routes/ManifestController.js';
import InstanceFactoryRoutes from './routes/InstanceFactoryController.js';
import CapabilityMappingRoutes from './routes/CapabilityMappingController.js';
import EntityModuleRoutes from './routes/EntityModuleController.js';
import EntityRegistryRoutes from './routes/EntityRegistryController.js';
import ConventionGrammarRoutes from './routes/ConventionGrammarController.js';
import ConventionPatternRoutes from './routes/ConventionPatternController.js';
import InferenceRuleRoutes from './routes/InferenceRuleController.js';
import RuleTemplateRoutes from './routes/RuleTemplateController.js';
import BehaviourSpecRoutes from './routes/BehaviourSpecController.js';
import InvariantRoutes from './routes/InvariantController.js';
import SchemaFragmentRoutes from './routes/SchemaFragmentController.js';
import DiagramPluginRoutes from './routes/DiagramPluginController.js';
import CodeTemplateRoutes from './routes/CodeTemplateController.js';
import MCPServerRoutes from './routes/MCPServerController.js';
import MCPResourceRoutes from './routes/MCPResourceController.js';
import MCPToolRoutes from './routes/MCPToolController.js';
import AIOrchestratorRoutes from './routes/AIOrchestratorController.js';
import AIWorkflowRoutes from './routes/AIWorkflowController.js';

import { SpecificationRelationshipService } from './services/SpecificationRelationshipService.js';
import { ComponentRelationshipService } from './services/ComponentRelationshipService.js';
import { ModelRelationshipService } from './services/ModelRelationshipService.js';
import { LifecycleRelationshipService } from './services/LifecycleRelationshipService.js';
import { OperationRelationshipService } from './services/OperationRelationshipService.js';
import { ControllerRelationshipService } from './services/ControllerRelationshipService.js';
import { EventRelationshipService } from './services/EventRelationshipService.js';
import { ViewRelationshipService } from './services/ViewRelationshipService.js';
import { DeploymentRelationshipService } from './services/DeploymentRelationshipService.js';
import { ManifestRelationshipService } from './services/ManifestRelationshipService.js';
import { EntityModuleRelationshipService } from './services/EntityModuleRelationshipService.js';
import { MCPServerRelationshipService } from './services/MCPServerRelationshipService.js';
import { SpecificationController } from './controllers/SpecificationController.js';
import { ComponentController } from './controllers/ComponentController.js';
import { ImportController } from './controllers/ImportController.js';
import { ExportController } from './controllers/ExportController.js';
import { ModelController } from './controllers/ModelController.js';
import { AttributeController } from './controllers/AttributeController.js';
import { RelationshipController } from './controllers/RelationshipController.js';
import { LifecycleController } from './controllers/LifecycleController.js';
import { LifecycleStateController } from './controllers/LifecycleStateController.js';
import { LifecycleTransitionController } from './controllers/LifecycleTransitionController.js';
import { ProfileController } from './controllers/ProfileController.js';
import { PrimitiveController } from './controllers/PrimitiveController.js';
import { OperationController } from './controllers/OperationController.js';
import { StepController } from './controllers/StepController.js';
import { ControllerController } from './controllers/ControllerController.js';
import { ServiceController } from './controllers/ServiceController.js';
import { EventController } from './controllers/EventController.js';
import { EventVersionController } from './controllers/EventVersionController.js';
import { ViewController } from './controllers/ViewController.js';
import { LayoutController } from './controllers/LayoutController.js';
import { UIComponentController } from './controllers/UIComponentController.js';
import { DeploymentController } from './controllers/DeploymentController.js';
import { DeploymentInstanceController } from './controllers/DeploymentInstanceController.js';
import { CommunicationChannelController } from './controllers/CommunicationChannelController.js';
import { ManifestController } from './controllers/ManifestController.js';
import { InstanceFactoryController } from './controllers/InstanceFactoryController.js';
import { CapabilityMappingController } from './controllers/CapabilityMappingController.js';
import { EntityModuleController } from './controllers/EntityModuleController.js';
import { EntityRegistryController } from './controllers/EntityRegistryController.js';
import { ConventionGrammarController } from './controllers/ConventionGrammarController.js';
import { ConventionPatternController } from './controllers/ConventionPatternController.js';
import { InferenceRuleController } from './controllers/InferenceRuleController.js';
import { RuleTemplateController } from './controllers/RuleTemplateController.js';
import { BehaviourSpecController } from './controllers/BehaviourSpecController.js';
import { InvariantController } from './controllers/InvariantController.js';
import { SchemaFragmentController } from './controllers/SchemaFragmentController.js';
import { DiagramPluginController } from './controllers/DiagramPluginController.js';
import { CodeTemplateController } from './controllers/CodeTemplateController.js';
import { MCPServerController } from './controllers/MCPServerController.js';
import { MCPResourceController } from './controllers/MCPResourceController.js';
import { MCPToolController } from './controllers/MCPToolController.js';
import { AIOrchestratorController } from './controllers/AIOrchestratorController.js';
import { AIWorkflowController } from './controllers/AIWorkflowController.js';

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

const prisma = new PrismaClient();

async function start() {
  try {
    // Initialize services and controllers
  const specificationRelationshipService = new SpecificationRelationshipService(prisma);
  const componentRelationshipService = new ComponentRelationshipService(prisma);
  const modelRelationshipService = new ModelRelationshipService(prisma);
  const lifecycleRelationshipService = new LifecycleRelationshipService(prisma);
  const operationRelationshipService = new OperationRelationshipService(prisma);
  const controllerRelationshipService = new ControllerRelationshipService(prisma);
  const eventRelationshipService = new EventRelationshipService(prisma);
  const viewRelationshipService = new ViewRelationshipService(prisma);
  const deploymentRelationshipService = new DeploymentRelationshipService(prisma);
  const manifestRelationshipService = new ManifestRelationshipService(prisma);
  const entityModuleRelationshipService = new EntityModuleRelationshipService(prisma);
  const mCPServerRelationshipService = new MCPServerRelationshipService(prisma);
  const specificationController = new SpecificationController();
  const componentController = new ComponentController();
  const importController = new ImportController();
  const exportController = new ExportController();
  const modelController = new ModelController();
  const attributeController = new AttributeController();
  const relationshipController = new RelationshipController();
  const lifecycleController = new LifecycleController();
  const lifecycleStateController = new LifecycleStateController();
  const lifecycleTransitionController = new LifecycleTransitionController();
  const profileController = new ProfileController();
  const primitiveController = new PrimitiveController();
  const operationController = new OperationController();
  const stepController = new StepController();
  const controllerController = new ControllerController();
  const serviceController = new ServiceController();
  const eventController = new EventController();
  const eventVersionController = new EventVersionController();
  const viewController = new ViewController();
  const layoutController = new LayoutController();
  const uIComponentController = new UIComponentController();
  const deploymentController = new DeploymentController();
  const deploymentInstanceController = new DeploymentInstanceController();
  const communicationChannelController = new CommunicationChannelController();
  const manifestController = new ManifestController();
  const instanceFactoryController = new InstanceFactoryController();
  const capabilityMappingController = new CapabilityMappingController();
  const entityModuleController = new EntityModuleController();
  const entityRegistryController = new EntityRegistryController();
  const conventionGrammarController = new ConventionGrammarController();
  const conventionPatternController = new ConventionPatternController();
  const inferenceRuleController = new InferenceRuleController();
  const ruleTemplateController = new RuleTemplateController();
  const behaviourSpecController = new BehaviourSpecController();
  const invariantController = new InvariantController();
  const schemaFragmentController = new SchemaFragmentController();
  const diagramPluginController = new DiagramPluginController();
  const codeTemplateController = new CodeTemplateController();
  const mCPServerController = new MCPServerController();
  const mCPResourceController = new MCPResourceController();
  const mCPToolController = new MCPToolController();
  const aIOrchestratorController = new AIOrchestratorController();
  const aIWorkflowController = new AIWorkflowController();

    const services = {
    SpecificationRelationshipService: specificationRelationshipService,
    ComponentRelationshipService: componentRelationshipService,
    ModelRelationshipService: modelRelationshipService,
    LifecycleRelationshipService: lifecycleRelationshipService,
    OperationRelationshipService: operationRelationshipService,
    ControllerRelationshipService: controllerRelationshipService,
    EventRelationshipService: eventRelationshipService,
    ViewRelationshipService: viewRelationshipService,
    DeploymentRelationshipService: deploymentRelationshipService,
    ManifestRelationshipService: manifestRelationshipService,
    EntityModuleRelationshipService: entityModuleRelationshipService,
    MCPServerRelationshipService: mCPServerRelationshipService
    };

    // Register plugins
    await app.register(cors, {
      origin: true,
      credentials: true
    });

    // Register routes
  // MetaRoutes disabled for now - enable when meta-routes generator is integrated
  // await app.register(MetaRoutes, {
  //   prefix: '/api'
  // });
  await app.register(SpecificationRoutes, {
    prefix: '/api/specifications',
    controllers: {
      SpecificationController: specificationController
    },
    services: services
  });
  await app.register(ComponentRoutes, {
    prefix: '/api/components',
    controllers: {
      ComponentController: componentController
    },
    services: services
  });
  await app.register(ImportRoutes, {
    prefix: '/api/imports',
    controllers: {
      ImportController: importController
    },
    services: services
  });
  await app.register(ExportRoutes, {
    prefix: '/api/exports',
    controllers: {
      ExportController: exportController
    },
    services: services
  });
  await app.register(ModelRoutes, {
    prefix: '/api/models',
    controllers: {
      ModelController: modelController
    },
    services: services
  });
  await app.register(AttributeRoutes, {
    prefix: '/api/attributes',
    controllers: {
      AttributeController: attributeController
    },
    services: services
  });
  await app.register(RelationshipRoutes, {
    prefix: '/api/relationships',
    controllers: {
      RelationshipController: relationshipController
    },
    services: services
  });
  await app.register(LifecycleRoutes, {
    prefix: '/api/lifecycles',
    controllers: {
      LifecycleController: lifecycleController
    },
    services: services
  });
  await app.register(LifecycleStateRoutes, {
    prefix: '/api/lifecyclestates',
    controllers: {
      LifecycleStateController: lifecycleStateController
    },
    services: services
  });
  await app.register(LifecycleTransitionRoutes, {
    prefix: '/api/lifecycletransitions',
    controllers: {
      LifecycleTransitionController: lifecycleTransitionController
    },
    services: services
  });
  await app.register(ProfileRoutes, {
    prefix: '/api/profiles',
    controllers: {
      ProfileController: profileController
    },
    services: services
  });
  await app.register(PrimitiveRoutes, {
    prefix: '/api/primitives',
    controllers: {
      PrimitiveController: primitiveController
    },
    services: services
  });
  await app.register(OperationRoutes, {
    prefix: '/api/operations',
    controllers: {
      OperationController: operationController
    },
    services: services
  });
  await app.register(StepRoutes, {
    prefix: '/api/steps',
    controllers: {
      StepController: stepController
    },
    services: services
  });
  await app.register(ControllerRoutes, {
    prefix: '/api/controllers',
    controllers: {
      ControllerController: controllerController
    },
    services: services
  });
  await app.register(ServiceRoutes, {
    prefix: '/api/services',
    controllers: {
      ServiceController: serviceController
    },
    services: services
  });
  await app.register(EventRoutes, {
    prefix: '/api/events',
    controllers: {
      EventController: eventController
    },
    services: services
  });
  await app.register(EventVersionRoutes, {
    prefix: '/api/eventversions',
    controllers: {
      EventVersionController: eventVersionController
    },
    services: services
  });
  await app.register(ViewRoutes, {
    prefix: '/api/views',
    controllers: {
      ViewController: viewController
    },
    services: services
  });
  await app.register(LayoutRoutes, {
    prefix: '/api/layouts',
    controllers: {
      LayoutController: layoutController
    },
    services: services
  });
  await app.register(UIComponentRoutes, {
    prefix: '/api/uicomponents',
    controllers: {
      UIComponentController: uIComponentController
    },
    services: services
  });
  await app.register(DeploymentRoutes, {
    prefix: '/api/deployments',
    controllers: {
      DeploymentController: deploymentController
    },
    services: services
  });
  await app.register(DeploymentInstanceRoutes, {
    prefix: '/api/deploymentinstances',
    controllers: {
      DeploymentInstanceController: deploymentInstanceController
    },
    services: services
  });
  await app.register(CommunicationChannelRoutes, {
    prefix: '/api/communicationchannels',
    controllers: {
      CommunicationChannelController: communicationChannelController
    },
    services: services
  });
  await app.register(ManifestRoutes, {
    prefix: '/api/manifests',
    controllers: {
      ManifestController: manifestController
    },
    services: services
  });
  await app.register(InstanceFactoryRoutes, {
    prefix: '/api/instancefactorys',
    controllers: {
      InstanceFactoryController: instanceFactoryController
    },
    services: services
  });
  await app.register(CapabilityMappingRoutes, {
    prefix: '/api/capabilitymappings',
    controllers: {
      CapabilityMappingController: capabilityMappingController
    },
    services: services
  });
  await app.register(EntityModuleRoutes, {
    prefix: '/api/entitymodules',
    controllers: {
      EntityModuleController: entityModuleController
    },
    services: services
  });
  await app.register(EntityRegistryRoutes, {
    prefix: '/api/entityregistrys',
    controllers: {
      EntityRegistryController: entityRegistryController
    },
    services: services
  });
  await app.register(ConventionGrammarRoutes, {
    prefix: '/api/conventiongrammars',
    controllers: {
      ConventionGrammarController: conventionGrammarController
    },
    services: services
  });
  await app.register(ConventionPatternRoutes, {
    prefix: '/api/conventionpatterns',
    controllers: {
      ConventionPatternController: conventionPatternController
    },
    services: services
  });
  await app.register(InferenceRuleRoutes, {
    prefix: '/api/inferencerules',
    controllers: {
      InferenceRuleController: inferenceRuleController
    },
    services: services
  });
  await app.register(RuleTemplateRoutes, {
    prefix: '/api/ruletemplates',
    controllers: {
      RuleTemplateController: ruleTemplateController
    },
    services: services
  });
  await app.register(BehaviourSpecRoutes, {
    prefix: '/api/behaviourspecs',
    controllers: {
      BehaviourSpecController: behaviourSpecController
    },
    services: services
  });
  await app.register(InvariantRoutes, {
    prefix: '/api/invariants',
    controllers: {
      InvariantController: invariantController
    },
    services: services
  });
  await app.register(SchemaFragmentRoutes, {
    prefix: '/api/schemafragments',
    controllers: {
      SchemaFragmentController: schemaFragmentController
    },
    services: services
  });
  await app.register(DiagramPluginRoutes, {
    prefix: '/api/diagramplugins',
    controllers: {
      DiagramPluginController: diagramPluginController
    },
    services: services
  });
  await app.register(CodeTemplateRoutes, {
    prefix: '/api/codetemplates',
    controllers: {
      CodeTemplateController: codeTemplateController
    },
    services: services
  });
  await app.register(MCPServerRoutes, {
    prefix: '/api/mcpservers',
    controllers: {
      MCPServerController: mCPServerController
    },
    services: services
  });
  await app.register(MCPResourceRoutes, {
    prefix: '/api/mcpresources',
    controllers: {
      MCPResourceController: mCPResourceController
    },
    services: services
  });
  await app.register(MCPToolRoutes, {
    prefix: '/api/mcptools',
    controllers: {
      MCPToolController: mCPToolController
    },
    services: services
  });
  await app.register(AIOrchestratorRoutes, {
    prefix: '/api/aiorchestrators',
    controllers: {
      AIOrchestratorController: aIOrchestratorController
    },
    services: services
  });
  await app.register(AIWorkflowRoutes, {
    prefix: '/api/aiworkflows',
    controllers: {
      AIWorkflowController: aIWorkflowController
    },
    services: services
  });

    const preferredPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';

    // Try to start server with automatic port fallback
    let port = preferredPort;
    let started = false;
    const maxAttempts = 10;

    for (let i = 0; i < maxAttempts && !started; i++) {
      port = preferredPort + i;
      try {
        await app.listen({ port, host });
        started = true;

        if (i > 0) {
          console.log(`⚠️  Port ${preferredPort} was in use, using ${port} instead`);
        }
        console.log(`🚀 Server running on http://${host}:${port}`);
        console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
      } catch (err: any) {
        if (err.code === 'EADDRINUSE' && i < maxAttempts - 1) {
          // Port in use, try next port
          continue;
        } else {
          // Different error or ran out of attempts
          throw err;
        }
      }
    }

    if (!started) {
      throw new Error(`Could not find available port in range ${preferredPort}-${preferredPort + maxAttempts - 1}`);
    }
  } catch (err) {
    app.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n👋 Shutting down gracefully...');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
});

start();
