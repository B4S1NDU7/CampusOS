import { useState } from 'react';
import { useQuery } from '../hooks/useApi';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';
import { Bed, Users, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Hostel = () => {
  const { user } = useAuth();
  const isAdmin = ['Super Admin', 'University Admin', 'Admin'].includes(user?.role || '');
  
  const { data, refetch, loading } = useQuery<{ data: any[] }>('hostel', '/hostels');
  
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [studentId, setStudentId] = useState('');

  const rooms = data?.data || [];

  const handleRequestRoom = async (roomId: string) => {
    try {
      await api.post(`/hostels/${roomId}/request`, { note: 'Standard request via UI' });
      toast.success('Room request submitted successfully');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to request room');
    }
  };

  const handleAllocate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRoom || !studentId) return;

    try {
      await api.post(`/hostels/${activeRoom}/allocate`, { student: studentId });
      toast.success('Student allocated successfully');
      setIsAllocateModalOpen(false);
      setStudentId('');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to allocate room');
    }
  };

  const openAllocateModal = (roomId: string) => {
    setActiveRoom(roomId);
    setIsAllocateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage hostel room allocations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-indigo-600" />
            Rooms Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room #</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">Loading...</TableCell>
                  </TableRow>
                ) : rooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">No rooms found.</TableCell>
                  </TableRow>
                ) : (
                  rooms.map((room) => {
                    const occupantCount = room.occupants?.length || 0;
                    const isFull = occupantCount >= room.capacity;

                    return (
                      <TableRow key={room._id}>
                        <TableCell className="font-medium">{room.roomNumber}</TableCell>
                        <TableCell>{room.block}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            room.status === 'available' ? 'bg-green-100 text-green-800' :
                            room.status === 'full' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {room.status.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="h-4 w-4" />
                            {occupantCount} / {room.capacity}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {isAdmin ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={isFull || room.status !== 'available'}
                              onClick={() => openAllocateModal(room._id)}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Allocate
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={isFull || room.status !== 'available'}
                              onClick={() => handleRequestRoom(room._id)}
                            >
                              <Bed className="h-4 w-4 mr-2" />
                              Request
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAllocateModalOpen} onOpenChange={setIsAllocateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Allocate Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAllocate} className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter Student ID (MongoDB ObjectId)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Confirm Allocation</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
