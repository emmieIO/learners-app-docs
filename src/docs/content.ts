export const docContent = {
  overview: `# 1. Overview
The mission of **Learners** is to reduce road accidents in Nigeria by digitizing and standardizing driver education through a verified network of FRSC-approved driving schools.

## 1.1 Purpose
To digitize driver education while ensuring real-time safety tracking and accountability during training sessions.

## 1.2 Problem Statement
Road traffic accidents in Nigeria are significantly driven by:
*   **Poor-quality driver training**
*   **Unverified driving schools**
*   **Lack of oversight** during driving lessons
*   **No formal record** of practical driving experience

Learners and guardians currently have no reliable way to verify instructor credibility, confirm training vehicle safety, track sessions in real time, or retain structured driving history.`,

  goals: `# 2. Goals & Objectives
Our primary aim is to improve the quality and accountability of driving education across Nigeria.

## 2.1 Primary Goals
*   **Improve Quality:** Standardize and elevate driving education.
*   **Increase Confidence:** Build learner and guardian confidence in training.
*   **Safer Roads:** Support safer roads through better-trained drivers.

## 2.2 Success Metrics (KPIs)
*   Number of verified driving schools onboarded.
*   Number of completed training sessions.
*   Average instructor rating.
*   Reduction in reported safety incidents.
*   User retention (repeat bookings).`,

  market: `# 3. Target Market & 4. User Personas

## 3.1 Target Market
*   **Initial Launch:** Lagos State, Nigeria.
*   **Expansion (Phase 2):** Abuja, Port Harcourt, Ibadan, and nationwide rollout.

## 4. User Personas
*   **Learner / Customer:** Wants safe, structured driving lessons and proof of progress.
*   **Parent / Guardian:** Wants real-time visibility and assurance of safety.
*   **Driving School / Instructor:** Wants increased visibility and professional management tools.
*   **Admin:** Oversees platform integrity and resolves disputes.`,

  scope: `# 5. Scope

## 5.1 In Scope (MVP)
*   Driving school onboarding & verification.
*   Location-based discovery.
*   Booking & payments.
*   Vehicle verification.
*   Real-time lesson tracking.
*   Training history storage.
*   Ratings & reviews.

## 5.2 Out of Scope (MVP)
*   Driving license issuance.
*   Vehicle insurance underwriting.
*   Accident claim processing.`,

  functional: `# 6. Functional Requirements

## 6.1 Authentication & User Management
Email/phone-based registration with role-based access for Learner, Guardian, Driving School, and Admin.

## 6.2 Driving School Onboarding & Verification
Schools submit FRSC approval numbers, business addresses, and instructor licenses for admin approval.

## 6.3 Discovery & Search
Map-based search (Lagos-focused) with filters for distance, price, vehicle type, and training packages.

## 6.4 Booking & Scheduling
Calendar-based scheduling for individual or bundled sessions with automated confirmations.

## 6.5 Vehicle Transparency
Before booking, users see vehicle images, plate numbers, types, and roadworthiness status.

## 6.6 Payments
In-app payments held in escrow, with instructor payouts triggered after session completion.`,

  tracking: `# 6.7 Driving Session Tracking (Core Feature)
The heart of the Learners platform is real-time oversight.

## Start Session
Learner or instructor starts the session. The system validates the assigned vehicle and instructor before GPS tracking begins.

## Live Tracking
Guardians can track location, route, and basic speed in real time via the portal, receiving push notifications for start and end events.

## End Session
Either party can end the session to stop tracking. All data is then stored for historical reference.`,

  records: `# 6.8 Training History & 6.9 Ratings
Ensuring a permanent record of progress and quality.

## 6.8 Training History & Records
*   **Driving hours log**
*   **Routes driven**
*   **Session summaries**
*   Downloadable driving log (Phase 2)

## 6.9 Ratings & Feedback
Post-session ratings for instructors and vehicles, with safety issue reporting and admin escalation.`,

  admin: `# 6.10 Admin Dashboard
Central command for platform-wide oversight.

## Key Capabilities
*   **Approval Flow:** Approve or reject driving school applications.
*   **Real-time Monitoring:** Monitor live sessions for safety.
*   **User Management:** Manage all roles and profiles.
*   **Analytics:** Track session counts, instructor performance, and incidents.`,

  nonfunctional: `# 7. Non-Functional Requirements

## 7.1 Performance
*   **Real-time Latency:** ≤ 5 seconds for tracking.
*   **Load Time:** ≤ 3 seconds on 3G networks.

## 7.2 Security
*   **Data Encryption:** Encrypted GPS and personal data.
*   **Authorization:** Strict role-based access.
*   **Audit Logs:** Comprehensive logs for session tracking.

## 7.3 Compliance
*   **NDPR:** Strictly adhere to Nigeria Data Protection Regulation.
*   **Consent:** Explicit consent-based GPS tracking.`,

  journey: `# 8. User Journey (High-Level)
1.  **Register:** User registers and verifies identity.
2.  **Search:** Searches nearby driving schools on the map.
3.  **Review:** Views instructor and vehicle transparency details.
4.  **Book:** Books and pays for a session (funds held in escrow).
5.  **Track:** Session starts; live tracking begins for guardians.
6.  **Complete:** Session ends; data is stored in the history log.
7.  **Rate:** User rates the instructor and vehicle performance.`,

  architecture: `# 9. Technical Architecture (High-Level)

## Frontend
*   **React / React Native** for cross-platform delivery.
*   **Google Maps / Mapbox** for map-based search and tracking.

## Backend
*   **NestJS** providing a modular, scalable API.
*   **PostgreSQL** for transactional data.
*   **WebSockets** for real-time tracking telemetry.

## Infrastructure
*   **Cloud Hosting:** AWS or GCP.
*   **Object Storage:** S3-compatible storage for vehicle and document images.`,

  risks: `# 10. Risks, 11. Assumptions & 12. Future

## 10. Risks & Mitigations
*   **Fake Schools:** Mitigated by strict FRSC verification.
*   **Privacy:** Mitigated by explicit tracking consent.
*   **GPS Inaccuracy:** Mitigated by fallback polling.
*   **Instructor Misuse:** Mitigated by ratings and admin monitoring.

## 11. Assumptions & Dependencies
*   FRSC verification process is accessible.
*   Driving schools are willing to adopt digital tools.
*   Mobile internet is available during lessons.

## 12. Future Enhancements
*   FRSC system integration.
*   AI-based driving behavior analysis.
*   Digital learner certification.
*   Insurance and car rental partnerships.`
};
