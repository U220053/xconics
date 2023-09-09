// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import GroupNewEditForm from '../group-new-edit-form';

export default function GrouprCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new group"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Group',
            href: paths.dashboard.user.group,
          },
          { name: 'New group' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <GroupNewEditForm />
    </Container>
  );
}

