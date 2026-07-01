import { useState } from 'react';
import { useQuery } from '../hooks/useApi';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';
import { Search, Book, BookmarkPlus, RotateCcw } from 'lucide-react';

export const Library = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  
  const { data, refetch, loading } = useQuery<{ data: any[] }>('library', `/library?search=${search}`, { 
    refetchInterval: 30000 // Refetch every 30s to keep available counts accurate
  });

  const handleBorrow = async (bookId: string) => {
    try {
      await api.post(`/library/${bookId}/borrow`);
      toast.success('Book borrowed successfully');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to borrow book');
    }
  };

  const handleReturn = async (bookId: string) => {
    try {
      await api.post(`/library/${bookId}/return`);
      toast.success('Book returned successfully');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to return book');
    }
  };

  const books = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library</h1>
          <p className="mt-1 text-sm text-gray-500">Browse, borrow, and return books.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-9 w-[300px]" 
            placeholder="Search title, author, or ISBN..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-600" />
            Catalog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">Loading...</TableCell>
                  </TableRow>
                ) : books.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">No books found.</TableCell>
                  </TableRow>
                ) : (
                  books.map((book) => {
                    const isAvailable = book.copiesAvailable > 0;
                    
                    // Check if current user has borrowed this book and hasn't returned it
                    const activeBorrow = book.borrowedBy?.find(
                      (b: any) => b.user === user?.id && !b.returnedAt
                    );

                    return (
                      <TableRow key={book._id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {book.copiesAvailable} / {book.copiesTotal} Available
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {activeBorrow ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-orange-600 border-orange-200 hover:bg-orange-50"
                              onClick={() => handleReturn(book._id)}
                            >
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Return
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={!isAvailable}
                              onClick={() => handleBorrow(book._id)}
                            >
                              <BookmarkPlus className="h-4 w-4 mr-2" />
                              Borrow
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
    </div>
  );
};
