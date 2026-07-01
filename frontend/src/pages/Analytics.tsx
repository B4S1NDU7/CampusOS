import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, DollarSign, GraduationCap, Users } from 'lucide-react';
import { api } from '../api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Analytics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get('/analytics').then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  const stats = [
    { label: 'Students', value: data?.studentCount || 0, icon: GraduationCap },
    { label: 'Courses', value: data?.courseCount || 0, icon: BookOpen },
    { label: 'Enrollments', value: data?.enrollmentCount || 0, icon: Users },
    { label: 'Paid Revenue', value: `$${data?.finance?.paid || 0}`, icon: DollarSign },
    { label: 'Average Score', value: Number(data?.averageGrade || 0).toFixed(1), icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Operational health across academics, finance, users, and attendance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-slate-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {data?.usersByRole ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.usersByRole.map((u: any) => ({ name: u._id, count: u.count }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
