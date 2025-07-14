
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: PaginationLink[];
}

export const Pagination = ({ links }: Props) => {
  const previousLink = links[0];
  const nextLink = links[links.length - 1];
  const numericLinks = links.slice(1, -1);

  return (
    <div className="flex items-center justify-center gap-1 mt-8 text-sm">
      {/* Botón Anterior */}
      {previousLink.url ? (
        <Link
          href={previousLink.url}
          className="inline-flex items-center justify-center w-8 h-8 rounded 
                     text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 
                     transition-all duration-200 ease-in-out
                     dark:text-zinc-300 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded 
                     text-zinc-300 cursor-not-allowed
                     dark:text-zinc-600"
        >
          <ChevronLeft className="w-6 h-6" />
        </span>
      )}

      {/* Números de página */}
      <div className="flex items-center gap-1 mx-2">
        {numericLinks.map((link, index) => (
          <div key={index}>
            {link.url ? (
              <Link
                href={link.url}
                className={`inline-flex items-center justify-center w-8 h-8 rounded 
                           font-medium transition-all duration-200 ease-in-out ${link.active
                    ? 'bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ) : (
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded 
                           text-zinc-300 cursor-not-allowed dark:text-zinc-900"
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Botón Siguiente */}
      {nextLink.url ? (
        <Link
          href={nextLink.url}
          className="inline-flex items-center justify-center w-8 h-8 rounded 
                     text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 
                     transition-all duration-200 ease-in-out
                     dark:text-zinc-300 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <ChevronRight className="w-6 h-6" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded 
                     text-zinc-300 cursor-not-allowed
                     dark:text-zinc-600"
        >
          <ChevronRight className="w-6 h-6" />
        </span>
      )}
    </div>
  );
};
