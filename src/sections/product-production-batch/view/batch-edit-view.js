import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import axios from 'src/utils/axios';
import BatchNewEditForm from '../batch-new-edit-form';

export default function BatchEditView({ id }) {
    const settings = useSettingsContext();
    const [dataBatch, setDataBatch] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`api/product/batch/get/${id}`);
                setDataBatch(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching API data:', error);
                setIsLoading(false); 
            }
        }
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    // const currentBatch = _userList.find((user) => user.id === id);
    if (isLoading) {
        return <div>Loading...</div>; // Display a loading indicator
      }
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit batch"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Production Batch List',
                        href: paths.dashboard.product.batchlist,
                    },
                    { name: "Edit batch" },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <BatchNewEditForm currentBatch={dataBatch} />
        </Container>
    );
}

BatchEditView.propTypes = {
    id: PropTypes.string.isRequired,
};