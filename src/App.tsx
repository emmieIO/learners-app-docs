import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DocPage from './components/DocPage';

// High Fidelity Spec Components
import { ERDiagram } from './components/specs/ERDiagram';
import { UserJourney } from './components/specs/UserJourney';
import { FlowChart } from './components/specs/FlowChart';
import { ApiSpec } from './components/specs/ApiSpec';

// Module Documentation
import { authModuleData } from './docs/modules/auth';
import { learnerModuleData } from './docs/modules/student';
import { instructorModuleData } from './docs/modules/instructor';
import { drivingSchoolModuleData } from './docs/modules/driving-school';
import { paymentModuleData } from './docs/modules/payment';
import { trackingModuleData } from './docs/modules/tracking';
import { adminModuleData } from './docs/modules/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Redirect home to Authentication module */}
          <Route index element={<Navigate to="/modules/auth" replace />} />

          {/* Module Documentation Routes */}
          <Route path="modules/auth" element={
            <DocPage content={authModuleData.overview}>
              <ERDiagram entities={authModuleData.entities} relationships={authModuleData.relationships} title="Authentication Module - Database Schema" />
              <FlowChart title={authModuleData.loginFlow.title} description={authModuleData.loginFlow.description} nodes={authModuleData.loginFlow.nodes as any} />
              <UserJourney title={authModuleData.studentRegistrationJourney.title} description={authModuleData.studentRegistrationJourney.description} steps={authModuleData.studentRegistrationJourney.steps as any} />
              <ApiSpec title="Authentication API Endpoints" endpoints={authModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/student" element={
            <DocPage content={learnerModuleData.overview}>
              <ERDiagram entities={learnerModuleData.entities} relationships={learnerModuleData.relationships} title="Learner Module - Database Schema" />
              <FlowChart title={learnerModuleData.bookingFlow.title} description={learnerModuleData.bookingFlow.description} nodes={learnerModuleData.bookingFlow.nodes as any} />
              <UserJourney title={learnerModuleData.schoolDiscoveryJourney.title} description={learnerModuleData.schoolDiscoveryJourney.description} steps={learnerModuleData.schoolDiscoveryJourney.steps as any} />
              <ApiSpec title="Learner Module API Endpoints" endpoints={learnerModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/instructor" element={
            <DocPage content={instructorModuleData.overview}>
              <ERDiagram entities={instructorModuleData.entities} relationships={instructorModuleData.relationships} title="Instructor Module - Database Schema" />
              <FlowChart title={instructorModuleData.sessionFlow.title} description={instructorModuleData.sessionFlow.description} nodes={instructorModuleData.sessionFlow.nodes as any} />
              <UserJourney title={instructorModuleData.instructorJourney.title} description={instructorModuleData.instructorJourney.description} steps={instructorModuleData.instructorJourney.steps as any} />
              <ApiSpec title="Instructor Module API Endpoints" endpoints={instructorModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/school" element={
            <DocPage content={drivingSchoolModuleData.overview}>
              <ERDiagram entities={drivingSchoolModuleData.entities} relationships={drivingSchoolModuleData.relationships} title="Driving School Module - Database Schema" />
              <FlowChart title={drivingSchoolModuleData.managementFlow.title} description={drivingSchoolModuleData.managementFlow.description} nodes={drivingSchoolModuleData.managementFlow.nodes as any} />
              <UserJourney title={drivingSchoolModuleData.schoolAdminJourney.title} description={drivingSchoolModuleData.schoolAdminJourney.description} steps={drivingSchoolModuleData.schoolAdminJourney.steps as any} />
              <ApiSpec title="Driving School Module API Endpoints" endpoints={drivingSchoolModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/payment" element={
            <DocPage content={paymentModuleData.overview}>
              <ERDiagram entities={paymentModuleData.entities} relationships={paymentModuleData.relationships} title="Payment Module - Database Schema" />
              <FlowChart title={paymentModuleData.paymentFlow.title} description={paymentModuleData.paymentFlow.description} nodes={paymentModuleData.paymentFlow.nodes as any} />
              <UserJourney title={paymentModuleData.studentPaymentJourney.title} description={paymentModuleData.studentPaymentJourney.description} steps={paymentModuleData.studentPaymentJourney.steps as any} />
              <ApiSpec title="Payment Module API Endpoints" endpoints={paymentModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/tracking" element={
            <DocPage content={trackingModuleData.overview}>
              <ERDiagram entities={trackingModuleData.entities} relationships={trackingModuleData.relationships} title="Tracking & Safety Module - Database Schema" />
              <FlowChart title={trackingModuleData.trackingFlow.title} description={trackingModuleData.trackingFlow.description} nodes={trackingModuleData.trackingFlow.nodes as any} />
              <UserJourney title={trackingModuleData.guardianTrackingJourney.title} description={trackingModuleData.guardianTrackingJourney.description} steps={trackingModuleData.guardianTrackingJourney.steps as any} />
              <ApiSpec title="Tracking & Safety Module API Endpoints" endpoints={trackingModuleData.endpoints} />
            </DocPage>
          } />

          <Route path="modules/admin" element={
            <DocPage content={adminModuleData.overview}>
              <ERDiagram entities={adminModuleData.entities} relationships={adminModuleData.relationships} title="Admin Module - Database Schema" />
              <FlowChart title={adminModuleData.verificationFlow.title} description={adminModuleData.verificationFlow.description} nodes={adminModuleData.verificationFlow.nodes as any} />
              <UserJourney title={adminModuleData.adminDashboardJourney.title} description={adminModuleData.adminDashboardJourney.description} steps={adminModuleData.adminDashboardJourney.steps as any} />
              <ApiSpec title="Admin Module API Endpoints" endpoints={adminModuleData.endpoints} />
            </DocPage>
          } />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/modules/auth" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
