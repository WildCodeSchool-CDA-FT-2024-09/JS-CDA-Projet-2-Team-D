import AddCategory from "../../../components/addCategory/AddCategory";
import DisplayCategory from "../../../components/displayCategorySubcategory/DisplayCategorySubcategory";
import PageTitle from "../../../components/PageTitle";

function ManageCategory() {
  return (
    <>
      <PageTitle title="Gestion des catégories" />
      <PageTitle title="Nouvelle catégorie" />
      <AddCategory />
      <DisplayCategory />
    </>
  );
}

export default ManageCategory;
