// routes
import { useParams } from 'src/routes/hooks';
// sections
import { CategoryEditView } from 'src/sections/product-category/view';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
        <title> Dashboard: Category Edit</title>

      <CategoryEditView id={`${id}`} />
    </>
  );
}