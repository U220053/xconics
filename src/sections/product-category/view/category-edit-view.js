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
import CategoryNewEditForm from '../category-new-edit-form';

export default function CategoryEditView({ id }) {
    const settings = useSettingsContext();
    const [dataUser, setDataUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`api/user/usergroup/${id}`);
                setDataUser(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching API data:', error);
                setIsLoading(false); 
            }
        }
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const currentUser = _userList.find((user) => user.id === id);
    if (isLoading) {
        return <div>Loading...</div>; // Display a loading indicator
      }
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Category',
                        href: paths.dashboard.product.category,
                    },
                    { name: "Edit Category" },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <CategoryNewEditForm currentUser={dataUser} />
        </Container>
    );
}

CategoryEditView.propTypes = {
    id: PropTypes.string,
};