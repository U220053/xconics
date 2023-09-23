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
    const [category, setCategory] = useState([]); 
     const [dataUser, setDataUser] = useState(null);
     const [isLoading, setIsLoading] = useState(true); // Add a loading state
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/product/category/get/${id}`);
                setDataUser(response.data.data);
                setIsLoading(false);
                const groupresponse = await axios.get('/api/product/category');
                const newdata = JSON.parse(JSON.stringify(groupresponse.data.data));
                const newGroupData = newdata.map((item) => {
                  return { id: item._id, category_name: item.category_descripion };
                });
                setCategory(newGroupData);
              } catch (error) {
                console.error('Error fetching API data:', error);
                setIsLoading(false); // Set loading to false on error
              }
            }
        
            fetchData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [id]);
        
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

            <CategoryNewEditForm currentUser={dataUser} category={category} />
        </Container>
    );
}

CategoryEditView.propTypes = {
    id: PropTypes.string,
    
};