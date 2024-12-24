import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { deleteBranchById, fetchBranchById, updateBranchById } from '../../redux/actions/branchesActions';
import { useEffect } from 'react';
import '../../styles/components/BranchDetails.scss'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RootState } from '../../redux/store/store';

const URL = import.meta.env.VITE_API_URL;
const MySwal = withReactContent(Swal);

const BranchDetails = () => {

  const statuses = useAppSelector((state: RootState) => state.user.statuses);
  const { branch_id } = useParams<{ branch_id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Selecciona la sucursal actual del estado
  const branch = useAppSelector((state: any) => state.branches.selectedBranch);
    console.log("sucursal en el componente de detalles", branch);
    
  useEffect(() => {
    console.log("id de la sucursal", branch_id);
    
    if (branch_id) {
        console.log("se hace el dispatch");
      dispatch(fetchBranchById(Number(branch_id)));
    }
  }, [branch_id, dispatch]);

  const handleEdit = () => {
    MySwal.fire({
      title: 'Editar sucursal',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${branch?.name || ''}" />
        <textarea id="description" class="swal2-textarea" placeholder="Descripción">${branch?.description || ''}</textarea>
        <input id="address" class="swal2-input" placeholder="Dirección" value="${branch?.address || ''}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const address = (document.getElementById('address') as HTMLInputElement).value;

        if (!name || !description || !address) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }

        return { name, description, address };
      },
    }).then((result) => {
      if (result.isConfirmed && branch && branch_id) {
        const updatedBranch = {
          ...branch,
          name: result.value?.name,
          description: result.value?.description,
          address: result.value?.address,
        };
        dispatch(updateBranchById(Number(branch_id), updatedBranch));
      }
    });
  };

 
  const handleDelete = () => {
    const statusDeleted = statuses.find(s=>s.name === 'deleted');
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La sucursal será marcada como eliminada (borrado lógico).',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result:any) => {
      if (result.isConfirmed && branch_id) {
      
        dispatch(deleteBranchById(Number(branch_id), statusDeleted)); 
        Swal.fire('¡Eliminado!', 'La sucursal ha sido marcada como eliminada.', 'success');
        navigate('/branches');
      }
    });
  };
  if (!branch) {
    return  <div className="branch-details"><p>Cargando detalles de la sucursal...</p></div>;
  }

  return (

    <div className="branch-details">
      <img src={`${URL}${branch.image_url}`} alt={branch.name || 'Sucursal'} className="branch-details__image" />
      <h2 className="branch-details__title">{branch.name || 'Nombre no disponible'}</h2>
      <p className="branch-details__description">{branch.description || 'Descripción no disponible'}</p>
      <p className="branch-details__address">{branch.address || 'Dirección no disponible'}</p>
      <p className={`branch-details__status branch-details__status--${branch.status?.name?.toLowerCase() || 'unknown'}`}>
        Estado: {branch.status?.name || 'Estado no disponible'}
      </p>
      <div className="branch-details__actions">
        <button onClick={handleEdit} className="branch-details__button branch-details__button--edit">
          Editar
        </button>
        <button onClick={handleDelete} className="branch-details__button branch-details__button--delete">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BranchDetails;