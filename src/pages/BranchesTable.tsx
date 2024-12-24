import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Branch } from '../redux/types/types';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { fetchAllBranches } from '../redux/actions/branchesActions';
import '../styles/pages/_branchesTable.scss';

const URL = import.meta.env.VITE_API_URL;

const BranchesTable = () => {

    const dispatch = useAppDispatch();
  const branches = useAppSelector((state: any) => state.branches.allBranches);
console.log("sucursales en tabla",branches);

  useEffect(() => {
    dispatch(fetchAllBranches());
  }, [dispatch]);

  return (
    <div className="branches-table-container">
      <table className="branches-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch:Branch) => (
            <tr key={branch.branch_id}>
              <td>
                <img src={`${URL}${branch.image_url}`} alt={branch.name} className="branch-image" />
              </td>
              <td>{branch.name}</td>
              <td>{branch.status.name}</td>
              <td>
                <Link to={`/branches/${branch.branch_id}`} className="edit-link">Ver/Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchesTable;
