import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/projects',
  },
];

interface Project {
    id: number;
    name: string;
    client: string;
    type: string;
}

export default function Index({ projects }: { projects: Project[] }) {
  const {processing, delete: destroy} = useForm();
  const handleDelete = (id: number) => {
    destroy(route('projects.destroy', id));
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="p-4">
        <Button variant="secondary">Add Project</Button>
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
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
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.type}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button variant="outline"><Eye /></Button>
                  <Button variant="secondary">Edit</Button>
                  <Button variant="destructive" onClick={() => {handleDelete(project.id)}} disabled={processing}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
