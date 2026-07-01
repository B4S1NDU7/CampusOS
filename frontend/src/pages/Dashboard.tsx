import { useAuth } from '../context/AuthContext';
import { useQuery } from '../hooks/useApi';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { BookOpen, Calendar, MessageSquare, GraduationCap, Users, DollarSign } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery<any>('dashboard-analytics', '/analytics');

  const isAdmin = ['Super Admin', 'University Admin', 'Admin'].includes(user?.role || '');
  const isLecturer = user?.role === 'Lecturer';
  const isStudent = user?.role === 'Student';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-500 mt-1">Here is an overview of your CampusOS account.</p>
      </div>
      
      {loading ? (
        <div className="text-gray-500">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {(isAdmin || isLecturer || isStudent) && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.courseCount || 0} Total</div>
                <p className="text-xs text-gray-500">Active courses</p>
              </CardContent>
            </Card>
          )}

          {isAdmin && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Students</CardTitle>
                <Users className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.studentCount || 0}</div>
                <p className="text-xs text-gray-500">Total registered</p>
              </CardContent>
            </Card>
          )}
          
          {(isStudent || isLecturer) && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average Grade</CardTitle>
                <GraduationCap className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Number(data?.averageGrade || 0).toFixed(1)}</div>
                <p className="text-xs text-gray-500">Overall performance</p>
              </CardContent>
            </Card>
          )}

          {(isAdmin || isStudent) && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Finances</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${data?.finance?.paid || 0}</div>
                <p className="text-xs text-gray-500">Total paid</p>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">AI Assistant</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready</div>
              <p className="text-xs text-gray-500">Ask a question</p>
            </CardContent>
          </Card>

          {(isAdmin || isLecturer) && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Attendance Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-pink-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.attendanceSessions || 0}</div>
                <p className="text-xs text-gray-500">Recorded</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};