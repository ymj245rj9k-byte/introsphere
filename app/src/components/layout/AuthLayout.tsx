import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-atm">
      <Link to="/" className="mb-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">Introsphere</span>
        </div>
      </Link>

      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        © 2026 Introsphere. All rights reserved.
      </p>
    </div>
  );
}