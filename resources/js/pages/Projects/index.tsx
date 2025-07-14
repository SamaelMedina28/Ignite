import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/projects',
  },
];

export interface Project {
  id: number;
  name: string;
  client: string;
  description: string;
  review: string | null;
  type: string;
  image_path: string | File;
}

export default function Index({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState('');
  console.log("Hola me estoy renderizando");
  const { processing, delete: destroy, get: edit } = useForm();
  const handleDelete = (id: number) => {
    destroy(route('projects.destroy', id));
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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            {projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())).map((project) => (
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
            ))}
          </TableBody>
        </Table>
      </main>

    </AppLayout>
  );
}
