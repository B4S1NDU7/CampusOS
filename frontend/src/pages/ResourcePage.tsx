import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../api';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export type ResourceField = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'datetime-local' | 'textarea';
  required?: boolean;
  placeholder?: string;
};

type ResourcePageProps = {
  title: string;
  endpoint: string;
  fields: ResourceField[];
  columns: ResourceField[];
  createLabel?: string;
};

const getValue = (item: Record<string, any>, path: string) => {
  const value = path.split('.').reduce((current, key) => current?.[key], item);
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === 'object') return value.name || value.title || value.email || value._id || JSON.stringify(value);
  if (path.toLowerCase().includes('date') || path.endsWith('At')) {
    return value ? new Date(value).toLocaleString() : '';
  }
  return value ?? '';
};

const emptyForm = (fields: ResourceField[]) =>
  fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

export const ResourcePage = ({ title, endpoint, fields, columns, createLabel }: ResourcePageProps) => {
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>(() => emptyForm(fields));
  const [isLoading, setIsLoading] = useState(false);

  const normalizedEndpoint = useMemo(() => endpoint.replace(/^\/api/, ''), [endpoint]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(normalizedEndpoint, { params: search ? { search } : undefined });
      setItems(Array.isArray(res.data) ? res.data : res.data.data || res.data.users || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to load ${title}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [normalizedEndpoint]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm(fields));
    setIsOpen(true);
  };

  const openEdit = (item: Record<string, any>) => {
    setEditingId(item._id);
    setFormData(
      fields.reduce<Record<string, string>>((acc, field) => {
        const value = getValue(item, field.name);
        acc[field.name] = value === undefined || value === null ? '' : String(value);
        return acc;
      }, {})
    );
    setIsOpen(true);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const payload = fields.reduce<Record<string, unknown>>((acc, field) => {
      const value = formData[field.name];
      if (value !== '') acc[field.name] = field.type === 'number' ? Number(value) : value;
      return acc;
    }, {});

    try {
      if (editingId) {
        await api.put(`${normalizedEndpoint}/${editingId}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(normalizedEndpoint, payload);
        toast.success(`${title} created`);
      }
      setIsOpen(false);
      fetchItems();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to save ${title}`);
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()} record?`)) return;
    try {
      await api.delete(`${normalizedEndpoint}/${id}`);
      toast.success(`${title} deleted`);
      fetchItems();
    } catch (error: any) {
      toast.error(error.response?.data?.message || `Failed to delete ${title}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">Create, search, update, and remove records.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input className="pl-9" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <Button variant="outline" onClick={fetchItems} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" />
                {createLabel || `Add ${title}`}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? `Edit ${title}` : `Create ${title}`}</DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="grid gap-4 pt-2 md:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'space-y-2 md:col-span-2' : 'space-y-2'}>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      type={field.type === 'textarea' ? 'text' : field.type || 'text'}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.name}>{column.label}</TableHead>
              ))}
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="py-6 text-center text-gray-500">
                  {isLoading ? 'Loading...' : 'No records found.'}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item._id}>
                  {columns.map((column) => (
                    <TableCell key={column.name}>{getValue(item, column.name)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEdit(item)} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => remove(item._id)} aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
