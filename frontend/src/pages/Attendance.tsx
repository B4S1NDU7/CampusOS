import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

interface Course {
  _id: string;
  name: string;
}

interface Student {
  _id: string;
  user: { _id: string; firstName: string; lastName: string; studentId: string };
}

export const Attendance = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'Lecturer' || user?.role === 'Admin') {
      api.get('/courses').then(res => setCourses(res.data)).catch(() => toast.error('Failed to load courses'));
    }
  }, [user]);

  useEffect(() => {
    if (selectedCourse) {
      // In a real app we'd fetch enrolled students for the specific course.
      // Here we just fetch all students for demonstration.
      api.get('/students').then(res => {
        setStudents(res.data);
        const initialRecords: Record<string, string> = {};
        res.data.forEach((s: Student) => {
          initialRecords[s.user._id] = 'Present'; // default to Present
        });
        setAttendanceRecords(initialRecords);
      });
    }
  }, [selectedCourse]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const records = Object.keys(attendanceRecords).map(studentId => ({
        student: studentId,
        status: attendanceRecords[studentId]
      }));
      
      await api.post('/attendance', { course: selectedCourse, date, records });
      toast.success('Attendance recorded successfully');
    } catch (error) {
      toast.error('Failed to record attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const isLecturerOrAdmin = user?.role === 'Lecturer' || user?.role === 'Admin';

  if (!isLecturerOrAdmin) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        {/* Student View can be implemented here by calling /attendance/my-attendance */}
        <div className="bg-white p-6 rounded-lg shadow text-gray-500">
          Attendance records will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <div className="space-y-2">
            <Label>Course</Label>
            <Select onValueChange={setSelectedCourse} value={selectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        {selectedCourse && (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium">{student.user?.firstName} {student.user?.lastName}</TableCell>
                    <TableCell>
                      <Select 
                        value={attendanceRecords[student.user?._id]} 
                        onValueChange={(val) => setAttendanceRecords({...attendanceRecords, [student.user?._id]: val})}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Present">Present</SelectItem>
                          <SelectItem value="Absent">Absent</SelectItem>
                          <SelectItem value="Late">Late</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isLoading || students.length === 0}>
                {isLoading ? 'Saving...' : 'Save Attendance'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
