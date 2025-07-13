import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
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
  description: string;
  review: string;
  type: string;
  image_path: string;
}

export default function Index({ projects }: { projects: Project[] }) {
  const { processing, delete: destroy } = useForm();
  const handleDelete = (id: number) => {
    destroy(route('projects.destroy', id));
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="p-4">
        <Button variant="secondary" className="p-0">
          <Link href={route('projects.create')} prefetch className="h-full py-2 px-4">Add Project</Link>
        </Button>
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
                  <Modal

                    trigger={<Button variant="outline"><Eye /></Button>}
                    title={project.name}
                    description={project.description}
                  >
                    <div className="space-y-4">
                      <div className="flex gap-2 justify-between">
                        <p>{project.client}</p>
                        <h2 className="text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">{project.type.toUpperCase()}</h2>
                      </div>
                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg3ZFcL6sAObKAc8xIpvKpk5T-pYqpIbb7w&s' alt="" className="w-full max-h-64 object-cover rounded-lg" />
                      <section className="border border-gray-200 dark:border-zinc-700 p-4 rounded">
                        <p>{project.review}</p>
                      </section>
                    </div>
                  </Modal>
                  <Button variant="secondary">Edit</Button>
                  <Button variant="destructive" onClick={() => { handleDelete(project.id) }} disabled={processing}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        {/* Modal controlado con acciones personalizadas */}
        {/* <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={<Button>Open Controlled Modal</Button>}
          title="Confirm Action"
          size="lg"
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // Handle action
                setIsOpen(false);
              }}>
                Confirm
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>Are you sure you want to perform this action?</p>
            <p>This action cannot be undone.</p>
          </div>
        </Modal> */}
      </div>
    </AppLayout>
  );
}
