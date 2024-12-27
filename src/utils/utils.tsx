export const translateStatusToSpanish = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'deleted':
        return 'Eliminado';
      case 'suspended':
        return 'Suspendido';
      default:
        return status;
    }
  };

  export const translateRoleToSpanish = (role: string): string => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Administrador';
      case 'tourist':
        return 'Turista';
      case 'associated':
        return 'Asociado';
      default:
        return role;
    }
  };  
  