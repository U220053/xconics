import { useParams } from 'src/routes/hooks';
import { GroupEditView } from 'src/sections/user-group/view';

export default function GroupEditPage() {
    const params = useParams();
    const { id } = params;

    return (
        <>
            <title> Dashboard: Group Edit</title>
            <GroupEditView id={`${id}`} />
        </>
    );
}