import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/specificationlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SpecificationList
                </Link>
                <Link to="/specificationdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SpecificationDetail
                </Link>
                <Link to="/specificationform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SpecificationForm
                </Link>
                <Link to="/componentlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ComponentList
                </Link>
                <Link to="/componentdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ComponentDetail
                </Link>
                <Link to="/componentform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ComponentForm
                </Link>
                <Link to="/importlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ImportList
                </Link>
                <Link to="/importdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ImportDetail
                </Link>
                <Link to="/importform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ImportForm
                </Link>
                <Link to="/exportlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ExportList
                </Link>
                <Link to="/exportdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ExportDetail
                </Link>
                <Link to="/exportform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ExportForm
                </Link>
                <Link to="/modellist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ModelList
                </Link>
                <Link to="/modeldetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ModelDetail
                </Link>
                <Link to="/modelform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ModelForm
                </Link>
                <Link to="/attributelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AttributeList
                </Link>
                <Link to="/attributedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AttributeDetail
                </Link>
                <Link to="/attributeform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AttributeForm
                </Link>
                <Link to="/relationshiplist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RelationshipList
                </Link>
                <Link to="/relationshipdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RelationshipDetail
                </Link>
                <Link to="/relationshipform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RelationshipForm
                </Link>
                <Link to="/lifecyclelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleList
                </Link>
                <Link to="/lifecycledetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleDetail
                </Link>
                <Link to="/lifecycleform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleForm
                </Link>
                <Link to="/lifecyclestatelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleStateList
                </Link>
                <Link to="/lifecyclestatedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleStateDetail
                </Link>
                <Link to="/lifecyclestateform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleStateForm
                </Link>
                <Link to="/lifecycletransitionlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleTransitionList
                </Link>
                <Link to="/lifecycletransitiondetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleTransitionDetail
                </Link>
                <Link to="/lifecycletransitionform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LifecycleTransitionForm
                </Link>
                <Link to="/profilelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ProfileList
                </Link>
                <Link to="/profiledetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ProfileDetail
                </Link>
                <Link to="/profileform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ProfileForm
                </Link>
                <Link to="/primitivelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  PrimitiveList
                </Link>
                <Link to="/primitivedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  PrimitiveDetail
                </Link>
                <Link to="/primitiveform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  PrimitiveForm
                </Link>
                <Link to="/operationlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  OperationList
                </Link>
                <Link to="/operationdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  OperationDetail
                </Link>
                <Link to="/operationform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  OperationForm
                </Link>
                <Link to="/steplist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  StepList
                </Link>
                <Link to="/stepdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  StepDetail
                </Link>
                <Link to="/stepform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  StepForm
                </Link>
                <Link to="/controllerlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ControllerList
                </Link>
                <Link to="/controllerdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ControllerDetail
                </Link>
                <Link to="/controllerform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ControllerForm
                </Link>
                <Link to="/servicelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ServiceList
                </Link>
                <Link to="/servicedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ServiceDetail
                </Link>
                <Link to="/serviceform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ServiceForm
                </Link>
                <Link to="/eventlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventList
                </Link>
                <Link to="/eventdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventDetail
                </Link>
                <Link to="/eventform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventForm
                </Link>
                <Link to="/eventversionlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventVersionList
                </Link>
                <Link to="/eventversiondetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventVersionDetail
                </Link>
                <Link to="/eventversionform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EventVersionForm
                </Link>
                <Link to="/listview" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ListView
                </Link>
                <Link to="/detailview" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DetailView
                </Link>
                <Link to="/formview" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  FormView
                </Link>
                <Link to="/layoutlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LayoutList
                </Link>
                <Link to="/layoutdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LayoutDetail
                </Link>
                <Link to="/layoutform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  LayoutForm
                </Link>
                <Link to="/uicomponentlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  UIComponentList
                </Link>
                <Link to="/uicomponentdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  UIComponentDetail
                </Link>
                <Link to="/uicomponentform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  UIComponentForm
                </Link>
                <Link to="/deploymentlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentList
                </Link>
                <Link to="/deploymentdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentDetail
                </Link>
                <Link to="/deploymentform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentForm
                </Link>
                <Link to="/deploymentinstancelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentInstanceList
                </Link>
                <Link to="/deploymentinstancedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentInstanceDetail
                </Link>
                <Link to="/deploymentinstanceform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DeploymentInstanceForm
                </Link>
                <Link to="/communicationchannellist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CommunicationChannelList
                </Link>
                <Link to="/communicationchanneldetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CommunicationChannelDetail
                </Link>
                <Link to="/communicationchannelform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CommunicationChannelForm
                </Link>
                <Link to="/manifestlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ManifestList
                </Link>
                <Link to="/manifestdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ManifestDetail
                </Link>
                <Link to="/manifestform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ManifestForm
                </Link>
                <Link to="/instancefactorylist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InstanceFactoryList
                </Link>
                <Link to="/instancefactorydetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InstanceFactoryDetail
                </Link>
                <Link to="/instancefactoryform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InstanceFactoryForm
                </Link>
                <Link to="/capabilitymappinglist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CapabilityMappingList
                </Link>
                <Link to="/capabilitymappingdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CapabilityMappingDetail
                </Link>
                <Link to="/capabilitymappingform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CapabilityMappingForm
                </Link>
                <Link to="/entitymodulelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityModuleList
                </Link>
                <Link to="/entitymoduledetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityModuleDetail
                </Link>
                <Link to="/entitymoduleform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityModuleForm
                </Link>
                <Link to="/entityregistrylist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityRegistryList
                </Link>
                <Link to="/entityregistrydetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityRegistryDetail
                </Link>
                <Link to="/entityregistryform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  EntityRegistryForm
                </Link>
                <Link to="/conventiongrammarlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionGrammarList
                </Link>
                <Link to="/conventiongrammardetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionGrammarDetail
                </Link>
                <Link to="/conventiongrammarform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionGrammarForm
                </Link>
                <Link to="/conventionpatternlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionPatternList
                </Link>
                <Link to="/conventionpatterndetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionPatternDetail
                </Link>
                <Link to="/conventionpatternform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  ConventionPatternForm
                </Link>
                <Link to="/inferencerulelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InferenceRuleList
                </Link>
                <Link to="/inferenceruledetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InferenceRuleDetail
                </Link>
                <Link to="/inferenceruleform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InferenceRuleForm
                </Link>
                <Link to="/ruletemplatelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RuleTemplateList
                </Link>
                <Link to="/ruletemplatedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RuleTemplateDetail
                </Link>
                <Link to="/ruletemplateform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  RuleTemplateForm
                </Link>
                <Link to="/behaviourspeclist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  BehaviourSpecList
                </Link>
                <Link to="/behaviourspecdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  BehaviourSpecDetail
                </Link>
                <Link to="/behaviourspecform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  BehaviourSpecForm
                </Link>
                <Link to="/invariantlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InvariantList
                </Link>
                <Link to="/invariantdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InvariantDetail
                </Link>
                <Link to="/invariantform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  InvariantForm
                </Link>
                <Link to="/schemafragmentlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SchemaFragmentList
                </Link>
                <Link to="/schemafragmentdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SchemaFragmentDetail
                </Link>
                <Link to="/schemafragmentform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SchemaFragmentForm
                </Link>
                <Link to="/diagrampluginlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DiagramPluginList
                </Link>
                <Link to="/diagramplugindetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DiagramPluginDetail
                </Link>
                <Link to="/diagrampluginform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  DiagramPluginForm
                </Link>
                <Link to="/codetemplatelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CodeTemplateList
                </Link>
                <Link to="/codetemplatedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CodeTemplateDetail
                </Link>
                <Link to="/codetemplateform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  CodeTemplateForm
                </Link>
                <Link to="/mcpserverlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPServerList
                </Link>
                <Link to="/mcpserverdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPServerDetail
                </Link>
                <Link to="/mcpserverform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPServerForm
                </Link>
                <Link to="/mcpresourcelist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPResourceList
                </Link>
                <Link to="/mcpresourcedetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPResourceDetail
                </Link>
                <Link to="/mcpresourceform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPResourceForm
                </Link>
                <Link to="/mcptoollist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPToolList
                </Link>
                <Link to="/mcptooldetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPToolDetail
                </Link>
                <Link to="/mcptoolform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  MCPToolForm
                </Link>
                <Link to="/aiorchestratorlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIOrchestratorList
                </Link>
                <Link to="/aiorchestratordetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIOrchestratorDetail
                </Link>
                <Link to="/aiorchestratorform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIOrchestratorForm
                </Link>
                <Link to="/aiworkflowlist" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIWorkflowList
                </Link>
                <Link to="/aiworkflowdetail" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIWorkflowDetail
                </Link>
                <Link to="/aiworkflowform" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  AIWorkflowForm
                </Link>
                <Link to="/systemdashboard" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  SystemDashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
        <Route path="/" element={<SpecificationListView />} />
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
