import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

interface Exam {
  _id: string;
  title: string;
  course: { _id: string; name: string };
  date: string;
  durationMinutes: number;
  maxScore: number;
}

interface Course {
  _id: string;
  name: string;
}

export const Exams = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', course: '', date: '', durationMinutes: 120, maxScore: 100 });

  const fetchData = async () => {
    try {
      const [examsRes, coursesRes] = await Promise.all([
        api.get('/exams'),
        api.get('/courses')
      ]);
      setExams(examsRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      toast.error('Failed to load exams');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/exams', formData);
      toast.success('Exam created');
      setIsOpen(false);
      setFormData({ title: '', course: '', date: '', durationMinutes: 120, maxScore: 100 });
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create exam');
    } finally {
      setIsLoading(false);
    }
  };

  const isLecturerOrAdmin = user?.role === 'Lecturer' || user?.role === 'Admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
        {isLecturerOrAdmin && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Schedule Exam</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Exam</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, course: value })}>
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
                  <Label htmlFor="date">Date & Time</Label>
                  <Input id="date" type="datetime-local" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="durationMinutes">Duration (mins)</Label>
                    <Input id="durationMinutes" type="number" value={formData.durationMinutes} onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxScore">Max Score</Label>
                    <Input id="maxScore" type="number" value={formData.maxScore} onChange={(e) => setFormData({ ...formData, maxScore: Number(e.target.value) })} required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !formData.course}>
                  {isLoading ? 'Scheduling...' : 'Schedule Exam'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Max Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-6">No exams scheduled.</TableCell>
              </TableRow>
            ) : (
              exams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell className="font-medium">{exam.title}</TableCell>
                  <TableCell>{exam.course?.name}</TableCell>
                  <TableCell>{new Date(exam.date).toLocaleString()}</TableCell>
                  <TableCell>{exam.durationMinutes} mins</TableCell>
                  <TableCell>{exam.maxScore}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
