# CampusOS Development Completion Guide

This document provides templates and patterns for completing the remaining features.

## ✅ COMPLETED BACKEND TASKS (Phase 1)

1. **Global Error Middleware** ✅
   - Location: `backend/src/middlewares/error.middleware.ts`
   - Handles Zod validation errors, Mongoose errors, and custom AppError
   - Integrated into `server.ts`

2. **Input Validation Schemas** ✅
   - Location: `backend/src/utils/validationSchemas.ts`
   - 20+ Zod schemas for all modules
   - Validation middleware: `backend/src/middlewares/validation.middleware.ts`

3. **Missing DELETE Operations** ✅
   - ✅ Assignment.controller: Added `deleteAssignment()` and `updateAssignment()`
   - ✅ Attendance.controller: Added `deleteAttendance()` and `updateAttendance()`
   - ✅ Exam.controller: Added `deleteExam()` and `updateExam()`
   - Routes updated to include PUT and DELETE methods

4. **RBAC Enhanced** ✅
   - ✅ Finance.controller: Students can only see their own invoices
   - ✅ Event.controller: Added pagination and search filtering

## ✅ COMPLETED FRONTEND TASKS (Phase 2)

1. **Custom React Hooks** ✅
   - `useQuery()` - Data fetching with caching
   - `useFetch()` - Simple one-off requests
   - `useAsync()` - Async state management
   - `useDebounce()` - For search/filters
   - `useFormState()` - Form state management
   - `usePagination()` - Pagination logic
   - `useLocalStorage()` - Local storage hook
   - `useMutation()` - For POST/PUT/DELETE
   - `useZodForm()` - Form validation with Zod
   - Location: `frontend/src/hooks/useApi.ts` and `frontend/src/hooks/useForm.ts`

2. **Reusable Modal Components** ✅
   - `EditModal.tsx` - Generic edit form modal
   - `DeleteConfirm.tsx` - Delete confirmation dialog
   - Location: `frontend/src/components/`

3. **Enhanced Courses Page** ✅
   - Full CRUD operations (Create, Read, Update, Delete)
   - Edit/Delete action buttons
   - Integrated with EditModal and DeleteConfirm

## 📋 TEMPLATE FOR UPDATING OTHER PAGES

### Pattern for CRUD Pages (Students, Lecturers, Departments, etc.)

```typescript
// Import necessary components and hooks
import { EditModal } from '../components/EditModal';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { Pencil, Trash2 } from 'lucide-react';

// State management
const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
const [isEditOpen, setIsEditOpen] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);

// Handle edit
const handleEdit = (item: ItemType) => {
  setSelectedItem(item);
  setFormData({ /* populate form */ });
  setIsEditOpen(true);
};

// Handle update
const handleUpdate = async (data: any) => {
  await api.put(`/endpoint/${selectedItem?._id}`, data);
  toast.success('Updated successfully');
  fetchData();
};

// Handle delete
const handleDelete = (item: ItemType) => {
  setSelectedItem(item);
  setIsDeleteOpen(true);
};

const handleConfirmDelete = async () => {
  await api.delete(`/endpoint/${selectedItem?._id}`);
  toast.success('Deleted successfully');
  fetchData();
};

// Add action buttons to table rows
<TableCell className="text-center space-x-2">
  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
    <Pencil className="w-4 h-4" /> Edit
  </Button>
  <Button size="sm" variant="outline" onClick={() => handleDelete(item)}>
    <Trash2 className="w-4 h-4" /> Delete
  </Button>
</TableCell>

// Include modals at bottom
<EditModal {...editProps} />
<DeleteConfirm {...deleteProps} />
```

## 🔄 PAGES TO UPDATE WITH EDIT/DELETE (Priority Order)

### High Priority (Most Used)
1. **Students.tsx** - Add edit profile, delete student
2. **Lecturers.tsx** - Add edit profile, delete lecturer  
3. **Departments.tsx** - Add edit department, delete
4. **Assignments.tsx** - Add edit, delete (ALREADY DONE ON BACKEND)
5. **Exams.tsx** - Add edit, delete (ALREADY DONE ON BACKEND)
6. **Attendance.tsx** - Add edit, delete (ALREADY DONE ON BACKEND)

