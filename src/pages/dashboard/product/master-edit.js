// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ProductMasterEditView } from 'src/sections/product-master/view';

// ----------------------------------------------------------------------

export default function ProductMasterEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: Product Edit</title>

      <ProductMasterEditView id={`${id}`} />
    </>
  );
}
