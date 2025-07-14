import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import Heading from '@/components/heading';
import { Label } from '@/components/ui/label';
import { Project } from '@/pages/Projects/index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'Edit',
    href: '/projects/edit',
  },
];

interface Props {
  project: Project;
}

export default function Edit({ project }: Props) {
  const { data, setData, put: update, errors, processing } = useForm({
    _method: 'PUT',
    name: project.name || '',
    client: project.client || '',
    description: project.description || '',
    review: project.review || '',
    type: project.type || '',
    image_path: project.image_path || '',
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image_path', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(route('projects.update', project.id));
  };
  const image = data.image_path ? '/storage/' + data.image_path : '/storage/' + project.image_path;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Project" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading title="Edit Project" />
        </div>

        <Card className="mx-4">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Fill in the required information to create a new project</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter project name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <InputError message={errors.name} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Client Name *</Label>
                  <Input
                    id="client"
                    name="client"
                    value={data.client}
                    onChange={(e) => setData('client', e.target.value)}
                    placeholder="Enter client name"
                    className={errors.client ? 'border-red-500' : ''}
                  />
                  {errors.client && <InputError message={errors.client} />}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Describe the project"
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && <InputError message={errors.description} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Project Type *</Label>
                  <Select
                    value={data.type}
                    onValueChange={(value) => setData('type', value)}
                  >
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="rebranding">Rebranding</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <InputError message={errors.type} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_path">Image URL *</Label>
                  <input
                    type="file"
                    id="image_path"
                    name="image_path"
                    // value={data.image_path}
                    onChange={handleFileChange}
                    placeholder="https://example.com/image.jpg"
                    className={errors.image_path ? 'border-red-500' : ''}
                  />
                  <img src={preview || image} alt="" className="w-full max-h-64 object-cover rounded-lg" />
                  {errors.image_path && <InputError message={errors.image_path} />}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="review">Review/Testimonial</Label>
                  <Textarea
                    id="review"
                    name="review"
                    value={data.review}
                    onChange={(e) => setData('review', e.target.value)}
                    placeholder="Client testimonial or review"
                    rows={3}
                    className={errors.review ? 'border-red-500' : ''}
                  />
                  {errors.review && <InputError message={errors.review} />}
                </div>
              </div>

              <CardFooter className="flex justify-end gap-4 px-0 pb-0 pt-6">
                <Button variant="outline" type="button" asChild>
                  <Link href={route('projects.index')}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Project'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}