### Medium Priority
7. **Grades.tsx** - Add edit, delete
8. **Enrollments.tsx** - Add delete (drop course)
9. **Events.tsx** - Add edit, delete
10. **Finance.tsx** - Add edit, delete invoices

### Lower Priority (Generic Pages)
11. **Library.tsx** (via ResourcePage)
12. **Hostel.tsx** (via ResourcePage)
13. **Notifications.tsx** (via ResourcePage)
14. **AuditLogs.tsx** - Read-only, no edit/delete

## 🛠️ REMAINING BACKEND TASKS

### Task 3: Password Reset with Email Service
**Status:** Not started
**Files to create:**
- `backend/src/services/email.service.ts` - Email sending utility
- Update `auth.controller.ts` - Implement password reset with token

**Pattern:**
```typescript
// In auth.controller.ts
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  // Generate reset token (valid for 10 minutes)
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  
  // Send email with reset link
  await sendPasswordResetEmail(email, resetToken);
  res.json({ message: 'Reset link sent to email' });
};
```

### Task 4: Email Verification
**Status:** Not started
**Implementation:**
- Add `emailVerified` field check on login
- Generate verification token on signup
- Create verification endpoint
- Send verification email

### Task 5: Pagination Implementation (Frontend)
**Status:** Partially done (hook exists)
**Files to update:**
- All list pages should use `usePagination()` hook
- Add pagination controls to table footers

**Pattern:**
```typescript
const { currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(total);

// In pagination controls:
<div className="flex gap-2">
  <Button onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
  <span>Page {currentPage} of {totalPages}</span>
  <Button onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
</div>
```

## 🎨 MISSING UI COMPONENTS TO ADD

1. **Pagination Component** - Reusable pagination controls
2. **Breadcrumb Component** - Navigation trail
3. **ConfirmDialog Component** - Generic confirmation
4. **DatePicker Component** - Date selection
5. **Tabs Component** - Tab navigation
6. **Dropdown Menu Component** - Menu actions

## 📊 MISSING PAGES TO CREATE

1. **Settings.tsx** - User preferences, profile management
2. **UserProfile.tsx** - Detailed user profile
3. **Charts Dashboard** - Analytics with charts (need Chart.js or Recharts)
4. **Reports** - Detailed reports for admin

## 🔐 SECURITY ENHANCEMENTS NEEDED

1. Add CSRF token validation
2. Implement rate limiting per user
3. Add request sanitization
4. Implement audit logging on all sensitive operations
5. Add API key rotation

## 📝 DATABASE INDEXES TO ADD

Add these indexes to models for performance:
```typescript
// In each model:
schema.index({ createdAt: -1 }); // For sorting by date
schema.index({ status: 1 }); // For filtering by status
schema.index({ student: 1, course: 1 }); // For compound queries
```

## 🧪 TESTING CHECKLIST

- [ ] All CRUD operations work end-to-end
- [ ] Error handling displays user-friendly messages
- [ ] Pagination loads correct pages
- [ ] Search/filter works on all pages
- [ ] Delete confirmation prevents accidental deletion
- [ ] Unauthorized users can't access restricted endpoints
- [ ] Forms validate input correctly
- [ ] Real-time updates work via Socket.IO

## 📦 DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (.env)
- [ ] Docker build succeeds
- [ ] Database migrations run
- [ ] All API endpoints tested
- [ ] Frontend builds without errors
- [ ] Sensitive data not exposed in logs
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] Error monitoring (Sentry) configured

## 🎯 NEXT STEPS

1. **Immediate:** Update all CRUD pages with Edit/Delete functionality using the template above
2. **Short-term:** Implement pagination controls and advanced search
3. **Medium-term:** Add email verification and password reset
4. **Long-term:** Add charts, reporting, and real-time features

## 📞 INTEGRATION POINTS

- **Stripe API:** `backend/src/controllers/finance.controller.ts` - createPaymentIntent()
- **Gemini API:** `backend/src/controllers/ai.controller.ts` - AI features
- **Cloudinary:** `backend/src/controllers/upload.controller.ts` - File uploads
- **Socket.IO:** Already configured, use `emitGlobal()` for broadcasting

---

**Total Progress:** 
- Backend: 70% complete
- Frontend: 60% complete
- Overall: 65% complete

**Estimated Time to Full Completion:** 4-6 hours for single developer
