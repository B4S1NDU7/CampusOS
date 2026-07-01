import { ResourcePage, type ResourceField } from './ResourcePage';

const text = (name: string, label: string, required = false): ResourceField => ({ name, label, required });
const number = (name: string, label: string, required = false): ResourceField => ({ name, label, type: 'number', required });
const date = (name: string, label: string, required = false): ResourceField => ({ name, label, type: 'date', required });
const dateTime = (name: string, label: string, required = false): ResourceField => ({ name, label, type: 'datetime-local', required });

export const UsersPage = () => (
  <ResourcePage
    title="Users"
    endpoint="/users"
    fields={[text('firstName', 'First Name', true), text('lastName', 'Last Name', true), text('email', 'Email', true), text('password', 'Password'), text('role', 'Role')]}
    columns={[text('firstName', 'First Name'), text('lastName', 'Last Name'), text('email', 'Email'), text('role', 'Role'), text('isVerified', 'Verified')]}
  />
);

export const EnrollmentsPage = () => (
  <ResourcePage
    title="Enrollments"
    endpoint="/enrollments"
    fields={[text('student', 'Student User ID', true), text('course', 'Course ID', true), text('status', 'Status')]}
    columns={[text('student.email', 'Student'), text('course.name', 'Course'), text('status', 'Status'), text('enrolledAt', 'Enrolled At')]}
  />
);

export const GradesPage = () => (
  <ResourcePage
    title="Grades"
    endpoint="/grades"
    fields={[text('student', 'Student User ID', true), text('course', 'Course ID', true), text('assessmentId', 'Assessment ID', true), text('assessmentType', 'Assessment Type', true), number('score', 'Score', true)]}
    columns={[text('student.email', 'Student'), text('course.name', 'Course'), text('assessmentType', 'Type'), number('score', 'Score')]}
  />
);

export const LibraryPage = () => (
  <ResourcePage
    title="Library"
    endpoint="/library"
    fields={[text('title', 'Title', true), text('author', 'Author', true), text('isbn', 'ISBN'), text('category', 'Category'), number('copiesTotal', 'Total Copies'), number('copiesAvailable', 'Available Copies')]}
    columns={[text('title', 'Title'), text('author', 'Author'), text('isbn', 'ISBN'), number('copiesAvailable', 'Available')]}
  />
);

export const HostelPage = () => (
  <ResourcePage
    title="Hostel"
    endpoint="/hostels"
    fields={[text('roomNumber', 'Room Number', true), text('block', 'Block', true), number('floor', 'Floor'), number('capacity', 'Capacity', true), number('monthlyFee', 'Monthly Fee'), text('status', 'Status')]}
    columns={[text('roomNumber', 'Room'), text('block', 'Block'), number('capacity', 'Capacity'), text('occupants', 'Occupants'), text('status', 'Status')]}
  />
);

export const FinancePage = () => (
  <ResourcePage
    title="Finance"
    endpoint="/finance"
    fields={[text('invoiceNumber', 'Invoice Number', true), text('student', 'Student User ID'), text('description', 'Description', true), number('amount', 'Amount', true), text('currency', 'Currency'), date('dueDate', 'Due Date'), text('status', 'Status')]}
    columns={[text('invoiceNumber', 'Invoice'), text('description', 'Description'), number('amount', 'Amount'), text('status', 'Status'), text('dueDate', 'Due Date')]}
  />
);

export const EventsPage = () => (
  <ResourcePage
    title="Events"
    endpoint="/events"
    fields={[text('title', 'Title', true), text('description', 'Description'), dateTime('startsAt', 'Starts At', true), dateTime('endsAt', 'Ends At'), text('location', 'Location'), number('capacity', 'Capacity'), text('status', 'Status')]}
    columns={[text('title', 'Title'), text('location', 'Location'), text('startsAt', 'Starts At'), text('status', 'Status')]}
  />
);

export const NotificationsPage = () => (
  <ResourcePage
    title="Notifications"
    endpoint="/notifications"
    fields={[text('recipient', 'Recipient User ID'), text('title', 'Title', true), text('message', 'Message', true), text('type', 'Type'), text('channel', 'Channel')]}
    columns={[text('title', 'Title'), text('message', 'Message'), text('type', 'Type'), text('readAt', 'Read At')]}
  />
);

export const AuditLogsPage = () => (
  <ResourcePage
    title="Audit Logs"
    endpoint="/audit-logs"
    fields={[text('action', 'Action', true), text('entity', 'Entity', true), text('entityId', 'Entity ID')]}
    columns={[text('action', 'Action'), text('entity', 'Entity'), text('actor.email', 'Actor'), text('createdAt', 'When')]}
  />
);
