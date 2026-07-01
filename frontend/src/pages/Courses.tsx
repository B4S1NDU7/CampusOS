import { useState, useEffect } from 'react';
import { api } from '../api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { EditModal } from '../components/EditModal';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';

interface Course {
  _id: string;
  name: string;
  code: string;
  credits: number;
  department?: { _id: string; name: string };
  description?: string;
  capacity?: number;
}

interface Department {
  _id: string;
  name: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', credits: 3, department: '', description: '', capacity: 50 });

  const fetchData = async () => {
    try {
      const [coursesRes, deptsRes] = await Promise.all([
        api.get('/courses'),
        api.get('/departments')
      ]);
      setCourses(coursesRes.data);
      setDepartments(deptsRes.data);
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/courses', formData);
      toast.success('Course created');
      setIsOpen(false);
      setFormData({ name: '', code: '', credits: 3, department: '', description: '', capacity: 50 });
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      _id: course._id,
      name: course.name,
      code: course.code,
      credits: course.credits,
      department: course.department?._id || '',
      description: course.description || '',
      capacity: course.capacity || 50
    });
    setIsEditOpen(true);
  };

  const handleUpdateCourse = async (data: any) => {
    try {
      const id = data._id || selectedCourse?._id;
      if (!id) throw new Error('No course id provided');
      await api.put(`/courses/${id}`, data);
      toast.success('Course updated');
      setIsEditOpen(false);
      setSelectedCourse(null);
      fetchData();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update course');
    }
  };

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/courses/${selectedCourse?._id}`);
      toast.success('Course deleted');
      setIsDeleteOpen(false);
      setSelectedCourse(null);
      fetchData();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input id="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input id="credits" type="number" min={1} max={10} value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" min={1} max={500} value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept._id} value={dept._id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !formData.department}>
                {isLoading ? 'Creating...' : 'Create Course'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-6">No courses found.</TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>{course.capacity || 'N/A'}</TableCell>
                  <TableCell>{course.department?.name || 'N/A'}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(course)}
                      className="inline-flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(course)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCourse(null);
        }}
        onSave={handleUpdateCourse}
        title="Edit Course"
        initialData={formData}
        fields={[
          { name: 'name', label: 'Course Name', required: true },
          { name: 'code', label: 'Course Code', required: true },
          { name: 'credits', label: 'Credits', type: 'number', required: true },
          { name: 'capacity', label: 'Capacity', type: 'number', required: true },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]}
      />

      <DeleteConfirm
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCourse(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course?"
        itemName={selectedCourse?.name}
      />
    </div>
  );
};
