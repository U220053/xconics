// routes
import { useParams } from 'src/routes/hooks';
// sections
import { BatchEditView } from 'src/sections/product-production-batch/view';

// ----------------------------------------------------------------------

export default function BatchEditPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <title> Dashboard: Batch Edit</title>
            <BatchEditView id={`${id}`} />
        </>
    );
}