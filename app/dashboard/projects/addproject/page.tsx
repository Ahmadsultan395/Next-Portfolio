// app/dashboard/projects/addproject/page.tsx
import { Breadcrumb } from '@/Components/dashboard/ui/Widgets';
import AddProjectPage from '@/Components/dashboard/projects/AddProjectPage';
export const metadata = { title: 'Add Project — Portfolio Dashboard' };
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }, { label: 'Projects', href: '/dashboard/projects' }, { label: 'Add Project', active: true }]} />
      <AddProjectPage />
    </>
  );
}
