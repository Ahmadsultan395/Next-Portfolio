import { Breadcrumb } from '@/Components/dashboard/ui/Widgets';
import SkillPage from '@/Components/dashboard/skill/SkillPage';

export const metadata = { title: 'Skills — Portfolio Dashboard' };

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }, { label: 'Skills', active: true }]} />
      <SkillPage />
    </>
  );
}
