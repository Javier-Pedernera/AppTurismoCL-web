import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchBranchById, resetBranch, deleteBranchById } from '../../redux/actions/branchesActions';
import { useEffect, useState } from 'react';
import '../../styles/components/BranchDetails.scss';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditBranchModal from '../EditBranchModal/EditBranchModal';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import noimage from '../../assets/images/noImageAvailable.png'
import { useMediaQuery } from 'react-responsive';
import MapComponent from '../MapFunctions/MapComponent';

const BranchDetails = () => {
  const { branch_id } = useParams<{ branch_id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const URL = import.meta.env.VITE_API_URL;
  
  const branch = useAppSelector((state: any) => state.branches.selectedBranch);
  const statuses = useAppSelector((state: any) => state.user.statuses);
  
  // console.log(branch.image_url);
  useEffect(() => {
    if (branch_id) {
      dispatch(fetchBranchById(Number(branch_id)));
    }
  }, [branch_id, dispatch, showModal]);

  const handleBack = () => {
    dispatch(resetBranch());
    navigate(-1);
  };

  const handleDelete = () => {
    const statusDeleted = statuses.find((s:any) => s.name === 'deleted');
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La sucursal será eliminada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed && branch_id) {
        const deleteBranch = {
          status_id: statusDeleted?.id
        };
        // console.log("id de la sucursal a eliminar", deleteBranch);
        
        dispatch(deleteBranchById(Number(branch_id), deleteBranch));
        Swal.fire('¡Eliminado!', 'La sucursal ha sido marcada como eliminada.', 'success');
        navigate('/branches');
      }
    });
  };

  if (!branch) {
    return <div className="branch-details"><p>Cargando detalles de la sucursal...</p></div>;
  }

  return (
    <div className="branch-details">
      <div className='textInfo'>
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft className="back-icon" />
              {!isMobile && <h4>   Volver</h4>}
      </button>
      {branch && branch.image_url? <img src={`${URL}${branch.image_url}`} alt={branch.name} className="branch-details__image" />:<img src={noimage} alt={branch.name} className="branch-details__image" />}
      <h2 className="branch-details__title">{branch.name || 'Nombre no disponible'}</h2>
      <p className="branch-details__description">{branch.description || 'Descripción no disponible'}</p>
      <p className="branch-details__address">{branch.address || 'Dirección no disponible'}</p>
      <p className={`branch-details__status branch-details__status--${branch.status?.name?.toLowerCase() || 'unknown'}`} >
        Estado: {branch.status?.name || 'Estado no disponible'}
      </p>
      <div className="branch-details__actions">
          <EditButton onClick={() => setShowModal(true)}/>
          <DeleteButton onClick={handleDelete} />
      </div>
      </div>

      <div className='MapInfo'>
      {branch.latitude && branch.longitude && (
        <div className="branch-details__map">
          <MapComponent
            center={{ lat: branch.latitude, lng: branch.longitude }}
            zoom={15}
            markerPosition={{ lat: branch.latitude, lng: branch.longitude }}
            editMode={false} 
            onLocationChange={() => {}} 
          />
        </div>
      )}</div>

      {/* Mostrar el modal de edición */}
      <EditBranchModal
        showModal={showModal}
        branch={branch}
        onClose={() => setShowModal(false)}
        branchId={Number(branch_id)}
      />
    </div>
  );
};

export default BranchDetails;
