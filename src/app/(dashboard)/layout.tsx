'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isDevBypassEnabled, getDevSession } from '@/config/devAuth';
import {
  Users,
  Building2,
  Building,
  Briefcase,
  FileText,
  Calendar,
  CheckSquare,
  Settings,
  LayoutDashboard,
  UserCircle,
  ClipboardList,
  Award,
  Send,
  FileCheck,
  Users2,
  Contact,
  User,
  UsersRound,
  Shield,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Candidates', href: '/dashboard/candidates', icon: Users },
  { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
  { name: 'Applications', href: '/dashboard/applications', icon: FileText },
  { name: 'Submissions', href: '/dashboard/submissions', icon: Send },
  { name: 'Interviews', href: '/dashboard/interviews', icon: Calendar },
  { name: 'Offers', href: '/dashboard/offers', icon: FileCheck },
  { name: 'Placements', href: '/dashboard/placements', icon: Award },
  { name: 'Bench', href: '/dashboard/bench', icon: Users2 },
  { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
  { name: 'Clients', href: '/dashboard/clients', icon: UserCircle },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Contact },
  { name: 'Organizations', href: '/dashboard/organizations', icon: Building },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Users', href: '/dashboard/users', icon: User },
  { name: 'Teams', href: '/dashboard/teams', icon: UsersRound },
  { name: 'Roles', href: '/dashboard/roles', icon: Shield },
  { name: 'Reports', href: '/dashboard/reports', icon: ClipboardList },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for dev bypass mode
      if (isDevBypassEnabled()) {
        const devSession = getDevSession();
        if (devSession) {
          setUser({ email: devSession.email });
          setIsDevMode(true);
          setLoading(false);
          return;
        }
      }

      // Normal auth flow
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && !isDevBypassEnabled()) {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    if (isDevMode) {
      // In dev mode, just redirect to login
      router.push('/login');
      return;
    }
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="animate-pulse text-muted-foreground">Loading...</div>
        <span className="sr-only">Loading dashboard</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Sidebar */}
      <aside
        aria-label="Primary"
        className="hidden w-64 flex-col border-r bg-card lg:flex"
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              N
            </div>
            <span>Northstar</span>
          </Link>
        </div>
        
        {/* DEV BYPASS BADGE */}
        {isDevMode && (
          <div
            role="status"
            aria-live="polite"
            className="mx-4 mt-4 flex items-center gap-2 rounded-md bg-warning px-3 py-2 text-warning-foreground text-xs font-medium"
          >
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            DEV BYPASS MODE
          </div>
        )}
        
        <nav className="flex-1 space-y-1 overflow-auto p-4" aria-label="Dashboard navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
          
          {/* Dev Validation Link - only in dev mode */}
          {isDevMode && (
            <Link
              href="/__dev/validate"
              aria-current={pathname === '/__dev/validate' ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/__dev/validate'
                  ? 'bg-warning-foreground text-warning'
                  : 'text-warning-foreground/80 hover:bg-warning hover:text-warning-foreground'
              )}
            >
              <CheckSquare className="h-4 w-4" aria-hidden="true" />
              Validation
            </Link>
          )}
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium"
              aria-hidden="true"
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate text-sm">
              {user?.email}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main id="main-content" className="flex-1 overflow-auto" tabIndex={-1}>
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
