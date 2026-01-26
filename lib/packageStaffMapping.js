// Package to Staff Role Mapping
// This defines which staff roles are eligible for which package types

export const PACKAGE_STAFF_ROLES = {
  // Personal Training Packages
  'pt-single': ['Lead Personal Trainer', 'Personal Trainer'],
  'pt-package-5': ['Lead Personal Trainer', 'Personal Trainer'],
  'pt-package-10': ['Lead Personal Trainer', 'Personal Trainer'],
  'pt-monthly': ['Lead Personal Trainer', 'Personal Trainer'],

  // Massage Therapy Packages
  'massage-single': ['Massage Therapist'],
  'massage-package-5': ['Massage Therapist'],

  // Injury Rehabilitation Packages
  'rehab-package-5': ['Injury Rehabilitation Specialist'],
  'rehab-package-10': ['Injury Rehabilitation Specialist'],
};

// Helper function to get eligible staff roles for a package type
export function getEligibleRolesForPackage(packageType) {
  const roles = PACKAGE_STAFF_ROLES[packageType];
  if (!roles) {
    console.warn(`No staff roles mapped for package type: ${packageType}`);
    return [];
  }
  return roles;
}

// Helper function to validate if staff can be assigned to package
export function canStaffBeAssignedToPackage(staffRole, packageType) {
  const eligibleRoles = getEligibleRolesForPackage(packageType);
  return eligibleRoles.includes(staffRole);
}

// Get package category for display purposes
export function getPackageCategory(packageType) {
  if (packageType.startsWith('pt-')) {
    return 'Personal Training';
  }
  if (packageType.startsWith('massage-')) {
    return 'Massage Therapy';
  }
  if (packageType.startsWith('rehab-')) {
    return 'Injury Rehabilitation';
  }
  return 'Unknown';
}

// Get service type from package type
export function getServiceTypeFromPackage(packageType) {
  if (packageType.startsWith('pt-')) {
    return 'personal-training';
  }
  if (packageType.startsWith('massage-')) {
    return 'massage';
  }
  if (packageType.startsWith('rehab-')) {
    return 'rehab';
  }
  return null;
}
