import React, { useState } from "react";
import WidgetContainer from "../../shared/templates/WidgetContainer";
import Layout from "../../shared/Layout";
import { CashflowType } from "../../shared/types/commonEnums";
import TransactionItem from "../../shared/components/molecules/TransactionItem";
import Fap from "../../shared/components/molecules/FAP";
import CashFlow from "../../shared/components/organisms/widgets/CashFlow";
import BudgetCard from "../../shared/components/organisms/widgets/BudgetCard";
import AddTransactionModal from "../../shared/components/molecules/Modals/AddTransactionModal";
import toast from "react-hot-toast";

const Home = () => {
  const [openAddTransactionModal, setAddTransactionModal] = useState(false);

  return (
    <Layout>
      <WidgetContainer>
        <CashFlow
          amount={91387}
          type={CashflowType.EXPENSE}
          transactionCount={7}
        />
        <CashFlow
          amount={150000}
          type={CashflowType.INCOME}
          transactionCount={7}
        />
      </WidgetContainer>
      <WidgetContainer>
        <BudgetCard />
      </WidgetContainer>
      <TransactionItem
        amount={3400}
        category="Food / Groceries"
        source="Sampath Bank"
        type="EXPENSE"
      />
      <TransactionItem
        amount={340000}
        category="Salary"
        source="Sampath Bank"
        type="INCOME"
      />
      <Fap onClick={() => setAddTransactionModal(true)} />
      <AddTransactionModal
        isOpen={openAddTransactionModal}
        onClose={() => {
          setAddTransactionModal(false);
        }}
      />
    </Layout>
  );
};

export default Home;
