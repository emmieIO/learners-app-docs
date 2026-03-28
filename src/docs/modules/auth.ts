import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const authModuleData = {
  overview: `# Authentication & Authorization Module

## Module Overview

This module handles user registration, login, identity verification, token management, and role-based access control (RBAC) across the entire platform. It implements JWT-based authentication with refresh token rotation for enhanced security.

## Key Features

- **JWT + Refresh Token** authentication with rotation policy
- **Role-Based Access Control (RBAC)** for Student, Instructor, School Admin, Super Admin
- **OTP Verification** for phone/email during registration
- **Password Reset** flow with time-limited tokens
- **Device Management** with session tracking and revocation
- **Security Features**: Rate limiting, device fingerprinting, token reuse detection

## Tech Stack

- **Backend**: NestJS with @nestjs/jwt, @nestjs/passport, bcrypt
- **Database**: PostgreSQL with TypeORM
- **Mobile**: React Native with react-native-keychain for secure storage
- **Web**: React with HttpOnly cookies for refresh tokens
- **SMS**: Twilio/SendGrid for OTP delivery
`,

  entities: [
    {
      name: 'users',
      description: 'Core authentication table storing credentials and role',
      category: 'auth',
      fields: [
        { name: 'id', type: 'UUID', isPK: true, description: 'Primary key' },
        { name: 'email', type: 'VARCHAR(255)', isUnique: true, isNullable: true, description: 'User email' },
        { name: 'phone', type: 'VARCHAR(20)', isUnique: true, isNullable: true, description: 'Phone with country code' },
        { name: 'passwordHash', type: 'VARCHAR(255)', description: 'Bcrypt hashed password' },
        { name: 'role', type: 'ENUM', description: 'student|instructor|school_admin|super_admin' },
        { name: 'isVerified', type: 'BOOLEAN', description: 'Email/phone verified' },
        { name: 'isActive', type: 'BOOLEAN', description: 'Account not suspended' },
        { name: 'lastLogin', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'refresh_tokens',
      description: 'Stores hashed refresh tokens for session management',
      category: 'auth',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, description: 'References users.id' },
        { name: 'tokenHash', type: 'VARCHAR(255)', isUnique: true, description: 'SHA256 hashed token' },
        { name: 'deviceFingerprint', type: 'VARCHAR(255)', description: 'Device identifier' },
        { name: 'deviceInfo', type: 'VARCHAR(255)', isNullable: true, description: 'Device model/OS' },
        { name: 'ipAddress', type: 'INET', isNullable: true },
        { name: 'expiresAt', type: 'TIMESTAMP', description: '7 days from creation' },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'revokedAt', type: 'TIMESTAMP', isNullable: true },
      ],
    },
    {
      name: 'student_profiles',
      description: 'Extended profile data for student users',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'dateOfBirth', type: 'DATE', description: 'Must be 16+ years' },
        { name: 'profilePhotoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'emergencyContactName', type: 'VARCHAR(200)', isNullable: true },
        { name: 'emergencyContactPhone', type: 'VARCHAR(20)', isNullable: true },
        { name: 'medicalConditions', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'driving_schools',
      description: 'Registered driving school businesses',
      category: 'school',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'name', type: 'VARCHAR(255)' },
        { name: 'businessRegistrationNumber', type: 'VARCHAR(100)' },
        { name: 'taxId', type: 'VARCHAR(50)', isNullable: true },
        { name: 'email', type: 'VARCHAR(255)' },
        { name: 'phone', type: 'VARCHAR(20)' },
        { name: 'address', type: 'VARCHAR(500)' },
        { name: 'city', type: 'VARCHAR(100)' },
        { name: 'state', type: 'VARCHAR(100)' },
        { name: 'country', type: 'VARCHAR(100)', description: 'Default: Nigeria' },
        { name: 'logoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'verificationStatus', type: 'ENUM', description: 'pending|verified|rejected' },
        { name: 'verifiedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'instructors',
      description: 'Driving instructor profiles linked to schools',
      category: 'user',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'firstName', type: 'VARCHAR(100)' },
        { name: 'lastName', type: 'VARCHAR(100)' },
        { name: 'licenseNumber', type: 'VARCHAR(100)' },
        { name: 'yearsExperience', type: 'INTEGER', isNullable: true },
        { name: 'profilePhotoUrl', type: 'VARCHAR(500)', isNullable: true },
        { name: 'bio', type: 'TEXT', isNullable: true },
        { name: 'status', type: 'ENUM', description: 'pending|active|suspended|inactive' },
        { name: 'ratingAverage', type: 'DECIMAL(3,2)', description: '0.00-5.00' },
        { name: 'totalLessons', type: 'INTEGER', description: 'Completed lessons count' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'otp_codes',
      description: 'One-time passwords for verification flows',
      category: 'auth',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'identifier', type: 'VARCHAR(50)', description: 'Phone or email' },
        { name: 'code', type: 'VARCHAR(6)', description: '6-digit OTP' },
        { name: 'type', type: 'ENUM', description: 'registration|login|password_reset' },
        { name: 'expiresAt', type: 'TIMESTAMP', description: '10 minutes' },
        { name: 'isVerified', type: 'BOOLEAN' },
        { name: 'attemptCount', type: 'INTEGER', description: 'Verification attempts' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'password_reset_tokens',
      description: 'Time-limited tokens for password recovery',
      category: 'auth',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, description: 'References users.id' },
        { name: 'tokenHash', type: 'VARCHAR(255)', isUnique: true },
        { name: 'expiresAt', type: 'TIMESTAMP', description: '15 minutes' },
        { name: 'isUsed', type: 'BOOLEAN' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'documents',
      description: 'Uploaded verification documents (licenses, insurance, etc)',
      category: 'admin',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'ownerId', type: 'UUID', isFK: true, description: 'User, school, or instructor ID' },
        { name: 'type', type: 'ENUM', description: 'business_license|insurance|drivers_license|background_check|id_card|proof_of_address' },
        { name: 'documentUrl', type: 'VARCHAR(500)', description: 'S3 storage URL' },
        { name: 'documentName', type: 'VARCHAR(255)' },
        { name: 'status', type: 'ENUM', description: 'pending|approved|rejected' },
        { name: 'rejectionReason', type: 'TEXT', isNullable: true },
        { name: 'reviewedBy', type: 'UUID', isFK: true, isNullable: true, description: 'Admin who reviewed' },
        { name: 'reviewedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'users', to: 'refresh_tokens', type: 'one-to-many', label: 'has sessions' },
    { from: 'users', to: 'student_profiles', type: 'one-to-one', label: 'extends to' },
    { from: 'users', to: 'instructors', type: 'one-to-one', label: 'becomes' },
    { from: 'driving_schools', to: 'instructors', type: 'one-to-many', label: 'employs' },
    { from: 'users', to: 'password_reset_tokens', type: 'one-to-many', label: 'requests' },
    { from: 'documents', to: 'users', type: 'many-to-one', label: 'belongs to' },
    { from: 'documents', to: 'driving_schools', type: 'many-to-one', label: 'belongs to' },
  ] as ERRelationship[],

  loginFlow: {
    title: 'Login & Token Refresh Flow',
    description: 'Complete authentication flow from credential submission to token refresh',
    nodes: [
      {
        id: 'start',
        type: 'start' as const,
        label: 'User Opens Login Screen',
        description: 'User enters email/phone and password',
      },
      {
        id: 'validate',
        type: 'process',
        label: 'Validate Input Format',
        description: 'Check email/phone format and password length',
      },
      {
        id: 'check_credentials',
        type: 'decision',
        label: 'Credentials Valid?',
        description: 'Query database for user and verify password hash',
        next: { yes: 'check_status', no: 'error_invalid' },
      },
      {
        id: 'error_invalid',
        type: 'endpoint',
        label: 'Return 401 Error',
        description: 'Invalid credentials - generic message to prevent enumeration',
      },
      {
        id: 'check_status',
        type: 'decision',
        label: 'Account Active?',
        description: 'Check isVerified and isActive flags',
        next: { yes: 'generate_tokens', no: 'error_status' },
      },
      {
        id: 'error_status',
        type: 'endpoint',
        label: 'Return Account Status Error',
        description: 'Account pending verification or suspended',
      },
      {
        id: 'generate_tokens',
        type: 'process',
        label: 'Generate JWT Token Pair',
        description: 'Create access token (15min) and refresh token (7 days)',
      },
      {
        id: 'store_token',
        type: 'process',
        label: 'Store Refresh Token',
        description: 'Hash and store refresh token with device fingerprint',
      },
      {
        id: 'update_login',
        type: 'process',
        label: 'Update Last Login',
        description: 'Set lastLogin timestamp on user record',
      },
      {
        id: 'return_tokens',
        type: 'endpoint',
        label: 'Return Tokens to Client',
        description: 'Send access token + refresh token in response',
      },
      {
        id: 'access_expired',
        type: 'decision',
        label: 'Access Token Expired?',
        description: 'Client detects 401 on API request',
        next: { yes: 'call_refresh', no: 'continue_session' },
      },
      {
        id: 'call_refresh',
        type: 'process',
        label: 'Call /auth/refresh',
        description: 'Send refresh token to refresh endpoint',
      },
      {
        id: 'verify_refresh',
        type: 'decision',
        label: 'Refresh Token Valid?',
        description: 'Check token exists, not expired, not revoked',
        next: { yes: 'check_reuse', no: 'force_logout' },
      },
      {
        id: 'check_reuse',
        type: 'decision',
        label: 'Token Reuse Detected?',
        description: 'Security check - has this token been used before?',
        next: { yes: 'security_alert', no: 'issue_new_tokens' },
      },
      {
        id: 'security_alert',
        type: 'endpoint',
        label: 'Security Alert - Revoke All',
        description: 'Possible token theft - revoke all user sessions',
      },
      {
        id: 'issue_new_tokens',
        type: 'process',
        label: 'Issue New Token Pair',
        description: 'Generate new access + refresh tokens, mark old as used',
      },
      {
        id: 'continue_session',
        type: 'endpoint',
        label: 'Continue Session',
        description: 'User continues using the application',
      },
      {
        id: 'force_logout',
        type: 'endpoint',
        label: 'Force Re-login',
        description: 'Invalid refresh token - user must login again',
      },
    ],
  },

  studentRegistrationJourney: {
    title: 'Student Registration Journey',
    description: 'Complete user journey from app download to first login',
    platform: 'mobile',
    steps: [
      {
        id: 'step1',
        title: 'Download & Open App',
        description: 'Student downloads the Learners app from App Store or Google Play',
        actor: 'student',
        ui: {
          screen: 'Welcome Screen',
          component: 'React Native',
          description: 'Onboarding carousel with value proposition and Get Started CTA',
        },
      },
      {
        id: 'step2',
        title: 'Select User Role',
        description: 'Choose between Student, Instructor, or Driving School',
        actor: 'student',
        ui: {
          screen: 'Role Selection',
          component: 'React Native',
          description: 'Three cards with role icons and descriptions',
        },
      },
      {
        id: 'step3',
        title: 'Enter Phone Number',
        description: 'Input phone number in E.164 format (+234...)',
        actor: 'student',
        ui: {
          screen: 'Phone Input Screen',
          component: 'React Native',
          description: 'Country code picker + phone input with validation',
        },
        api: {
          endpoint: '/api/v1/auth/register/student',
          method: 'POST',
          description: 'Initiate student registration',
        },
      },
      {
        id: 'step4',
        title: 'Receive & Enter OTP',
        description: '6-digit OTP sent via SMS, auto-fill if possible',
        actor: 'system',
        ui: {
          screen: 'OTP Verification',
          component: 'React Native',
          description: '6-box OTP input with countdown timer and resend option',
        },
        api: {
          endpoint: '/api/v1/auth/verify-otp',
          method: 'POST',
          description: 'Verify OTP code',
        },
      },
      {
        id: 'step5',
        title: 'Create Password',
        description: 'Set secure password with validation (8+ chars, 1 number, 1 special)',
        actor: 'student',
        ui: {
          screen: 'Password Creation',
          component: 'React Native',
          description: 'Password input with strength meter and requirements checklist',
        },
      },
      {
        id: 'step6',
        title: 'Enter Personal Details',
        description: 'Full name, email (optional), date of birth',
        actor: 'student',
        ui: {
          screen: 'Profile Setup',
          component: 'React Native',
          description: 'Form with name fields, email input, date picker',
        },
      },
      {
        id: 'step7',
        title: 'Accept Terms & Privacy',
        description: 'Read and accept terms of service and privacy policy',
        actor: 'student',
        ui: {
          screen: 'Terms Acceptance',
          component: 'React Native',
          description: 'Scrollable terms with checkbox at bottom',
        },
      },
      {
        id: 'step8',
        title: 'Account Created Successfully',
        description: 'Registration complete, redirect to home screen',
        actor: 'system',
        ui: {
          screen: 'Home Dashboard',
          component: 'React Native',
          description: 'Student dashboard with school search and booking options',
        },
        api: {
          endpoint: '/api/v1/auth/login',
          method: 'POST',
          description: 'Auto-login after registration',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'POST',
      path: '/api/v1/auth/register/student',
      description: 'Register new learner account with phone/email',
      auth: false,
      params: 'phone, email, password, firstName, lastName, dateOfBirth',
      requestExample: `{
  "phone": "+2348012345678",
  "email": "learner@example.com",
  "password": "SecureP@ssw0rd123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-05-15",
  "acceptTerms": true
}`,
      responseExample: `{
  "success": true,
  "message": "Registration successful. OTP sent.",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "requiresOtpVerification": true,
    "otpExpiresIn": 600
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/auth/login',
      description: 'Authenticate and receive JWT token pair',
      auth: false,
      params: 'identifier, password, deviceInfo',
      requestExample: `{
  "identifier": "learner@example.com",
  "password": "SecureP@ssw0rd123",
  "deviceInfo": {
    "deviceId": "unique-device-id",
    "deviceName": "iPhone 14 Pro",
    "os": "iOS 17.0"
  }
}`,
      responseExample: `{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "learner@example.com",
      "role": "learner",
      "isVerified": true
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "dGhpc2lzYXJhbmRvbXJlZnJlc2h0b2tlbg...",
      "expiresIn": 900
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/auth/sessions',
      description: 'Get active sessions for current user',
      auth: true,
      params: 'None',
      response: '{ sessions: [{ id, deviceName, lastActive, isCurrent }] }',
    },
    {
      method: 'DELETE',
      path: '/api/v1/auth/sessions/:sessionId',
      description: 'Revoke specific session',
      auth: true,
      params: 'sessionId (path param)',
      response: '{ success }',
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Login Screen',
      purpose: 'Allow users to authenticate with email/phone and password',
      platform: 'both',
      components: [
        {
          name: 'LoginForm',
          description: 'Email/phone input with password field and login button',
          platform: 'react-native',
          code: `const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(identifier, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};`,
        },
        {
          name: 'LoginForm',
          description: 'Web version with email-focused input and social login options',
          platform: 'react-web',
          code: `const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary">
        Sign In
      </button>
      <Link to="/forgot-password" className="text-sm text-indigo-600">
        Forgot Password?
      </Link>
    </form>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/auth/login',
        method: 'POST',
        requestExample: `{
  "identifier": "student@example.com",
  "password": "SecureP@ssw0rd123",
  "deviceInfo": {
    "deviceId": "unique-device-id",
    "deviceName": "iPhone 14 Pro",
    "os": "iOS 17.0"
  }
}`,
        responseExample: `{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "role": "student"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "dGhpc2lzYXJhbmRvbX...",
      "expiresIn": 900
    }
  }
}`,
      },
    },
    {
      screenName: 'Student Registration Screen',
      purpose: 'Guide new students through account creation with OTP verification',
      platform: 'react-native',
      components: [
        {
          name: 'PhoneInput',
          description: 'Country code picker with phone number validation',
          platform: 'react-native',
          code: `const PhoneInput: React.FC<{ onSubmit: (phone: string) => void }> = ({ onSubmit }) => {
  const [countryCode, setCountryCode] = useState('+234');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    const fullPhone = countryCode + phone;
    if (phone.length >= 10) {
      onSubmit(fullPhone);
    }
  };

  return (
    <View>
      <CountryCodePicker
        selected={countryCode}
        onChange={setCountryCode}
      />
      <TextInput
        placeholder="801 234 5678"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={phone.length < 10}
      />
    </View>
  );
};`,
        },
        {
          name: 'OTPInput',
          description: '6-digit OTP input with auto-submit and resend timer',
          platform: 'react-native',
          code: `const OTPInput: React.FC<{ phone: string; onVerify: (otp: string) => void }> = ({ phone, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  return (
    <View>
      <Text>Enter OTP sent to {phone}</Text>
      <OTPTextView
        tintColor="#10b981"
        handleTextChange={(text) => setOtp(text.split(''))}
        containerStyle={{ marginBottom: 20 }}
      />
      <Button
        title={timeLeft > 0 ? \`Resend OTP (\${timeLeft}s)\` : 'Resend OTP'}
        onPress={handleResend}
        disabled={timeLeft > 0}
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/auth/register/student',
        method: 'POST',
        requestExample: `{
  "phone": "+2348012345678",
  "email": "student@example.com",
  "password": "SecureP@ssw0rd123",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-05-15",
  "acceptTerms": true
}`,
        responseExample: `{
  "success": true,
  "message": "Registration successful. OTP sent.",
  "data": {
    "userId": "uuid",
    "requiresOtpVerification": true,
    "otpExpiresIn": 600
  }
}`,
      },
    },
    {
      screenName: 'Password Reset Screen',
      purpose: 'Allow users to reset forgotten password via OTP verification',
      platform: 'both',
      components: [
        {
          name: 'ForgotPasswordForm',
          description: 'Email/phone input to request password reset OTP',
          platform: 'react-web',
          code: `const ForgotPasswordForm: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [sent, setSent] = useState(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await requestPasswordReset(identifier);
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto">
      {!sent ? (
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <p>Enter your email or phone number</p>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email or Phone"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <OTPVerification
          identifier={identifier}
          onComplete={handleNewPassword}
        />
      )}
    </div>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/auth/forgot-password',
        method: 'POST',
        requestExample: `{
  "identifier": "student@example.com"
}`,
        responseExample: `{
  "success": true,
  "message": "Password reset OTP sent",
  "data": {
    "otpExpiresIn": 600
  }
}`,
      },
    },
    {
      screenName: 'Profile Management Screen',
      purpose: 'Allow users to view and update their profile information',
      platform: 'both',
      components: [
        {
          name: 'ProfileForm',
          description: 'Editable profile fields with photo upload',
          platform: 'react-native',
          code: `const ProfileForm: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      await updateProfile({ firstName, lastName, email });
      Alert.alert('Success', 'Profile updated');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePhotoUpload = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.assets?.[0]) {
      // Upload to S3 and update profile
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={handlePhotoUpload}>
        <Image source={{ uri: user.profilePhotoUrl }} style={styles.photo} />
      </TouchableOpacity>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/auth/profile',
        method: 'PATCH',
        requestExample: `{
  "firstName": "John Updated",
  "email": "newemail@example.com",
  "profilePhotoUrl": "https://s3.amazonaws.com/bucket/new-profile.jpg"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "user": { ... },
    "profile": { ... }
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
