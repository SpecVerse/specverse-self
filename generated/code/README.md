# SpecLanguage

The core specification language: components, models, controllers, services, events, views, deployments

## Tech Stack

- **Runtime**: Node.js, TypeScript
- **Web Framework**: FastifyAPI
- **ORM**: PrismaORM

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (or your database of choice)

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Configure your environment variables in `.env`

### Database Setup

**Important**: Create the database before running Prisma commands.

```bash
# Create database (PostgreSQL example)
createdb your_database_name

# Or using psql:
# psql postgres
# CREATE DATABASE your_database_name;
# \q

# Update DATABASE_URL in .env with your database name
# DATABASE_URL="postgresql://localhost:5432/your_database_name"

# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Or use migrations (for production)
npm run db:migrate
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## API

The API server runs on `http://localhost:${PORT}` (default: 3000)

### Endpoints

- **SpecificationController**: `/api`
- **ComponentController**: `/api`
- **ImportController**: `/api`
- **ExportController**: `/api`
- **ModelController**: `/api`
- **AttributeController**: `/api`
- **RelationshipController**: `/api`
- **LifecycleController**: `/api`
- **LifecycleStateController**: `/api`
- **LifecycleTransitionController**: `/api`
- **ProfileController**: `/api`
- **PrimitiveController**: `/api`
- **OperationController**: `/api`
- **StepController**: `/api`
- **ControllerController**: `/api`
- **ServiceController**: `/api`
- **EventController**: `/api`
- **EventVersionController**: `/api`
- **ViewController**: `/api`
- **LayoutController**: `/api`
- **UIComponentController**: `/api`
- **DeploymentController**: `/api`
- **DeploymentInstanceController**: `/api`
- **CommunicationChannelController**: `/api`
- **ManifestController**: `/api`
- **InstanceFactoryController**: `/api`
- **CapabilityMappingController**: `/api`
- **EntityModuleController**: `/api`
- **EntityRegistryController**: `/api`
- **ConventionGrammarController**: `/api`
- **ConventionPatternController**: `/api`
- **InferenceRuleController**: `/api`
- **RuleTemplateController**: `/api`
- **BehaviourSpecController**: `/api`
- **InvariantController**: `/api`
- **SchemaFragmentController**: `/api`
- **DiagramPluginController**: `/api`
- **CodeTemplateController**: `/api`
- **VSCodeExtensionController**: `/api`
- **ExtensionLanguageController**: `/api`
- **ExtensionCommandController**: `/api`
- **ExtensionThemeController**: `/api`
- **MCPServerController**: `/api`
- **MCPResourceController**: `/api`
- **MCPToolController**: `/api`
- **AIOrchestratorController**: `/api`
- **AIWorkflowController**: `/api`

---

_Generated with [SpecVerse](https://github.com/specverse/specverse-lang)_