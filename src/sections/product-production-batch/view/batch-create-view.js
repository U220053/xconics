// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import BatchNewEditForm from '../batch-new-edit-form';

export default function BatchCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new batch"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Production Batch List',
            href: paths.dashboard.product.batchlist,
          },
          { name: 'New batch' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <BatchNewEditForm />
    </Container>
  );
}

