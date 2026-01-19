'use client';
export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/components/ui';
import { useCandidates, useJobs, useApplications, useUpcomingInterviews, usePendingTasks } from '@/hooks';
import { Users, Briefcase, FileText, Calendar, CheckSquare } from 'lucide-react';

export default function DashboardPage() {
  const { data: candidates, isLoading: loadingCandidates } = useCandidates({ pageSize: 1 });
  const { data: jobs, isLoading: loadingJobs } = useJobs({ pageSize: 1 });
  const { data: applications, isLoading: loadingApplications } = useApplications({ pageSize: 1 });
  const { data: interviews, isLoading: loadingInterviews } = useUpcomingInterviews();
  const { data: tasks, isLoading: loadingTasks } = usePendingTasks({ pageSize: 1 });

  const stats = [
    {
      name: 'Total Candidates',
      value: candidates?.count ?? 0,
      icon: Users,
      loading: loadingCandidates,
      href: '/dashboard/candidates',
    },
    {
      name: 'Active Jobs',
      value: jobs?.count ?? 0,
      icon: Briefcase,
      loading: loadingJobs,
      href: '/dashboard/jobs',
    },
    {
      name: 'Applications',
      value: applications?.count ?? 0,
      icon: FileText,
      loading: loadingApplications,
      href: '/dashboard/applications',
    },
    {
      name: 'Upcoming Interviews',
      value: interviews?.count ?? 0,
      icon: Calendar,
      loading: loadingInterviews,
      href: '/dashboard/interviews',
    },
    {
      name: 'Pending Tasks',
      value: tasks?.count ?? 0,
      icon: CheckSquare,
      loading: loadingTasks,
      href: '/dashboard/tasks',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your recruitment pipeline</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {stat.loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Activity feed will appear here</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Quick action buttons will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
