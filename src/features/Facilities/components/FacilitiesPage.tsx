import { useEffect, useState } from "react";
import { useFacilities } from "../hooks/useFacilities";
import { useFacilityModals } from "../hooks/useFacilityModals";
import FacilitiesTable from "./FacilitiesTable";
import FacilityFormModal from "./FacilityFormModal";
import { ConfirmationModal } from "../../../shared/components/Modal/ConfirmationModal";
import { Alert } from "../../../shared/components/Alert/Alert";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import styles from "../styles/facilities.module.css";

export default function FacilitiesPage() {
  const {
    facilities,
    loading,
    error,
    fetchFacilities,
    createFacility,
    updateFacility,
    deleteFacility,
  } = useFacilities();

  const { modals, data, actions } = useFacilityModals();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch facilities when page mounts
  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleFormSubmit = async (formData: any) => {
    if (data.selectedFacility) {
      // Update Mode
      const result = await updateFacility(data.selectedFacility.id, formData);
      if (!result.hasError) {
        showSuccess("Facility updated successfully!");
      }
      return result;
    } else {
      // Create Mode
      const result = await createFacility(formData);
      if (!result.hasError) {
        showSuccess("Facility created successfully!");
      }
      return result;
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className={`page-header ${styles.headerFlex}`}>
          <div>
            <h1 className="page-header__title">Facilities Management</h1>
            <p className="page-header__subtitle">
              Manage resort facilities, activities, and amenities displayed on the public website.
            </p>
          </div>
          <button className="btn-action" onClick={actions.openAddFlow}>
            Add facility
          </button>
        </header>

        <hr className="page-header__divider" />

        {/* Page Level: Loader */}
        {loading && facilities.length === 0 && (
          <Spinner centered size="lg" message="Loading resort facilities..." />
        )}

        {/* Page Level: Error alert */}
        {error && (
          <Alert type="error" title="Database Connection Failure">
            {error}
          </Alert>
        )}

        {/* Page Level: Success alert */}
        {successMessage && (
          <Alert type="success" title="Action Completed">
            {successMessage}
          </Alert>
        )}

        {/* Facilities Table */}
        {!loading && !error && (
          <FacilitiesTable
            facilities={facilities}
            onUpdate={actions.openUpdateFlow}
            onDelete={actions.openDeleteFlow}
          />
        )}

        {/* Form Modal */}
        <FacilityFormModal
          isOpen={modals.isFormOpen}
          onClose={actions.closeFormFlow}
          facility={data.selectedFacility}
          onSubmit={handleFormSubmit}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={modals.isDeleteOpen}
          onClose={actions.closeDeleteFlow}
          title="Eliminate Facility"
          message={`Are you sure you want to delete the facility "${data.selectedFacility?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={async () => {
            // UpdatedBy = 1 (default admin user id)
            const result = await deleteFacility(data.selectedFacility!.id, 1);
            if (!result.hasError) {
              showSuccess("The facility has been successfully deleted.");
            }
            return result;
          }}
        />
      </div>
    </div>
  );
}
