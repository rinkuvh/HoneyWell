import { useSelector } from "react-redux";

export const usePermission = (permissionsToCheck) => {
  // const { permissions } = useSelector((state) => state.admin);

  // // If the user is an admin, they have all permissions
  // if (permissions?.isAdmin) {
  //   return true;
  // }

  // // Ensure role permissions exist
  // const userPermissions = permissions?.roleType?.rolePermission || [];

  // if (Array.isArray(permissionsToCheck)) {
  //   // Check if at least one required permission exists in user's permissions
  //   return permissionsToCheck.some((permission) =>
  //     userPermissions.includes(permission)
  //   );
  // }

  // // Check for a single permission
  // return userPermissions.includes(permissionsToCheck);
  return true
};
