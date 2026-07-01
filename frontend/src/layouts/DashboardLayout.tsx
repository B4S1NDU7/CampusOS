import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  LogOut,
  User,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Bed,
  Bell,
  ClipboardList,
  DollarSign,
  GraduationCap,
  Landmark,
  Library,
  ShieldCheck
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: string[];
}

const adminRoles = ['Super Admin', 'University Admin', 'Department Admin', 'Admin'];
const campusRoles = [...adminRoles, 'Student', 'Lecturer', 'Parent'];
const academicRoles = [...adminRoles, 'Student', 'Lecturer'];

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: campusRoles },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', roles: [...adminRoles, 'Lecturer'] },
  { icon: ShieldCheck, label: 'Users', href: '/users', roles: adminRoles },
  { icon: Landmark, label: 'Departments', href: '/departments', roles: adminRoles },
  { icon: Users, label: 'Students', href: '/students', roles: [...adminRoles, 'Lecturer'] },
  { icon: Users, label: 'Lecturers', href: '/lecturers', roles: adminRoles },
  { icon: BookOpen, label: 'Courses', href: '/courses', roles: academicRoles },
  { icon: ClipboardList, label: 'Enrollments', href: '/enrollments', roles: academicRoles },
  { icon: MessageSquare, label: 'Assignments', href: '/assignments', roles: academicRoles },
  { icon: Calendar, label: 'Exams', href: '/exams', roles: academicRoles },
  { icon: GraduationCap, label: 'Grades', href: '/grades', roles: academicRoles },
  { icon: Calendar, label: 'Attendance', href: '/attendance', roles: academicRoles },
  { icon: Library, label: 'Library', href: '/library', roles: campusRoles },
  { icon: Bed, label: 'Hostel', href: '/hostel', roles: [...adminRoles, 'Student'] },
  { icon: DollarSign, label: 'Finance', href: '/finance', roles: [...adminRoles, 'Student', 'Parent'] },
  { icon: Calendar, label: 'Events', href: '/events', roles: campusRoles },
  { icon: Bell, label: 'Notifications', href: '/notifications', roles: campusRoles },
  { icon: MessageSquare, label: 'AI Assistant', href: '/ai', roles: academicRoles },
  { icon: ShieldCheck, label: 'Audit Logs', href: '/audit-logs', roles: adminRoles },
  { icon: Settings, label: 'Settings', href: '/settings', roles: campusRoles },
];

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const { unreadNotifications, setUnreadNotifications } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const allowedItems = sidebarItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">CampusOS</h1>
        </div>
        <nav className="p-4 space-y-2">
          {allowedItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            // Clear unread count when viewing notifications page
            if (isActive && item.label === 'Notifications' && unreadNotifications > 0) {
              setUnreadNotifications(0);
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.label === 'Notifications' && unreadNotifications > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
            {user?.role} Portal
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{user?.firstName}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
