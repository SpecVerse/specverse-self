# SpecLanguage

The core specification language: components, models, controllers, services, events, views, deployments

**Version:** 3.5.2  
**Generated:** 2026-03-24T19:25:39.459Z

## Table of Contents

- [Overview](#overview)
- [Models](#models)
  - [Specification](#specification)
  - [Component](#component)
  - [Import](#import)
  - [Export](#export)
  - [Model](#model)
  - [Attribute](#attribute)
  - [Relationship](#relationship)
  - [Lifecycle](#lifecycle)
  - [LifecycleState](#lifecyclestate)
  - [LifecycleTransition](#lifecycletransition)
  - [Profile](#profile)
  - [Primitive](#primitive)
  - [Operation](#operation)
  - [Step](#step)
  - [Controller](#controller)
  - [Service](#service)
  - [Event](#event)
  - [EventVersion](#eventversion)
  - [View](#view)
  - [Layout](#layout)
  - [UIComponent](#uicomponent)
  - [Deployment](#deployment)
  - [DeploymentInstance](#deploymentinstance)
  - [CommunicationChannel](#communicationchannel)
  - [Manifest](#manifest)
  - [InstanceFactory](#instancefactory)
  - [CapabilityMapping](#capabilitymapping)
  - [EntityModule](#entitymodule)
  - [EntityRegistry](#entityregistry)
  - [ConventionGrammar](#conventiongrammar)
  - [ConventionPattern](#conventionpattern)
  - [InferenceRule](#inferencerule)
  - [RuleTemplate](#ruletemplate)
  - [BehaviourSpec](#behaviourspec)
  - [Invariant](#invariant)
  - [SchemaFragment](#schemafragment)
  - [DiagramPlugin](#diagramplugin)
  - [CodeTemplate](#codetemplate)
  - [MCPServer](#mcpserver)
  - [MCPResource](#mcpresource)
  - [MCPTool](#mcptool)
  - [AIOrchestrator](#aiorchestrator)
  - [AIWorkflow](#aiworkflow)

## Overview

### Component Statistics

| Component Type | Count |
|----------------|-------|
| Models | 43 |
| Controllers | 0 |
| Services | 0 |
| Views | 0 |
| Events | 0 |

## Models

### Specification

A .specly file — the top-level container for all SpecVerse definitions

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| filename | String | ✓ | ✓ |  |
| specVersion | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| components | hasMany | Component |  |
| deployments | hasMany | Deployment |  |
| manifests | hasMany | Manifest |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Component

A named container grouping models, controllers, services, events, and views

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| version | String | ✓ |  |  |
| description | String |  |  |  |
| tags | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| specification | belongsTo | Specification |  |
| imports | hasMany | Import |  |
| exports | hasMany | Export |  |
| models | hasMany | Model |  |
| controllers | hasMany | Controller |  |
| services | hasMany | Service |  |
| events | hasMany | Event |  |
| views | hasMany | View |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Import

An import declaration referencing types from another component or package

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| from | String | ✓ |  |  |
| file | String |  |  |  |
| package | String |  |  |  |
| namespace | String |  |  |  |
| version | String |  |  |  |
| select | String |  |  |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Export

An export declaration making types available to other components

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| capabilities | String |  |  |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Model

A domain entity with attributes, relationships, lifecycles, and behaviours

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ | Auto: auto |
| createdAt | Timestamp | ✓ |  | Auto: auto |
| updatedAt | Timestamp | ✓ |  | Auto: auto |
| createdBy | String |  |  | Auto: auto |
| updatedBy | String |  |  | Auto: auto |
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String |  |  |  |
| extends | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| component | belongsTo | Component |  |
| attributes | hasMany | Attribute |  |
| relationships | hasMany | Relationship |  |
| lifecycles | hasMany | Lifecycle |  |
| behaviors | hasMany | Operation |  |
| profiles | hasMany | Profile |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Attribute

A typed field on a model — convention syntax expands 'email: Email required unique' into this

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| attrType | String | ✓ |  |  |
| required | Boolean |  |  | Default: false |
| unique | Boolean |  |  | Default: false |
| searchable | Boolean |  |  | Default: false |
| verified | Boolean |  |  | Default: false |
| defaultValue | String |  |  |  |
| auto | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| model | belongsTo | Model |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Relationship

A connection between models: hasMany, belongsTo, hasOne, manyToMany

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| relType | String | ✓ |  |  |
| target | String | ✓ |  |  |
| eager | Boolean |  |  | Default: false |
| cascade | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| model | belongsTo | Model |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Lifecycle

A state machine defining valid transitions for a model

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| flow | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| model | belongsTo | Model |  |
| states | hasMany | LifecycleState |  |
| transitions | hasMany | LifecycleTransition |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### LifecycleState

A named state within a lifecycle

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| isInitial | Boolean |  |  | Default: false |
| isTerminal | Boolean |  |  | Default: false |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| lifecycle | belongsTo | Lifecycle |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### LifecycleTransition

A valid transition between lifecycle states

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| fromState | String | ✓ |  |  |
| toState | String | ✓ |  |  |
| action | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| lifecycle | belongsTo | Lifecycle |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Profile

A set of additional attributes that can be attached to a model instance

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| model | belongsTo | Model |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Primitive

A reusable custom type definition — 'ProductCode: String pattern=...'

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| baseType | String | ✓ |  |  |
| description | String |  |  |  |
| pattern | String |  |  |  |
| isTypeAlias | Boolean |  |  | Default: true |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Operation

A named executable unit — the universal shape for model behaviors, CURED operations, controller actions, and service operations. All resolve to ExecutableProperties in the schema.

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| description | String |  |  |  |
| returns | String |  |  |  |
| requires | String |  |  |  |
| ensures | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| parameters | hasMany | Attribute |  |
| publishes | hasMany | Event |  |
| steps | hasMany | Step |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Step

An ordered unit within an operation — oneOf [String, Operation]. Simple steps are convention strings ('Validate cart', 'tax = subtotal * taxRate'). Complex steps are full inline Operations. Convention processors expand string steps when matching grammars exist.

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| ordinal | Integer | ✓ |  |  |
| instruction | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| operation | belongsTo | Operation |  |
| expandedOperation | hasOne | Operation |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Controller

API controller with CURED operations — generated by inference from models

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| pattern | String | ✓ |  |  |
| parentModel | String |  |  |  |
| hasAssociationOps | Boolean |  |  | Default: false |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| component | belongsTo | Component |  |
| model | belongsTo | Model |  |
| curedOperations | hasMany | Operation |  |
| actions | hasMany | Operation |  |
| subscriptions | hasMany | Event |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Service

Business logic service — generated by inference for lifecycle, relationship, and integration patterns

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| pattern | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| component | belongsTo | Component |  |
| model | belongsTo | Model |  |
| operations | hasMany | Operation |  |
| subscriptions | hasMany | Event |  |

#### Lifecycles

**servicePattern:** active → deprecated
- Actions: to_deprecated

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Event

Domain event with typed payload — generated by inference for CRUD, lifecycle, relationship, and validation patterns

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String |  |  |  |
| pattern | String | ✓ |  |  |
| modelName | String | ✓ |  |  |
| version | Integer | ✓ |  | Default: 1 |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| component | belongsTo | Component |  |
| attributes | hasMany | Attribute |  |
| previousVersions | hasMany | EventVersion |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### EventVersion

A previous version of an event schema for compatibility tracking

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| version | Integer | ✓ |  |  |
| compatibility | String | ✓ |  | Default: none |
| deprecated | Boolean |  |  | Default: false |
| deprecationMessage | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| event | belongsTo | Event |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### View

UI specification — page, list, detail, form, dashboard, or custom views generated from models

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| viewType | String | ✓ |  |  |
| primaryModel | String | ✓ |  |  |
| tags | String |  |  |  |
| export | Boolean |  |  | Default: false |
| hasProfileSupport | Boolean |  |  | Default: false |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| component | belongsTo | Component |  |
| layout | hasOne | Layout |  |
| uiComponents | hasMany | UIComponent |  |
| subscriptions | hasMany | Event |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Layout

View layout definition — standard or custom arrangement of UI components

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| layoutType | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| view | belongsTo | View |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### UIComponent

An atomic UI component within a view — one of 49 types (input, select, table, etc.)

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| componentType | String | ✓ |  |  |
| name | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| view | belongsTo | View |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Deployment

Logical deployment configuration mapping components to instances

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| environment | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| specification | belongsTo | Specification |  |
| instances | hasMany | DeploymentInstance |  |
| channels | hasMany | CommunicationChannel |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### DeploymentInstance

A deployed instance of a controller, service, or view

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| category | String | ✓ |  |  |
| scale | Integer |  |  | Default: 1 |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| deployment | belongsTo | Deployment |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### CommunicationChannel

A message bus or communication link between deployment instances

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| channelType | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| deployment | belongsTo | Deployment |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Manifest

Implementation manifest mapping deployment instances to concrete technologies

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| specVersion | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| specification | belongsTo | Specification |  |
| instanceFactories | hasMany | InstanceFactory |  |
| capabilityMappings | hasMany | CapabilityMapping |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### InstanceFactory

A reusable technology specification — Prisma, Fastify, NestJS, React, etc.

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| version | String | ✓ |  |  |
| category | String | ✓ |  |  |
| technology | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| manifest | belongsTo | Manifest |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### CapabilityMapping

Maps a capability pattern to an instance factory: storage.database -> PrismaPostgres

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| capability | String | ✓ |  |  |
| factoryName | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| manifest | belongsTo | Manifest |  |
| instanceFactory | belongsTo | InstanceFactory |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### EntityModule

A self-contained unit of specification capability with up to 8 facets

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| moduleType | String | ✓ |  |  |
| version | String | ✓ |  |  |
| hasFacetSchema | Boolean |  |  | Default: true |
| hasFacetConventions | Boolean |  |  | Default: true |
| hasFacetInference | Boolean |  |  | Default: false |
| hasFacetBehaviour | Boolean |  |  | Default: true |
| hasFacetGenerators | Boolean |  |  | Default: false |
| hasFacetDiagrams | Boolean |  |  | Default: false |
| hasFacetDocs | Boolean |  |  | Default: true |
| hasFacetTests | Boolean |  |  | Default: true |

#### Lifecycles

**registration:** discovered → registered → active → deprecated
- Actions: to_registered, to_active, to_deprecated

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### EntityRegistry

Singleton registry holding all entity modules in topological dependency order

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| moduleCount | Integer |  |  |  |
| usesKahnsAlgorithm | Boolean |  |  | Default: true |

#### Behaviors

##### bootstrap

Register all core and extension entity modules

**Postconditions:**
- All 9 modules registered
- Dependency order resolved

##### getConventionProcessors

Return convention processors from all registered modules

**Returns:** Map<string, EntityConventionProcessor>

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### ConventionGrammar

Defines human-readable convention patterns that expand into formal Quint specifications

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| domain | String | ✓ |  | Default: quint |
| entityType | String | ✓ | ✓ |  |
| conventionCount | Integer |  |  |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### ConventionPattern

A single pattern-to-template mapping: '{entities} must have attributes' -> Quint invariant

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| pattern | String | ✓ |  |  |
| expandsTo | String | ✓ |  |  |
| description | String |  |  |  |
| templateName | String | ✓ |  |  |
| templateBody | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| grammar | belongsTo | ConventionGrammar |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### InferenceRule

A JSON-based rule that pattern-matches models and generates architecture

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| ruleId | String | ✓ | ✓ |  |
| description | String | ✓ |  |  |
| pattern | String | ✓ |  |  |
| priority | Integer | ✓ |  | Default: 100 |
| category | String | ✓ |  |  |
| conditionExpression | String |  |  |  |
| isActive | Boolean |  |  | Default: true |

#### Lifecycles

**ruleStatus:** active → disabled → active
- Actions: to_disabled, to_active

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### RuleTemplate

A Handlebars template that generates YAML output from matched model context

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| templateType | String | ✓ |  |  |
| content | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| rule | belongsTo | InferenceRule |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### BehaviourSpec

Quint formal specification defining invariants and rules for an entity type

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| entityType | String | ✓ |  |  |
| invariantCount | Integer |  |  |  |
| ruleCount | Integer |  |  |  |
| verificationStatus | String |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| module | belongsTo | EntityModule |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### Invariant

A Quint val that must hold for all valid specifications

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String | ✓ |  |  |
| quintExpression | String | ✓ |  |  |
| category | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| spec | belongsTo | BehaviourSpec |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### SchemaFragment

A JSON Schema fragment providing $defs for one entity type or shared concern

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| schemaId | String | ✓ | ✓ |  |
| description | String |  |  |  |
| defsCount | Integer | ✓ |  |  |
| fragmentType | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| module | belongsTo | EntityModule |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### DiagramPlugin

A Mermaid diagram generator registered by entity modules

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| diagramType | String | ✓ | ✓ |  |
| description | String |  |  |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### CodeTemplate

A TypeScript template generator that produces framework-specific code from specs

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| templateType | String | ✓ |  |  |
| technology | String | ✓ |  |  |
| basePath | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| entityModule | belongsTo | EntityModule |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### MCPServer

Model Context Protocol server exposing SpecVerse capabilities to AI assistants

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  | Default: "specverse-dynamic-cli" |
| mode | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| resources | hasMany | MCPResource |  |
| tools | hasMany | MCPTool |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### MCPResource

A read-only resource served by the MCP server (schema, conventions, entity metadata)

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| uri | String | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| description | String |  |  |  |
| mimeType | String | ✓ |  | Default: "application/json" |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| server | belongsTo | MCPServer |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### MCPTool

An executable tool exposed by the MCP server (CLI proxy or entity module tool)

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String | ✓ |  |  |
| isEntityModuleTool | Boolean |  |  | Default: false |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| server | belongsTo | MCPServer |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### AIOrchestrator

Coordinates multi-step AI workflows: analyse, create, infer, materialise, realize

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ |  |  |
| providerType | String | ✓ |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| workflows | hasMany | AIWorkflow |  |

#### Lifecycles

**workflow:** idle → analysing → creating → inferring → materialising → realizing → complete
- Actions: to_analysing, to_creating, to_inferring, to_materialising, to_realizing, to_complete

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---

### AIWorkflow

A defined multi-step AI workflow with conditional logic and chaining

#### Attributes

| Name | Type | Required | Unique | Description |
|------|------|----------|--------|-------------|
| id | UUID | ✓ | ✓ |  |
| name | String | ✓ | ✓ |  |
| description | String |  |  |  |
| stepCount | Integer |  |  |  |

#### Relationships

| Name | Type | Target | Description |
|------|------|--------|-------------|
| orchestrator | belongsTo | AIOrchestrator |  |

#### Behaviors

##### attachProfile

Attach a profile to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile exists and is compatible with this model

**Postconditions:**
- Profile is attached
- Profile attributes are available

##### detachProfile

Detach a profile from this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

**Preconditions:**
- Profile is currently attached

**Postconditions:**
- Profile is detached
- Profile attributes are no longer available

##### hasProfile

Check if a profile is attached to this model instance

**Parameters:**
- `profileName`: String (required)

**Returns:** Boolean

---
