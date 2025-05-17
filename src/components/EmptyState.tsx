const PackageIllustration = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-24 w-24 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 7l9-4 9 4v10l-9 4-9-4V7z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 7l9 4 9-4M3 17l9-4 9 4"
      />
    </svg>
  );
  
interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ 
  title = 'No hay registros', 
  description = 'Aún no existen envíos que mostrar.', 
  actionLabel = 'Crear nuevo envío',
  onAction 
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16">
    {/* Ilustración */}
    <PackageIllustration />

    {/* Mensaje principal */}
    <h2 className="mt-4 text-2xl font-semibold text-gray-700">
      {title}
    </h2>

    {/* Descripción secundaria */}
    <p className="mt-2 text-gray-500 text-center max-w-xs">
      {description}
    </p>

    {/* CTA */}
    <button
      onClick={onAction}
      className="mt-6 px-5 py-2 bg-[#1063AC] text-white rounded-lg shadow hover:shadow-lg focus:outline-none focus:ring"
    >
      {actionLabel}
    </button>
  </div>
);
