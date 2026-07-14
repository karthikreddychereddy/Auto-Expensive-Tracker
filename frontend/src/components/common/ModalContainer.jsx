import { useModal } from "../../context/ModalContext";

import AddExpenseModal from "../expenses/modals/AddExpenseModal";
import AddIncomeModal from "../income/modal/AddIncomeModal";
import AddSavingsModal from "../savings/modal/AddSavingsModal";
import AddCategoryModal from "../categories/modal/AddCategoryModal";
import AddGoalModal from "../goals/modal/AddGoalModal";
import EditProfileModal from "../profile/EditProfileModal";
// import { useProfile } from "../../context/ProfileContext";

export default function ModalContainer() {

  const {

    activeModal,

    modalData,

    closeModal,

  } = useModal();

  return (

    <>

      <AddExpenseModal

        open={activeModal === "expense"}

        initialExpense={modalData}

        onClose={closeModal}

      />

      <AddIncomeModal

        open={activeModal === "income"}

        initialIncome={modalData}

        onClose={closeModal}

      />

      <AddSavingsModal

        open={activeModal === "saving"}

        initialSaving={modalData}

        onClose={closeModal}

      />

      <AddCategoryModal

        open={activeModal === "category"}

        initialCategory={modalData}

        onClose={closeModal}

      />

      <AddGoalModal
          open={activeModal === "goal"}
          initialGoal={modalData}
          onClose={closeModal}
      />

      <EditProfileModal
          open={activeModal === "profile"}
          onClose={closeModal}
      />

    </>

  );

}