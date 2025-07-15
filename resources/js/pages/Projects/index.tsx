import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { useState, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchInput } from '@/components/ui/search-input';
import { Pagination } from '@/components/ui/pagination';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/projects',
  },
];

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface ProjectWithLinks {
  data: Project[];
  links: PaginationLink[];
}

export interface Project {
  id: number;
  name: string;
  client: string;
  description: string;
  review: string | null;
  type: string;
  image_path: string | File;
}

export default function Index({ projects, search: initialSearch }: {
  projects: ProjectWithLinks,
  search: string 
}) {
  const { processing, delete: destroy, get: edit } = useForm();

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [search, setSearch] = useState<string>(initialSearch || '');

  const handleDelete = (id: number) => {
    destroy(route('projects.destroy', id));
  };
  const handleEdit = (id: number) => {
    edit(route('projects.edit', id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Debounce para evitar muchas request
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Establece un nuevo timer
    debounceTimeoutRef.current = setTimeout(() => {
      console.log('Realizando petición al servidor con:', value); // Para depuración
      router.get(route('projects.index'), { search: value }, {
        preserveState: true,
        preserveScroll: true
      });
    }, 300); 
  };

  const handleClear = () => {
    if (search === '') return;
    setSearch('');
    router.get(route('projects.index'), {}, {
      preserveState: true,
      preserveScroll: true
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="p-4">
        <Button variant="secondary" className="p-0">
          <Link href={route('projects.create')} prefetch className="h-full py-2 px-4">Add Project</Link>
        </Button>
      </div>
      <main className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="relative w-full max-w-md">
          <SearchInput search={search} handleSearch={handleSearch} handleClear={handleClear} />
        </div>
        <Table className="text-base">
          <TableCaption>Projects List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.type[0].toUpperCase() + project.type.slice(1)}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Modal

                      trigger={<Button variant="outline"><Eye /></Button>}
                      title={project.name}
                      description={project.description}
                    >
                      <div className="space-y-4">
                        <div className="flex gap-2 justify-between items-center">
                          <p>{project.client}</p>
                          <h2 className="text-sm bg-blue-500/20 border border-blue-400 text-blue-500 dark:bg-blue-500/20 dark:text-blue-300 px-2 py-1 rounded-full">{project.type[0].toUpperCase() + project.type.slice(1)}</h2>
                        </div>
                        <img src={`storage/${project.image_path}`} alt="" className="w-full max-h-64 object-cover rounded-lg" />
                        <section className="border border-gray-200 dark:border-zinc-700 p-4 rounded">
                          <p>{project.review ? project.review : 'No review'}</p>
                        </section>
                      </div>
                    </Modal>
                    <Button variant="secondary" onClick={() => { handleEdit(project.id) }} disabled={processing}>Edit</Button>
                    <Button variant="destructive" onClick={() => { handleDelete(project.id) }} disabled={processing}>Delete</Button>
                  </TableCell>
                </TableRow>
              )))}
          </TableBody>
        </Table>
        {projects.links.length > 3 && (
          <div className="flex justify-end">
            <Pagination links={projects.links} />
          </div>
        )}
      </main>

    </AppLayout>
  );
}
