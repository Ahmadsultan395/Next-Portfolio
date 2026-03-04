import { Breadcrumb } from '@/Components/dashboard/ui/Widgets';
import EditSkillPage from '@/Components/dashboard/skill/EditSkillPage';

export const metadata = { title: 'Edit Skill — Portfolio Dashboard' };

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }, { label: 'Skills', href: '/dashboard/skill' }, { label: 'Edit', active: true }]} />
      <EditSkillPage />
    </>
  );
}
