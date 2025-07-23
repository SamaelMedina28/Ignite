import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Trash } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
// import { useState, useRef } from 'react';
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
import { useSearch } from '@/hooks/useSearch';
import { toast } from 'sonner';
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

export default function Index({ projects }: {projects: ProjectWithLinks}) {
  // hook para manejar el formulario
  const { processing, delete: destroy, get: edit } = useForm();
  // hook para manejar la busqueda
  /* 
  {
    search: variable que almacena el valor de la busqueda,
    handleSearch: funcion que maneja el evento para realizar al bsuqueda,
    handleClear: funcion que maneja el evento de limpiar la busqueda,
  }
  */
  const { search, handleSearch, handleClear } = useSearch('');


  const handleDelete = (id: number) => {
    destroy(route('projects.destroy', id));
    setTimeout(() => {
      toast("Successfully!", {
        description: "Project deleted successfully!",
      })
    }, 600);
  };
  const handleEdit = (id: number) => {
    edit(route('projects.edit', id));
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
                      <div className="space-y-4 aspect-video">
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
                    <Modal
                      isDeleteModal={true}
                      handleDelete={() => { handleDelete(project.id) }}
                      trigger={<Button variant="destructive"><Trash /></Button>}
                      title="Delete Project"
                      description="Are you sure you want to delete this project?"
                    >
                      <div className='aspect-video'>
                        <div className="flex gap-2 justify-between items-center">
                          <h2 className="text-sm px-2 py-1">{project.name}</h2>
                          <p className="text-sm text-gray-500 px-2 py-1">{project.client}</p>
                        </div>
                        <img src={`storage/${project.image_path}`} alt="" className="w-full max-h-64 object-cover rounded-lg" />
                      </div>
                    </Modal>
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
