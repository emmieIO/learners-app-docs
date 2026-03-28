import type { EREntity, ERRelationship } from '../../components/specs/ERDiagram';
import type { Endpoint } from '../../components/specs/ApiSpec';
import type { ScreenMockup } from '../../components/specs/UIScreens';

export const paymentModuleData = {
  overview: `# Payment Module

## Module Overview

This module handles all financial transactions on the platform including student payments for lesson packages, escrow management, instructor earnings calculation, and school payouts. It integrates with Paystack for secure payment processing in the Nigerian market.

## Key Features

- **Paystack Integration**: Secure payment processing with cards, bank transfer, and USSD
- **Escrow System**: Hold payments until lessons are completed
- **Automatic Fee Calculation**: Platform commission and school/instructor revenue split
- **Payout Management**: Weekly automated payouts to schools and instructors
- **Payment History**: Complete transaction history for all users
- **Refund Processing**: Handle cancellations and refund requests
- **Webhook Handling**: Real-time payment status updates from Paystack

## Tech Stack

- **Backend**: NestJS with @nestjs/typeorm for database operations
- **Payment Provider**: Paystack SDK for Nigerian payment processing
- **Security**: Crypto for webhook signature verification
- **Mobile**: React Native with Paystack WebView integration
- **Web**: React with Paystack inline integration
`,

  entities: [
    {
      name: 'transactions',
      description: 'All payment transactions on the platform',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'reference', type: 'VARCHAR(100)', isUnique: true, description: 'Paystack reference' },
        { name: 'bookingId', type: 'UUID', isFK: true, description: 'References bookings.id' },
        { name: 'studentId', type: 'UUID', isFK: true, description: 'References students.id' },
        { name: 'schoolId', type: 'UUID', isFK: true, description: 'References driving_schools.id' },
        { name: 'amount', type: 'DECIMAL(12,2)', description: 'Total amount in kobo' },
        { name: 'currency', type: 'VARCHAR(3)', description: 'NGN' },
        { name: 'platformFee', type: 'DECIMAL(10,2)', description: 'Platform commission %' },
        { name: 'platformFeeAmount', type: 'DECIMAL(10,2)', description: 'Fee amount in kobo' },
        { name: 'schoolRevenue', type: 'DECIMAL(10,2)', description: 'School earnings' },
        { name: 'status', type: 'ENUM', description: 'pending|success|failed|refunded' },
        { name: 'paymentMethod', type: 'ENUM', description: 'card|bank_transfer|ussd|wallet' },
        { name: 'providerTransactionId', type: 'VARCHAR(255)', description: 'Paystack transaction ID' },
        { name: 'paidAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'refundedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'refundReason', type: 'TEXT', isNullable: true },
        { name: 'metadata', type: 'JSONB', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'payouts',
      description: 'Payouts to schools and instructors',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'recipientId', type: 'UUID', isFK: true, description: 'School or instructor ID' },
        { name: 'recipientType', type: 'ENUM', description: 'school|instructor' },
        { name: 'amount', type: 'DECIMAL(12,2)' },
        { name: 'currency', type: 'VARCHAR(3)', description: 'NGN' },
        { name: 'status', type: 'ENUM', description: 'pending|processing|completed|failed' },
        { name: 'periodStart', type: 'DATE', description: 'Week start date' },
        { name: 'periodEnd', type: 'DATE', description: 'Week end date' },
        { name: 'transactionCount', type: 'INTEGER', description: 'Lessons in period' },
        { name: 'payoutMethod', type: 'ENUM', description: 'bank_transfer|wallet' },
        { name: 'bankAccountNumber', type: 'VARCHAR(10)', isNullable: true },
        { name: 'bankCode', type: 'VARCHAR(10)', isNullable: true },
        { name: 'bankName', type: 'VARCHAR(100)', isNullable: true },
        { name: 'accountName', type: 'VARCHAR(255)', isNullable: true },
        { name: 'providerPayoutId', type: 'VARCHAR(255)', isNullable: true, description: 'Paystack transfer ID' },
        { name: 'processedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'failureReason', type: 'TEXT', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'payout_recipients',
      description: 'Paystack transfer recipients for payouts',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'ownerId', type: 'UUID', isFK: true, description: 'School or instructor ID' },
        { name: 'ownerType', type: 'ENUM', description: 'school|instructor' },
        { name: 'recipientCode', type: 'VARCHAR(100)', description: 'Paystack recipient code' },
        { name: 'recipientName', type: 'VARCHAR(255)' },
        { name: 'bankCode', type: 'VARCHAR(10)' },
        { name: 'bankName', type: 'VARCHAR(100)' },
        { name: 'accountNumber', type: 'VARCHAR(10)' },
        { name: 'accountName', type: 'VARCHAR(255)' },
        { name: 'isActive', type: 'BOOLEAN', description: 'Can receive payouts' },
        { name: 'verifiedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'refunds',
      description: 'Payment refunds for cancelled bookings',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'transactionId', type: 'UUID', isFK: true, description: 'References transactions.id' },
        { name: 'bookingId', type: 'UUID', isFK: true, description: 'References bookings.id' },
        { name: 'amount', type: 'DECIMAL(12,2)', description: 'Refund amount' },
        { name: 'reason', type: 'TEXT' },
        { name: 'requestedBy', type: 'UUID', isFK: true, description: 'User who requested' },
        { name: 'status', type: 'ENUM', description: 'pending|approved|processing|completed|rejected' },
        { name: 'approvedBy', type: 'UUID', isFK: true, isNullable: true, description: 'Admin who approved' },
        { name: 'providerRefundId', type: 'VARCHAR(255)', isNullable: true },
        { name: 'processedAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'wallet_balances',
      description: 'User wallet balances for credits and refunds',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, isUnique: true, description: 'References users.id' },
        { name: 'balance', type: 'DECIMAL(12,2)', description: 'Current balance in kobo' },
        { name: 'currency', type: 'VARCHAR(3)', description: 'NGN' },
        { name: 'lastTransactionAt', type: 'TIMESTAMP', isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
        { name: 'updatedAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'wallet_transactions',
      description: 'Wallet credit/debit transaction history',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'walletId', type: 'UUID', isFK: true, description: 'References wallet_balances.id' },
        { name: 'type', type: 'ENUM', description: 'credit|debit' },
        { name: 'amount', type: 'DECIMAL(12,2)' },
        { name: 'balanceAfter', type: 'DECIMAL(12,2)', description: 'Balance after transaction' },
        { name: 'description', type: 'TEXT' },
        { name: 'reference', type: 'VARCHAR(100)', description: 'Transaction reference' },
        { name: 'relatedTransactionId', type: 'UUID', isFK: true, isNullable: true },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
    {
      name: 'payment_methods',
      description: 'Saved payment methods for users',
      category: 'payment',
      fields: [
        { name: 'id', type: 'UUID', isPK: true },
        { name: 'userId', type: 'UUID', isFK: true, description: 'References users.id' },
        { name: 'type', type: 'ENUM', description: 'card|bank_account' },
        { name: 'providerCustomerId', type: 'VARCHAR(255)', description: 'Paystack customer ID' },
        { name: 'cardLast4', type: 'VARCHAR(4)', isNullable: true },
        { name: 'cardBrand', type: 'VARCHAR(50)', isNullable: true },
        { name: 'cardExpiryMonth', type: 'INTEGER', isNullable: true },
        { name: 'cardExpiryYear', type: 'INTEGER', isNullable: true },
        { name: 'bankName', type: 'VARCHAR(100)', isNullable: true },
        { name: 'accountNumber', type: 'VARCHAR(10)', isNullable: true },
        { name: 'isDefault', type: 'BOOLEAN' },
        { name: 'createdAt', type: 'TIMESTAMP' },
      ],
    },
  ] as EREntity[],

  relationships: [
    { from: 'transactions', to: 'bookings', type: 'many-to-one', label: 'pays for' },
    { from: 'transactions', to: 'students', type: 'many-to-one', label: 'paid by' },
    { from: 'transactions', to: 'driving_schools', type: 'many-to-one', label: 'revenue to' },
    { from: 'payouts', to: 'transactions', type: 'many-to-one', label: 'distributes from' },
    { from: 'payout_recipients', to: 'payouts', type: 'one-to-many', label: 'receives' },
    { from: 'refunds', to: 'transactions', type: 'many-to-one', label: 'refunds' },
    { from: 'wallet_balances', to: 'wallet_transactions', type: 'one-to-many', label: 'has history' },
    { from: 'payment_methods', to: 'users', type: 'many-to-one', label: 'saved by' },
  ] as ERRelationship[],

  paymentFlow: {
    title: 'Payment Processing Flow',
    description: 'Complete payment flow from checkout to payout distribution',
    nodes: [
      {
        id: 'start',
        type: 'start',
        label: 'Student Initiates Checkout',
        description: 'Student selects package and proceeds to payment',
      },
      {
        id: 'create_transaction',
        type: 'process',
        label: 'Create Transaction Record',
        description: 'Generate transaction with pending status',
      },
      {
        id: 'initialize_paystack',
        type: 'process',
        label: 'Initialize Paystack Transaction',
        description: 'Call Paystack API to get authorization URL',
      },
      {
        id: 'redirect_payment',
        type: 'process',
        label: 'Redirect to Payment',
        description: 'Open Paystack checkout (WebView/Inline)',
      },
      {
        id: 'payment_success',
        type: 'decision',
        label: 'Payment Successful?',
        description: 'Wait for Paystack callback/webhook',
        next: { yes: 'verify_transaction', no: 'payment_failed' },
      },
      {
        id: 'payment_failed',
        type: 'endpoint',
        label: 'Handle Payment Failure',
        description: 'Update transaction status, notify student',
      },
      {
        id: 'verify_transaction',
        type: 'process',
        label: 'Verify with Paystack',
        description: 'Server-to-server verification of transaction',
      },
      {
        id: 'update_transaction',
        type: 'process',
        label: 'Update Transaction Status',
        description: 'Mark as success, record paidAt timestamp',
      },
      {
        id: 'calculate_split',
        type: 'process',
        label: 'Calculate Revenue Split',
        description: 'Platform fee + school revenue + instructor share',
      },
      {
        id: 'update_booking',
        type: 'process',
        label: 'Confirm Booking',
        description: 'Update booking status to confirmed',
      },
      {
        id: 'notify_parties',
        type: 'process',
        label: 'Send Notifications',
        description: 'Email/SMS to student, school, instructor',
      },
      {
        id: 'escrow_hold',
        type: 'process',
        label: 'Hold in Escrow',
        description: 'Funds held until lesson completion',
      },
      {
        id: 'lesson_complete',
        type: 'decision',
        label: 'Lesson Completed?',
        description: 'Wait for session completion confirmation',
        next: { yes: 'release_funds', no: 'wait_or_refund' },
      },
      {
        id: 'wait_or_refund',
        type: 'process',
        label: 'Wait or Process Refund',
        description: 'Handle cancellation or dispute',
      },
      {
        id: 'release_funds',
        type: 'process',
        label: 'Release from Escrow',
        description: 'Distribute funds to school/instructor accounts',
      },
      {
        id: 'end',
        type: 'endpoint',
        label: 'Payment Complete',
        description: 'Transaction finalized, payout scheduled',
      },
    ],
  },

  studentPaymentJourney: {
    title: 'Student Payment Journey',
    description: 'Complete journey of a student making a payment for lessons',
    platform: 'mobile',
    steps: [
      {
        id: 'step1',
        title: 'Select Package',
        description: 'Student chooses driving package from school',
        actor: 'student',
        ui: {
          screen: 'Package Detail',
          component: 'React Native',
          description: 'Package info with Book Now button',
        },
      },
      {
        id: 'step2',
        title: 'Review Booking',
        description: 'Confirm package, instructor, and schedule',
        actor: 'student',
        ui: {
          screen: 'Booking Review',
          component: 'React Native',
          description: 'Summary with total price breakdown',
        },
      },
      {
        id: 'step3',
        title: 'Choose Payment Method',
        description: 'Select card, bank transfer, or USSD',
        actor: 'student',
        ui: {
          screen: 'Payment Method Selection',
          component: 'React Native',
          description: 'List of payment options with icons',
        },
        api: {
          endpoint: '/api/v1/payments/initialize',
          method: 'POST',
          description: 'Initialize payment transaction',
        },
      },
      {
        id: 'step4',
        title: 'Enter Payment Details',
        description: 'Input card info or follow bank instructions',
        actor: 'student',
        ui: {
          screen: 'Paystack Checkout',
          component: 'React Native',
          description: 'Paystack WebView or inline form',
        },
      },
      {
        id: 'step5',
        title: 'Authenticate Payment',
        description: 'Complete 3D Secure or OTP verification',
        actor: 'student',
        ui: {
          screen: 'Payment Authentication',
          component: 'React Native',
          description: 'Bank OTP or 3DSecure page',
        },
      },
      {
        id: 'step6',
        title: 'Payment Confirmation',
        description: 'Success screen with booking reference',
        actor: 'system',
        ui: {
          screen: 'Payment Success',
          component: 'React Native',
          description: 'Success animation with receipt',
        },
        api: {
          endpoint: '/api/v1/payments/verify/:reference',
          method: 'GET',
          description: 'Verify payment status',
        },
      },
      {
        id: 'step7',
        title: 'Receive Receipt',
        description: 'Email receipt and in-app transaction record',
        actor: 'system',
        ui: {
          screen: 'Transaction Detail',
          component: 'React Native',
          description: 'Receipt with download option',
        },
      },
    ],
  },

  endpoints: [
    {
      method: 'POST',
      path: '/api/v1/payments/initialize',
      description: 'Initialize payment transaction',
      auth: true,
      params: 'bookingId, paymentMethod',
      requestExample: `{
  "bookingId": "550e8400-e29b-41d4-a716-446655440001",
  "paymentMethod": "card"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "authorizationUrl": "https://checkout.paystack.com/xxx",
    "accessCode": "xxx",
    "reference": "REF123456789"
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/payments/verify/:reference',
      description: 'Verify payment transaction',
      auth: true,
      params: 'reference (path param)',
      responseExample: `{
  "success": true,
  "data": {
    "transaction": {
      "id": "uuid",
      "reference": "REF123456789",
      "amount": 150000,
      "status": "success",
      "paymentMethod": "card",
      "paidAt": "2024-01-20T10:30:00Z"
    },
    "booking": {
      "id": "uuid",
      "status": "confirmed"
    }
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/payments/webhook',
      description: 'Handle Paystack webhook events',
      auth: false,
      params: 'event, data',
      requestExample: `{
  "event": "charge.success",
  "data": {
    "reference": "REF123456789",
    "amount": 150000,
    "status": "success"
  }
}`,
      responseExample: `{
  "success": true
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/payments/history',
      description: 'Get user payment history',
      auth: true,
      params: 'page, limit, status',
      responseExample: `{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "reference": "REF123456789",
        "amount": 150000,
        "status": "success",
        "paymentMethod": "card",
        "bookingRef": "BKG123",
        "paidAt": "2024-01-20T10:30:00Z"
      }
    ],
    "total": 12
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/payments/:id/refund',
      description: 'Request refund for transaction',
      auth: true,
      params: 'id (path param), reason, amount',
      requestExample: `{
  "reason": "Lesson cancelled by student",
  "amount": 150000
}`,
      responseExample: `{
  "success": true,
  "data": {
    "refund": {
      "id": "uuid",
      "transactionId": "uuid",
      "amount": 150000,
      "status": "pending",
      "createdAt": "2024-01-20T10:00:00Z"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/payouts',
      description: 'Get payout history (school/instructor)',
      auth: true,
      params: 'page, limit, status',
      responseExample: `{
  "success": true,
  "data": {
    "payouts": [
      {
        "id": "uuid",
        "amount": 580000,
        "status": "completed",
        "periodStart": "2024-01-15",
        "periodEnd": "2024-01-21",
        "processedAt": "2024-01-22"
      }
    ],
    "total": 5,
    "pendingAmount": 125000
  }
}`,
    },
    {
      method: 'POST',
      path: '/api/v1/payouts/recipients',
      description: 'Create payout recipient',
      auth: true,
      params: 'accountNumber, bankCode, accountName',
      requestExample: `{
  "accountNumber": "0123456789",
  "bankCode": "058",
  "accountName": "Safe Drive Academy Ltd"
}`,
      responseExample: `{
  "success": true,
  "data": {
    "recipient": {
      "id": "uuid",
      "recipientCode": "RCP_xxx",
      "accountName": "Safe Drive Academy Ltd",
      "bankName": "Zenith Bank",
      "accountNumber": "0123456789"
    }
  }
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/wallet/balance',
      description: 'Get wallet balance',
      auth: true,
      params: 'None',
      responseExample: `{
  "success": true,
  "data": {
    "balance": 50000,
    "currency": "NGN",
    "lastTransactionAt": "2024-01-20T10:00:00Z"
  }
}`,
    },
  ] as Endpoint[],

  uiScreens: [
    {
      screenName: 'Payment Checkout Screen',
      purpose: 'Allow students to complete payment for bookings',
      platform: 'react-native',
      components: [
        {
          name: 'PaymentMethodSelector',
          description: 'Choose payment method (card, transfer, USSD)',
          platform: 'react-native',
          code: `const PaymentMethodSelector: React.FC<{
  methods: PaymentMethod[];
  selected: string;
  onSelect: (method: string) => void;
}> = ({ methods, selected, onSelect }) => {
  return (
    <View>
      <Text style={styles.label}>Select Payment Method</Text>
      {methods.map(method => (
        <TouchableOpacity
          key={method.id}
          style={[styles.methodCard, selected === method.id && styles.selected]}
          onPress={() => onSelect(method.id)}
        >
          <Icon source={method.icon} />
          <View>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDesc}>{method.description}</Text>
          </View>
          <RadioButton selected={selected === method.id} />
        </TouchableOpacity>
      ))}
    </View>
  );
};`,
        },
        {
          name: 'PaystackWebView',
          description: 'Embedded Paystack checkout',
          platform: 'react-native',
          code: `const PaystackWebView: React.FC<{
  url: string;
  onSuccess: (data: PaymentSuccess) => void;
  onCancel: () => void;
}> = ({ url, onSuccess, onCancel }) => {
  const webViewRef = useRef<WebView>(null);

  const onNavigationStateChange = (navState: WebViewNavigationState) => {
    if (navState.url.includes('success')) {
      const params = new URLSearchParams(navState.url.split('?')[1]);
      onSuccess({
        reference: params.get('reference'),
        status: params.get('status'),
      });
    } else if (navState.url.includes('cancel')) {
      onCancel();
    }
  };

  return (
    <Modal visible animationType="slide">
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        startInLoadingState
      />
    </Modal>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/payments/initialize',
        method: 'POST',
        requestExample: `{
  "bookingId": "uuid",
  "paymentMethod": "card"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "authorizationUrl": "https://checkout.paystack.com/xxx",
    "accessCode": "xxx",
    "reference": "REF123456789"
  }
}`,
      },
    },
    {
      screenName: 'Payment History Screen',
      purpose: 'Display all payment transactions with status',
      platform: 'both',
      components: [
        {
          name: 'TransactionList',
          description: 'List of transactions with filters',
          platform: 'react-native',
          code: `const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');

  return (
    <View>
      <SegmentedControl
        tabs={['All', 'Success', 'Pending', 'Failed', 'Refunded']}
        value={filter}
        onChange={setFilter}
      />
      <FlatList
        data={filterTransactions(transactions, filter)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onPress={() => navigation.navigate('TransactionDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/payments/history',
        method: 'GET',
        responseExample: `{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "reference": "REF123456789",
        "amount": 150000,
        "status": "success",
        "paymentMethod": "card",
        "bookingRef": "BKG123",
        "paidAt": "2024-01-20T10:30:00Z"
      }
    ],
    "total": 12
  }
}`,
      },
    },
    {
      screenName: 'Payout Management Screen',
      purpose: 'Allow schools/instructors to manage payouts',
      platform: 'react-web',
      components: [
        {
          name: 'PayoutDashboard',
          description: 'Overview of earnings and pending payouts',
          platform: 'react-web',
          code: `const PayoutDashboard: React.FC<{ stats: PayoutStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        title="Available for Payout"
        value={formatCurrency(stats.available)}
        subtitle="From completed lessons"
      />
      <StatCard
        title="Pending Payout"
        value={formatCurrency(stats.pending)}
        subtitle="Processing this week"
      />
      <StatCard
        title="Total Paid"
        value={formatCurrency(stats.totalPaid)}
        subtitle="This month"
      />
    </div>
  );
};`,
        },
        {
          name: 'BankAccountForm',
          description: 'Add/edit bank account for payouts',
          platform: 'react-web',
          code: `const BankAccountForm: React.FC<{ onSubmit: (data: BankDetails) => void }> = ({ onSubmit }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountName, setAccountName] = useState('');

  const resolveAccount = async () => {
    const name = await resolveAccountName(accountNumber, bankCode);
    setAccountName(name);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ accountNumber, bankCode, accountName }); }}>
      <Select label="Bank" value={bankCode} onChange={setBankCode} options={banks} />
      <Input
        label="Account Number"
        value={accountNumber}
        onChange={setAccountNumber}
        onBlur={resolveAccount}
        maxLength={10}
      />
      <Input
        label="Account Name"
        value={accountName}
        disabled
        className="bg-gray-100"
      />
      <Button type="submit">Save Account</Button>
    </form>
  );
};`,
        },
      ],
      apiIntegration: {
        endpoint: '/api/v1/payouts/recipients',
        method: 'POST',
        requestExample: `{
  "accountNumber": "0123456789",
  "bankCode": "058",
  "accountName": "John Doe"
}`,
        responseExample: `{
  "success": true,
  "data": {
    "recipient": {
      "id": "uuid",
      "recipientCode": "RCP_xxx",
      "accountName": "John Doe",
      "bankName": "Zenith Bank"
    }
  }
}`,
      },
    },
  ] as ScreenMockup[],
};
