import { Breadcrumb } from '@/Components/dashboard/ui/Widgets';
import AddSkillPage from '@/Components/dashboard/skill/AddSkillPage';

export const metadata = { title: 'Add Skill — Portfolio Dashboard' };

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }, { label: 'Skills', href: '/dashboard/skill' }, { label: 'Add Skill', active: true }]} />
      <AddSkillPage />
    </>
  );
}
