import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpecificationListView from './components/SpecificationListView';
import SpecificationDetailView from './components/SpecificationDetailView';
import SpecificationFormView from './components/SpecificationFormView';
import ComponentListView from './components/ComponentListView';
import ComponentDetailView from './components/ComponentDetailView';
import ComponentFormView from './components/ComponentFormView';
import ImportListView from './components/ImportListView';
import ImportDetailView from './components/ImportDetailView';
import ImportFormView from './components/ImportFormView';
import ExportListView from './components/ExportListView';
import ExportDetailView from './components/ExportDetailView';
import ExportFormView from './components/ExportFormView';
import ModelListView from './components/ModelListView';
import ModelDetailView from './components/ModelDetailView';
import ModelFormView from './components/ModelFormView';
import AttributeListView from './components/AttributeListView';
import AttributeDetailView from './components/AttributeDetailView';
import AttributeFormView from './components/AttributeFormView';
import RelationshipListView from './components/RelationshipListView';
import RelationshipDetailView from './components/RelationshipDetailView';
import RelationshipFormView from './components/RelationshipFormView';
import LifecycleListView from './components/LifecycleListView';
import LifecycleDetailView from './components/LifecycleDetailView';
import LifecycleFormView from './components/LifecycleFormView';
import LifecycleStateListView from './components/LifecycleStateListView';
import LifecycleStateDetailView from './components/LifecycleStateDetailView';
import LifecycleStateFormView from './components/LifecycleStateFormView';
import LifecycleTransitionListView from './components/LifecycleTransitionListView';
import LifecycleTransitionDetailView from './components/LifecycleTransitionDetailView';
import LifecycleTransitionFormView from './components/LifecycleTransitionFormView';
import ProfileListView from './components/ProfileListView';
import ProfileDetailView from './components/ProfileDetailView';
import ProfileFormView from './components/ProfileFormView';
import PrimitiveListView from './components/PrimitiveListView';
import PrimitiveDetailView from './components/PrimitiveDetailView';
import PrimitiveFormView from './components/PrimitiveFormView';
import OperationListView from './components/OperationListView';
import OperationDetailView from './components/OperationDetailView';
import OperationFormView from './components/OperationFormView';
import StepListView from './components/StepListView';
import StepDetailView from './components/StepDetailView';
import StepFormView from './components/StepFormView';
import ControllerListView from './components/ControllerListView';
import ControllerDetailView from './components/ControllerDetailView';
import ControllerFormView from './components/ControllerFormView';
import ServiceListView from './components/ServiceListView';
import ServiceDetailView from './components/ServiceDetailView';
import ServiceFormView from './components/ServiceFormView';
import EventListView from './components/EventListView';
import EventDetailView from './components/EventDetailView';
import EventFormView from './components/EventFormView';
import EventVersionListView from './components/EventVersionListView';
import EventVersionDetailView from './components/EventVersionDetailView';
import EventVersionFormView from './components/EventVersionFormView';
import ViewListView from './components/ViewListView';
import ViewDetailView from './components/ViewDetailView';
import ViewFormView from './components/ViewFormView';
import LayoutListView from './components/LayoutListView';
import LayoutDetailView from './components/LayoutDetailView';
import LayoutFormView from './components/LayoutFormView';
import UIComponentListView from './components/UIComponentListView';
import UIComponentDetailView from './components/UIComponentDetailView';
import UIComponentFormView from './components/UIComponentFormView';
import DeploymentListView from './components/DeploymentListView';
import DeploymentDetailView from './components/DeploymentDetailView';
import DeploymentFormView from './components/DeploymentFormView';
import DeploymentInstanceListView from './components/DeploymentInstanceListView';
import DeploymentInstanceDetailView from './components/DeploymentInstanceDetailView';
import DeploymentInstanceFormView from './components/DeploymentInstanceFormView';
import CommunicationChannelListView from './components/CommunicationChannelListView';
import CommunicationChannelDetailView from './components/CommunicationChannelDetailView';
import CommunicationChannelFormView from './components/CommunicationChannelFormView';
import ManifestListView from './components/ManifestListView';
import ManifestDetailView from './components/ManifestDetailView';
import ManifestFormView from './components/ManifestFormView';
import InstanceFactoryListView from './components/InstanceFactoryListView';
import InstanceFactoryDetailView from './components/InstanceFactoryDetailView';
import InstanceFactoryFormView from './components/InstanceFactoryFormView';
import CapabilityMappingListView from './components/CapabilityMappingListView';
import CapabilityMappingDetailView from './components/CapabilityMappingDetailView';
import CapabilityMappingFormView from './components/CapabilityMappingFormView';
import EntityModuleListView from './components/EntityModuleListView';
import EntityModuleDetailView from './components/EntityModuleDetailView';
import EntityModuleFormView from './components/EntityModuleFormView';
import EntityRegistryListView from './components/EntityRegistryListView';
import EntityRegistryDetailView from './components/EntityRegistryDetailView';
import EntityRegistryFormView from './components/EntityRegistryFormView';
import ConventionGrammarListView from './components/ConventionGrammarListView';
import ConventionGrammarDetailView from './components/ConventionGrammarDetailView';
import ConventionGrammarFormView from './components/ConventionGrammarFormView';
import ConventionPatternListView from './components/ConventionPatternListView';
import ConventionPatternDetailView from './components/ConventionPatternDetailView';
import ConventionPatternFormView from './components/ConventionPatternFormView';
import InferenceRuleListView from './components/InferenceRuleListView';
import InferenceRuleDetailView from './components/InferenceRuleDetailView';
import InferenceRuleFormView from './components/InferenceRuleFormView';
import RuleTemplateListView from './components/RuleTemplateListView';
import RuleTemplateDetailView from './components/RuleTemplateDetailView';
import RuleTemplateFormView from './components/RuleTemplateFormView';
import BehaviourSpecListView from './components/BehaviourSpecListView';
import BehaviourSpecDetailView from './components/BehaviourSpecDetailView';
import BehaviourSpecFormView from './components/BehaviourSpecFormView';
import InvariantListView from './components/InvariantListView';
import InvariantDetailView from './components/InvariantDetailView';
import InvariantFormView from './components/InvariantFormView';
import SchemaFragmentListView from './components/SchemaFragmentListView';
import SchemaFragmentDetailView from './components/SchemaFragmentDetailView';
import SchemaFragmentFormView from './components/SchemaFragmentFormView';
import DiagramPluginListView from './components/DiagramPluginListView';
import DiagramPluginDetailView from './components/DiagramPluginDetailView';
import DiagramPluginFormView from './components/DiagramPluginFormView';
import CodeTemplateListView from './components/CodeTemplateListView';
import CodeTemplateDetailView from './components/CodeTemplateDetailView';
import CodeTemplateFormView from './components/CodeTemplateFormView';
import VSCodeExtensionListView from './components/VSCodeExtensionListView';
import VSCodeExtensionDetailView from './components/VSCodeExtensionDetailView';
import VSCodeExtensionFormView from './components/VSCodeExtensionFormView';
import ExtensionLanguageListView from './components/ExtensionLanguageListView';
import ExtensionLanguageDetailView from './components/ExtensionLanguageDetailView';
import ExtensionLanguageFormView from './components/ExtensionLanguageFormView';
import ExtensionCommandListView from './components/ExtensionCommandListView';
import ExtensionCommandDetailView from './components/ExtensionCommandDetailView';
import ExtensionCommandFormView from './components/ExtensionCommandFormView';
import ExtensionThemeListView from './components/ExtensionThemeListView';
import ExtensionThemeDetailView from './components/ExtensionThemeDetailView';
import ExtensionThemeFormView from './components/ExtensionThemeFormView';
import MCPServerListView from './components/MCPServerListView';
import MCPServerDetailView from './components/MCPServerDetailView';
import MCPServerFormView from './components/MCPServerFormView';
import MCPResourceListView from './components/MCPResourceListView';
import MCPResourceDetailView from './components/MCPResourceDetailView';
import MCPResourceFormView from './components/MCPResourceFormView';
import MCPToolListView from './components/MCPToolListView';
import MCPToolDetailView from './components/MCPToolDetailView';
import MCPToolFormView from './components/MCPToolFormView';
import AIOrchestratorListView from './components/AIOrchestratorListView';
import AIOrchestratorDetailView from './components/AIOrchestratorDetailView';
import AIOrchestratorFormView from './components/AIOrchestratorFormView';
import AIWorkflowListView from './components/AIWorkflowListView';
import AIWorkflowDetailView from './components/AIWorkflowDetailView';
import AIWorkflowFormView from './components/AIWorkflowFormView';
import SystemDashboardView from './components/SystemDashboardView';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 p-4 space-y-5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">SpecVerse App</h1>
            <p className="text-xs text-gray-400">Generated from specification</p>
          </div>
          <a href="/dashboard" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">Dashboard</a>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Specifications</h3>
            <a href="/specificationlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/specificationform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Components</h3>
            <a href="/componentlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/componentform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Imports</h3>
            <a href="/importlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/importform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Exports</h3>
            <a href="/exportlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/exportform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Models</h3>
            <a href="/modellist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/modelform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Attributes</h3>
            <a href="/attributelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/attributeform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Relationships</h3>
            <a href="/relationshiplist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/relationshipform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Lifecycles</h3>
            <a href="/lifecyclelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/lifecycleform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LifecycleStates</h3>
            <a href="/lifecyclestatelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/lifecyclestateform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">LifecycleTransitions</h3>
            <a href="/lifecycletransitionlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/lifecycletransitionform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Profiles</h3>
            <a href="/profilelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/profileform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Primitives</h3>
            <a href="/primitivelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/primitiveform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Operations</h3>
            <a href="/operationlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/operationform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Steps</h3>
            <a href="/steplist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/stepform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Controllers</h3>
            <a href="/controllerlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/controllerform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Services</h3>
            <a href="/servicelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/serviceform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Events</h3>
            <a href="/eventlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/eventform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">EventVersions</h3>
            <a href="/eventversionlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/eventversionform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Views</h3>
            <a href="/listview" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/formview" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Layouts</h3>
            <a href="/layoutlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/layoutform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">UIComponents</h3>
            <a href="/uicomponentlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/uicomponentform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Deployments</h3>
            <a href="/deploymentlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/deploymentform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">DeploymentInstances</h3>
            <a href="/deploymentinstancelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/deploymentinstanceform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">CommunicationChannels</h3>
            <a href="/communicationchannellist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/communicationchannelform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Manifests</h3>
            <a href="/manifestlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/manifestform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">InstanceFactorys</h3>
            <a href="/instancefactorylist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/instancefactoryform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">CapabilityMappings</h3>
            <a href="/capabilitymappinglist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/capabilitymappingform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">EntityModules</h3>
            <a href="/entitymodulelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/entitymoduleform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">EntityRegistrys</h3>
            <a href="/entityregistrylist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/entityregistryform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ConventionGrammars</h3>
            <a href="/conventiongrammarlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/conventiongrammarform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ConventionPatterns</h3>
            <a href="/conventionpatternlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/conventionpatternform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">InferenceRules</h3>
            <a href="/inferencerulelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/inferenceruleform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">RuleTemplates</h3>
            <a href="/ruletemplatelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/ruletemplateform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">BehaviourSpecs</h3>
            <a href="/behaviourspeclist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/behaviourspecform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Invariants</h3>
            <a href="/invariantlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/invariantform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">SchemaFragments</h3>
            <a href="/schemafragmentlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/schemafragmentform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">DiagramPlugins</h3>
            <a href="/diagrampluginlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/diagrampluginform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">CodeTemplates</h3>
            <a href="/codetemplatelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/codetemplateform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">VSCodeExtensions</h3>
            <a href="/vscodeextensionlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/vscodeextensionform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ExtensionLanguages</h3>
            <a href="/extensionlanguagelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/extensionlanguageform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ExtensionCommands</h3>
            <a href="/extensioncommandlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/extensioncommandform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">ExtensionThemes</h3>
            <a href="/extensionthemelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/extensionthemeform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">MCPServers</h3>
            <a href="/mcpserverlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/mcpserverform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">MCPResources</h3>
            <a href="/mcpresourcelist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/mcpresourceform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">MCPTools</h3>
            <a href="/mcptoollist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/mcptoolform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">AIOrchestrators</h3>
            <a href="/aiorchestratorlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/aiorchestratorform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">AIWorkflows</h3>
            <a href="/aiworkflowlist" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">Browse</a>
            <a href="/aiworkflowform" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded">+ New</a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<SystemDashboardView />} />
          <Route path="/dashboard" element={<SystemDashboardView />} />
          <Route path="/specificationlist" element={<SpecificationListView />} />
          <Route path="/specificationdetail" element={<SpecificationDetailView />} />
          <Route path="/specificationform" element={<SpecificationFormView />} />
          <Route path="/componentlist" element={<ComponentListView />} />
          <Route path="/componentdetail" element={<ComponentDetailView />} />
          <Route path="/componentform" element={<ComponentFormView />} />
          <Route path="/importlist" element={<ImportListView />} />
          <Route path="/importdetail" element={<ImportDetailView />} />
          <Route path="/importform" element={<ImportFormView />} />
          <Route path="/exportlist" element={<ExportListView />} />
          <Route path="/exportdetail" element={<ExportDetailView />} />
          <Route path="/exportform" element={<ExportFormView />} />
          <Route path="/modellist" element={<ModelListView />} />
          <Route path="/modeldetail" element={<ModelDetailView />} />
          <Route path="/modelform" element={<ModelFormView />} />
          <Route path="/attributelist" element={<AttributeListView />} />
          <Route path="/attributedetail" element={<AttributeDetailView />} />
          <Route path="/attributeform" element={<AttributeFormView />} />
          <Route path="/relationshiplist" element={<RelationshipListView />} />
          <Route path="/relationshipdetail" element={<RelationshipDetailView />} />
          <Route path="/relationshipform" element={<RelationshipFormView />} />
          <Route path="/lifecyclelist" element={<LifecycleListView />} />
          <Route path="/lifecycledetail" element={<LifecycleDetailView />} />
          <Route path="/lifecycleform" element={<LifecycleFormView />} />
          <Route path="/lifecyclestatelist" element={<LifecycleStateListView />} />
          <Route path="/lifecyclestatedetail" element={<LifecycleStateDetailView />} />
          <Route path="/lifecyclestateform" element={<LifecycleStateFormView />} />
          <Route path="/lifecycletransitionlist" element={<LifecycleTransitionListView />} />
          <Route path="/lifecycletransitiondetail" element={<LifecycleTransitionDetailView />} />
          <Route path="/lifecycletransitionform" element={<LifecycleTransitionFormView />} />
          <Route path="/profilelist" element={<ProfileListView />} />
          <Route path="/profiledetail" element={<ProfileDetailView />} />
          <Route path="/profileform" element={<ProfileFormView />} />
          <Route path="/primitivelist" element={<PrimitiveListView />} />
          <Route path="/primitivedetail" element={<PrimitiveDetailView />} />
          <Route path="/primitiveform" element={<PrimitiveFormView />} />
          <Route path="/operationlist" element={<OperationListView />} />
          <Route path="/operationdetail" element={<OperationDetailView />} />
          <Route path="/operationform" element={<OperationFormView />} />
          <Route path="/steplist" element={<StepListView />} />
          <Route path="/stepdetail" element={<StepDetailView />} />
          <Route path="/stepform" element={<StepFormView />} />
          <Route path="/controllerlist" element={<ControllerListView />} />
          <Route path="/controllerdetail" element={<ControllerDetailView />} />
          <Route path="/controllerform" element={<ControllerFormView />} />
          <Route path="/servicelist" element={<ServiceListView />} />
          <Route path="/servicedetail" element={<ServiceDetailView />} />
          <Route path="/serviceform" element={<ServiceFormView />} />
          <Route path="/eventlist" element={<EventListView />} />
          <Route path="/eventdetail" element={<EventDetailView />} />
          <Route path="/eventform" element={<EventFormView />} />
          <Route path="/eventversionlist" element={<EventVersionListView />} />
          <Route path="/eventversiondetail" element={<EventVersionDetailView />} />
          <Route path="/eventversionform" element={<EventVersionFormView />} />
          <Route path="/listview" element={<ViewListView />} />
          <Route path="/detailview" element={<ViewDetailView />} />
          <Route path="/formview" element={<ViewFormView />} />
          <Route path="/layoutlist" element={<LayoutListView />} />
          <Route path="/layoutdetail" element={<LayoutDetailView />} />
          <Route path="/layoutform" element={<LayoutFormView />} />
          <Route path="/uicomponentlist" element={<UIComponentListView />} />
          <Route path="/uicomponentdetail" element={<UIComponentDetailView />} />
          <Route path="/uicomponentform" element={<UIComponentFormView />} />
          <Route path="/deploymentlist" element={<DeploymentListView />} />
          <Route path="/deploymentdetail" element={<DeploymentDetailView />} />
          <Route path="/deploymentform" element={<DeploymentFormView />} />
          <Route path="/deploymentinstancelist" element={<DeploymentInstanceListView />} />
          <Route path="/deploymentinstancedetail" element={<DeploymentInstanceDetailView />} />
          <Route path="/deploymentinstanceform" element={<DeploymentInstanceFormView />} />
          <Route path="/communicationchannellist" element={<CommunicationChannelListView />} />
          <Route path="/communicationchanneldetail" element={<CommunicationChannelDetailView />} />
          <Route path="/communicationchannelform" element={<CommunicationChannelFormView />} />
          <Route path="/manifestlist" element={<ManifestListView />} />
          <Route path="/manifestdetail" element={<ManifestDetailView />} />
          <Route path="/manifestform" element={<ManifestFormView />} />
          <Route path="/instancefactorylist" element={<InstanceFactoryListView />} />
          <Route path="/instancefactorydetail" element={<InstanceFactoryDetailView />} />
          <Route path="/instancefactoryform" element={<InstanceFactoryFormView />} />
          <Route path="/capabilitymappinglist" element={<CapabilityMappingListView />} />
          <Route path="/capabilitymappingdetail" element={<CapabilityMappingDetailView />} />
          <Route path="/capabilitymappingform" element={<CapabilityMappingFormView />} />
          <Route path="/entitymodulelist" element={<EntityModuleListView />} />
          <Route path="/entitymoduledetail" element={<EntityModuleDetailView />} />
          <Route path="/entitymoduleform" element={<EntityModuleFormView />} />
          <Route path="/entityregistrylist" element={<EntityRegistryListView />} />
          <Route path="/entityregistrydetail" element={<EntityRegistryDetailView />} />
          <Route path="/entityregistryform" element={<EntityRegistryFormView />} />
          <Route path="/conventiongrammarlist" element={<ConventionGrammarListView />} />
          <Route path="/conventiongrammardetail" element={<ConventionGrammarDetailView />} />
          <Route path="/conventiongrammarform" element={<ConventionGrammarFormView />} />
          <Route path="/conventionpatternlist" element={<ConventionPatternListView />} />
          <Route path="/conventionpatterndetail" element={<ConventionPatternDetailView />} />
          <Route path="/conventionpatternform" element={<ConventionPatternFormView />} />
          <Route path="/inferencerulelist" element={<InferenceRuleListView />} />
          <Route path="/inferenceruledetail" element={<InferenceRuleDetailView />} />
          <Route path="/inferenceruleform" element={<InferenceRuleFormView />} />
          <Route path="/ruletemplatelist" element={<RuleTemplateListView />} />
          <Route path="/ruletemplatedetail" element={<RuleTemplateDetailView />} />
          <Route path="/ruletemplateform" element={<RuleTemplateFormView />} />
          <Route path="/behaviourspeclist" element={<BehaviourSpecListView />} />
          <Route path="/behaviourspecdetail" element={<BehaviourSpecDetailView />} />
          <Route path="/behaviourspecform" element={<BehaviourSpecFormView />} />
          <Route path="/invariantlist" element={<InvariantListView />} />
          <Route path="/invariantdetail" element={<InvariantDetailView />} />
          <Route path="/invariantform" element={<InvariantFormView />} />
          <Route path="/schemafragmentlist" element={<SchemaFragmentListView />} />
          <Route path="/schemafragmentdetail" element={<SchemaFragmentDetailView />} />
          <Route path="/schemafragmentform" element={<SchemaFragmentFormView />} />
          <Route path="/diagrampluginlist" element={<DiagramPluginListView />} />
          <Route path="/diagramplugindetail" element={<DiagramPluginDetailView />} />
          <Route path="/diagrampluginform" element={<DiagramPluginFormView />} />
          <Route path="/codetemplatelist" element={<CodeTemplateListView />} />
          <Route path="/codetemplatedetail" element={<CodeTemplateDetailView />} />
          <Route path="/codetemplateform" element={<CodeTemplateFormView />} />
          <Route path="/vscodeextensionlist" element={<VSCodeExtensionListView />} />
          <Route path="/vscodeextensiondetail" element={<VSCodeExtensionDetailView />} />
          <Route path="/vscodeextensionform" element={<VSCodeExtensionFormView />} />
          <Route path="/extensionlanguagelist" element={<ExtensionLanguageListView />} />
          <Route path="/extensionlanguagedetail" element={<ExtensionLanguageDetailView />} />
          <Route path="/extensionlanguageform" element={<ExtensionLanguageFormView />} />
          <Route path="/extensioncommandlist" element={<ExtensionCommandListView />} />
          <Route path="/extensioncommanddetail" element={<ExtensionCommandDetailView />} />
          <Route path="/extensioncommandform" element={<ExtensionCommandFormView />} />
          <Route path="/extensionthemelist" element={<ExtensionThemeListView />} />
          <Route path="/extensionthemedetail" element={<ExtensionThemeDetailView />} />
          <Route path="/extensionthemeform" element={<ExtensionThemeFormView />} />
          <Route path="/mcpserverlist" element={<MCPServerListView />} />
          <Route path="/mcpserverdetail" element={<MCPServerDetailView />} />
          <Route path="/mcpserverform" element={<MCPServerFormView />} />
          <Route path="/mcpresourcelist" element={<MCPResourceListView />} />
          <Route path="/mcpresourcedetail" element={<MCPResourceDetailView />} />
          <Route path="/mcpresourceform" element={<MCPResourceFormView />} />
          <Route path="/mcptoollist" element={<MCPToolListView />} />
          <Route path="/mcptooldetail" element={<MCPToolDetailView />} />
          <Route path="/mcptoolform" element={<MCPToolFormView />} />
          <Route path="/aiorchestratorlist" element={<AIOrchestratorListView />} />
          <Route path="/aiorchestratordetail" element={<AIOrchestratorDetailView />} />
          <Route path="/aiorchestratorform" element={<AIOrchestratorFormView />} />
          <Route path="/aiworkflowlist" element={<AIWorkflowListView />} />
          <Route path="/aiworkflowdetail" element={<AIWorkflowDetailView />} />
          <Route path="/aiworkflowform" element={<AIWorkflowFormView />} />
          <Route path="/systemdashboard" element={<SystemDashboardView />} />
            <Route path="*" element={<div className="p-8"><h1 className="text-2xl">404 - Not Found</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
