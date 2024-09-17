import { Loader2 } from "lucide-react";

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
};

const LoadingSpinner = ({
  size = 24,
  color = "text-purple-500",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        size={size}
        className={`animate-spin ${color}`}
        aria-label="Cargando"
      />
    </div>
  );
};

export default LoadingSpinner;
